"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { JOURNEYS } from "@/lib/data/journeys";
import type { ServicePillar } from "@/lib/types/cms";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JourneyCard } from "@/components/ui/JourneyCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function FeaturedJourneysSection() {
  const [filter, setFilter] = useState<"all" | ServicePillar>("all");

  const filteredJourneys =
    filter === "all"
      ? JOURNEYS
      : JOURNEYS.filter((j) => j.serviceType === filter);

  return (
    <section
      aria-label="Featured Journeys across Gilgit-Baltistan"
      className="py-20 sm:py-28 bg-glacier-cream border-b border-midnight-navy/20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col gap-12">
        <SectionHeader
          eyebrow="03 // SIGNATURE ITINERARIES"
          title="Featured mountain journeys."
          description="Each itinerary includes day-by-day altitude profiles, clear inclusion boundaries, permit coverage, and honest suitability guidance."
          actions={
            <div
              role="tablist"
              aria-label="Filter featured journeys by category"
              className="inline-flex flex-wrap border border-midnight-navy/20 divide-x divide-midnight-navy/20"
            >
              {(
                [
                  { key: "all", label: "All [06]" },
                  { key: "tour", label: "Tours [02]" },
                  { key: "trek", label: "Treks [02]" },
                  { key: "expedition", label: "Climbs [02]" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={cn(
                    "min-h-10 px-4 py-2 text-[10px] font-mono font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer",
                    filter === tab.key
                      ? "bg-midnight-navy text-glacier-cream"
                      : "bg-glacier-cream text-midnight-navy hover:bg-midnight-navy/5"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJourneys.map((journey, index) => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              index={index}
              variant="light"
            />
          ))}
        </div>

        <div className="p-6 border border-midnight-navy/20 bg-midnight-navy/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs font-mono text-slate-ink/85 leading-relaxed">
            <strong className="uppercase tracking-[0.14em] text-midnight-navy mr-2">
              [OPERATIONAL GOVERNANCE]
            </strong>
            All cultural tours and treks can be scheduled privately or joined via
            verified group dates. 7,000m–8,000m climbs require technical resume
            qualification.
          </p>
          <Button variant="navy" size="md" href="/journeys" className="shrink-0">
            Master Journeys Index
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
