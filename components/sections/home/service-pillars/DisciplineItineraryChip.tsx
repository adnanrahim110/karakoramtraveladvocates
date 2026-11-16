"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { UnitSystem } from "@/components/spatial/InteractiveContext";
import { formatAltitude } from "@/lib/utils";

export interface DisciplineArchiveSummary {
  id: string;
  title: string;
  urlPath: string;
  durationDays: number;
  maxAltitudeMeters: number;
  grade: string;
  startingPriceUsd?: number;
}

interface DisciplineItineraryChipProps {
  journey: DisciplineArchiveSummary;
  unit: UnitSystem;
}

/**
 * Light linen itinerary entry linking directly to a real journey page.
 */
export function DisciplineItineraryChip({
  journey,
  unit,
}: DisciplineItineraryChipProps) {
  return (
    <Link
      href={journey.urlPath}
      className="group min-h-11 px-4 py-3 border border-midnight-navy/15 bg-white hover:bg-[#FAF7F0] hover:border-alpine-teal transition-colors duration-200 motion-reduce:transition-none flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-teal"
    >
      <div className="min-w-0 flex flex-col gap-1">
        <span className="font-display text-sm font-semibold text-midnight-navy group-hover:text-alpine-teal transition-colors motion-reduce:transition-none leading-snug">
          {journey.title}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-slate-ink/65">
          {journey.durationDays} Days • Max {formatAltitude(journey.maxAltitudeMeters, unit)}
          {journey.startingPriceUsd
            ? ` • From $${journey.startingPriceUsd.toLocaleString()}`
            : " • Application"}
        </span>
      </div>

      <ArrowUpRight
        className="w-4 h-4 shrink-0 text-midnight-navy/45 group-hover:text-alpine-teal transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
        aria-hidden="true"
      />
    </Link>
  );
}
