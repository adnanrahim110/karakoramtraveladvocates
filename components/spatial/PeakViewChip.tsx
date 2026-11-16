"use client";

import { type UnitSystem } from "@/components/spatial/InteractiveContext";
import { ArrowUpRight } from "lucide-react";
import { type PeakLandmark } from "@/lib/data/hero-landmarks";
import { cn, formatAltitude } from "@/lib/utils";

interface PeakViewChipProps {
  landmark: PeakLandmark;
  isActive: boolean;
  onSelect: (landmark: PeakLandmark) => void;
  variant: "pin" | "bar";
  unit: UnitSystem;
}

export function PeakViewChip({ landmark, isActive, onSelect, variant, unit }: PeakViewChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={"Focus on " + landmark.name + ", " + formatAltitude(landmark.elevationMeters, unit)}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(landmark);
      }}
      className={cn(
        "group inline-flex min-w-0 cursor-pointer items-center justify-center whitespace-nowrap select-none focus-visible:outline-2",
        variant === "pin"
          ? cn("min-h-12 w-40 justify-between gap-3 rounded-md border bg-midnight-navy/95 px-3 py-2 text-left text-glacier-cream shadow-lg shadow-midnight-navy/25 backdrop-blur-md focus-visible:outline-offset-4 focus-visible:outline-warm-gold sm:w-44", isActive ? "border-warm-gold" : "border-glacier-cream/55 hover:border-warm-gold hover:bg-alpine-teal")
          : "min-h-11 sm:min-h-8 focus-visible:outline-offset-[-2px] focus-visible:outline-alpine-teal [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11",
      )}
    >
      {variant === "pin" ? (
        <>
          <span className="flex min-w-0 flex-col gap-1">
            <span className="flex items-center gap-2 font-mono text-[9px] leading-none tracking-wider text-glacier-cream/80">
              <span aria-hidden="true" className={cn("size-1 shrink-0 rounded-full", isActive ? "bg-warm-gold" : "bg-glacier-cream")} />
              <span>{formatAltitude(landmark.elevationMeters, unit)}</span>
            </span>
            <span className="text-xs leading-4 font-semibold">{landmark.shortName}</span>
          </span>
          <ArrowUpRight aria-hidden="true" className={cn("size-3 shrink-0", isActive ? "text-warm-gold" : "text-glacier-cream/80")} />
        </>
      ) : (
      <span className={cn(
        "inline-flex h-6 items-center gap-1 rounded-sm border bg-midnight-navy px-2 font-mono font-semibold uppercase shadow-md shadow-midnight-navy/25",
        "text-[9px] tracking-normal sm:text-[10px]",
        isActive
          ? "border-warm-gold text-glacier-cream ring-1 ring-warm-gold/30"
          : "border-glacier-cream/55 text-glacier-cream group-hover:border-warm-gold group-hover:bg-alpine-teal",
      )}>
        <span>{landmark.shortName}</span>
        {isActive && <span className="hidden text-warm-gold lg:inline">{formatAltitude(landmark.elevationMeters, unit)}</span>}
      </span>
      )}
    </button>
  );
}
