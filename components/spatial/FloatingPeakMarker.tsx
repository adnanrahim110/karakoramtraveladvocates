"use client";

import { useCallback } from "react";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type Camera } from "three";
import { PeakViewChip } from "@/components/spatial/PeakViewChip";
import { type UnitSystem } from "@/components/spatial/InteractiveContext";
import { type PeakLandmark } from "@/lib/data/hero-landmarks";
import { type SceneLabelPlacement } from "@/lib/hero-scene-interaction";

export interface FloatingPeakLabelHandle {
  update: (placement: SceneLabelPlacement) => void;
}

interface FloatingPeakMarkerProps {
  landmark: PeakLandmark;
  position: [number, number, number];
  isActive: boolean;
  getPlacement: (camera: Camera, size: { width: number; height: number }) => SceneLabelPlacement;
  onUpdatePlacement: (id: string, placement: SceneLabelPlacement) => void;
}

export function FloatingPeakMarker({
  landmark,
  position,
  isActive,
  getPlacement,
  onUpdatePlacement,
}: FloatingPeakMarkerProps) {
  const height = isActive ? 0.34 : 0.24;
  const color = isActive ? "#D4A04C" : "#F6F2E9";

  useFrame(({ camera, size }) => {
    onUpdatePlacement(landmark.id, getPlacement(camera, size));
  }, -0.25);

  return (
    <group position={position}>
      <Line points={[[0, 0.025, 0], [0, height, 0]]} color={color} lineWidth={1.5} renderOrder={4} depthWrite={false} raycast={() => null} />
      <mesh position={[0, height, 0]} raycast={() => null}>
        <sphereGeometry args={[isActive ? 0.052 : 0.036, 12, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

interface FloatingPeakMarkerLabelProps {
  landmark: PeakLandmark;
  isActive: boolean;
  unit: UnitSystem;
  onSelect: (landmark: PeakLandmark) => void;
  onMeasure: (id: string, width: number, height: number) => void;
  registerHandle: (id: string, handle: FloatingPeakLabelHandle | null) => void;
}

export function FloatingPeakMarkerLabel({
  landmark,
  isActive,
  unit,
  onSelect,
  onMeasure,
  registerHandle,
}: FloatingPeakMarkerLabelProps) {
  const attachWrapper = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      let placed = false;
      let lastX: number | null = null;
      let lastY: number | null = null;
      node.classList.add("invisible");

      const animation =
        typeof node.animate === "function"
          ? node.animate(
              [
                { transform: "translate3d(0px, 0px, 0)" },
                { transform: "translate3d(0px, 0px, 0)" },
              ],
              { duration: 1, fill: "both" },
            )
          : null;
      if (animation) {
        animation.pause();
        animation.currentTime = 0;
      }

      registerHandle(landmark.id, {
        update(placement) {
          if (!placed) {
            placed = true;
            node.classList.remove("invisible");
          }
          node.hidden = !placement.visible;
          if (!placement.visible) return;
          const [x, y] = placement.position;
          if (
            lastX !== null &&
            lastY !== null &&
            Math.abs(x - lastX) <= 0.01 &&
            Math.abs(y - lastY) <= 0.01
          ) {
            return;
          }
          lastX = x;
          lastY = y;
          if (animation?.effect instanceof KeyframeEffect) {
            const transform = `translate3d(${x}px, ${y}px, 0)`;
            animation.effect.setKeyframes([{ transform }, { transform }]);
          }
        },
      });

      return () => {
        registerHandle(landmark.id, null);
        animation?.cancel();
      };
    },
    [landmark.id, registerHandle],
  );

  const attachLabel = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const measure = () => {
        const { offsetWidth, offsetHeight } = node;
        if (offsetWidth && offsetHeight) onMeasure(landmark.id, offsetWidth, offsetHeight);
      };
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(node);
      return () => {
        observer.disconnect();
      };
    },
    [landmark.id, onMeasure],
  );

  return (
    <div
      ref={attachWrapper}
      className="pointer-events-auto absolute top-0 left-0 z-30 origin-top-left"
    >
      <div ref={attachLabel} className="flex -translate-x-1/2 -translate-y-1/2">
        <PeakViewChip
          variant="pin"
          landmark={landmark}
          isActive={isActive}
          onSelect={onSelect}
          unit={unit}
        />
      </div>
    </div>
  );
}
