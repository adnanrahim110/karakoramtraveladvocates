"use client";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { Bvh, OrbitControls, Html, useTexture } from "@react-three/drei";
import Image from "next/image";
import { type MotionValue } from "motion/react";
import * as THREE from "three";
import { FloatingPeakMarker } from "@/components/spatial/FloatingPeakMarker";
import { TerrainRoute3D } from "@/components/spatial/TerrainRoute3D";
import { useInteractive, type UnitSystem } from "@/components/spatial/InteractiveContext";
import { cn } from "@/lib/utils";
import { useReducedMotionPreference } from "@/lib/motion/preferences";
import { scenePointerPosition, sceneRevealRadius, sceneLabelPositions, type SceneLabelAnchor, type SceneLabelPlacement } from "@/lib/hero-scene-interaction";
import { createTerrainSeasonLayers } from "@/lib/hero-terrain-materials";
import { heroSummerImagery } from "@/lib/data/hero-terrain-imagery";
import { HERO_TERRAIN_ROUTES } from "@/lib/data/hero-routes";
import {
  buildTerrainGeometry, buildTerrainRoute, sampleTerrainSurfaceHeight, sampleWorldHeight,
  MESH_SIZE, HEIGHT_SCALE, SCENE_Y_OFFSET, HAZE_START, HAZE_END,
  CAMERA_FAR, MAX_TARGET_RADIUS, MAX_ORBIT_DISTANCE,
} from "@/lib/hero-terrain";

import { HERO_LANDMARKS, type PeakLandmark } from "@/lib/data/hero-landmarks";
export { HERO_LANDMARKS, type PeakLandmark } from "@/lib/data/hero-landmarks";

// Real-world WGS84 bounds matching raw 30m SRTM N35E076.hgt & Sentinel-2 z=14 crop
const LAT_MIN = 35.7;
const LAT_MAX = 35.96;
const LON_MIN = 76.38;
const LON_MAX = 76.7;
const DEM_MIN_M = 4003;
const DEM_MAX_M = 8551;

// These assets are baked once by scripts/prepare-hero-terrain.py. The packed
// height field avoids decoding a 2048² canvas and building a 16MB pixel buffer.
const HEIGHT_GRID_URL = "/imgs/terrain/k2-height-grid.bin";
const SCENE_TEXTURES = [
  "/imgs/terrain/k2-satellite-detail.webp",
  "/imgs/terrain/k2-normal-detail.webp",
  "/imgs/terrain/karakoram-atmosphere.webp",
  heroSummerImagery.src,
];

type ScrollProgress = number | MotionValue<number>;

function buildTerrain(buffer: ArrayBuffer, segments: number) {
  const grid = new Float32Array(buffer);
  const geometry = buildTerrainGeometry(grid, segments);

  const routes = HERO_TERRAIN_ROUTES.map((route) => ({
    ...route,
    points: buildTerrainRoute(grid, route.waypoints, segments),
  }));
  const landmarkPositions: Record<string, [number, number, number]> = {};
  for (const landmark of HERO_LANDMARKS) {
    const [u, v] = landmark.uv;
    landmarkPositions[landmark.id] = [
      (u - 0.5) * MESH_SIZE,
      sampleTerrainSurfaceHeight(grid, u, v, segments),
      (v - 0.5) * MESH_SIZE,
    ];
  }
  return { grid, geometry, routes, landmarkPositions };
}

