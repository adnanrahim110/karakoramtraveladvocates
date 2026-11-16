"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SAFETY_PILLARS } from "@/lib/data/guides-reviews";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SafetyInstrument3D = dynamic(
  () =>
    import("@/components/spatial/SafetyInstrument3D").then(
      (mod) => mod.SafetyInstrument3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[420px] bg-[#06181e] border border-glacier-cream/15 flex items-center justify-center text-[10px] font-mono uppercase tracking-[0.2em] text-warm-gold">
        Initializing 3D Barometric Safety Matrix...
      </div>
    ),
  }
);

export function SafetyApproachSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      aria-label="Safety, altitude acclimatization, and risk management protocols"
      className="py-20 sm:py-28 bg-midnight-navy text-glacier-cream border-b border-glacier-cream/15"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col gap-12">
        <SectionHeader
          theme="dark"
          eyebrow="09 // SAFETY & RISK ARCHITECTURE"
          title="Prepared for altitude, weather, and remote terrain."
          description="High mountains carry inherent risk. Inspect our 3D barometric and satellite safety matrix to review our acclimatization protocols, redundant satellite links, and realistic flight/evacuation boundaries."
          actions={
            <Button variant="gold" size="md" href="/safety">
              Safety & Risk Hub
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          }
        />

        {/* Architectural 12-Column Split: 3D Barometric Safety Instrument + 4 Protocol Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-glacier-cream/15 bg-slate-ink">
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-glacier-cream/15">
            <SafetyInstrument3D
              activeIndex={activeIndex}
              onSelectIndex={setActiveIndex}
              className="border-0 h-full min-h-[380px]"
            />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-glacier-cream/15">
            <div className="divide-y divide-glacier-cream/15 flex flex-col">
              {SAFETY_PILLARS.slice(0, 2).map((pillar, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <article
                    key={pillar.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "p-6 sm:p-8 flex-1 flex flex-col justify-between gap-5 transition-colors cursor-pointer",
                      isSelected ? "bg-slate-ink" : "bg-midnight-navy hover:bg-slate-ink/60"
                    )}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em]">
                        <span className="text-warm-gold font-bold">
                          PROTOCOL 0{idx + 1}
                        </span>
                        <span className="px-2 py-0.5 border border-warm-gold/40 text-warm-gold">
                          {pillar.metric}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-glacier-cream">
                        <Link href={pillar.href}>{pillar.title}</Link>
                      </h3>
                      <p className="text-xs text-glacier-cream/75 leading-relaxed">
                        {pillar.summary}
                      </p>
                    </div>
                    <Link
                      href={pillar.href}
                      className="pt-3 border-t border-glacier-cream/15 inline-flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-warm-gold hover:text-glacier-cream"
                    >
                      Read Standard Operating Procedure
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </article>
                );
              })}
            </div>

            <div className="divide-y divide-glacier-cream/15 flex flex-col border-t sm:border-t-0 border-glacier-cream/15">
              {SAFETY_PILLARS.slice(2, 4).map((pillar, offset) => {
                const idx = offset + 2;
                const isSelected = activeIndex === idx;
                return (
                  <article
                    key={pillar.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "p-6 sm:p-8 flex-1 flex flex-col justify-between gap-5 transition-colors cursor-pointer",
                      isSelected ? "bg-slate-ink" : "bg-midnight-navy hover:bg-slate-ink/60"
                    )}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em]">
                        <span className="text-warm-gold font-bold">
                          PROTOCOL 0{idx + 1}
                        </span>
                        <span className="px-2 py-0.5 border border-warm-gold/40 text-warm-gold">
                          {pillar.metric}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-glacier-cream">
                        <Link href={pillar.href}>{pillar.title}</Link>
                      </h3>
                      <p className="text-xs text-glacier-cream/75 leading-relaxed">
                        {pillar.summary}
                      </p>
                    </div>
                    <Link
                      href={pillar.href}
                      className="pt-3 border-t border-glacier-cream/15 inline-flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-warm-gold hover:text-glacier-cream"
                    >
                      Read Standard Operating Procedure
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-5 border border-warm-gold/35 bg-slate-ink/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-glacier-cream/80">
          <p className="leading-relaxed">
            <strong className="text-warm-gold uppercase tracking-[0.16em] mr-2">
              [MANDATORY EVACUATION & MEDICAL DISCLOSURE]
            </strong>
            Helicopter rescue in Gilgit-Baltistan depends on visual flight weather and
            aviation ceilings—no operator can guarantee air evacuation during storms.
          </p>
          <Link
            href="/legal/adventure-risk-disclosure"
            className="shrink-0 text-warm-gold underline underline-offset-4 hover:text-glacier-cream uppercase tracking-wider"
          >
            Risk Disclosure →
          </Link>
        </div>
      </div>
    </section>
  );
}
