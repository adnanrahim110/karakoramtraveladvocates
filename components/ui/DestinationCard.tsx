"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/lib/types/cms";
import { cn, formatAltitude } from "@/lib/utils";
import { useInteractive } from "@/components/spatial/InteractiveContext";

interface DestinationCardProps {
  destination: Destination;
  index?: number;
  isSelected?: boolean;
  onSelect?: (dest: Destination) => void;
  className?: string;
}

export function DestinationCard({
  destination,
  index = 0,
  isSelected = false,
  onSelect,
  className,
}: DestinationCardProps) {
  const { unit, setCursorTelemetry } = useInteractive();

  return (
    <article
      onMouseEnter={() =>
        setCursorTelemetry(
          `${destination.name.toUpperCase()} • ${formatAltitude(
            destination.peakElevationMeters,
            unit
          )}`
        )
      }
      onMouseLeave={() => setCursorTelemetry(null)}
      onClick={() => onSelect?.(destination)}
      className={cn(
        "group relative flex flex-col border transition-colors duration-200 cursor-pointer",
        isSelected
          ? "bg-slate-ink border-warm-gold text-glacier-cream"
          : "bg-midnight-navy border-glacier-cream/15 text-glacier-cream hover:border-glacier-cream/45",
        className
      )}
    >
      {/* Top Coordinate Header */}
      <div className="px-4 py-2.5 border-b border-glacier-cream/15 flex items-center justify-between text-[9px] font-mono tracking-[0.16em] uppercase text-glacier-cream/70">
        <span>
          {String(index + 1).padStart(2, "0")} / {destination.coordinates}
        </span>
        <span className={cn(isSelected ? "text-warm-gold font-bold" : "text-glacier-cream/80")}>
          {formatAltitude(destination.peakElevationMeters, unit)}
        </span>
      </div>

      <figure className="relative h-44 w-full overflow-hidden bg-slate-ink">
        <Image
          src={destination.heroImage}
          alt={destination.heroAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
        />
        <figcaption className="absolute bottom-2 left-2 px-2 py-0.5 bg-midnight-navy/90 border border-glacier-cream/20 text-[9px] font-mono uppercase tracking-[0.14em] text-warm-gold">
          {destination.journeyCount} Routes
        </figcaption>
      </figure>

      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-glacier-cream group-hover:text-warm-gold transition-colors">
            {destination.name}
          </h3>
          <Link
            href={destination.urlPath}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Explore ${destination.name}`}
            className="p-1 text-glacier-cream/70 hover:text-warm-gold transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <p className="text-xs text-glacier-cream/75 leading-relaxed line-clamp-2">
          {destination.tagline}
        </p>

        <div className="mt-auto pt-2.5 border-t border-glacier-cream/15 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-glacier-cream/70">
          <span>{destination.bestSeason.split("(")[0].trim()}</span>
          <span className="text-warm-gold">{destination.recommendedDuration}</span>
        </div>
      </div>
    </article>
  );
}
