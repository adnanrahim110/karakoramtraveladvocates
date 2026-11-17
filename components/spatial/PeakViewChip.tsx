"use client";

import { type UnitSystem } from "@/components/spatial/InteractiveContext";
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
  const altitude = formatAltitude(landmark.elevationMeters, unit);
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={"Focus on " + landmark.name + ", " + altitude}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(landmark);
      }}
      className={cn(
        "group inline-flex min-w-0 cursor-pointer items-center justify-center whitespace-nowrap select-none focus-visible:outline-2",
        variant === "pin"
          ? "min-h-11 min-w-11 rounded-sm focus-visible:outline-offset-0 focus-visible:outline-warm-gold"
          : "min-h-11 shrink-0 sm:min-h-8 focus-visible:outline-offset-[-2px] focus-visible:outline-alpine-teal [@media(pointer:coarse)]:min-h-11",
      )}
    >
      {variant === "pin" ? (
        <span className={cn(
          "inline-flex h-5 items-center gap-1 rounded-sm border bg-midnight-navy/95 px-1 text-glacier-cream shadow-md shadow-midnight-navy/25 sm:h-6 sm:px-2",
          isActive ? "border-warm-gold" : "border-glacier-cream/55 group-hover:border-warm-gold group-hover:bg-alpine-teal",
        )}>
          <span className="text-[9px] leading-none font-semibold sm:text-[10px]">{landmark.shortName}</span>
          <span className={cn("font-mono text-[8px] leading-none tabular-nums sm:text-[9px]", isActive ? "text-warm-gold" : "text-glacier-cream/80")}>
            {altitude}
          </span>
        </span>
      ) : (
      <span className={cn(
        "inline-flex h-6 items-center justify-center gap-1 rounded-sm border bg-midnight-navy px-1 font-mono font-semibold uppercase shadow-md shadow-midnight-navy/25 min-[390px]:px-2",
        "text-[8px] tracking-tight min-[390px]:text-[9px] sm:text-[10px] sm:tracking-normal",
        isActive
          ? "border-warm-gold text-glacier-cream ring-1 ring-warm-gold/30"
          : "border-glacier-cream/55 text-glacier-cream group-hover:border-warm-gold group-hover:bg-alpine-teal",
      )}>
        <span>{landmark.shortName}</span>
        {isActive && <span className="hidden text-warm-gold lg:inline">{altitude}</span>}
      </span>
      )}
    </button>
  );
}