function BakedAtmosphere({ texture }: { texture: THREE.Texture }) {
  const sky = useRef<THREE.Mesh>(null);
  useFrame(({ camera }) => {
    sky.current?.position.copy(camera.position);
  });
  return (
    <mesh
      ref={sky}
      frustumCulled={false}
      renderOrder={-10}
      raycast={() => null}
    >
      <sphereGeometry args={[62, 32, 16]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        depthWrite={false}
        toneMapped={false}
        fog={false}
      />
    </mesh>
  );
}

interface MountainWorldProps {
  activeLandmark: PeakLandmark;
  onSelectLandmark: (landmark: PeakLandmark) => void;
  onHoverElevation: (altMeters: number | null, coords: string | null) => void;
  scrollProgress: ScrollProgress;
  resetTrigger: number;
  compact: boolean;
  reducedMotion: boolean;
  unit: UnitSystem;
}

function RealKarakoramDEMWorld({
  activeLandmark,
  onSelectLandmark,
  onHoverElevation,
  scrollProgress,
  resetTrigger,
  compact,
  reducedMotion,
  unit,
}: MountainWorldProps) {
  const { gl, invalidate, size } = useThree();
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const summerMesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const winterMesh = useRef<THREE.Mesh>(null);
  const userControlled = useRef(false);
  const lastProbeUpdate = useRef(-Infinity);
  const probeStrength = useRef(0);
  const pointerInside = useRef(false);
  const probeDirty = useRef(false);
  const probeCameraMatrix = useRef(new THREE.Matrix4());
  const probeRaycaster = useMemo(() => Object.assign(new THREE.Raycaster(), { firstHitOnly: true }), []);
  const pointerClient = useRef(new THREE.Vector2());
  const pointer = useRef(new THREE.Vector2());
  const revealPointer = useRef(new THREE.Vector2());
  const probePosition = useRef(new THREE.Vector3());
  const desiredCamera = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const labelPlacements = useRef<Record<string, SceneLabelPlacement>>({});

  const heightBuffer = useLoader(THREE.FileLoader, HEIGHT_GRID_URL, (loader) =>
    loader.setResponseType("arraybuffer"),
  );
  if (!(heightBuffer instanceof ArrayBuffer)) {
    throw new Error("The Karakoram elevation data could not be loaded.");
  }
  const configureTextures = useCallback(
    (maps: THREE.Texture[]) => {
      const anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
      for (let index = 0; index < maps.length; index++) {
        const texture = maps[index];
        texture.colorSpace =
          index === 1 ? THREE.NoColorSpace : THREE.SRGBColorSpace;
        texture.anisotropy = index === 2 ? 1 : anisotropy;
        texture.wrapS = index === 2 ? THREE.RepeatWrapping : THREE.MirroredRepeatWrapping;
        texture.wrapT = index === 2 ? THREE.ClampToEdgeWrapping : THREE.MirroredRepeatWrapping;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
      }
    },
    [gl],
  );
  const [albedo, normals, atmosphere, summer] = useTexture(
    SCENE_TEXTURES,
    configureTextures,
  );
  const segments = compact ? 160 : 320;
  const { grid, geometry, routes, landmarkPositions } = useMemo(
    () => buildTerrain(heightBuffer, segments),
    [heightBuffer, segments],
  );
  const labelAnchors = useMemo<SceneLabelAnchor[]>(() => HERO_LANDMARKS.map((landmark) => {
    const point = landmarkPositions[landmark.id] ?? landmark.worldPos;
    const selected = landmark.id === activeLandmark.id;
    return {
      id: landmark.id,
      position: [point[0], point[1] + SCENE_Y_OFFSET + (selected ? 0.34 : 0.24), point[2]],
      width: size.width < 640 ? 160 : 176,
      priority: selected ? 1 : 0,
    };
  }), [landmarkPositions, activeLandmark.id, size.width]);
  const seasonLayers = useMemo(
    () => createTerrainSeasonLayers({
      winterMap: albedo,
      summerMap: summer,
      normalMap: normals,
      hazeStart: HAZE_START,
      hazeEnd: HAZE_END,
    }),
    [albedo, normals, summer],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => {
    seasonLayers.winter.dispose();
    seasonLayers.summer.dispose();
  }, [seasonLayers]);

  useEffect(() => {
    const element = gl.domElement.closest<HTMLElement>("[data-hero-scene]") ?? gl.domElement;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerClient.current.set(event.clientX, event.clientY);
      const [x, y] = scenePointerPosition(event.clientX, event.clientY, gl.domElement.getBoundingClientRect());
      pointer.current.set(x, y);
      revealPointer.current.set(x, y);
      pointerInside.current = true;
      probeDirty.current = true;
      invalidate();
    };
    const leave = () => {
      probeStrength.current = 0;
      pointerInside.current = false;
      lastProbeUpdate.current = -Infinity;
      onHoverElevation(null, null);
      invalidate();
    };
    const refreshBounds = () => {
      if (!pointerInside.current) return;
      const [x, y] = scenePointerPosition(pointerClient.current.x, pointerClient.current.y, gl.domElement.getBoundingClientRect());
      if (Math.abs(x) > 1 || Math.abs(y) > 1) {
        leave();
        return;
      }
      pointer.current.set(x, y);
      revealPointer.current.set(x, y);
      probeDirty.current = true;
      invalidate();
    };
    element.addEventListener("pointerenter", move, { passive: true });
    element.addEventListener("pointermove", move, { capture: true, passive: true });
    element.addEventListener("pointerleave", leave);
    element.addEventListener("pointercancel", leave);
    window.addEventListener("scroll", refreshBounds, { capture: true, passive: true });
    window.addEventListener("resize", refreshBounds, { passive: true });
    window.addEventListener("blur", leave);
    return () => {
      element.removeEventListener("pointerenter", move);
      element.removeEventListener("pointermove", move, true);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointercancel", leave);
      window.removeEventListener("scroll", refreshBounds, true);
      window.removeEventListener("resize", refreshBounds);
      window.removeEventListener("blur", leave);
    };
  }, [gl, invalidate, onHoverElevation]);

  useEffect(() => {
    userControlled.current = false;
    pointer.current.set(0, 0);
    probeDirty.current = true;
    invalidate();
  }, [activeLandmark, resetTrigger, invalidate]);

  useEffect(() => {
    if (typeof scrollProgress !== "number") {
      return scrollProgress.on("change", () => invalidate());
    }
    invalidate();
  }, [scrollProgress, invalidate]);

  const updateHoverTelemetry = () => {
    // UI telemetry updates at most eight times per second.
    const now = performance.now();
    if (now - lastProbeUpdate.current < 120) return;
    lastProbeUpdate.current = now;
    const point = probePosition.current;
    const u = THREE.MathUtils.clamp(point.x / MESH_SIZE + 0.5, 0, 1);
    const v = THREE.MathUtils.clamp(point.z / MESH_SIZE + 0.5, 0, 1);
    const normalizedHeight = THREE.MathUtils.clamp(point.y / HEIGHT_SCALE, 0, 1);
    const meters = Math.round(DEM_MIN_M + normalizedHeight * (DEM_MAX_M - DEM_MIN_M));
    const latitude = (LAT_MAX - v * (LAT_MAX - LAT_MIN)).toFixed(4);
    const longitude = (LON_MIN + u * (LON_MAX - LON_MIN)).toFixed(4);
    onHoverElevation(meters, latitude + "° N, " + longitude + "° E");
  };

  // Pointer motion moves the reveal immediately. Hover enters in ~210ms and exits
  // in ~120ms using exponential easing (no overshoot); reduced motion snaps.
  // Camera selection retains its grounded ~260ms exponential response.
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    let needsFrame = false;
    const orbit = controls.current;
    if (!userControlled.current && orbit) {
      const progress =
        typeof scrollProgress === "number"
          ? scrollProgress
          : scrollProgress.get();
      const position =
        landmarkPositions[activeLandmark.id] ?? activeLandmark.worldPos;
      const mouseX = reducedMotion || compact ? 0 : pointer.current.x * 0.55;
      const mouseY = reducedMotion || compact ? 0 : -pointer.current.y * 0.08;
      desiredCamera.current.set(
        activeLandmark.camOffset[0] + mouseX,
        Math.max(1.8, activeLandmark.camOffset[1] + mouseY),
        activeLandmark.camOffset[2] - (reducedMotion ? 0 : progress * 2.4),
      );
      desiredTarget.current.set(
        position[0] * 0.45 + mouseX * 0.18,
        3.18,
        position[2] * 0.45,
      );
      // Respect the controls' horizon limit before comparing convergence. Without
      // this, the low Base Camp camera can chase an unreachable goal forever.
      const horizontalDistance = Math.hypot(
        desiredCamera.current.x - desiredTarget.current.x,
        desiredCamera.current.z - desiredTarget.current.z,
      );
      desiredCamera.current.y = Math.max(
        desiredCamera.current.y,
        desiredTarget.current.y + horizontalDistance * Math.tan(0.04),
        sampleWorldHeight(grid, desiredCamera.current.x, desiredCamera.current.z) + SCENE_Y_OFFSET + 0.6,
      );
      const factor = reducedMotion ? 1 : 1 - Math.exp(-dt * 11);
      state.camera.position.lerp(desiredCamera.current, factor);
      orbit.target.lerp(desiredTarget.current, factor);
      needsFrame ||=
        state.camera.position.distanceToSquared(desiredCamera.current) >
          0.00001 ||
        orbit.target.distanceToSquared(desiredTarget.current) > 0.00001;
      orbit.update();
    }
    if (orbit) {
      // Horizontal panning stays near the measured area. Rotation remains 360°.
      const targetRadius = Math.hypot(orbit.target.x, orbit.target.z);
      if (targetRadius > MAX_TARGET_RADIUS) {
        const factor = MAX_TARGET_RADIUS / targetRadius;
        const dx = orbit.target.x * (factor - 1);
        const dz = orbit.target.z * (factor - 1);
        orbit.target.x += dx;
        orbit.target.z += dz;
        state.camera.position.x += dx;
        state.camera.position.z += dz;
        orbit.update();
      }
      const ground = sampleWorldHeight(grid, state.camera.position.x, state.camera.position.z) + SCENE_Y_OFFSET;
      if (state.camera.position.y < ground + 0.6) {
        state.camera.position.y = ground + 0.6;
        orbit.update();
      }
    }
    state.camera.updateMatrixWorld();
    const overlay = summerMesh.current?.material;
    if (overlay && winterMesh.current && pointerInside.current
      && (probeDirty.current || !probeCameraMatrix.current.equals(state.camera.matrixWorld))) {
      probeDirty.current = false;
      probeCameraMatrix.current.copy(state.camera.matrixWorld);
      winterMesh.current.updateWorldMatrix(true, false);
      probeRaycaster.setFromCamera(revealPointer.current, state.camera);
      const hit = probeRaycaster.intersectObject(winterMesh.current, false)[0];
      if (hit && Math.max(Math.abs(hit.point.x), Math.abs(hit.point.z)) <= MESH_SIZE / 2) {
        overlay.uniforms.uRevealCenter.value.copy(hit.point);
        const fov = state.camera instanceof THREE.PerspectiveCamera ? state.camera.fov : 36;
        overlay.uniforms.uRevealRadius.value = sceneRevealRadius(hit.distance, state.size.height, fov);
        probeStrength.current = 1;
        probePosition.current.copy(hit.point);
        probePosition.current.y -= SCENE_Y_OFFSET;
        updateHoverTelemetry();
      } else {
        if (probeStrength.current > 0) onHoverElevation(null, null);
        probeStrength.current = 0;
        lastProbeUpdate.current = -Infinity;
      }
    }
    if (overlay) {
      const currentStrength = overlay.uniforms.uRevealStrength.value;
      const blendedStrength = reducedMotion ? probeStrength.current : THREE.MathUtils.lerp(
        currentStrength,
        probeStrength.current,
        1 - Math.exp(-dt * (probeStrength.current > currentStrength ? 14 : 25)),
      );
      const nextStrength = Math.abs(blendedStrength - probeStrength.current) < 0.002
        ? probeStrength.current : blendedStrength;
      overlay.uniforms.uRevealStrength.value = nextStrength;
      overlay.visible = nextStrength > 0;
      needsFrame ||= nextStrength !== probeStrength.current;
    }
    labelPlacements.current = sceneLabelPositions(state.camera, state.size, labelAnchors);
    if (needsFrame) invalidate();
  }, -0.5);

  const selectLandmark = (landmark: PeakLandmark) => {
    userControlled.current = false;
    onSelectLandmark(landmark);
    invalidate();
  };

  return (
    <>
      <BakedAtmosphere texture={atmosphere} />
      <OrbitControls
        ref={controls}
        enablePan={!compact}
        enableRotate={!compact}
        screenSpacePanning={false}
        enableZoom={false}
        enableDamping={!reducedMotion}
        dampingFactor={0.1}
        rotateSpeed={0.5}
        panSpeed={0.45}
        minPolarAngle={0.42}
        maxPolarAngle={Math.PI / 2 - 0.04}
        minDistance={6.8}
        maxDistance={MAX_ORBIT_DISTANCE}
        onStart={() => {
          userControlled.current = true;
        }}
      />
      <group position={[0, SCENE_Y_OFFSET, 0]}>
        {/* A BVH makes probing logarithmic instead of testing every terrain triangle. */}
        <Bvh key={segments} firstHitOnly strategy={0} maxLeafTris={12}>
          <mesh
            ref={winterMesh}
            geometry={geometry}
            material={seasonLayers.winter}
          />
          <mesh
            ref={summerMesh}
            geometry={geometry}
            material={seasonLayers.summer}
            raycast={() => null}
            renderOrder={1}
          />
        </Bvh>
        {routes.map((route) => (
          <TerrainRoute3D key={route.id} points={route.points} isActive={route.landmarkIds.includes(activeLandmark.id)} viewKey={resetTrigger} interaction={probeStrength} reducedMotion={reducedMotion} />
        ))}
        {HERO_LANDMARKS.map((landmark) => {
          const selected = landmark.id === activeLandmark.id;
          const pinPosition =
            landmarkPositions[landmark.id] ?? landmark.worldPos;
          return (
            <FloatingPeakMarker
              key={landmark.id}
              landmark={landmark}
              position={pinPosition}
              isActive={selected}
              unit={unit}
              onSelect={selectLandmark}
              getPlacement={(camera, size) => labelPlacements.current[landmark.id]
                ?? sceneLabelPositions(camera, size, labelAnchors)[landmark.id]}
            />
          );
        })}
      </group>
    </>
  );
}

