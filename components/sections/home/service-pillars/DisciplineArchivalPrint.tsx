"use client";

import React from "react";
import Image from "next/image";
import { Compass } from "lucide-react";
import type { UnitSystem } from "@/components/spatial/InteractiveContext";
import type { ServiceDisciplineConfig } from "@/lib/data/service-disciplines";
import { cn, formatAltitude } from "@/lib/utils";

interface DisciplineArchivalPrintProps {
  disciplines: ServiceDisciplineConfig[];
  active: ServiceDisciplineConfig;
  unit: UnitSystem;
}

/**
 * Museum-matted pure daylight photography plate paired with an exhibition
 * caption band and clean 4-stop horizontal elevation milepost line.
 */
export function DisciplineArchivalPrint({
  disciplines,
  active,
  unit,
}: DisciplineArchivalPrintProps) {
  return (
    <figure className="bg-white p-4 sm:p-6 border border-midnight-navy/12 shadow-[0_24px_60px_-24px_rgba(11,44,54,0.12)] flex flex-col gap-6">
      {/* Un-obscured Daylight Mountain Photograph */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[5/4] overflow-hidden bg-[#EEF3F7]">
        {disciplines.map((item) => {
          const isVisible = item.key === active.key;
          return (
            <Image
              key={item.key}
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className={cn(
                "object-cover transition-all duration-700 ease-out motion-reduce:transition-none",
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-[1.03] pointer-events-none"
              )}
            />
          );
        })}
      </div>

      {/* Clean White Archival Exhibition Plate Below Photograph */}
      <figcaption className="flex flex-col gap-5 pt-1">
        <div className="flex items-start justify-between gap-4 border-b border-midnight-navy/10 pb-4">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-alpine-teal">
              <Compass className="w-3 h-3 text-warm-gold shrink-0" aria-hidden="true" />
              <span>{`PLATE ${active.code} — ${active.corridorTag}`}</span>
            </div>
            <p className="font-display text-lg sm:text-xl font-semibold text-midnight-navy leading-snug">
              {active.headline}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-ink/55">
              {active.coordinates}
            </span>
          </div>

          <div className="text-right shrink-0">
            <span className="block text-[9px] font-mono uppercase tracking-[0.16em] text-slate-ink/55">
              Ceiling
            </span>
            <span className="font-display text-2xl font-semibold text-midnight-navy tabular-nums">
              {formatAltitude(active.maxAlt, unit)}
            </span>
          </div>
        </div>

        {/* Minimalist 4-Stop Horizontal Ascent Milepost Line */}
        <div className="flex flex-col gap-3">
          <div className="relative flex items-center justify-between px-2">
            <div
              aria-hidden="true"
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-px bg-midnight-navy/15"
            />
            {active.waypoints.map((wp, idx) => {
              const isCeiling = idx === active.waypoints.length - 1;
              return (
                <span
                  key={wp.name}
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 w-3 h-3 rounded-full border-2 transition-colors motion-reduce:transition-none",
                    isCeiling
                      ? "bg-warm-gold border-white ring-1 ring-warm-gold"
                      : "bg-white border-alpine-teal"
                  )}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {active.waypoints.map((wp, idx) => {
              const isCeiling = idx === active.waypoints.length - 1;
              return (
                <div key={wp.name} className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-slate-ink/55 truncate">
                    {wp.stage}
                  </span>
                  <span className="text-xs font-semibold text-midnight-navy truncate">
                    {wp.name}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-mono tabular-nums",
                      isCeiling ? "text-[#8F5E15] font-bold" : "text-alpine-teal"
                    )}
                  >
                    {formatAltitude(wp.altitudeMeters, unit)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
