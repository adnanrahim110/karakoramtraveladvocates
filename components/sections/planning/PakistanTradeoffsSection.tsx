"use client";

import { PointerSurface } from "@/components/motion/PointerSurface";
import { TextLink } from "@/components/ui/TextLink";
import { HOME_MEDIA, type HomeMediaAsset } from "@/lib/data/home-media";
import { TRAVEL_MEDIA } from "@/lib/data/travel-media";
import { useReducedMotionPreference } from "@/lib/motion/preferences";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ConsiderationItem {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly text: string;
  readonly image: HomeMediaAsset;
}

const CONSIDERATIONS: readonly ConsiderationItem[] = [
  {
    id: "travel-time",
    label: "Pacing & weather buffers",
    title: "Travel takes time",
    text: "Distances on a map do not tell you the whole story. Mountain flights, road access and weather should shape your buffer days.",
    image: HOME_MEDIA.tailor,
  },
  {
    id: "altitude",
    label: "Sleeping elevations",
    title: "Altitude needs attention",
    text: "Even a scenic road excursion can climb high. Look at sleeping elevations, recovery days and how the route fits your experience.",
    image: TRAVEL_MEDIA.rupal,
  },
  {
    id: "remoteness",
    label: "Support & evacuation",
    title: "Remote means less infrastructure",
    text: "Glacier treks involve camping, limited connectivity and long distances from roads. Confirm support and insurance for your actual route.",
    image: HOME_MEDIA.snowLake,
  },
  {
    id: "regional",
    label: "Corridor advisories",
    title: "Conditions are regional",
    text: "Access and travel advice vary across Pakistan and can change. Check the destination and the corridors used to reach it.",
    image: TRAVEL_MEDIA.kalash,
  },
];

export function PakistanTradeoffsSection() {
  const reducedMotion = useReducedMotionPreference();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const hasMountedRef = useRef(false);

  const active = CONSIDERATIONS[selectedIndex];

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (reducedMotion) return;

    const animations: Animation[] = [];
    if (bgRef.current) {
      animations.push(
        bgRef.current.animate(
          [
            { opacity: 0.7, transform: "scale(1.05)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          {
            duration: 750,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          },
        ),
      );
    }
    if (textRef.current) {
      const revealNodes = textRef.current.querySelectorAll<HTMLElement>(
        "[data-tradeoff-reveal]",
      );
      revealNodes.forEach((node, idx) => {
        animations.push(
          node.animate(
            [
              { opacity: 0, transform: "translate3d(0, 14px, 0)" },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 550,
              delay: idx * 55,
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
  }, [active.id, reducedMotion]);

  return (
    <section
      aria-labelledby="pakistan-tradeoffs-title"
      className="relative overflow-hidden border-y border-glacier-cream/15 bg-midnight-navy text-glacier-cream"
    >
      <PointerSurface
        strength={22}
        className="relative isolate flex min-h-svh w-full flex-col justify-end overflow-hidden"
      >
        <div
          ref={bgRef}
          data-pointer-layer=""
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 -z-20"
        >
          <Image
            key={active.image.src}
            src={active.image.src}
            alt={active.image.alt}
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-midnight-navy/85 via-midnight-navy/25 to-transparent"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-400 items-end gap-12 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-24">
          <div className="min-w-0 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-gold drop-shadow-[0_1px_10px_rgba(11,44,54,0.85)]">
              The practical side
            </p>
            <h2
              id="pakistan-tradeoffs-title"
              className="mt-3 max-w-2xl font-editorial text-4xl font-normal leading-tight text-glacier-cream drop-shadow-[0_2px_18px_rgba(11,44,54,0.75)] sm:text-5xl lg:text-6xl"
            >
              A remarkable place.
              <br />A journey worth preparing for.
            </h2>

            <div ref={textRef} className="mt-8 border-t border-glacier-cream/25 pt-6">
              <p
                data-tradeoff-reveal=""
                className="font-mono text-xs uppercase tracking-[0.16em] text-warm-gold"
              >
                {active.label}
              </p>
              <h3
                data-tradeoff-reveal=""
                className="mt-2 font-editorial text-2xl font-normal text-glacier-cream sm:text-3xl"
              >
                {active.title}
              </h3>
              <p
                data-tradeoff-reveal=""
                className="mt-3 max-w-xl text-base leading-8 text-glacier-cream/90"
              >
                {active.text}
              </p>
            </div>

            <TextLink
              href="/travel-guide"
              className="mt-8 w-fit text-glacier-cream hover:text-warm-gold focus-visible:outline-warm-gold"
            >
              Get the practical planning details
            </TextLink>
          </div>

          <div
            role="group"
            aria-label="Practical travel considerations"
            className="divide-y divide-glacier-cream/15 drop-shadow-[0_2px_16px_rgba(11,44,54,0.85)] lg:col-span-4 lg:col-start-9"
          >
            {CONSIDERATIONS.map((item, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "group flex min-h-14 w-full cursor-pointer items-center gap-4 border-l-2 py-4 pl-4 pr-2 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-warm-gold motion-reduce:transition-none",
                    isActive
                      ? "border-l-warm-gold text-warm-gold"
                      : "border-l-transparent text-glacier-cream/85 hover:border-l-glacier-cream/40 hover:text-glacier-cream",
                  )}
                >
                  <span className="font-mono text-xs text-warm-gold tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-base font-semibold">
                    {item.title}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-150 motion-reduce:transition-none motion-reduce:transform-none",
                      isActive
                        ? "translate-x-0.5 -translate-y-0.5 text-warm-gold"
                        : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </PointerSurface>
    </section>
  );
}
