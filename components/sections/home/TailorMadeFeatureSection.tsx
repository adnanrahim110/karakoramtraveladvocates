"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TopographicContourSvg } from "@/components/ui/BrandIcons";
import { useInteractive } from "@/components/spatial/InteractiveContext";

const STEPS = [
  {
    step: "01",
    code: "BRIEF & WINDOW",
    title: "Share Your Window & Ambition",
    summary:
      "Tell us when you want to travel, who is in your party, your comfort preferences, and whether you want scenic 4x4 exploration, village hikes, or glacier trekking.",
  },
  {
    step: "02",
    code: "ROUTE ARCHITECTURE",
    title: "1-on-1 Specialist Consultation",
    summary:
      "Speak directly with a Hunza or Skardu specialist who maps realistic driving distances, flight weather buffers, and seasonal highlights—never a copy-paste template.",
  },
  {
    step: "03",
    code: "COSTED PROPOSAL",
    title: "Verified Itinerary & Transparent Quote",
    summary:
      "Receive a private day-by-day digital proposal with named heritage hotels/camps, itemized inclusions, and clear USD pricing before committing a deposit.",
  },
  {
    step: "04",
    code: "PERMITS & EXECUTION",
    title: "Visa LOI, Permits & On-Ground Care",
    summary:
      "We issue your official NADRA Visa Letter of Invitation, secure all regional permits, and greet you at Islamabad, Gilgit, or Skardu airport.",
  },
];

export function TailorMadeFeatureSection() {
  const { openInquiry } = useInteractive();

  return (
    <section
      aria-label="Tailor-made and private custom journeys"
      className="py-20 sm:py-28 bg-glacier-cream border-b border-midnight-navy/20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="relative bg-midnight-navy text-glacier-cream border border-midnight-navy grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          <div className="absolute inset-0 text-warm-gold/10 pointer-events-none">
            <TopographicContourSvg />
          </div>

          <div className="relative lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-glacier-cream/15 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-3">
                <span className="w-2 h-2 bg-warm-gold" />
                <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-warm-gold">
                  07 // BESPOKE PRIVATE TRAVEL
                </span>
              </div>

              <h2 className="font-display text-[32px] sm:text-[40px] font-semibold leading-[1.08] text-glacier-cream">
                Tailor-made journeys built around your pace.
              </h2>

              <p className="text-sm text-glacier-cream/80 leading-relaxed">
                Pair four nights at Shigar Fort and Khaplu Palace with a private boat
                crossing on Attabad Lake and a two-day hike to Patundas Meadow. Our
                planners architect multi-valley routes with your own Toyota Prado 4x4
                and dedicated historian-guide.
              </p>

              <figure className="relative h-52 border border-glacier-cream/20 overflow-hidden bg-slate-ink">
                <Image
                  src="/imgs/moodboard/scene-10.png"
                  alt="Private 4x4 vehicle on a scenic mountain road in Gilgit-Baltistan"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 inset-x-0 px-3 py-2 bg-midnight-navy/90 border-t border-glacier-cream/15 text-[9px] font-mono uppercase tracking-[0.16em] text-warm-gold">
                  PRIVATE 4X4 FLEET + NATIVE HISTORIAN / TREK LEADER
                </figcaption>
              </figure>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button variant="gold" size="md" href="/plan-my-trip">
                Start Trip Planner
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline-cream"
                size="md"
                onClick={() =>
                  openInquiry({
                    tripTitle: "Bespoke Private Gilgit-Baltistan Journey",
                    serviceType: "tour",
                  })
                }
              >
                Direct Consultation
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-glacier-cream/15">
            <div className="divide-y divide-glacier-cream/15 flex flex-col justify-between">
              {STEPS.slice(0, 2).map((item) => (
                <div
                  key={item.step}
                  className="p-8 sm:p-10 flex-1 flex flex-col justify-between gap-6 bg-midnight-navy/85 hover:bg-slate-ink/80 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.18em] uppercase text-warm-gold">
                    <span>STAGE {item.step}</span>
                    <span>{item.code}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-glacier-cream">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-glacier-cream/75 leading-relaxed mt-3">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="divide-y divide-glacier-cream/15 flex flex-col justify-between border-t sm:border-t-0 border-glacier-cream/15">
              {STEPS.slice(2, 4).map((item) => (
                <div
                  key={item.step}
                  className="p-8 sm:p-10 flex-1 flex flex-col justify-between gap-6 bg-midnight-navy/85 hover:bg-slate-ink/80 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.18em] uppercase text-warm-gold">
                    <span>STAGE {item.step}</span>
                    <span>{item.code}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-glacier-cream">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-glacier-cream/75 leading-relaxed mt-3">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
