"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { UPCOMING_DEPARTURES } from "@/lib/data/departures";
import type { ServicePillar } from "@/lib/types/cms";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { cn, formatAltitude } from "@/lib/utils";

export function UpcomingDeparturesSection() {
  const { unit, openInquiry } = useInteractive();
  const [selectedType, setSelectedType] = useState<"all" | ServicePillar>("all");

  const filtered =
    selectedType === "all"
      ? UPCOMING_DEPARTURES
      : UPCOMING_DEPARTURES.filter((d) => d.serviceType === selectedType);

  return (
    <section
      aria-label="Upcoming verified group departures"
      className="py-20 sm:py-28 bg-glacier-cream border-b border-midnight-navy/20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col gap-12">
        <SectionHeader
          eyebrow="06 // VERIFIED 2027 DISPATCH SCHEDULE"
          title="Scheduled small-group departures."
          description="Only operationally confirmed dates are published below. Never artificial urgency—each row lists its CKNP permit cutoff date, group size cap, and current seat ledger."
          actions={
            <div className="inline-flex flex-wrap border border-midnight-navy/20 divide-x divide-midnight-navy/20">
              {(
                [
                  { key: "all", label: "All" },
                  { key: "tour", label: "Tours" },
                  { key: "trek", label: "Treks" },
                  { key: "expedition", label: "Climbs" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedType(tab.key)}
                  className={cn(
                    "min-h-10 px-4 py-2 text-[10px] font-mono font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer",
                    selectedType === tab.key
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

        {/* Architectural Ledger Table */}
        <div className="border border-midnight-navy/20 divide-y divide-midnight-navy/15 bg-glacier-cream">
          {/* Desktop Column Headers */}
          <div className="hidden lg:grid lg:grid-cols-12 px-6 py-3 bg-midnight-navy text-glacier-cream text-[10px] font-mono uppercase tracking-[0.18em]">
            <div className="col-span-3">Departure & Cutoff Window</div>
            <div className="col-span-4">Route Title & Elevation</div>
            <div className="col-span-2">Status & Capacity</div>
            <div className="col-span-3 text-right">Tariff (USD) & Action</div>
          </div>

          {filtered.map((dep, idx) => {
            const statusVariant =
              dep.status === "Confirmed"
                ? "teal"
                : dep.status === "Limited"
                ? "gold"
                : "navy";

            return (
              <article
                key={dep.id}
                className="p-5 sm:p-6 hover:bg-midnight-navy/5 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
              >
                <div className="lg:col-span-3 flex items-start gap-4">
                  <span className="text-xs font-mono text-alpine-teal font-bold pt-0.5">
                    0{idx + 1}
                  </span>
                  <div className="font-mono">
                    <div className="text-xs font-bold text-midnight-navy">
                      <time dateTime={dep.startDate}>{dep.startDate}</time> →{" "}
                      <time dateTime={dep.endDate}>{dep.endDate}</time>
                    </div>
                    <div className="text-[11px] text-slate-ink/75 mt-0.5">
                      {dep.durationDays} Days // {dep.regionName}
                    </div>
                    <div className="text-[10px] text-slate-ink/60 uppercase tracking-wider mt-0.5">
                      Cutoff: {dep.bookingDeadline}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.14em] text-alpine-teal">
                    <span>{dep.grade}</span>
                    <span>•</span>
                    <span>MAX {formatAltitude(dep.maxAltitudeMeters, unit)}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-midnight-navy hover:text-alpine-teal transition-colors">
                    <Link href={dep.journeyUrl}>{dep.journeyTitle}</Link>
                  </h3>
                  <p className="text-xs text-slate-ink/75">{dep.notes}</p>
                </div>

                <div className="lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-start justify-between gap-1.5">
                  <Badge variant={statusVariant} size="sm">
                    {dep.status}
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-ink/75">
                    Cap: {dep.capacity} ({dep.remainingSeats} open)
                  </span>
                </div>

                <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-5 pt-3 lg:pt-0 border-t lg:border-t-0 border-midnight-navy/15">
                  <div className="text-left lg:text-right font-mono">
                    <span className="block text-[9px] uppercase tracking-widest text-slate-ink/60">
                      Tariff ({dep.currency})
                    </span>
                    <span className="text-base font-bold text-midnight-navy">
                      ${dep.priceUsd.toLocaleString("en-US")}
                    </span>
                    <span className="block text-[10px] text-slate-ink/60">
                      Deposit: ${dep.depositUsd}
                    </span>
                  </div>

                  <Button
                    variant={
                      dep.serviceType === "expedition" ? "outline-navy" : "navy"
                    }
                    size="sm"
                    onClick={() =>
                      openInquiry({
                        tripTitle: `${dep.journeyTitle} (${dep.startDate})`,
                        tripSlug: dep.journeySlug,
                        serviceType: dep.serviceType,
                        preferredDates: `${dep.startDate} to ${dep.endDate}`,
                      })
                    }
                  >
                    {dep.serviceType === "expedition" ? "Apply" : "Reserve"}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="p-6 bg-midnight-navy text-glacier-cream border border-midnight-navy flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-warm-gold">
              PRIVATE CHARTER ALTERNATIVE
            </span>
            <h4 className="font-display text-xl font-semibold mt-0.5">
              Need custom dates for your party? Run any tour or trek privately.
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button variant="gold" size="sm" href="/departures">
              Full Schedule
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline-cream"
              size="sm"
              href="/private-vs-group-travel"
            >
              Private vs. Group Comparison
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
