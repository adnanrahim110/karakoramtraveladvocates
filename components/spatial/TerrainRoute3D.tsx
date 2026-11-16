"use client";

import { useEffect, useRef, type ComponentRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { type Vector3 } from "three";

interface TerrainRoute3DProps {
  points: readonly Vector3[];
  isActive: boolean;
  viewKey: number;
  interaction: RefObject<number>;
  reducedMotion: boolean;
}

export function TerrainRoute3D({ points, isActive, viewKey, interaction, reducedMotion }: TerrainRoute3DProps) {
  const highlight = useRef<ComponentRef<typeof Line>>(null);
  const elapsed = useRef(0);
  const { invalidate } = useThree();

  useEffect(() => {
    elapsed.current = 0;
    invalidate();
  }, [isActive, viewKey, reducedMotion, invalidate]);

  // Trigger: viewpoint selection or active terrain exploration. A 1.2s trace
  // explains travel direction, with exponential velocity easing (k=18) over
  // the first ~200ms. Pointer exit freezes it immediately; reduced motion
  // leaves it static. No input waits for the trace.
  useFrame((_, delta) => {
    if (!isActive || reducedMotion || !highlight.current) return;
    if (interaction.current <= 0 && elapsed.current >= 1.2) return;
    const dt = Math.min(delta, 0.05);
    elapsed.current += dt;
    highlight.current.material.dashOffset -= dt * 0.65 * (1 - Math.exp(-elapsed.current * 18));
    invalidate();
  });

  return (
    <group>
      <Line points={points} color="#0B2C36" lineWidth={3.5} transparent opacity={isActive ? 0.3 : 0.12} renderOrder={2} depthWrite={false} raycast={() => null} />
      <Line points={points} color={isActive ? "#D4A04C" : "#176371"} lineWidth={1.5} transparent opacity={isActive ? 0.9 : 0.4} renderOrder={3} depthWrite={false} raycast={() => null} />
      {isActive && (
        <Line ref={highlight} points={points} color="#FFF2CC" lineWidth={2} dashed dashSize={0.18} gapSize={0.72} transparent opacity={0.95} renderOrder={4} depthWrite={false} raycast={() => null} />
      )}
    </group>
  );
}
