"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JOURNEYS } from "@/lib/data/journeys";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn, formatAltitude } from "@/lib/utils";
import { useInteractive } from "@/components/spatial/InteractiveContext";

const ElevationProfile3D = dynamic(
  () =>
    import("@/components/spatial/ElevationProfile3D").then(
      (mod) => mod.ElevationProfile3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-midnight-navy border border-midnight-navy flex items-center justify-center text-[10px] font-mono uppercase tracking-[0.2em] text-warm-gold">
        Loading 3D Volumetric Cross-Section...
      </div>
    ),
  }
);

export function TravelStyleDifficultySection() {
  const { unit } = useInteractive();
  const [selectedJourneyIndex, setSelectedJourneyIndex] = useState(0);

  const selectedJourney = JOURNEYS[selectedJourneyIndex] ?? JOURNEYS[0];

  return (
    <section
      aria-label="Choose by travel style, difficulty grading, and 3D elevation profile"
      className="py-20 sm:py-28 bg-glacier-cream border-b border-midnight-navy/20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col gap-12">
        <SectionHeader
          eyebrow="05 // VOLUMETRIC GRADING & ALTITUDE READINESS"
          title="Choose by travel style and difficulty."
          description="We never blur the line between a heritage road tour and a strenuous glacier crossing. Select any route below to inspect its 3D geological cross-section, camp elevations, and physical readiness criteria."
          actions={
            <Button
              variant="outline-navy"
              size="md"
              href="/travel-guide/trek-difficulty-grades"
            >
              Grading Standard
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 border border-midnight-navy/20 bg-glacier-cream">
          {/* Left 5 Columns: Architectural Route Grade Selector */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-midnight-navy/20 divide-y divide-midnight-navy/15 flex flex-col justify-between">
            {JOURNEYS.slice(0, 5).map((j, idx) => {
              const isSelected = idx === selectedJourneyIndex;
              return (
                <button
                  key={j.id}
                  type="button"
                  onClick={() => setSelectedJourneyIndex(idx)}
                  className={cn(
                    "w-full text-left p-5 sm:p-6 transition-colors cursor-pointer flex flex-col gap-2",
                    isSelected
                      ? "bg-midnight-navy text-glacier-cream"
                      : "bg-glacier-cream text-slate-ink hover:bg-midnight-navy/5"
                  )}
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.16em]">
                    <span
                      className={cn(
                        "px-2 py-0.5 border",
                        isSelected
                          ? "bg-warm-gold text-midnight-navy border-warm-gold font-bold"
                          : "border-midnight-navy/25 text-alpine-teal"
                      )}
                    >
                      0{idx + 1} • {j.grade}
                    </span>
                    <span
                      className={cn(
                        "font-semibold",
                        isSelected ? "text-warm-gold" : "text-midnight-navy/70"
                      )}
                    >
                      MAX {formatAltitude(j.maxAltitudeMeters, unit)} •{" "}
                      {j.durationDays}D
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "font-display text-lg font-semibold mt-0.5",
                      isSelected ? "text-glacier-cream" : "text-midnight-navy"
                    )}
                  >
                    {j.title}
                  </h3>

                  <p
                    className={cn(
                      "text-xs leading-relaxed",
                      isSelected ? "text-glacier-cream/75" : "text-slate-ink/75"
                    )}
                  >
                    {j.requiredExperience}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right 7 Columns: 3D Volumetric Terrain Cross-Section + Suitability Matrix */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-midnight-navy">
            <ElevationProfile3D
              title={selectedJourney.title}
              subtitle={`${selectedJourney.grade} // ${selectedJourney.durationDays} Days // ${selectedJourney.bestSeason}`}
              maxAltitudeMeters={selectedJourney.maxAltitudeMeters}
              stages={selectedJourney.itineraryDays}
              className="border-0"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-glacier-cream/15 divide-y sm:divide-y-0 sm:divide-x divide-glacier-cream/15 bg-midnight-navy text-glacier-cream">
              <div className="p-6 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-warm-gold">
                  Suitability & Experience Profile
                </span>
                <ul className="flex flex-col gap-1.5 text-xs text-glacier-cream/80 mt-1">
                  {selectedJourney.whoFor.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-6 flex flex-col justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-warm-gold">
                    Medical & Acclimatization Standard
                  </span>
                  <p className="text-xs text-glacier-cream/80 mt-1.5 leading-relaxed">
                    {selectedJourney.healthAndAltitudeNotes}
                  </p>
                </div>
                <Link
                  href={selectedJourney.urlPath}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-warm-gold hover:text-glacier-cream uppercase tracking-[0.16em]"
                >
                  Open Complete {selectedJourney.durationDays}-Day Route Dossier
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
