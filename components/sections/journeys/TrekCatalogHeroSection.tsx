"use client";

import { PointerSurface } from "@/components/motion/PointerSurface";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { InquiryButton } from "@/components/ui/InquiryButton";
import type { TravelJourney } from "@/lib/data/travel-content";
import { useReducedMotionPreference } from "@/lib/motion/preferences";
import { cn, formatAltitude } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

const SLIDE_DURATION_MS = 6000;

interface SlideState {
  activeIndex: number;
  prevIndex: number | null;
  direction: 1 | -1;
}

function formatCounter(value: number) {
  return String(value).padStart(2, "0");
}

function isElementFocusVisible(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  try {
    return target.matches(":focus-visible");
  } catch {
    return false;
  }
}

export function TrekCatalogHeroSection({
  treks,
}: {
  treks: readonly TravelJourney[];
}) {
  const { unit } = useInteractive();
  const reducedMotion = useReducedMotionPreference();

  const [slideState, setSlideState] = useState<SlideState>({
    activeIndex: 0,
    prevIndex: null,
    direction: 1,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const progressBarRef = useRef<HTMLSpanElement | null>(null);
  const animationRef = useRef<Animation | null>(null);
  const remainingMsRef = useRef<number>(SLIDE_DURATION_MS);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const slideRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const contentRef = useRef<HTMLDivElement | null>(null);

  const totalSlides = treks.length;
  const safeActiveIndex =
    totalSlides > 0 ? slideState.activeIndex % totalSlides : 0;
  const safePrevIndex =
    slideState.prevIndex !== null && totalSlides > 0
      ? slideState.prevIndex % totalSlides
      : null;
  const isPaused = isHovered || isFocusPaused || isHidden;

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

  const goToNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setSlideState((prev) => ({
      activeIndex: (prev.activeIndex + 1) % totalSlides,
      prevIndex: prev.activeIndex % totalSlides,
      direction: 1,
    }));
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setSlideState((prev) => ({
      activeIndex: (prev.activeIndex - 1 + totalSlides) % totalSlides,
      prevIndex: prev.activeIndex % totalSlides,
      direction: -1,
    }));
  }, [totalSlides]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    remainingMsRef.current = SLIDE_DURATION_MS;
    const bar = progressBarRef.current;

    if (!bar || reducedMotion || totalSlides <= 1) {
      animationRef.current = null;
      return;
    }

    const animation = bar.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      {
        duration: SLIDE_DURATION_MS,
        easing: "linear",
        fill: "both",
      },
    );
    animation.pause();
    animationRef.current = animation;

    return () => {
      animation.cancel();
      animationRef.current = null;
    };
  }, [safeActiveIndex, reducedMotion, totalSlides]);

  useEffect(() => {
    const animation = animationRef.current;
    if (reducedMotion || isPaused || totalSlides <= 1) {
      animation?.pause();
      return;
    }

    const delay = Math.max(0, remainingMsRef.current);
    const startTime = performance.now();
    animation?.play();

    const timer = window.setTimeout(() => {
      setSlideState((prev) => ({
        activeIndex: (prev.activeIndex + 1) % totalSlides,
        prevIndex: prev.activeIndex % totalSlides,
        direction: 1,
      }));
    }, delay);

    return () => {
      window.clearTimeout(timer);
      animation?.pause();
      remainingMsRef.current = Math.max(
        0,
        delay - (performance.now() - startTime),
      );
    };
  }, [safeActiveIndex, isPaused, reducedMotion, totalSlides]);

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
    const transitionEasing = "cubic-bezier(0.16, 1, 0.3, 1)";

    if (incomingEl) {
      const incomingClipFrom =
        slideState.direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
      const incomingTransformFrom =
        slideState.direction > 0
          ? "scale(1.12) translate3d(4%, 0, 0)"
          : "scale(1.12) translate3d(-4%, 0, 0)";

      animations.push(
        incomingEl.animate(
          [
            {
              clipPath: incomingClipFrom,
              transform: incomingTransformFrom,
              filter: "brightness(0.75)",
            },
            {
              clipPath: "inset(0 0 0 0%)",
              transform: "scale(1) translate3d(0%, 0, 0)",
              filter: "brightness(1)",
            },
          ],
          {
            duration: 1100,
            easing: transitionEasing,
            fill: "both",
          },
        ),
      );
    }

    if (outgoingEl) {
      const outgoingTransformTo =
        slideState.direction > 0
          ? "scale(1.04) translate3d(-4%, 0, 0)"
          : "scale(1.04) translate3d(4%, 0, 0)";

      animations.push(
        outgoingEl.animate(
          [
            {
              transform: "scale(1) translate3d(0%, 0, 0)",
              filter: "brightness(1)",
            },
            {
              transform: outgoingTransformTo,
              filter: "brightness(0.55)",
            },
          ],
          {
            duration: 1100,
            easing: transitionEasing,
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
                transform: "translate3d(0, 20px, 0)",
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
              easing: transitionEasing,
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
  }, [safeActiveIndex, safePrevIndex, slideState.direction, reducedMotion]);

  if (totalSlides === 0) {
    return null;
  }

  const activeTrek = treks[safeActiveIndex];

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrev();
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.target instanceof Element &&
      event.target.closest("button, a")
    ) {
      swipeStartRef.current = null;
      return;
    }
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    swipeStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || totalSlides <= 1) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const handlePointerCancel = () => {
    swipeStartRef.current = null;
  };

  const handleFocusCapture = (event: FocusEvent<HTMLElement>) => {
    if (isElementFocusVisible(event.target)) {
      setIsFocusPaused(true);
    }
  };

  const handleBlurCapture = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocusPaused(false);
      return;
    }
    setIsFocusPaused(isElementFocusVisible(event.relatedTarget));
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby="trek-hero-title"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      onKeyDown={handleKeyDown}
      className="relative isolate overflow-hidden border-b border-glacier-cream/15 bg-midnight-navy pt-20 text-glacier-cream lg:pt-22"
    >
      <h1 id="trek-hero-title" className="sr-only">
        Treks in the Karakoram and Northern Pakistan
      </h1>

      <p role="status" aria-live="polite" className="sr-only">
        Slide {safeActiveIndex + 1} of {totalSlides}: {activeTrek.title},{" "}
        {activeTrek.region}, {activeTrek.durationDays} days
      </p>

      <PointerSurface
        strength={20}
        className="relative isolate flex min-h-[calc(100svh-80px)] flex-col justify-end overflow-hidden lg:min-h-[calc(100svh-88px)]"
      >
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className="relative isolate flex flex-1 flex-col justify-end"
        >
          <div
            data-pointer-layer=""
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 -z-20 overflow-hidden"
          >
            {treks.map((trek, index) => {
              const isActive = index === safeActiveIndex;
              const isPrev = index === safePrevIndex;
              return (
                <div
                  key={trek.slug}
                  ref={setSlideRef(index)}
                  className={cn(
                    "absolute inset-0 will-change-[transform,clip-path,filter]",
                    isActive
                      ? "z-20 opacity-100"
                      : isPrev
                        ? "z-10 opacity-100"
                        : "pointer-events-none z-0 opacity-0",
                  )}
                >
                  <Image
                    src={trek.image}
                    alt={trek.title}
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
            <div ref={contentRef} className="min-w-0 lg:col-span-8">
              <p
                data-slide-reveal=""
                className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.2em] text-warm-gold uppercase drop-shadow-[0_1px_12px_rgba(11,44,54,0.85)]"
              >
                <span>{activeTrek.region}</span>
                <span aria-hidden="true" className="text-glacier-cream/50">
                  ·
                </span>
                <span>{activeTrek.durationDays} days</span>
                <span aria-hidden="true" className="text-glacier-cream/50">
                  ·
                </span>
                <span>{formatAltitude(activeTrek.maxAltitude, unit)}</span>
              </p>

              <h2
                data-slide-reveal=""
                className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-glacier-cream drop-shadow-[0_2px_18px_rgba(11,44,54,0.75)] sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                {activeTrek.title}
              </h2>

              <p
                data-slide-reveal=""
                className="mt-4 line-clamp-2 max-w-xl font-editorial text-lg leading-relaxed text-glacier-cream/95 drop-shadow-[0_2px_16px_rgba(11,44,54,0.8)] sm:text-xl"
              >
                {activeTrek.summary}
              </p>

              <div data-slide-reveal="" className="mt-6 flex flex-wrap items-center">
                <InquiryButton variant="light" href={activeTrek.href}>
                  Explore trek
                </InquiryButton>
              </div>
            </div>

            {totalSlides > 1 ? (
              <div className="flex items-center justify-between gap-6 lg:col-span-4 lg:justify-end">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-[0.2em] text-glacier-cream/90 tabular-nums drop-shadow-[0_1px_10px_rgba(11,44,54,0.85)]">
                    {formatCounter(safeActiveIndex + 1)} /{" "}
                    {formatCounter(totalSlides)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-16 overflow-hidden bg-glacier-cream/20"
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
                  aria-label="Slide controls"
                  className="flex items-center gap-3"
                >
                  <button
                    type="button"
                    onClick={goToPrev}
                    aria-label="Previous trek slide"
                    className="inline-flex size-12 cursor-pointer items-center justify-center border border-glacier-cream/35 bg-midnight-navy/45 text-glacier-cream backdrop-blur-sm transition-colors hover:border-warm-gold hover:bg-warm-gold hover:text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-gold motion-reduce:transition-none"
                  >
                    <ArrowLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next trek slide"
                    className="inline-flex size-12 cursor-pointer items-center justify-center border border-glacier-cream/35 bg-midnight-navy/45 text-glacier-cream backdrop-blur-sm transition-colors hover:border-warm-gold hover:bg-warm-gold hover:text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-gold motion-reduce:transition-none"
                  >
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </PointerSurface>
    </section>
  );
}
