"use client";

import React from "react";
import Link from "next/link";
import { CalendarCheck, Compass, PhoneCall, Ruler } from "lucide-react";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { cn } from "@/lib/utils";

export function AnnouncementBar() {
  const { unit, toggleUnit } = useInteractive();

  return (
    <div
      role="region"
      aria-label="Seasonal operational update and site preferences"
      className="bg-midnight-navy text-glacier-cream border-b border-glacier-cream/10 text-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-10 py-2 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Verified Operational Status */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-warm-gold/20 text-warm-gold font-semibold uppercase tracking-wider text-[10px]">
            <CalendarCheck className="w-3 h-3" aria-hidden="true" />
            2027 Season Open
          </span>
          <span className="text-glacier-cream/85 hidden md:inline">
            Spring Blossom (Apr) & CKNP Baltoro / K2 Base Camp permit dossiers now accepting applications.
          </span>
          <Link
            href="/departures"
            className="text-warm-gold font-semibold underline underline-offset-4 hover:text-glacier-cream transition-colors"
          >
            View Verified Dates
          </Link>
        </div>

        {/* Right: Unit Toggle, Currency Transparency & Specialist Link */}
        <div className="flex items-center gap-4 ml-auto">
          <button
            type="button"
            onClick={toggleUnit}
            aria-label={`Switch elevation and distance units. Currently ${unit}`}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-glacier-cream/20 hover:border-warm-gold text-glacier-cream/90 hover:text-warm-gold transition-colors cursor-pointer"
            )}
          >
            <Ruler className="w-3.5 h-3.5 text-warm-gold" aria-hidden="true" />
            <span className="font-mono font-semibold uppercase text-[11px]">
              {unit === "metric" ? "Metric (m / km)" : "Imperial (ft / mi)"}
            </span>
          </button>

          <span
            className="hidden sm:inline-flex items-center gap-1 text-glacier-cream/70 font-mono text-[11px]"
            title="All published starting prices in USD; transparent exchange & invoice terms provided prior to deposit."
          >
            <Compass className="w-3.5 h-3.5 text-alpine-teal" aria-hidden="true" />
            USD Pricing
          </span>

          <Link
            href="/schedule-call"
            className="hidden lg:inline-flex items-center gap-1.5 text-glacier-cream/90 hover:text-warm-gold font-medium transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-warm-gold" aria-hidden="true" />
            Speak with a Gilgit-Baltistan Specialist
          </Link>
        </div>
      </div>
    </div>
  );
}
