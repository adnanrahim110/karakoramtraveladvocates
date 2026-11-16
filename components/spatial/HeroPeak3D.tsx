"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import type { ServicePillar } from "@/lib/types/cms";
import { cn, formatAltitude } from "@/lib/utils";
import { useInteractive } from "@/components/spatial/InteractiveContext";

interface HeroPeak3DProps {
  activePillar: ServicePillar;
  onSelectPillar: (pillar: ServicePillar) => void;
  className?: string;
}

const PEAK_VERTEX_SHADER = `
  varying float vY;
  varying vec3 vNorm;
  void main() {
    vY = position.y;
    vNorm = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const PEAK_FRAGMENT_SHADER = `
  uniform float uHighlightMin;
  uniform float uHighlightMax;
  varying float vY;
  varying vec3 vNorm;

  void main() {
    vec3 sun = normalize(vec3(-0.7, 0.6, 0.5));
    float d = clamp(dot(vNorm, sun), 0.0, 1.0);
    float flatSlope = clamp(dot(vNorm, vec3(0.0, 1.0, 0.0)), 0.0, 1.0);

    vec3 darkGranite = vec3(0.07, 0.16, 0.20);
    vec3 midGneiss = vec3(0.22, 0.29, 0.33);
    vec3 snowCap = vec3(0.96, 0.95, 0.91);
    vec3 goldAccent = vec3(0.83, 0.63, 0.30);
    vec3 tealAccent = vec3(0.09, 0.39, 0.44);

    vec3 col = mix(darkGranite, midGneiss, smoothstep(0.0, 1.4, vY));
    float snowMask = smoothstep(0.65, 1.85, vY + flatSlope * 0.45);
    col = mix(col, snowCap, snowMask);

    // Etched contour lines every 250m equivalent
    float cLine = 1.0 - smoothstep(0.0, 0.05, abs(fract(vY * 7.5) - 0.5));
    col = mix(col, tealAccent, cLine * 0.25);

    // Highlight active service pillar altitude band
    float inBand = step(uHighlightMin, vY) * (1.0 - step(uHighlightMax, vY));
    col = mix(col, goldAccent, inBand * 0.28);

    // Band boundary laser lines
    float minEdge = 1.0 - smoothstep(0.0, 0.035, abs(vY - uHighlightMin));
    float maxEdge = 1.0 - smoothstep(0.0, 0.035, abs(vY - uHighlightMax));
    col = mix(col, goldAccent, clamp(minEdge + maxEdge, 0.0, 1.0) * 0.85);

    vec3 finalCol = col * (0.42 + 0.68 * d);
    gl_FragColor = vec4(finalCol, 1.0);
  }
