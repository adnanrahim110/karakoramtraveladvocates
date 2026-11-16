"use client";

import { HERO_LANDMARKS, type PeakLandmark } from "@/lib/data/hero-landmarks";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { PeakViewChip } from "@/components/spatial/PeakViewChip";
import { formatAltitude } from "@/lib/utils";
import { ArrowUpRight, Compass, RotateCcw } from "lucide-react";
import { useMotionValueEvent, type MotionValue } from "motion/react";
import { useState } from "react";

interface LiquidGlassPeakBarProps {
  activeLandmark: PeakLandmark;
  onSelectLandmark: (landmark: PeakLandmark) => void;
  hoverTelemetry: MotionValue<{
    altitude: number | null;
    coordinates: string | null;
  }>;
  onResetView: () => void;
}

export function LiquidGlassPeakBar({
  activeLandmark,
  onSelectLandmark,
  hoverTelemetry,
  onResetView,
}: LiquidGlassPeakBarProps) {
  const { unit } = useInteractive();
  const [probe, setProbe] = useState(hoverTelemetry.get());
  useMotionValueEvent(hoverTelemetry, "change", setProbe);
  return (
    <div className="relative z-20 mx-auto mt-auto mb-4 w-[calc(100%-2rem)] max-w-6xl shrink-0 rounded-lg border border-white/60 bg-white/65 shadow-lg shadow-midnight-navy/5 backdrop-blur-md">
      <div className="flex min-h-8 w-full items-center justify-between gap-2 px-2 sm:px-3 [@media(pointer:coarse)]:min-h-11">
        <div className="hidden shrink-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.08em] text-midnight-navy xl:flex">
          <Compass
            className="h-3 w-3 shrink-0 text-alpine-teal"
            aria-hidden="true"
          />
          <span className="hidden text-slate-ink/75 sm:inline">
            {probe.altitude !== null ? "PROBE:" : "PEAK:"}
          </span>
          <span className="font-bold whitespace-nowrap">
            {probe.altitude !== null
              ? formatAltitude(probe.altitude, unit)
              : formatAltitude(activeLandmark.elevationMeters, unit)}
          </span>
          <span className="hidden whitespace-nowrap text-slate-ink/75 xl:inline">
            {probe.altitude !== null ? probe.coordinates : activeLandmark.coordinates}
          </span>
        </div>
        <div role="group" aria-label="Choose a mountain viewpoint" className="grid w-full min-w-0 grid-cols-3 gap-x-1 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-1 [@media(pointer:coarse)]:gap-x-2">
          {HERO_LANDMARKS.map((landmark) => (
            <PeakViewChip
              key={landmark.id}
              variant="bar"
              landmark={landmark}
              isActive={landmark.id === activeLandmark.id}
              onSelect={onSelectLandmark}
              unit={unit}
            />
          ))}
          <button
            type="button"
            onClick={onResetView}
            aria-label="Reset 3D camera"
            className="inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-sm px-2 font-mono text-[9px] uppercase tracking-[0.08em] text-midnight-navy hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-[-2px] sm:min-h-8 sm:min-w-8 [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>
        <a
          href={activeLandmark.pillarHref}
          className="hidden min-h-8 shrink-0 items-center gap-1 whitespace-nowrap px-2 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-[-2px] md:inline-flex [@media(pointer:coarse)]:min-h-11"
        >
          <span>{activeLandmark.shortName} Routes</span>
          <ArrowUpRight
            className="h-3 w-3 text-alpine-teal"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
}
