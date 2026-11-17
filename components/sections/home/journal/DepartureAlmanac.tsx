"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { PointerSurface } from "@/components/motion/PointerSurface";
import type { HomeMediaAsset } from "@/lib/data/home-media";
import { useReducedMotionPreference } from "@/lib/motion/preferences";
import { cn, formatAltitude } from "@/lib/utils";
import {
  DepartureLedgerRow,
  type DepartureRouteItem,
} from "./DepartureLedgerRow";
import {
  ALMANAC_MONTHS,
  DepartureSeasonTab,
  type SeasonTabInfo,
} from "./DepartureSeasonTab";

export interface AlmanacSeason extends SeasonTabInfo {
  readonly title: string;
  readonly description: string;
  readonly minAltitude: number;
  readonly maxAltitude: number;
  readonly daytime: string;
  readonly snowline: string;
  readonly suitedFor: string;
  readonly seasonMonthIndices: readonly number[];
  readonly image: HomeMediaAsset;
  readonly routes: readonly DepartureRouteItem[];
}

function altitudeToY(meters: number): number {
  const clamped = Math.min(9000, Math.max(1500, meters));
  const ratio = (clamped - 1500) / (9000 - 1500);
  return Math.round(160 - ratio * 138);
}

const ROUTE_PLOT_X = [76, 200, 324] as const;

