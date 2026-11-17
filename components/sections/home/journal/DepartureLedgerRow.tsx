import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InquiryButton } from "@/components/ui/InquiryButton";
import type { TravelJourney } from "@/lib/data/travel-content";
import { cn, formatAltitude } from "@/lib/utils";
import { ALMANAC_MONTHS } from "./DepartureSeasonTab";

export interface DepartureRouteItem {
  readonly journey: TravelJourney;
  readonly activeMonths: readonly number[];
}

const CATEGORY_LABELS: Record<TravelJourney["kind"], string> = {
  tour: "Cultural journey",
  trek: "Guided trek",
  expedition: "Expedition",
};

export function DepartureLedgerRow({
  item,
  seasonMonthIndices,
}: {
  item: DepartureRouteItem;
  seasonMonthIndices: readonly number[];
}) {
  const { journey, activeMonths } = item;
  const activeSet = new Set(activeMonths);
  const seasonSet = new Set(seasonMonthIndices);

  return (
    <article className="group/card flex h-full min-w-0 flex-col overflow-hidden border border-midnight-navy/15 bg-white text-midnight-navy">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-midnight-navy">
        <Image
          src={journey.image.src}
          alt={journey.image.alt}
          fill
          quality={85}
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="object-cover transition-transform duration-300 ease-out group-hover/card:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-midnight-navy/85 via-midnight-navy/15 to-midnight-navy/35"
        />
        <div className="absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-2 p-4">
          <span className="bg-midnight-navy/85 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-warm-gold">
            {CATEGORY_LABELS[journey.kind]}
          </span>
          <span className="border border-glacier-cream/30 bg-midnight-navy/75 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-glacier-cream">
            {journey.difficulty}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 p-4 font-mono text-xs tabular-nums text-glacier-cream">
          <span>{journey.durationDays} days</span>
          <span className="text-warm-gold">
            Max {formatAltitude(journey.maxAltitude)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold text-alpine-teal">
          {journey.region}
        </p>
        <h4 className="mt-2 font-editorial text-2xl leading-snug font-normal tracking-tight text-midnight-navy">
          <Link
            href={journey.href}
            prefetch={false}
            className="underline-offset-4 hover:text-alpine-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpine-teal"
          >
            {journey.title}
          </Link>
        </h4>
        <p className="mt-3 text-sm leading-6 text-slate-ink/85">
          {journey.summary}
        </p>

        <div className="mt-6 border-t border-midnight-navy/10 pt-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-ink/70">
              Operating window
            </span>
            <span className="font-medium text-midnight-navy">
              {journey.season}
            </span>
          </div>
          <ul
            aria-label={`Operating months for ${journey.title}: ${journey.season}`}
            className="grid grid-cols-7 gap-1"
          >
            {ALMANAC_MONTHS.map((month) => {
              const isOpen = activeSet.has(month.index);
              const isInSelectedSeason = seasonSet.has(month.index);
              return (
                <li
                  key={month.index}
                  className={cn(
                    "flex h-7 items-center justify-center font-mono text-[11px] font-medium",
                    isOpen
                      ? cn(
                          "bg-midnight-navy text-warm-gold",
                          isInSelectedSeason && "ring-1 ring-warm-gold",
                        )
                      : "bg-glacier-cream/70 text-slate-ink/40",
                  )}
                >
                  {month.short}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-midnight-navy/15 pt-4">
            <Link
              href={journey.href}
              prefetch={false}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-midnight-navy underline-offset-4 hover:text-alpine-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpine-teal"
            >
              <span>Itinerary</span>
              <ArrowUpRight
                className="size-4 shrink-0 text-alpine-teal"
                aria-hidden="true"
              />
            </Link>
            <InquiryButton
              variant="outline"
              className="min-h-11 px-4 py-2 text-xs"
              context={{
                tripTitle: journey.title,
                tripSlug: journey.slug,
                serviceType: journey.kind,
                regionName: journey.region,
              }}
            >
              Request dates
            </InquiryButton>
          </div>
        </div>
      </div>
    </article>
  );
}
