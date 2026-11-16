"use client";

import { useCallback, useRef } from "react";
import { Html, Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { type Camera } from "three";
import { PeakViewChip } from "@/components/spatial/PeakViewChip";
import { type UnitSystem } from "@/components/spatial/InteractiveContext";
import { type PeakLandmark } from "@/lib/data/hero-landmarks";
import { type SceneLabelPlacement } from "@/lib/hero-scene-interaction";

interface FloatingPeakMarkerProps {
  landmark: PeakLandmark;
  position: [number, number, number];
  isActive: boolean;
  unit: UnitSystem;
  onSelect: (landmark: PeakLandmark) => void;
  getPlacement: (camera: Camera, size: { width: number; height: number }) => SceneLabelPlacement;
}

export function FloatingPeakMarker({ landmark, position, isActive, unit, onSelect, getPlacement }: FloatingPeakMarkerProps) {
  const label = useRef<HTMLDivElement>(null);
  const connector = useRef<SVGPathElement>(null);
  const { invalidate } = useThree();
  const attachLabel = useCallback((node: HTMLDivElement | null) => {
    label.current = node;
    // The separate HTML root can commit after the demand loop has settled,
    // particularly with reduced motion. Place its tether as soon as it mounts.
    if (node) invalidate();
  }, [invalidate]);
  const height = isActive ? 0.34 : 0.24;
  const color = isActive ? "#D4A04C" : "#F6F2E9";

  useFrame(({ camera, size }) => {
    const placement = getPlacement(camera, size);
    if (label.current) label.current.hidden = !placement.visible;
    const x = placement.pointPosition[0] - placement.position[0];
    const y = placement.pointPosition[1] - placement.position[1];
    // Screen-space tether follows the actual pin even when its card shifts to
    // avoid another card or the hero copy. It never pretends the point moved.
    const side = y < 0 ? -1 : 1;
    connector.current?.setAttribute("d", `M 0 ${side * 24} L 0 ${side * 32} L ${x} ${y}`);
  }, -0.25);

  return (
    <group position={position}>
      <Line points={[[0, 0.025, 0], [0, height, 0]]} color={color} lineWidth={1.5} renderOrder={4} depthWrite={false} raycast={() => null} />
      <mesh position={[0, height, 0]} raycast={() => null}>
        <sphereGeometry args={[isActive ? 0.052 : 0.036, 12, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Html position={[0, height, 0]} center zIndexRange={[40, 30]} calculatePosition={(_, camera, size) => getPlacement(camera, size).position}>
        <div ref={attachLabel}>
          <svg aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 size-px overflow-visible">
            <path ref={connector} fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
          </svg>
          {/* Html renders a separate React root; pass units across that boundary. */}
          <PeakViewChip variant="pin" landmark={landmark} isActive={isActive} onSelect={onSelect} unit={unit} />
        </div>
      </Html>
    </group>
  );
}
