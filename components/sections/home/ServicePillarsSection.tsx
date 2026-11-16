import React from "react";
import { ArrowUpRight } from "lucide-react";
import { TopographicContourSvg } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { ServicePillarsExplorer } from "@/components/sections/home/service-pillars/ServicePillarsExplorer";
import type { DisciplineArchiveSummary } from "@/components/sections/home/service-pillars/DisciplineItineraryChip";
import { SERVICE_DISCIPLINES } from "@/lib/data/service-disciplines";
import { JOURNEYS } from "@/lib/data/journeys";
import type { ServicePillar } from "@/lib/types/cms";

function pickArchiveSummaries(pillar: ServicePillar): DisciplineArchiveSummary[] {
  return JOURNEYS.filter((j) => j.serviceType === pillar)
    .slice(0, 2)
    .map((j) => ({
      id: j.id,
      title: j.title,
      urlPath: j.urlPath,
      durationDays: j.durationDays,
      maxAltitudeMeters: j.maxAltitudeMeters,
      grade: j.grade,
      startingPriceUsd: j.startingPriceUsd,
    }));
}

/**
 * Homepage Section 01: Sunlit Alabaster Editorial Ledger & Museum Print Atelier.
 */
export function ServicePillarsSection() {
  const journeysByPillar: Record<ServicePillar, DisciplineArchiveSummary[]> = {
    tour: pickArchiveSummaries("tour"),
    trek: pickArchiveSummaries("trek"),
    expedition: pickArchiveSummaries("expedition"),
  };

  return (
    <section
      aria-label="Three Service Disciplines Mapped by Elevation"
      className="relative py-20 sm:py-28 bg-linear-to-b from-[#FDFCF8] via-[#FAF7F0] to-glacier-cream border-b border-midnight-navy/15 overflow-hidden"
    >
      {/* Feather-light contour linework watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 text-midnight-navy/5"
      >
        <TopographicContourSvg />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Clean Light Gallery Editorial Header */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl flex flex-col gap-3">
            <div className="inline-flex items-center gap-3">
              <span className="w-2 h-2 bg-warm-gold" aria-hidden="true" />
              <span className="text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-alpine-teal">
                01 // Disciplines of Ascent
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-semibold leading-[1.06] tracking-tight text-midnight-navy">
              Three altitudes of adventure, from valley orchards to 8,611m snow crests.
            </h2>

            <p className="text-sm sm:text-base text-slate-ink/75 leading-relaxed max-w-2xl">
              Open any chapter below to inspect how our road corridors, glacier base
              camps, and vetted high-altitude teams scale with the Karakoram.
            </p>
          </div>

          <Button
            variant="outline-navy"
            size="md"
            href="/journeys"
            className="bg-white/80 shrink-0 self-start lg:self-end"
          >
            <span>All Journeys Index</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </header>

        <ServicePillarsExplorer
          disciplines={SERVICE_DISCIPLINES}
          journeysByPillar={journeysByPillar}
        />
      </div>
    </section>
  );
}
