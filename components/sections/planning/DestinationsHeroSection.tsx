"use client";

import { PointerSurface } from "@/components/motion/PointerSurface";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { travelDestinations } from "@/lib/data/destination-content";
import { useReducedMotionPreference } from "@/lib/motion/preferences";
import { useHeroAutoplay } from "@/lib/motion/use-hero-autoplay";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const SLIDE_DURATION_MS = 6000;

interface FocusState {
  activeIndex: number;
  prevIndex: number | null;
}

function formatCounter(value: number) {
  return String(value).padStart(2, "0");
}

function shortValleyName(name: string) {
  const first = name.split(/ [&/]/)[0]?.trim() ?? name;
  return first.replace(" Plains", "").replace(" Valley", "");
}

export function DestinationsHeroSection() {
  const reducedMotion = useReducedMotionPreference();
  const destinations = travelDestinations;

  const [state, setState] = useState<FocusState>({
    activeIndex: 0,
    prevIndex: null,
  });

  const slideRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const contentRef = useRef<HTMLDivElement | null>(null);

  const totalSlides = destinations.length;
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

  const selectDestination = useCallback(
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

  const advanceDestination = useCallback(() => {
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
    onAdvance: advanceDestination,
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
    const focusEasing = "cubic-bezier(0.22, 1, 0.36, 1)";
    const incomingEl = slideRefs.current.get(safeActiveIndex);
    const outgoingEl = slideRefs.current.get(safePrevIndex);

    if (incomingEl) {
      animations.push(
        incomingEl.animate(
          [
            {
              opacity: 0,
              filter: "blur(10px) brightness(0.7)",
              transform: "scale(1.08)",
            },
            {
              opacity: 1,
              filter: "blur(0px) brightness(1)",
              transform: "scale(1)",
            },
          ],
          {
            duration: 1050,
            easing: focusEasing,
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
              filter: "blur(0px) brightness(1)",
              transform: "scale(1)",
            },
            {
              opacity: 0,
              filter: "blur(4px) brightness(0.65)",
              transform: "scale(1.03)",
            },
          ],
          {
            duration: 950,
            easing: focusEasing,
            fill: "both",
          },
        ),
      );
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
              duration: 700,
              delay: idx * 60,
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
  }, [safeActiveIndex, safePrevIndex, reducedMotion]);

  if (totalSlides === 0) {
    return null;
  }

  const activeDestination = destinations[safeActiveIndex];

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby="destinations-hero-title"
      {...containerHandlers}
      className="relative isolate overflow-hidden border-b border-glacier-cream/15 bg-midnight-navy pt-20 text-glacier-cream lg:pt-22"
    >
      <h1 id="destinations-hero-title" className="sr-only">
        Destinations in Northern Pakistan
      </h1>

      <p role="status" aria-live="polite" className="sr-only">
        Destination {safeActiveIndex + 1} of {totalSlides}:{" "}
        {activeDestination.name}, {activeDestination.region},{" "}
        {activeDestination.season}
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
          {destinations.map((destination, index) => {
            const isActive = index === safeActiveIndex;
            const isPrev = index === safePrevIndex;
            return (
              <div
                key={destination.slug}
                ref={setSlideRef(index)}
                className={cn(
                  "absolute inset-0 will-change-[transform,opacity,filter]",
                  isActive
                    ? "z-20 opacity-100"
                    : isPrev
                      ? "z-10 opacity-100"
                      : "pointer-events-none z-0 opacity-0",
                )}
              >
                <Image
                  src={destination.image.src}
                  alt={destination.image.alt}
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
              <span>{activeDestination.region}</span>
              <span aria-hidden="true" className="text-glacier-cream/50">
                ·
              </span>
              <span>{activeDestination.season}</span>
              <span aria-hidden="true" className="text-glacier-cream/50">
                ·
              </span>
              <span>{activeDestination.suggestedStay}</span>
            </p>

            <h2
              data-slide-reveal=""
              className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-glacier-cream drop-shadow-[0_2px_18px_rgba(11,44,54,0.75)] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {activeDestination.name}
            </h2>

            <p
              data-slide-reveal=""
              className="mt-4 line-clamp-2 max-w-xl font-editorial text-lg leading-relaxed text-glacier-cream/95 drop-shadow-[0_2px_16px_rgba(11,44,54,0.8)] sm:text-xl"
            >
              {activeDestination.summary}
            </p>

            <div
              data-slide-reveal=""
              className="mt-6 flex flex-wrap items-center"
            >
              <InquiryButton variant="light" href={activeDestination.href}>
                Explore {activeDestination.name}
              </InquiryButton>
            </div>
          </div>

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
              aria-label="Select northern destination"
              className="flex flex-wrap gap-2 lg:justify-end"
            >
              {destinations.map((destination, index) => {
                const isActive = index === safeActiveIndex;
                return (
                  <button
                    key={destination.slug}
                    type="button"
                    onClick={() => selectDestination(index)}
                    aria-pressed={isActive}
                    className={cn(
                      "inline-flex min-h-11 cursor-pointer items-center border px-4 py-2 text-xs font-medium tracking-wide backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-gold motion-reduce:transition-none",
                      isActive
                        ? "border-warm-gold bg-warm-gold text-midnight-navy"
                        : "border-glacier-cream/25 bg-midnight-navy/35 text-glacier-cream/90 hover:border-warm-gold/70 hover:text-glacier-cream",
                    )}
                  >
                    {shortValleyName(destination.name)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PointerSurface>
    </section>
  );
}
