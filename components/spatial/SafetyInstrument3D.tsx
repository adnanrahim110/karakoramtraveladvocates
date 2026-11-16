"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { useInteractive } from "@/components/spatial/InteractiveContext";

interface SafetyInstrument3DProps {
  activeIndex: number;
  onSelectIndex: (idx: number) => void;
  className?: string;
}

const TELEMETRY_NODES: Array<{
  idx: number;
  code: string;
  label: string;
  pos: [number, number, number];
}> = [
  {
    idx: 0,
    code: "SPO2 // 2X DAILY",
    label: "PULSE-OXIMETRY & GAMOW",
    pos: [1.35, 0.65, 0.45],
  },
  {
    idx: 1,
    code: "SAT // INREACH + THURAYA",
    label: "REDUNDANT COMMS LINK",
    pos: [-1.25, 0.85, 0.65],
  },
  {
    idx: 2,
    code: "MET // KDU-GIL CORRIDOR",
    label: "FLIGHT & KKH CONTINGENCY",
    pos: [0.45, -0.95, 1.25],
  },
  {
    idx: 3,
    code: "SOP // WFR + DTS LEAD",
    label: "GUIDE RATIO GOVERNANCE",
    pos: [-0.85, -0.65, -1.15],
  },
];

function BarometricGyroAssembly({
  activeIndex,
  onSelectIndex,
}: {
  activeIndex: number;
  onSelectIndex: (idx: number) => void;
}) {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const meridianPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * 1.62, Math.sin(a) * 1.62, 0));
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.14;
      outerRingRef.current.rotation.x = THREE.MathUtils.lerp(
        outerRingRef.current.rotation.x,
        0.35 + activeIndex * 0.28,
        delta * 3
      );
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= delta * 0.22;
      innerRingRef.current.rotation.z = THREE.MathUtils.lerp(
        innerRingRef.current.rotation.z,
        -0.4 + activeIndex * 0.35,
        delta * 3
      );
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group>
      {/* Inner Octahedral Mountain Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.78, 2]} />
        <meshStandardMaterial
          color="#176371"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      <mesh>
        <octahedronGeometry args={[0.52, 0]} />
        <meshStandardMaterial
          color="#0B2C36"
          roughness={0.35}
          metalness={0.65}
        />
      </mesh>

      {/* Precision Brass/Gold Barometric Gimbal Rings */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.45, 0.014, 16, 96]} />
        <meshStandardMaterial color="#D4A04C" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.15, 0.012, 16, 96]} />
        <meshStandardMaterial color="#F6F2E9" metalness={0.5} roughness={0.3} />
      </mesh>

      <Line points={meridianPoints} color="#176371" lineWidth={1} />

      {/* 4 Interactive Safety Protocol Nodes */}
      {TELEMETRY_NODES.map((node) => {
        const isActive = node.idx === activeIndex;
        return (
          <group key={node.idx} position={node.pos}>
            <Line
              points={[
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(
                  -node.pos[0] * 0.45,
                  -node.pos[1] * 0.45,
                  -node.pos[2] * 0.45
                ),
              ]}
              color={isActive ? "#D4A04C" : "#176371"}
              lineWidth={isActive ? 1.5 : 0.8}
            />
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectIndex(node.idx);
              }}
            >
              <sphereGeometry args={[isActive ? 0.06 : 0.035, 16, 16]} />
              <meshBasicMaterial color={isActive ? "#D4A04C" : "#F6F2E9"} />
            </mesh>
            <Html position={[0, 0.14, 0]} center>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectIndex(node.idx);
                }}
                className={cn(
                  "px-1.5 py-0.5 font-mono transition-colors cursor-pointer select-none whitespace-nowrap border",
                  isActive
                    ? "bg-warm-gold text-midnight-navy border-warm-gold text-[9px] font-bold tracking-[0.14em]"
                    : "bg-midnight-navy/95 text-glacier-cream/80 border-glacier-cream/25 hover:border-warm-gold text-[8px] tracking-[0.12em]"
                )}
              >
                0{node.idx + 1} • {node.code}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export function SafetyInstrument3D({
  activeIndex,
  onSelectIndex,
  className,
}: SafetyInstrument3DProps) {
  const { setCursorTelemetry } = useInteractive();

  return (
    <div
      onMouseEnter={() =>
        setCursorTelemetry("3D SAFETY TELEMETRY • SELECT NODE")
      }
      onMouseLeave={() => setCursorTelemetry(null)}
      className={cn(
        "relative w-full h-[380px] sm:h-[420px] bg-[#06181e] border border-glacier-cream/15 overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 inset-x-0 z-10 px-4 py-2 bg-midnight-navy/90 border-b border-glacier-cream/15 flex items-center justify-between text-[9px] font-mono tracking-[0.16em] uppercase text-glacier-cream/75 pointer-events-none">
        <span>3D Barometric & Satellite Governance Matrix</span>
        <span className="text-warm-gold">
          Protocol 0{activeIndex + 1} Active
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 0.6, 3.9], fov: 40 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 4]} intensity={1.8} color="#F6F2E9" />
        <pointLight position={[-3, -2, 3]} intensity={1.2} color="#D4A04C" />
        <BarometricGyroAssembly
          activeIndex={activeIndex}
          onSelectIndex={onSelectIndex}
        />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
