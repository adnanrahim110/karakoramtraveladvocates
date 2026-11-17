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
      className="relative flex h-svh min-h-140 w-full flex-col justify-between overflow-hidden border-b border-midnight-navy/15 bg-linear-to-b from-[#A8CAE2] via-[#D2E4F0] to-[#EAEFF2] sm:min-h-160 lg:h-screen"
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
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-60 bg-linear-to-b from-[#EEF6FB]/75 via-[#E4EFF8]/35 to-transparent sm:h-[28%] sm:from-[#EEF6FB]/58 sm:via-[#E4EFF8]/24 lg:h-[24%]"
      />

      <div className="pointer-events-none relative z-20 mx-auto w-full max-w-360 px-4 pt-18 sm:px-8 sm:pt-28">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="inline-flex max-w-full items-center justify-center gap-2 font-mono text-[8px] font-semibold uppercase leading-snug tracking-widest text-alpine-teal min-[400px]:text-[9px] min-[400px]:tracking-[0.14em] sm:tracking-[0.22em]">
            <span className="hidden size-1 shrink-0 bg-warm-gold min-[360px]:inline-block sm:size-2" />
            <span className="text-balance">
              GILGIT-BALTISTAN • KARAKORAM • HIMALAYA • HINDU KUSH
            </span>
          </div>

          <h1 className="mt-1 text-balance font-display text-xl font-semibold leading-[1.08] tracking-tight text-midnight-navy min-[380px]:text-2xl sm:mt-2 sm:text-3xl lg:text-[38px]">
            Find Your Next Mountain Journey
          </h1>

          <p className="mt-1 max-w-md text-pretty text-[11px] leading-snug text-midnight-navy/80 sm:mt-2 sm:max-w-lg sm:text-xs sm:leading-relaxed">
            Private cultural journeys, guided Baltoro glacier treks, and
            mountaineering objectives shaped around your experience.
          </p>

          <div className="pointer-events-auto mt-3 flex w-full max-w-md flex-wrap items-center justify-center gap-2 sm:mt-4 sm:w-auto sm:max-w-none sm:gap-3">
            <Button
              variant="secondary"
              size="sm"
              href="#journeys"
              className="whitespace-nowrap max-lg:min-h-10 px-3 text-[10px] tracking-[0.12em] min-[380px]:px-4 min-[380px]:text-[11px] sm:tracking-[0.16em]"
            >
              <span>Explore Journeys</span>
              <ArrowUpRight
                className="h-3 w-3 shrink-0 text-warm-gold"
                aria-hidden="true"
              />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => openInquiry()}
              className="whitespace-nowrap max-lg:min-h-10 bg-glacier-cream/85 px-3 text-[10px] tracking-[0.12em] backdrop-blur-xs min-[380px]:px-4 min-[380px]:text-[11px] sm:tracking-[0.16em]"
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
