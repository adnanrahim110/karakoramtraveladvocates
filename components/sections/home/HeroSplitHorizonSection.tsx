"use client";

import { HERO_LANDMARKS, type PeakLandmark } from "@/lib/data/hero-landmarks";

import { useInteractive } from "@/components/spatial/InteractiveContext";
import { LiquidGlassPeakBar } from "@/components/spatial/LiquidGlassPeakBar";
import { Button } from "@/components/ui/Button";

import { ArrowUpRight } from "lucide-react";
import { useMotionValue, useScroll } from "motion/react";
import dynamic from "next/dynamic";
import React, { useCallback, useRef, useState } from "react";

const HeroKarakoramScene3D = dynamic(
  () =>
    import("@/components/spatial/HeroKarakoramScene3D").then(
      (module) => module.HeroKarakoramScene3D,
    ),
  { ssr: false },
);

export function HeroSplitHorizonSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { openInquiry } = useInteractive();

  const [activeLandmark, setActiveLandmark] = useState<PeakLandmark>(
    HERO_LANDMARKS[0],
  );

  const hoverTelemetry = useMotionValue<{
    altitude: number | null;
    coordinates: string | null;
  }>({ altitude: null, coordinates: null });

  const [resetTrigger, setResetTrigger] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const handleHoverElevation = useCallback(
    (altitude: number | null, coordinates: string | null) => {
      hoverTelemetry.set({ altitude, coordinates });
    },
    [hoverTelemetry],
  );

  const handleResetView = () => {
    setActiveLandmark(HERO_LANDMARKS[0]);
    setResetTrigger((prev) => prev + 1);
  };

  const handleSelectLandmark = (landmark: PeakLandmark) => {
    setActiveLandmark(landmark);
    setResetTrigger((previous) => previous + 1);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Interactive 3D Karakoram Mountain Range Hero"
      className="relative flex h-screen min-h-160 w-full flex-col justify-between overflow-hidden border-b border-midnight-navy/15 bg-linear-to-b from-[#A8CAE2] via-[#D2E4F0] to-[#EAEFF2]"
    >
      <div className="absolute inset-0 z-0 h-full w-full">
        <HeroKarakoramScene3D
          activeLandmark={activeLandmark}
          onSelectLandmark={handleSelectLandmark}
          onHoverElevation={handleHoverElevation}
          scrollProgress={scrollYProgress}
          resetTrigger={resetTrigger}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[24%] bg-linear-to-b from-[#EEF6FB]/58 via-[#E4EFF8]/24 to-transparent"
      />

      <div className="pointer-events-none relative z-20 mx-auto w-full max-w-360 px-4 pt-21 sm:px-8 sm:pt-28">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-alpine-teal">
            <span className="h-1.5 w-1.5 bg-warm-gold" />
            <span>GILGIT-BALTISTAN • KARAKORAM • HIMALAYA • HINDU KUSH</span>
          </div>

          <h1 className="mt-1.5 font-display text-2xl font-semibold leading-[1.08] tracking-tight text-midnight-navy sm:text-3xl lg:text-[38px]">
            Find Your Next Mountain Journey
          </h1>

          <p className="mt-1.5 max-w-lg text-[11px] leading-relaxed text-midnight-navy/80 sm:text-xs">
            Private cultural journeys, guided Baltoro glacier treks, and
            mountaineering objectives shaped around your experience.
          </p>

          <div className="pointer-events-auto mt-3.5 flex items-center justify-center gap-2.5">
            <Button variant="secondary" size="sm" href="#journeys">
              <span>Explore Journeys</span>
              <ArrowUpRight
                className="h-3 w-3 text-warm-gold"
                aria-hidden="true"
              />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => openInquiry()}
              className="bg-glacier-cream/85 backdrop-blur-xs"
            >
              <span>Tailor a Trip</span>
            </Button>
          </div>
        </div>
      </div>

      <LiquidGlassPeakBar
        activeLandmark={activeLandmark}
        onSelectLandmark={handleSelectLandmark}
        hoverTelemetry={hoverTelemetry}
        onResetView={handleResetView}
      />
    </section>
  );
}
