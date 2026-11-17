"use client";

import { PointerSurface } from "@/components/motion/PointerSurface";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { InquiryButton } from "@/components/ui/InquiryButton";
import {
  journeyKindLabels,
  type JourneyKind,
  type TravelJourney,
} from "@/lib/data/travel-content";
import { useReducedMotionPreference } from "@/lib/motion/preferences";
import { useHeroAutoplay } from "@/lib/motion/use-hero-autoplay";
import { cn, formatAltitude } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const SLIDE_DURATION_MS = 6000;

interface SpotlightState {
  activeIndex: number;
  prevIndex: number | null;
}

function formatCounter(value: number) {
  return String(value).padStart(2, "0");
}

function shortRegionLabel(journey: TravelJourney, kind: JourneyKind) {
  const firstSegment = journey.region.split(/[,&]/)[0]?.trim() ?? journey.region;
  if (kind === "expedition") {
    return `${journey.title.split(/[/ ]/)[0]} ${journey.maxAltitude}m`;
  }
  return firstSegment;
}

export function JourneySpotlightHeroSection({
  kind,
  journeys,
}: {
  kind: JourneyKind;
  journeys: readonly TravelJourney[];
}) {
  const { unit } = useInteractive();
  const reducedMotion = useReducedMotionPreference();

  const [state, setState] = useState<SpotlightState>({
    activeIndex: 0,
    prevIndex: null,
  });

  const slideRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const contentRef = useRef<HTMLDivElement | null>(null);

  const totalSlides = journeys.length;
  const safeActiveIndex =
    totalSlides > 0 ? state.activeIndex % totalSlides : 0;
  const safePrevIndex =
    state.prevIndex !== null && totalSlides > 0
      ? state.prevIndex % totalSlides
      : null;

  const setSlideRef = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      if (node) {
        slideRefs.current.set(index, node);
      } else {
        slideRefs.current.delete(index);
      }
    },
    [],
  );

  const selectSlide = useCallback(
    (nextIndex: number) => {
      if (totalSlides <= 1) return;
      setState((prev) => {
        const current = prev.activeIndex % totalSlides;
        if (nextIndex === current) return prev;
        return {
          activeIndex: nextIndex % totalSlides,
          prevIndex: current,
        };
      });
    },
    [totalSlides],
  );

  const advanceSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setState((prev) => ({
      activeIndex: (prev.activeIndex + 1) % totalSlides,
      prevIndex: prev.activeIndex % totalSlides,
    }));
  }, [totalSlides]);

  const { progressBarRef, containerHandlers } = useHeroAutoplay({
    activeIndex: safeActiveIndex,
    totalSlides,
    durationMs: SLIDE_DURATION_MS,
    reducedMotion,
    onAdvance: advanceSlide,
  });

  useEffect(() => {
    if (
      reducedMotion ||
      safePrevIndex === null ||
      safePrevIndex === safeActiveIndex
    ) {
      return;
    }

    const animations: Animation[] = [];
    const incomingEl = slideRefs.current.get(safeActiveIndex);
    const outgoingEl = slideRefs.current.get(safePrevIndex);

    if (kind === "expedition") {
      const ascentEasing = "cubic-bezier(0.16, 1, 0.3, 1)";
      if (incomingEl) {
        animations.push(
          incomingEl.animate(
            [
              {
                clipPath: "inset(100% 0 0 0)",
                transform: "scale(1.1) translate3d(0, 5%, 0)",
                filter: "brightness(0.75)",
              },
              {
                clipPath: "inset(0 0 0 0%)",
                transform: "scale(1) translate3d(0, 0, 0)",
                filter: "brightness(1)",
              },
            ],
            {
              duration: 1100,
              easing: ascentEasing,
              fill: "both",
            },
          ),
        );
      }
      if (outgoingEl) {
        animations.push(
          outgoingEl.animate(
            [
              {
                transform: "scale(1) translate3d(0, 0, 0)",
                filter: "brightness(1)",
              },
              {
                transform: "scale(1.03) translate3d(0, -3%, 0)",
                filter: "brightness(0.6)",
              },
            ],
            {
              duration: 1100,
              easing: ascentEasing,
              fill: "both",
            },
          ),
        );
      }
    } else {
      const dissolveEasing = "cubic-bezier(0.22, 1, 0.36, 1)";
      if (incomingEl) {
        animations.push(
          incomingEl.animate(
            [
              {
                opacity: 0,
                transform: "scale(1.14)",
                filter: "blur(8px) brightness(0.8)",
              },
              {
                opacity: 1,
                transform: "scale(1)",
                filter: "blur(0px) brightness(1)",
              },
            ],
            {
              duration: 1000,
              easing: dissolveEasing,
              fill: "both",
            },
          ),
        );
      }
      if (outgoingEl) {
        animations.push(
          outgoingEl.animate(
            [
              {
                opacity: 1,
                transform: "scale(1)",
              },
              {
                opacity: 0,
                transform: "scale(0.98)",
              },
            ],
            {
              duration: 900,
              easing: dissolveEasing,
              fill: "both",
            },
          ),
        );
      }
    }

    const contentEl = contentRef.current;
    if (contentEl) {
      const revealNodes = contentEl.querySelectorAll<HTMLElement>(
        "[data-slide-reveal]",
      );
      revealNodes.forEach((node, idx) => {
        animations.push(
          node.animate(
            [
              {
                opacity: 0,
                transform: "translate3d(0, 18px, 0)",
                filter: "blur(4px)",
              },
              {
                opacity: 1,
                transform: "translate3d(0, 0, 0)",
                filter: "blur(0px)",
              },
            ],
            {
              duration: 750,
              delay: idx * 70,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              fill: "both",
            },
          ),
        );
      });
    }

    return () => {
      for (const anim of animations) {
        anim.cancel();
      }
    };
  }, [kind, safeActiveIndex, safePrevIndex, reducedMotion]);

  if (totalSlides === 0) {
    return null;
  }

  const activeJourney = journeys[safeActiveIndex];
  const ctaLabel =
    kind === "expedition"
      ? "Explore objective"
      : kind === "tour"
        ? "Explore tour"
        : "Explore route";

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby="journey-catalog-hero-title"
      {...containerHandlers}
      className="relative isolate overflow-hidden border-b border-glacier-cream/15 bg-midnight-navy pt-20 text-glacier-cream lg:pt-22"
    >
      <h1 id="journey-catalog-hero-title" className="sr-only">
        {journeyKindLabels[kind]} in Northern Pakistan
      </h1>

      <p role="status" aria-live="polite" className="sr-only">
        {journeyKindLabels[kind]} {safeActiveIndex + 1} of {totalSlides}:{" "}
        {activeJourney.title}, {activeJourney.region},{" "}
        {activeJourney.durationDays} days
      </p>

      <PointerSurface
        strength={20}
        className="relative isolate flex min-h-[calc(100svh-80px)] flex-col justify-end overflow-hidden lg:min-h-[calc(100svh-88px)]"
      >
        <div
          data-pointer-layer=""
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 -z-20 overflow-hidden"
        >
          {journeys.map((journey, index) => {
            const isActive = index === safeActiveIndex;
            const isPrev = index === safePrevIndex;
            return (
              <div
                key={journey.slug}
                ref={setSlideRef(index)}
                className={cn(
                  "absolute inset-0 will-change-[transform,opacity,clip-path,filter]",
                  isActive
                    ? "z-20 opacity-100"
                    : isPrev
                      ? "z-10 opacity-100"
                      : "pointer-events-none z-0 opacity-0",
                )}
              >
                <Image
                  src={journey.image.src}
                  alt={journey.title}
                  fill
                  preload={index === 0}
                  quality={90}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-midnight-navy/85 via-midnight-navy/25 to-transparent"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-400 items-end gap-8 px-6 pt-24 pb-10 sm:px-10 sm:pb-12 lg:grid-cols-12 lg:px-16 lg:pb-14">
          <div ref={contentRef} className="min-w-0 lg:col-span-7">
            <p
              data-slide-reveal=""
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.2em] text-warm-gold uppercase drop-shadow-[0_1px_12px_rgba(11,44,54,0.85)]"
            >
              <span>{activeJourney.region}</span>
              <span aria-hidden="true" className="text-glacier-cream/50">
                ·
              </span>
              <span>{activeJourney.durationDays} days</span>
              <span aria-hidden="true" className="text-glacier-cream/50">
                ·
              </span>
              <span>{formatAltitude(activeJourney.maxAltitude, unit)}</span>
            </p>

            <h2
              data-slide-reveal=""
              className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-glacier-cream drop-shadow-[0_2px_18px_rgba(11,44,54,0.75)] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {activeJourney.title}
            </h2>

            <p
              data-slide-reveal=""
              className="mt-4 line-clamp-2 max-w-xl font-editorial text-lg leading-relaxed text-glacier-cream/95 drop-shadow-[0_2px_16px_rgba(11,44,54,0.8)] sm:text-xl"
            >
              {activeJourney.summary}
            </p>

            <div
              data-slide-reveal=""
              className="mt-6 flex flex-wrap items-center"
            >
              <InquiryButton variant="light" href={activeJourney.href}>
                {ctaLabel}
              </InquiryButton>
            </div>
          </div>

          {totalSlides > 1 ? (
            <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-[0.2em] text-glacier-cream/90 tabular-nums drop-shadow-[0_1px_10px_rgba(11,44,54,0.85)]">
                  {formatCounter(safeActiveIndex + 1)} /{" "}
                  {formatCounter(totalSlides)}
                </span>
                <span
                  aria-hidden="true"
                  className="h-0.5 w-12 overflow-hidden bg-glacier-cream/20"
                >
                  <span
                    ref={progressBarRef}
                    className={cn(
                      "block h-full w-full origin-left bg-warm-gold",
                      reducedMotion ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </span>
              </div>

              <div
                role="group"
                aria-label={`Select ${journeyKindLabels[kind].toLowerCase()} spotlight`}
                className="flex flex-wrap gap-2 lg:justify-end"
              >
                {journeys.map((journey, index) => {
                  const isActive = index === safeActiveIndex;
                  return (
                    <button
                      key={journey.slug}
                      type="button"
                      onClick={() => selectSlide(index)}
                      aria-pressed={isActive}
                      className={cn(
                        "inline-flex min-h-11 cursor-pointer items-center gap-2 border px-4 py-2 text-xs font-medium tracking-wide backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-gold motion-reduce:transition-none",
                        isActive
                          ? "border-warm-gold bg-warm-gold text-midnight-navy"
                          : "border-glacier-cream/25 bg-midnight-navy/35 text-glacier-cream/90 hover:border-warm-gold/70 hover:text-glacier-cream",
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[11px] tabular-nums",
                          isActive ? "text-midnight-navy" : "text-warm-gold",
                        )}
                      >
                        {formatCounter(index + 1)}
                      </span>
                      <span>{shortRegionLabel(journey, kind)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </PointerSurface>
    </section>
  );
}