function subscribeCompactQuality(callback: () => void) {
  const media = window.matchMedia("(max-width: 767px), (pointer: coarse)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getCompactQuality() {
  return window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
}

function StaticTerrainFallback({ retry }: { retry?: () => void }) {
  return (
    <div className="relative h-full w-full bg-[#DCE8F2]">
      <Image
        src="/imgs/terrain/k2-satellite-detail.webp"
        alt="Satellite view of K2's rocky ridges and snow-covered glaciers"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-x-4 bottom-20 mx-auto flex max-w-md flex-wrap items-center justify-center gap-3 bg-glacier-cream/95 p-4 text-center text-xs text-midnight-navy">
        <p>
          The mountain map is unavailable. You can still choose a peak and
          explore its journeys below.
        </p>
        {retry && (
          <button
            type="button"
            onClick={retry}
            className="min-h-11 min-w-11 cursor-pointer border-b border-midnight-navy px-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Retry mountain map
          </button>
        )}
      </div>
    </div>
  );
}

class TerrainBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <StaticTerrainFallback
          retry={() => {
            useLoader.clear(THREE.FileLoader, HEIGHT_GRID_URL);
            useTexture.clear(SCENE_TEXTURES);
            this.setState({ failed: false });
          }}
        />
      );
    }
    return this.props.children;
  }
}

