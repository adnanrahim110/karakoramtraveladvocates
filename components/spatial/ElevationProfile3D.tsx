"use client";

import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import type { ItineraryDay } from "@/lib/types/cms";
import { cn, formatAltitude, formatDistance } from "@/lib/utils";
import { useInteractive } from "@/components/spatial/InteractiveContext";

interface ElevationProfile3DProps {
  title: string;
  subtitle: string;
  maxAltitudeMeters: number;
  stages: ItineraryDay[];
  className?: string;
}

function VolumetricCrossSectionBlock({
  stages,
  activeIndex,
  onSelectIndex,
  maxAltitudeMeters,
  unit,
}: {
  stages: ItineraryDay[];
  activeIndex: number;
  onSelectIndex: (idx: number) => void;
  maxAltitudeMeters: number;
  unit: "metric" | "imperial";
}) {
  const minAlt = 1200;
  const maxAlt = Math.max(maxAltitudeMeters + 500, 5600);

  const { terrainGeometry, stageCoordinates, crestLine } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(7.2, 2.2, 140, 44);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;

    // Interpolate itinerary stage altitudes across X [-3.6, 3.6]
    const getProfileHeight = (xNorm: number) => {
      const fIdx = xNorm * Math.max(1, stages.length - 1);
      const i0 = Math.max(0, Math.min(stages.length - 1, Math.floor(fIdx)));
      const i1 = Math.max(0, Math.min(stages.length - 1, i0 + 1));
      const frac = fIdx - i0;
      const smoothFrac = frac * frac * (3 - 2 * frac);
      const alt0 = stages[i0]?.altitudeMeters ?? 2000;
      const alt1 = stages[i1]?.altitudeMeters ?? 2000;
      const interpAlt = alt0 + (alt1 - alt0) * smoothFrac;
      return 0.15 + ((interpAlt - minAlt) / (maxAlt - minAlt)) * 1.65;
    };

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const xNorm = (x + 3.6) / 7.2;
      const baseH = getProfileHeight(xNorm);
      // Add realistic cross-valley ridge flanks in Z
      const ridgeProfile = Math.exp(-Math.pow(z * 1.15, 2));
      const rockMicro =
        Math.abs(Math.sin(x * 3.8 + z * 2.9)) * 0.1 +
        Math.abs(Math.cos(x * 7.5 - z * 5.2)) * 0.04;
      pos.setY(i, Math.max(0.04, (baseH + rockMicro) * (0.38 + 0.62 * ridgeProfile)));
    }
    geo.computeVertexNormals();

    const coords: Array<{ x: number; y: number; z: number; stage: ItineraryDay; idx: number }> =
      stages.map((stage, idx) => {
        const xNorm = idx / Math.max(1, stages.length - 1);
        const x = -3.2 + xNorm * 6.4;
        const y = getProfileHeight((x + 3.6) / 7.2) + 0.08;
        return { x, y, z: 0, stage, idx };
      });

    const cLine = coords.map((c) => new THREE.Vector3(c.x, c.y, 0));

    return {
      terrainGeometry: geo,
      stageCoordinates: coords,
      crestLine: cLine,
    };
  }, [stages, maxAlt]);

  return (
    <group position={[0, -0.45, 0]}>
      {/* Geological Plinth Slice */}
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[7.24, 0.16, 2.24]} />
        <meshStandardMaterial color="#06171d" roughness={0.95} />
      </mesh>

      {/* 3D Terrain Corridor Slice */}
      <mesh geometry={terrainGeometry}>
        <meshStandardMaterial
          color="#133842"
          roughness={0.55}
          metalness={0.15}
        />
      </mesh>

      {/* Subtle Topographic Grid Overlay */}
      <mesh geometry={terrainGeometry} position={[0, 0.005, 0]}>
        <meshBasicMaterial
          color="#D4A04C"
          wireframe
          transparent
          opacity={0.14}
        />
      </mesh>

      {/* Glowing 3D Ascent Profile Line */}
      {crestLine.length > 1 && (
        <Line points={crestLine} color="#D4A04C" lineWidth={2.2} />
      )}

      {/* Camp Stage Pinpoints & Compact Tooltips */}
      {stageCoordinates.map((pt) => {
        const isSelected = pt.idx === activeIndex;
        return (
          <group key={pt.stage.day} position={[pt.x, pt.y, pt.z]}>
            <Line
              points={[
                new THREE.Vector3(0, -pt.y, 0),
                new THREE.Vector3(0, 0.22, 0),
              ]}
              color={isSelected ? "#D4A04C" : "#F6F2E9"}
              lineWidth={isSelected ? 1.5 : 0.7}
            />
            <mesh
              position={[0, 0.22, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectIndex(pt.idx);
              }}
            >
              <sphereGeometry args={[isSelected ? 0.05 : 0.03, 14, 14]} />
              <meshBasicMaterial color={isSelected ? "#D4A04C" : "#F6F2E9"} />
            </mesh>
            <Html position={[0, 0.32, 0]} center>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectIndex(pt.idx);
                }}
                className={cn(
                  "px-1.5 py-0.5 font-mono transition-colors cursor-pointer select-none whitespace-nowrap border",
                  isSelected
                    ? "bg-warm-gold text-midnight-navy border-warm-gold text-[9px] font-bold tracking-[0.12em]"
                    : "bg-midnight-navy/90 text-glacier-cream/80 border-glacier-cream/25 hover:border-warm-gold text-[8px] tracking-[0.1em]"
                )}
              >
                D{pt.stage.day} • {formatAltitude(pt.stage.altitudeMeters, unit)}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export function ElevationProfile3D({
  title,
  subtitle,
  maxAltitudeMeters,
  stages,
  className,
}: ElevationProfile3DProps) {
  const { unit, setCursorTelemetry } = useInteractive();
  const [activeIndex, setActiveIndex] = useState(
    Math.min(2, stages.length - 1)
  );

  const activeStage = stages[activeIndex] ?? stages[0];

  return (
    <div
      onMouseEnter={() =>
        setCursorTelemetry("3D CROSS-SECTION • CLICK STAGE NODE")
      }
      onMouseLeave={() => setCursorTelemetry(null)}
      className={cn(
        "bg-midnight-navy border border-midnight-navy text-glacier-cream",
        className
      )}
    >
      {/* Top Instrument Specification Header */}
      <div className="px-6 py-4 border-b border-glacier-cream/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-warm-gold">
            3D Volumetric Route Cross-Section & Acclimatization Profile
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-glacier-cream mt-0.5">
            {title}
          </h3>
          <p className="text-xs font-mono text-glacier-cream/65 mt-0.5">
            {subtitle}
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-ink border border-warm-gold/40 text-right shrink-0">
          <span className="block text-[9px] font-mono uppercase tracking-[0.16em] text-glacier-cream/65">
            Max Route Elevation
          </span>
          <span className="font-mono text-base font-bold text-warm-gold">
            {formatAltitude(maxAltitudeMeters, unit)}
          </span>
        </div>
      </div>

      {/* 3D Volumetric Cross-Section Canvas */}
      <div className="relative h-64 sm:h-72 w-full bg-[#06181e] border-b border-glacier-cream/15">
        <Canvas
          camera={{ position: [0, 1.5, 4.4], fov: 36 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[-4, 6, 4]} intensity={1.8} color="#F6F2E9" />
          <pointLight position={[2, 3, 2]} intensity={1.2} color="#D4A04C" />
          <VolumetricCrossSectionBlock
            stages={stages}
            activeIndex={activeIndex}
            onSelectIndex={setActiveIndex}
            maxAltitudeMeters={maxAltitudeMeters}
            unit={unit}
          />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
      </div>

      {/* Interactive Stage Scrubber Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border-b border-glacier-cream/15">
        {stages.map((st, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={st.day}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "px-3 py-2.5 text-left font-mono border-r border-b sm:border-b-0 border-glacier-cream/15 transition-colors cursor-pointer",
                isSelected
                  ? "bg-warm-gold text-midnight-navy font-bold"
                  : "bg-midnight-navy text-glacier-cream/75 hover:bg-slate-ink"
              )}
            >
              <span className="block text-[9px] uppercase tracking-wider">
                Day {String(st.day).padStart(2, "0")}
              </span>
              <span className="block text-xs mt-0.5 truncate">
                {formatAltitude(st.altitudeMeters, unit)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Camp Stage Readout */}
      {activeStage && (
        <div className="p-6 bg-slate-ink grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em]">
              <span className="px-2 py-0.5 bg-warm-gold text-midnight-navy font-bold">
                Day {activeStage.day} • {activeStage.from} → {activeStage.to}
              </span>
              {activeStage.isAcclimatizationDay && (
                <span className="px-2 py-0.5 border border-warm-gold text-warm-gold">
                  Acclimatization Rotation
                </span>
              )}
            </div>
            <h4 className="font-display text-lg font-semibold text-glacier-cream mt-1">
              {activeStage.title}
            </h4>
            <p className="text-xs text-glacier-cream/75 leading-relaxed">
              {activeStage.summary}
            </p>
          </div>

          <dl className="lg:col-span-5 grid grid-cols-3 border-t lg:border-t-0 lg:border-l border-glacier-cream/15 pt-4 lg:pt-0 lg:pl-6 text-xs font-mono">
            <div>
              <dt className="text-[9px] uppercase tracking-widest text-glacier-cream/55">
                Elevation
              </dt>
              <dd className="text-warm-gold font-bold text-sm mt-1">
                {formatAltitude(activeStage.altitudeMeters, unit)}
              </dd>
            </div>
            <div>
              <dt className="text-[9px] uppercase tracking-widest text-glacier-cream/55">
                Distance
              </dt>
              <dd className="text-glacier-cream font-semibold text-sm mt-1">
                {formatDistance(activeStage.distanceKm, unit)}
              </dd>
            </div>
            <div>
              <dt className="text-[9px] uppercase tracking-widest text-glacier-cream/55">
                Transit
              </dt>
              <dd className="text-glacier-cream font-semibold text-sm mt-1">
                {activeStage.hours}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