`;

function K2PyramidMesh({
  activePillar,
  onSelectPillar,
  unit,
}: {
  activePillar: ServicePillar;
  onSelectPillar: (p: ServicePillar) => void;
  unit: "metric" | "imperial";
}) {
  const groupRef = useRef<THREE.Group>(null);

  const { geometry, abruzziRoute } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(5.6, 5.6, 160, 160);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;

    const getK2Height = (x: number, z: number) => {
      // Four-sided pyramidal geometry inspired by K2's Abruzzi / North / West ridges
      const ax = Math.abs(x);
      const az = Math.abs(z);
      const pyramid = Math.max(
        0,
        2.35 - (ax * 0.72 + az * 0.78 + Math.min(ax, az) * 0.25)
      );

      // Sharp arête striations and serac ribs
      const angle = Math.atan2(z, x);
      const ribs =
        Math.abs(Math.sin(angle * 4.0)) * 0.22 +
        Math.abs(Math.cos(x * 3.4 - z * 3.1)) * 0.14 +
        Math.abs(Math.sin(x * 7.2 + z * 6.8)) * 0.05;

      const edgeFalloff =
        Math.max(0, 1 - Math.pow(x / 2.75, 6)) *
        Math.max(0, 1 - Math.pow(z / 2.75, 6));

      return Math.max(0.02, (pyramid + ribs * (pyramid * 0.55)) * edgeFalloff);
    };

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, getK2Height(x, z));
    }
    geo.computeVertexNormals();

    // Compute 3D ascent line from Valley Floor → Base Camp → Camp III → 8,611m Summit
    const routePts: THREE.Vector3[] = [];
    const steps = 36;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const rx = 2.15 * (1 - t);
      const rz = 1.85 * (1 - t) + Math.sin(t * Math.PI * 2) * 0.12 * (1 - t);
      const ry = getK2Height(rx, rz) + 0.03;
      routePts.push(new THREE.Vector3(rx, ry, rz));
    }

    return { geometry: geo, abruzziRoute: routePts };
  }, []);

  const bandBounds = useMemo(() => {
    if (activePillar === "tour") return { min: 0.04, max: 0.75 };
    if (activePillar === "trek") return { min: 0.55, max: 1.38 };
    return { min: 1.25, max: 2.55 };
  }, [activePillar]);

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uHighlightMin: { value: 0.04 },
      uHighlightMax: { value: 0.75 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uHighlightMin.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHighlightMin.value,
        bandBounds.min,
        delta * 5
      );
      materialRef.current.uniforms.uHighlightMax.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHighlightMax.value,
        bandBounds.max,
        delta * 5
      );
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  const markers: Array<{
    pillar: ServicePillar;
    code: string;
    label: string;
    altMeters: number;
    pos: [number, number, number];
  }> = [
    {
      pillar: "tour",
      code: "01",
      label: "VALLEY & HERITAGE CORRIDOR",
      altMeters: 2438,
      pos: [1.65, 0.52, 1.42],
    },
    {
      pillar: "trek",
      code: "02",
      label: "CONCORDIA & BASE CAMPS",
      altMeters: 5150,
      pos: [0.85, 1.22, 0.74],
    },
    {
      pillar: "expedition",
      code: "03",
      label: "ABRUZZI SPUR SUMMIT ZONE",
      altMeters: 8611,
      pos: [0.0, 2.38, 0.0],
    },
  ];

  return (
    <group ref={groupRef}>
      {/* Plinth Base */}
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[5.64, 0.16, 5.64]} />
        <meshStandardMaterial color="#06171d" roughness={0.9} />
      </mesh>

      {/* K2 Pyramidal Peak Mesh */}
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={PEAK_VERTEX_SHADER}
          fragmentShader={PEAK_FRAGMENT_SHADER}
          uniforms={uniforms}
        />
      </mesh>

      {/* 3D Ascent Line */}
      <Line points={abruzziRoute} color="#D4A04C" lineWidth={1.8} />

      {/* 3 Altitude Zone Callout Pins */}
      {markers.map((m) => {
        const isActive = m.pillar === activePillar;
        return (
          <group key={m.pillar} position={m.pos}>
            <Line
              points={[
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0.28, 0),
              ]}
              color={isActive ? "#D4A04C" : "#F6F2E9"}
              lineWidth={1.2}
            />
            <mesh
              position={[0, 0.28, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPillar(m.pillar);
              }}
            >
              <sphereGeometry args={[isActive ? 0.045 : 0.028, 14, 14]} />
              <meshBasicMaterial color={isActive ? "#D4A04C" : "#F6F2E9"} />
            </mesh>
            <Html position={[0, 0.36, 0]} center>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPillar(m.pillar);
                }}
                className={cn(
                  "px-1.5 py-0.5 font-mono transition-colors cursor-pointer select-none whitespace-nowrap border",
                  isActive
                    ? "bg-warm-gold text-midnight-navy border-warm-gold text-[9px] font-bold tracking-[0.14em]"
                    : "bg-midnight-navy/90 text-glacier-cream/80 border-glacier-cream/25 hover:border-warm-gold text-[8px] tracking-[0.12em]"
                )}
              >
                {m.code} • {m.label} ({formatAltitude(m.altMeters, unit)})
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export function HeroPeak3D({
  activePillar,
  onSelectPillar,
  className,
}: HeroPeak3DProps) {
  const { unit, setCursorTelemetry } = useInteractive();

  return (
    <div
      onMouseEnter={() =>
        setCursorTelemetry("3D ELEVATION ZONES • CLICK BAND TO INSPECT")
      }
      onMouseLeave={() => setCursorTelemetry(null)}
      className={cn(
        "relative w-full h-[380px] sm:h-[440px] bg-[#06181e] border border-glacier-cream/15 overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 inset-x-0 z-10 px-4 py-2 bg-midnight-navy/90 border-b border-glacier-cream/15 flex items-center justify-between text-[9px] font-mono tracking-[0.16em] uppercase text-glacier-cream/75 pointer-events-none">
        <span>3D Hypsometric Altitude Band Model // K2 Profile</span>
        <span className="text-warm-gold">Active Zone: {activePillar}s</span>
      </div>

      <Canvas
        camera={{ position: [3.6, 2.8, 3.8], fov: 38 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <K2PyramidMesh
          activePillar={activePillar}
          onSelectPillar={onSelectPillar}
          unit={unit}
        />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.35}
        />
      </Canvas>
    </div>
  );
}
