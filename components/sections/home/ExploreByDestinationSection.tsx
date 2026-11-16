"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { DESTINATIONS } from "@/lib/data/destinations";
import type { Destination } from "@/lib/types/cms";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { formatAltitude } from "@/lib/utils";

const KarakoramTerrain3D = dynamic(
  () =>
    import("@/components/spatial/KarakoramTerrain3D").then(
      (mod) => mod.KarakoramTerrain3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[460px] sm:h-[540px] bg-[#06181e] border border-glacier-cream/15 flex items-center justify-center text-[10px] font-mono uppercase tracking-[0.2em] text-warm-gold">
        Initializing High-Resolution Karakoram DEM Relief...
      </div>
    ),
  }
);

export function ExploreByDestinationSection() {
  const [selectedDest, setSelectedDest] = useState<Destination>(DESTINATIONS[0]);
  const { unit, openInquiry } = useInteractive();

  return (
    <section
      aria-label="Explore Gilgit-Baltistan by Destination and 3D Topographic Map"
      className="py-20 sm:py-28 bg-midnight-navy text-glacier-cream border-b border-glacier-cream/15"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col gap-12">
        <SectionHeader
          theme="dark"
          eyebrow="04 // CARTOGRAPHIC DEM & SECTORS"
          title="Explore Gilgit-Baltistan by region."
          description="Orbit the 3D hypsometric terrain relief model to inspect how the Indus and Hunza river gorges, the high Deosai plateau, and the 8,000-meter Baltoro corridor connect geographically."
          actions={
            <Button variant="gold" size="md" href="/destinations">
              All 17 Destinations Hub
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          }
        />

        {/* Architectural 12-Column Split: 3D DEM Relief + Selected Sector Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-glacier-cream/15 bg-slate-ink">
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-glacier-cream/15">
            <KarakoramTerrain3D
              destinations={DESTINATIONS}
              selectedDestination={selectedDest}
              onSelectDestination={setSelectedDest}
              className="border-0"
            />
          </div>

          <aside
            aria-label={`Regional dossier for ${selectedDest.name}`}
            className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-midnight-navy"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-glacier-cream/15">
                <Badge variant="gold" size="sm">
                  {selectedDest.regionGroup}
                </Badge>
                <span className="text-[10px] font-mono text-warm-gold tracking-[0.16em]">
                  {selectedDest.coordinates}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-glacier-cream/55">
                  ACTIVE SECTOR DOSSIER
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-glacier-cream mt-1">
                  {selectedDest.name}
                </h3>
                <p className="text-xs font-mono text-warm-gold mt-1">
                  {selectedDest.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-glacier-cream/80 leading-relaxed">
                {selectedDest.summary}
              </p>

              {/* Architectural Hairline Telemetry Matrix */}
              <dl className="grid grid-cols-2 border border-glacier-cream/15 divide-x divide-y divide-glacier-cream/15 text-xs font-mono">
                <div className="p-3.5">
                  <dt className="text-[9px] uppercase tracking-widest text-glacier-cream/55">
                    High Point
                  </dt>
                  <dd className="font-bold text-warm-gold text-sm mt-1">
                    {formatAltitude(selectedDest.peakElevationMeters, unit)}
                  </dd>
                </div>
                <div className="p-3.5">
                  <dt className="text-[9px] uppercase tracking-widest text-glacier-cream/55">
                    Prime Window
                  </dt>
                  <dd className="font-semibold text-glacier-cream text-sm mt-1 truncate">
                    {selectedDest.bestSeason.split("(")[0].trim()}
                  </dd>
                </div>
                <div className="col-span-2 p-3.5">
                  <dt className="text-[9px] uppercase tracking-widest text-glacier-cream/55">
                    Access & Corridor Logistics
                  </dt>
                  <dd className="text-glacier-cream/85 text-xs font-sans mt-1">
                    {selectedDest.accessSummary}
                  </dd>
                </div>
              </dl>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-warm-gold">
                  Key Landmarks & Approaches
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedDest.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 bg-slate-ink text-[11px] font-mono text-glacier-cream/85 border border-glacier-cream/15"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-glacier-cream/15 flex flex-col gap-4">
              <p className="text-[11px] font-mono text-glacier-cream/65">
                [SAFETY NOTE] {selectedDest.safetyNotes}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="gold" size="sm" href={selectedDest.urlPath}>
                  Sector Guide
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="outline-cream"
                  size="sm"
                  onClick={() =>
                    openInquiry({
                      regionName: selectedDest.name,
                      tripTitle: `Custom Journey in ${selectedDest.name}`,
                    })
                  }
                >
                  Plan Sector
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* 4-Column Architectural Destination Index */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DESTINATIONS.map((dest, idx) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              index={idx}
              isSelected={dest.id === selectedDest.id}
              onSelect={setSelectedDest}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
