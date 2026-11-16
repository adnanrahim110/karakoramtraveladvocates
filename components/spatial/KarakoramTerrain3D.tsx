"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import type { Destination } from "@/lib/types/cms";
import { cn, formatAltitude } from "@/lib/utils";
import { useInteractive } from "@/components/spatial/InteractiveContext";

interface KarakoramTerrain3DProps {
  destinations: Destination[];
  selectedDestination: Destination;
  onSelectDestination: (destination: Destination) => void;
  className?: string;
}

// Deterministic pseudo-random hash for realistic ridged multifractal DEM generation
function hash2D(x: number, z: number): number {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function valueNoise(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const ux = fx * fx * (3.0 - 2.0 * fx);
  const uz = fz * fz * (3.0 - 2.0 * fz);

  const a = hash2D(ix, iz);
  const b = hash2D(ix + 1, iz);
  const c = hash2D(ix, iz + 1);
  const d = hash2D(ix + 1, iz + 1);

  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz;
}

function ridgedMultifractal(x: number, z: number, octaves = 5): number {
  let sum = 0;
  let freq = 0.65;
  let amp = 0.55;
  let prev = 1.0;

  for (let i = 0; i < octaves; i++) {
    const n = valueNoise(x * freq, z * freq);
    const ridge = 1.0 - Math.abs(n * 2.0 - 1.0);
    const sharp = ridge * ridge * prev;
    sum += sharp * amp;
    prev = sharp;
    freq *= 2.12;
    amp *= 0.48;
  }
  return sum;
}

function computeTerrainHeight(x: number, z: number): number {
  // Regional tectonic envelopes matching Gilgit-Baltistan's actual topography:
  // 1. Baltoro Muztagh / K2 & Concordia in NE (+x, -z)
  const baltoroMassif =
    Math.exp(-(Math.pow(x - 2.2, 2) * 0.45 + Math.pow(z + 0.95, 2) * 0.65)) *
    1.85;
  // 2. Central Karakoram / Hunza, Passu & Rakaposhi in NW (-x, -z)
  const hunzaMassif =
    Math.exp(-(Math.pow(x + 1.85, 2) * 0.42 + Math.pow(z + 0.9, 2) * 0.6)) *
    1.45;
  // 3. Western Himalaya / Nanga Parbat Massif in SW (-x, +z)
  const nangaMassif =
    Math.exp(-(Math.pow(x + 1.8, 2) * 0.55 + Math.pow(z - 1.05, 2) * 0.65)) *
    1.55;
  // 4. Masherbrum / Hushe in SE (+x, +z)
  const husheMassif =
    Math.exp(-(Math.pow(x - 2.1, 2) * 0.55 + Math.pow(z - 0.75, 2) * 0.65)) *
    1.25;
  // 5. High flat Deosai Plateau in South-Center (x ~ 0, z ~ 1.3)
  const deosaiPlateau =
    Math.exp(-(Math.pow(x - 0.1, 2) * 1.1 + Math.pow(z - 1.35, 2) * 1.4)) *
    0.72;

  const ridged = ridgedMultifractal(x + 4.2, z + 3.1, 5);

  // Carve Indus River & Hunza River deep tectonic gorges
  const indusGorge = Math.exp(-Math.pow(z - 0.22 * x - 0.15, 2) * 7.5) * 0.52;
  const hunzaGorge = Math.exp(-Math.pow(x + 1.55 - z * 0.4, 2) * 8.0) * 0.38;

  // Clean architectural slab border falloff
  const edgeX = Math.max(0, 1 - Math.pow(x / 4.4, 8));
  const edgeZ = Math.max(0, 1 - Math.pow(z / 2.85, 8));
  const mask = edgeX * edgeZ;

  const rawHeight =
    (baltoroMassif + hunzaMassif + nangaMassif + husheMassif) *
      (0.45 + ridged * 0.95) +
    deosaiPlateau +
    ridged * 0.42 -
    indusGorge -
    hunzaGorge;

  return Math.max(0.03, rawHeight * mask);
}

const TERRAIN_VERTEX_SHADER = `
  varying float vElevation;
  varying vec3 vNormalWorld;
  varying vec3 vPositionWorld;

  void main() {
    vElevation = position.y;
    vNormalWorld = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vPositionWorld = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const TERRAIN_FRAGMENT_SHADER = `
  varying float vElevation;
  varying vec3 vNormalWorld;
  varying vec3 vPositionWorld;

  void main() {
    vec3 up = vec3(0.0, 1.0, 0.0);
    float flatness = clamp(dot(normalize(vNormalWorld), up), 0.0, 1.0);

    // Sun directional lighting (warm golden-hour alpenglow from WNW)
    vec3 sunDir = normalize(vec3(-0.65, 0.55, 0.45));
    float diff = clamp(dot(normalize(vNormalWorld), sunDir), 0.0, 1.0);

    // Hypsometric alpine material palette
    vec3 riverColor = vec3(0.07, 0.28, 0.33);     // Deep glacial river teal
    vec3 valleySlate = vec3(0.06, 0.14, 0.18);    // Valley floor dark slate
    vec3 graniteRock = vec3(0.18, 0.24, 0.27);    // Steep Karakoram granite/gneiss
    vec3 highMoraine = vec3(0.34, 0.39, 0.42);    // Upper rock & talus
    vec3 glacierSnow = vec3(0.95, 0.94, 0.90);    // Glacier Cream snowpack
    vec3 alpenglowGold = vec3(0.83, 0.63, 0.30);  // Warm Gold #D4A04C sun rim

    // Base elevation blend
    vec3 baseCol = mix(riverColor, valleySlate, smoothstep(0.03, 0.16, vElevation));
    baseCol = mix(baseCol, highMoraine, smoothstep(0.16, 0.75, vElevation));

    // Exposed steep granite cliffs (steep slopes shed snow)
    float rockMask = 1.0 - smoothstep(0.52, 0.78, flatness);
    baseCol = mix(baseCol, graniteRock, rockMask * 0.85);

    // High-altitude snow accumulation on ridges and glacial basins
    float snowLine = smoothstep(0.58, 1.15, vElevation + flatness * 0.32);
    baseCol = mix(baseCol, glacierSnow, snowLine);

    // Subtle hypsometric topographic contour lines every 500m equivalent
    float contourRaw = abs(fract(vElevation * 9.0) - 0.5);
    float contourLine = 1.0 - smoothstep(0.0, 0.045, contourRaw);
    vec3 contourColor = mix(vec3(0.09, 0.38, 0.44), alpenglowGold, smoothstep(0.5, 1.4, vElevation));
    baseCol = mix(baseCol, contourColor, contourLine * 0.24);

    // Apply directional sun & warm golden-hour rim on high peaks
    vec3 litColor = baseCol * (0.42 + 0.68 * diff);
    float highPeakGlow = smoothstep(0.85, 1.8, vElevation) * pow(diff, 1.6);
    litColor += alpenglowGold * highPeakGlow * 0.38;

    gl_FragColor = vec4(litColor, 1.0);
  }
`;

function RealisticKarakoramDEM({
  destinations,
  selectedDestination,
  onSelectDestination,
  unit,
}: {
  destinations: Destination[];
  selectedDestination: Destination;
  onSelectDestination: (d: Destination) => void;
  unit: "metric" | "imperial";
}) {
  const groupRef = useRef<THREE.Group>(null);

  const { geometry, waypointPositions, routeLinePoints } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8.8, 5.6, 200, 140);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, computeTerrainHeight(x, z));
    }
    geo.computeVertexNormals();

    // Compute exact surface heights for every destination waypoint
    const wpMap: Record<string, [number, number, number]> = {};
    destinations.forEach((d) => {
      const [wx, , wz] = d.mapPosition;
      const wy = computeTerrainHeight(wx, wz);
      wpMap[d.id] = [wx, wy, wz];
    });

    // Build continuous 3D surface-hugging route path across the valleys
    const orderedIds = [
      "diamer-fairy-meadows",
      "hunza",
      "passu-upper-hunza",
      "deosai",
      "skardu",
      "shigar",
      "khaplu-ghanche",
      "baltoro-concordia",
    ];
    const rPoints: THREE.Vector3[] = [];
    for (let i = 0; i < orderedIds.length - 1; i++) {
      const start = wpMap[orderedIds[i]];
      const end = wpMap[orderedIds[i + 1]];
      if (start && end) {
        const steps = 16;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const ix = start[0] + (end[0] - start[0]) * t;
          const iz = start[2] + (end[2] - start[2]) * t;
          const iy = computeTerrainHeight(ix, iz) + 0.04;
          rPoints.push(new THREE.Vector3(ix, iy, iz));
        }
      }
    }

    return {
      geometry: geo,
      waypointPositions: wpMap,
      routeLinePoints: rPoints,
    };
  }, [destinations]);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: TERRAIN_VERTEX_SHADER,
        fragmentShader: TERRAIN_FRAGMENT_SHADER,
      }),
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle precision instrument breathing
      groupRef.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 0.4) * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Architectural Lithic Plinth Base */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[8.84, 0.2, 5.64]} />
        <meshStandardMaterial color="#06171d" roughness={0.95} />
      </mesh>

      {/* High-Resolution Shaded Karakoram DEM Surface */}
      <mesh geometry={geometry} material={shaderMaterial} />

      {/* Surface-Hugging Expedition Route Trace */}
      {routeLinePoints.length > 1 && (
        <Line points={routeLinePoints} color="#D4A04C" lineWidth={1.6} />
      )}

      {/* Precision Cartographic Pinpoints & Compact Micro-Tooltips */}
      {destinations.map((dest, idx) => {
        const isSelected = dest.id === selectedDestination.id;
        const coords = waypointPositions[dest.id] ?? dest.mapPosition;
        const [x, y, z] = coords;
        const pinHeight = isSelected ? 0.42 : 0.22;

        return (
          <group key={dest.id} position={[x, y, z]}>
            {/* Hairline Vertical Altitude Stem */}
            <Line
              points={[
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, pinHeight, 0),
              ]}
              color={isSelected ? "#D4A04C" : "#F6F2E9"}
              lineWidth={isSelected ? 1.5 : 0.8}
            />

            {/* Tiny Precision Survey Point */}
            <mesh
              position={[0, pinHeight, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectDestination(dest);
              }}
            >
              <sphereGeometry args={[isSelected ? 0.045 : 0.026, 16, 16]} />
              <meshBasicMaterial color={isSelected ? "#D4A04C" : "#F6F2E9"} />
            </mesh>

            {/* Compact, Premium Architectural Micro-Tooltip */}
            <Html position={[0, pinHeight + 0.08, 0]} center>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDestination(dest);
                }}
                className={cn(
                  "group/pin flex items-center gap-1.5 px-1.5 py-0.5 font-mono transition-colors cursor-pointer select-none whitespace-nowrap border",
                  isSelected
                    ? "bg-warm-gold text-midnight-navy border-warm-gold text-[9px] font-bold tracking-[0.14em]"
                    : "bg-midnight-navy/90 text-glacier-cream/85 border-glacier-cream/25 hover:border-warm-gold hover:text-warm-gold text-[8px] tracking-[0.12em]"
                )}
              >
                <span className="opacity-65">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="uppercase">
                  {dest.name.split("&")[0].trim()}
                </span>
                {isSelected && (
                  <span className="pl-1 border-l border-midnight-navy/30">
                    {formatAltitude(dest.peakElevationMeters, unit)}
                  </span>
                )}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export function KarakoramTerrain3D({
  destinations,
  selectedDestination,
  onSelectDestination,
  className,
}: KarakoramTerrain3DProps) {
  const { unit, setCursorTelemetry } = useInteractive();

  return (
    <div
      onMouseEnter={() => setCursorTelemetry("DRAG TO ORBIT DEM • CLICK SECTOR")}
      onMouseLeave={() => setCursorTelemetry(null)}
      className={cn(
        "relative w-full h-[460px] sm:h-[540px] bg-[#06181e] border border-glacier-cream/15 overflow-hidden",
        className
      )}
    >
      {/* Top Cartographic Instrument Header Bar */}
      <div className="absolute top-0 inset-x-0 z-10 px-4 py-2.5 bg-midnight-navy/90 border-b border-glacier-cream/15 flex flex-wrap items-center justify-between gap-2 pointer-events-none text-[10px] font-mono tracking-[0.16em] uppercase">
        <div className="flex items-center gap-2 text-glacier-cream/80">
          <span className="w-1.5 h-1.5 bg-warm-gold" />
          <span>DEM Relief Model // 35.88°N 76.51°E // Hypsometric Shader</span>
        </div>
        <div className="text-warm-gold">
          Active Sector: {selectedDestination.name} (
          {formatAltitude(selectedDestination.peakElevationMeters, unit)})
        </div>
      </div>

      {/* Bottom Scale & Legend Strip */}
      <div className="absolute bottom-0 inset-x-0 z-10 px-4 py-2 bg-midnight-navy/90 border-t border-glacier-cream/15 flex flex-wrap items-center justify-between gap-4 pointer-events-none text-[9px] font-mono tracking-[0.15em] uppercase text-glacier-cream/70">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#f2efe6]" />
            Glacier & Snow (&gt;5,000m)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#465359]" />
            Granite Face (3,000m–5,000m)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#124752]" />
            Indus / Hunza Gorge (&lt;2,500m)
          </span>
        </div>
        <span>Interactive 3D Relief • Drag to Orbit</span>
      </div>

      <Canvas
        camera={{ position: [0.4, 3.8, 5.6], fov: 38 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <RealisticKarakoramDEM
          destinations={destinations}
          selectedDestination={selectedDestination}
          onSelectDestination={onSelectDestination}
          unit={unit}
        />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 5.5}
          maxPolarAngle={Math.PI / 2.45}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
