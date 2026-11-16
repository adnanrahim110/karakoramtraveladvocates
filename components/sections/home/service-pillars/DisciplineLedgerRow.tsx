"use client";

import React from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { UnitSystem } from "@/components/spatial/InteractiveContext";
import type { ServiceDisciplineConfig } from "@/lib/data/service-disciplines";
import {
  DisciplineItineraryChip,
  type DisciplineArchiveSummary,
} from "@/components/sections/home/service-pillars/DisciplineItineraryChip";
import { cn, formatAltitude } from "@/lib/utils";

interface DisciplineLedgerRowProps {
  discipline: ServiceDisciplineConfig;
  journeys: DisciplineArchiveSummary[];
  isSelected: boolean;
  unit: UnitSystem;
  onSelect: () => void;
  onTailor: () => void;
}

/**
 * Editorial typographic chapter row featuring a proportional altitude gauge line,
 * sculptural serif heading, and expandable light dossier details.
 */
export function DisciplineLedgerRow({
  discipline,
  journeys,
  isSelected,
  unit,
  onSelect,
  onTailor,
}: DisciplineLedgerRowProps) {
  return (
    <article
      className={cn(
        "border-b border-midnight-navy/12 transition-colors duration-300 motion-reduce:transition-none",
        isSelected ? "bg-white/75" : "bg-transparent"
      )}
    >
      <button
        type="button"
        aria-expanded={isSelected}
        aria-controls={`ledger-panel-${discipline.key}`}
        onClick={onSelect}
        className={cn(
          "group w-full min-h-11 py-6 px-4 sm:px-6 text-left flex flex-col gap-3 cursor-pointer transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-teal",
          !isSelected && "hover:bg-white/50"
        )}
      >
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "text-[11px] font-mono font-bold tracking-[0.18em] transition-colors motion-reduce:transition-none",
                isSelected ? "text-[#946216]" : "text-midnight-navy/45 group-hover:text-alpine-teal"
              )}
            >
              {discipline.code}
            </span>
            <span
              className={cn(
                "text-[10px] font-mono uppercase tracking-[0.16em] transition-colors motion-reduce:transition-none",
                isSelected ? "text-alpine-teal font-semibold" : "text-slate-ink/55"
              )}
            >
              {discipline.shortLabel}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={cn(
                "text-[11px] font-mono uppercase tracking-[0.14em] tabular-nums",
                isSelected ? "text-midnight-navy font-semibold" : "text-slate-ink/55"
              )}
            >
              {formatAltitude(discipline.minAlt, unit)} –{" "}
              {formatAltitude(discipline.maxAlt, unit)}
            </span>

            <span
              className={cn(
                "w-8 h-8 border flex items-center justify-center transition-colors motion-reduce:transition-none",
                isSelected
                  ? "border-midnight-navy bg-midnight-navy text-glacier-cream"
                  : "border-midnight-navy/20 bg-white text-midnight-navy/70 group-hover:border-midnight-navy group-hover:text-midnight-navy"
              )}
            >
              {isSelected ? (
                <Minus className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Plus className="w-4 h-4" aria-hidden="true" />
              )}
            </span>
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-4 w-full">
          <h3
            className={cn(
              "font-display text-2xl sm:text-3xl xl:text-4xl font-semibold tracking-tight leading-tight transition-colors duration-200 motion-reduce:transition-none",
              isSelected
                ? "text-midnight-navy"
                : "text-midnight-navy/45 group-hover:text-midnight-navy"
            )}
          >
            {discipline.title}
          </h3>

          <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[0.16em] text-slate-ink/55 shrink-0">
            {discipline.durationRange}
          </span>
        </div>

        {/* Minimalist Hairline Altitude Proportion Indicator against 8,611m Summit Datum */}
        <div
          aria-hidden="true"
          className="relative w-full h-[2px] bg-midnight-navy/10 overflow-hidden"
        >
          <span
            className={cn(
              "block h-full transition-colors duration-300 motion-reduce:transition-none",
              discipline.altitudeBarClass,
              isSelected
                ? "bg-warm-gold"
                : "bg-midnight-navy/25 group-hover:bg-alpine-teal"
            )}
          />
        </div>
      </button>

      {isSelected && (
        <div
          id={`ledger-panel-${discipline.key}`}
          className="px-4 sm:px-6 pb-8 pt-2 flex flex-col gap-6"
        >
          <p className="text-sm sm:text-base text-slate-ink/85 leading-relaxed max-w-2xl">
            {discipline.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.14em] text-midnight-navy">
            {discipline.highlightsSummary.map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-[#F6F2E9] border border-midnight-navy/12"
              >
                {item}
              </span>
            ))}
            <span className="px-3 py-1 bg-[#FAF8F3] border border-alpine-teal/30 text-alpine-teal font-semibold">
              {discipline.bookingModel}
            </span>
          </div>

          {journeys.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {journeys.map((journey) => (
                <DisciplineItineraryChip
                  key={journey.id}
                  journey={journey}
                  unit={unit}
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Button variant="navy" size="md" href={discipline.href}>
              <span>{discipline.ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4 text-warm-gold" aria-hidden="true" />
            </Button>
            <Button variant="ghost-navy" size="md" onClick={onTailor}>
              <span>Tailor a {discipline.title.replace("Curated ", "")} Brief</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </article>
  );
}