export function DepartureAlmanac({
  seasons,
}: {
  seasons: readonly AlmanacSeason[];
}) {
  const [selectedSeasonId, setSelectedSeasonId] = useState(
    seasons[0]?.id ?? "",
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const reducedMotion = useReducedMotionPreference();
  const stageId = useId();

  const activeSeason =
    seasons.find((season) => season.id === selectedSeasonId) ?? seasons[0];

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    const stage = stageRef.current;
    if (reducedMotion || !stage || typeof stage.animate !== "function") return;
    const animation = stage.animate(
      [
        { opacity: 0.78, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0px)" },
      ],
      { duration: 220, easing: "cubic-bezier(0.2, 0.65, 0.3, 1)" },
    );
    return () => animation.cancel();
  }, [selectedSeasonId, reducedMotion]);

  if (!activeSeason) return null;

  const bandTopY = altitudeToY(activeSeason.maxAltitude);
  const bandBottomY = altitudeToY(activeSeason.minAltitude);
  const bandHeight = Math.max(8, bandBottomY - bandTopY);
  const seasonMonthsSet = new Set(activeSeason.seasonMonthIndices);

  return (
    <div className="space-y-6">
      <div
        role="group"
        aria-label="Select a travel season"
        className="grid gap-3 md:grid-cols-3 md:gap-4"
      >
        {seasons.map((season) => (
          <DepartureSeasonTab
            key={season.id}
            season={season}
            isActive={season.id === activeSeason.id}
            onSelect={setSelectedSeasonId}
            controlsId={stageId}
          />
        ))}
      </div>

      <div ref={stageRef} id={stageId} className="space-y-6">
        <PointerSurface
          strength={22}
          className="relative isolate overflow-hidden border border-midnight-navy/15 bg-midnight-navy text-glacier-cream"
        >
          <div
            data-pointer-layer
            className="pointer-events-none absolute -inset-8 -z-20"
          >
            <Image
              key={activeSeason.image.src}
              src={activeSeason.image.src}
              alt={activeSeason.image.alt}
              fill
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-midnight-navy/80 via-midnight-navy/35 to-midnight-navy/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-midnight-navy/85 via-midnight-navy/15 to-midnight-navy/20"
          />

          <div className="relative z-10 grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-12">
            <div className="min-w-0 lg:col-span-7">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-warm-gold">
                {activeSeason.indexLabel} / {activeSeason.months} ·{" "}
                {activeSeason.altitudeBand}
              </p>
              <h3 className="mt-4 font-editorial text-3xl leading-tight font-normal tracking-tight text-glacier-cream sm:text-5xl">
                {activeSeason.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-8 text-glacier-cream/90">
                {activeSeason.description}
              </p>

              <dl className="mt-8 grid gap-6 border-t border-glacier-cream/20 pt-6 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-warm-gold">
                    Daytime conditions
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-glacier-cream">
                    {activeSeason.daytime}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-warm-gold">
                    Snowline &amp; passes
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-glacier-cream">
                    {activeSeason.snowline}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-warm-gold">
                    Best suited for
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-glacier-cream">
                    {activeSeason.suitedFor}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="min-w-0 border border-glacier-cream/25 bg-midnight-navy/80 p-5 backdrop-blur-xs sm:p-6 lg:col-span-5">
              <div className="flex items-baseline justify-between gap-4 border-b border-glacier-cream/15 pb-3">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-glacier-cream/85">
                  Elevation envelope
                </span>
                <span className="font-mono text-xs tabular-nums text-warm-gold">
                  {activeSeason.altitudeBand}
                </span>
              </div>

              <svg
                role="img"
                aria-label={`Karakoram elevation horizon for ${activeSeason.shortTitle}: ${activeSeason.altitudeBand}`}
                viewBox="0 0 400 180"
                className="mt-4 h-44 w-full text-glacier-cream"
              >
                <rect
                  x="0"
                  y={bandTopY}
                  width="400"
                  height={bandHeight}
                  fill="#d4a04c"
                  fillOpacity="0.16"
                />
                <line
                  x1="0"
                  y1={bandTopY}
                  x2="400"
                  y2={bandTopY}
                  stroke="#d4a04c"
                  strokeOpacity="0.55"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1={bandBottomY}
                  x2="400"
                  y2={bandBottomY}
                  stroke="#d4a04c"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />

                {[
                  { label: "7.5k m", meters: 7500 },
                  { label: "5.0k m", meters: 5000 },
                  { label: "2.5k m", meters: 2500 },
                ].map((tick) => {
                  const y = altitudeToY(tick.meters);
                  return (
                    <g key={tick.label}>
                      <line
                        x1="0"
                        y1={y}
                        x2="400"
                        y2={y}
                        stroke="currentColor"
                        strokeOpacity="0.16"
                        strokeDasharray="3 4"
                        strokeWidth="1"
                      />
                      <text
                        x="6"
                        y={y - 4}
                        fill="currentColor"
                        fillOpacity="0.55"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        {tick.label}
                      </text>
                    </g>
                  );
                })}

                <path
                  d="M 0 156 L 44 134 L 78 142 L 122 104 L 154 114 L 198 70 L 236 88 L 284 48 L 316 64 L 352 29 L 380 56 L 400 74 L 400 168 L 0 168 Z"
                  fill="currentColor"
                  fillOpacity="0.08"
                />
                <path
                  d="M 0 156 L 44 134 L 78 142 L 122 104 L 154 114 L 198 70 L 236 88 L 284 48 L 316 64 L 352 29 L 380 56 L 400 74"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.4"
                  strokeWidth="1.25"
                />

                {activeSeason.routes.map((route, index) => {
                  const x = ROUTE_PLOT_X[index] ?? 200;
                  const y = altitudeToY(route.journey.maxAltitude);
                  const labelY = y < 44 ? y + 16 : y - 10;
                  return (
                    <g key={route.journey.slug}>
                      <line
                        x1={x}
                        y1={y}
                        x2={x}
                        y2="168"
                        stroke="#d4a04c"
                        strokeOpacity="0.45"
                        strokeWidth="1"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="7"
                        fill="#d4a04c"
                        fillOpacity="0.22"
                      />
                      <circle cx={x} cy={y} r="3.5" fill="#d4a04c" />
                      <text
                        x={x}
                        y={labelY}
                        textAnchor="middle"
                        fill="#f6f2e9"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        {formatAltitude(route.journey.maxAltitude)}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="mt-3 grid grid-cols-7 gap-1 border-t border-glacier-cream/15 pt-4">
                {ALMANAC_MONTHS.map((month) => {
                  const isSeasonMonth = seasonMonthsSet.has(month.index);
                  return (
                    <span
                      key={month.index}
                      className={cn(
                        "flex h-7 items-center justify-center font-mono text-[11px] tracking-[0.08em]",
                        isSeasonMonth
                          ? "bg-warm-gold font-semibold text-midnight-navy"
                          : "bg-glacier-cream/10 text-glacier-cream/55",
                      )}
                    >
                      {month.upper}
                    </span>
                  );
                })}
              </div>

              <ul className="mt-4 space-y-1.5 border-t border-glacier-cream/15 pt-3 text-xs text-glacier-cream/80">
                {activeSeason.routes.map((route, index) => (
                  <li
                    key={route.journey.slug}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="min-w-0 truncate">
                      <span className="font-mono text-warm-gold">
                        0{index + 1}
                      </span>{" "}
                      {route.journey.title}
                    </span>
                    <span className="shrink-0 font-mono tabular-nums text-glacier-cream/70">
                      {formatAltitude(route.journey.maxAltitude)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PointerSurface>

        <div className="grid gap-6 lg:grid-cols-3">
          {activeSeason.routes.map((item) => (
            <DepartureLedgerRow
              key={item.journey.slug}
              item={item}
              seasonMonthIndices={activeSeason.seasonMonthIndices}
            />
          ))}
        </div>
      </div>

      <p role="status" className="sr-only">
        Showing {activeSeason.shortTitle} ({activeSeason.months}) with{" "}
        {activeSeason.routes.length} recommended journeys.
      </p>
    </div>
  );
}
