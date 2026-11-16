"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { TopographicContourSvg } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { formatAltitude } from "@/lib/utils";

export function WhyGilgitBaltistanSection() {
  const { unit } = useInteractive();
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxShift, setParallaxShift] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setParallaxShift(Math.round((v - 0.5) * 44));
  });

  const stats = [
    {
      code: "01",
      value: "5 OF 14",
      label: "8,000m Summits in Pakistan",
      detail: `Headlined by K2 (${formatAltitude(8611, unit)}), Nanga Parbat, Broad Peak, G-I & G-II.`,
    },
    {
      code: "02",
      value: "3 RANGES",
      label: "Karakoram • Himalaya • Hindu Kush",
      detail: "Meeting at a single tectonic confluence above the Indus River.",
    },
    {
      code: "03",
      value: "7,000+",
      label: "Glaciers Outside Polar Regions",
      detail: "Including the 63km Baltoro, 67km Biafo, and 57km Batura ice highways.",
    },
    {
      code: "04",
      value: "100% LOCAL",
      label: "Balti, Wakhi & Burusho Team",
      detail: "Direct valley-born guides, expedition chefs, and licensed 4x4 fleets.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      aria-label="Why Gilgit-Baltistan and Karakoram brand philosophy"
      className="relative py-20 sm:py-28 bg-midnight-navy text-glacier-cream border-b border-glacier-cream/15 overflow-hidden"
    >
      <div className="absolute inset-x-0 bottom-0 h-80 text-alpine-teal/15 pointer-events-none">
        <TopographicContourSvg />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col gap-14">
        {/* Architectural 12-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-2 h-2 bg-warm-gold" />
              <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-warm-gold">
                02 // WHY GILGIT-BALTISTAN
              </span>
            </div>

            <h2 className="font-display text-[32px] sm:text-[42px] font-semibold leading-[1.08] text-glacier-cream">
              The Karakoram feels vast. The experience should feel personal.
            </h2>

            <p className="text-sm sm:text-base text-glacier-cream/80 leading-relaxed">
              Nowhere else on Earth do four 8,000-meter summits stand within twenty
              kilometers of one another, or 700-year-old Silk Road forts look straight up
              at vertical granite cathedrals. Yet for many international travelers,
              planning a journey to northern Pakistan feels opaque.
            </p>

            <p className="text-xs sm:text-sm text-glacier-cream/70 leading-relaxed border-l-2 border-warm-gold pl-4">
              We built Karakoram — Travel Advocates to replace guesswork with grounded,
              personal stewardship: verified local guides, honest difficulty grading,
              transparent permit timelines, and itineraries paced for genuine connection.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button variant="gold" size="md" href="/why-travel-with-us">
                Our Operational Standard
              </Button>
              <Button variant="outline-cream" size="md" href="/destinations">
                Explore All 17 Valleys
              </Button>
            </div>
          </div>

          {/* Scroll-Driven Opposite-Vector Parallax Triptych (Moodboard p.03) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
            <motion.figure
              animate={{ y: -parallaxShift }}
              transition={{ type: "tween", duration: 0.15, ease: "linear" }}
              className="sm:col-span-7 relative min-h-[360px] sm:min-h-[440px] border border-glacier-cream/20 bg-slate-ink overflow-hidden"
            >
              <Image
                src="/imgs/moodboard/scene-04.png"
                alt="Trekker walking toward snow-clad Karakoram summits"
                fill
                sizes="(max-width: 1024px) 60vw, 35vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-0 inset-x-0 px-4 py-2.5 bg-midnight-navy/90 border-t border-glacier-cream/15 flex items-center justify-between text-[10px] font-mono tracking-[0.16em] uppercase text-warm-gold">
                <span>01 // THE HUMAN JOURNEY</span>
                <span>BIAFO–HISPAR CORRIDOR</span>
              </figcaption>
            </motion.figure>

            <motion.div
              animate={{ y: parallaxShift }}
              transition={{ type: "tween", duration: 0.15, ease: "linear" }}
              className="sm:col-span-5 flex flex-col gap-4 justify-between"
            >
              <figure className="relative h-52 border border-glacier-cream/20 bg-slate-ink overflow-hidden">
                <Image
                  src="/imgs/moodboard/scene-05.png"
                  alt="Calm turquoise mountain lake reflecting Karakoram peaks"
                  fill
                  sizes="(max-width: 1024px) 40vw, 25vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 inset-x-0 px-3 py-2 bg-midnight-navy/90 border-t border-glacier-cream/15 text-[9px] font-mono tracking-[0.16em] uppercase text-glacier-cream">
                  02 // THE STILLNESS — ATTABAD
                </figcaption>
              </figure>

              <figure className="relative h-52 border border-glacier-cream/20 bg-slate-ink overflow-hidden">
                <Image
                  src="/imgs/moodboard/scene-06.png"
                  alt="4x4 vehicle traveling along a mountain road in Gilgit-Baltistan"
                  fill
                  sizes="(max-width: 1024px) 40vw, 25vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 inset-x-0 px-3 py-2 bg-midnight-navy/90 border-t border-glacier-cream/15 text-[9px] font-mono tracking-[0.16em] uppercase text-glacier-cream">
                  03 // THE ROUTE — SKARDU & KKH
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </div>

        {/* 4 Architectural Telemetry Cells */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-glacier-cream/15 divide-y sm:divide-y-0 sm:divide-x divide-glacier-cream/15 bg-slate-ink/50">
          {stats.map((stat) => (
            <div key={stat.code} className="p-6 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-glacier-cream/55">
                <span>METRIC // {stat.code}</span>
                <span className="w-1.5 h-1.5 bg-warm-gold" />
              </div>
              <span className="font-display text-3xl font-semibold text-warm-gold mt-1">
                {stat.value}
              </span>
              <h3 className="text-xs font-mono uppercase tracking-[0.14em] text-glacier-cream font-semibold">
                {stat.label}
              </h3>
              <p className="text-xs text-glacier-cream/70 leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