interface HeroKarakoramScene3DProps {
  activeLandmark: PeakLandmark;
  onSelectLandmark: (landmark: PeakLandmark) => void;
  onHoverElevation: (altMeters: number | null, coords: string | null) => void;
  scrollProgress: ScrollProgress;
  resetTrigger: number;
  className?: string;
}

export function HeroKarakoramScene3D({
  activeLandmark,
  onSelectLandmark,
  onHoverElevation,
  scrollProgress,
  resetTrigger,
  className,
}: HeroKarakoramScene3DProps) {
  const container = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [sceneActive, setSceneActive] = useState(true);
  const compact = useSyncExternalStore(
    subscribeCompactQuality,
    getCompactQuality,
    () => true,
  );
  const reducedMotion = useReducedMotionPreference();
  const { unit } = useInteractive();

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let inView = true;
    const update = () =>
      setSceneActive(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div
      ref={container}
      data-hero-scene
      onPointerDown={() => setDragging(true)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
      data-cursor={dragging ? "ORBITING 3D" : "EXPLORE + ORBIT"}
      className={cn(
        "relative h-full w-full touch-pan-y select-none [&_canvas]:touch-pan-y!",
        dragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
    >
      <TerrainBoundary>
        <Canvas
          frameloop={sceneActive ? "demand" : "never"}
          dpr={compact ? 1 : [1, 1.4]}
          camera={{ position: [-1.4, 4.15, 15.8], fov: 36, near: 0.1, far: CAMERA_FAR }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            toneMapping: THREE.NoToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          fallback={<StaticTerrainFallback />}
        >
          <color attach="background" args={["#DCE8F2"]} />
          <Suspense
            fallback={
              <Html center>
                <span
                  role="status"
                  className="whitespace-nowrap bg-glacier-cream/90 px-4 py-3 font-mono text-[10px] tracking-widest text-midnight-navy uppercase"
                >
                  Preparing the mountain map
                </span>
              </Html>
            }
          >
            <RealKarakoramDEMWorld
              activeLandmark={activeLandmark}
              onSelectLandmark={onSelectLandmark}
              onHoverElevation={onHoverElevation}
              scrollProgress={scrollProgress}
              resetTrigger={resetTrigger}
              compact={compact}
              reducedMotion={reducedMotion}
              unit={unit}
            />
          </Suspense>
        </Canvas>
      </TerrainBoundary>
    </div>
  );
}
