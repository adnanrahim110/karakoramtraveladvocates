import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InquiryButton } from "@/components/ui/InquiryButton";
import type { TravelJourney } from "@/lib/data/travel-content";
import { cn, formatAltitude } from "@/lib/utils";

export function TravelCard({
  journey,
  className,
}: {
  journey: TravelJourney;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group/card flex h-full min-w-0 flex-col overflow-hidden border border-midnight-navy/15 bg-white text-midnight-navy",
        className,
      )}
    >
      <Link
        href={journey.href}
        aria-label={`Explore ${journey.title}`}
        className="relative block aspect-[16/10] shrink-0 overflow-hidden bg-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpine-teal"
      >
        <Image
          src={journey.image.src}
          alt={journey.image.alt}
          fill
          sizes="(min-width: 1280px) 440px, (min-width: 768px) 48vw, 100vw"
          className="object-cover transition-transform duration-300 ease-out group-hover/card:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-midnight-navy/85 via-midnight-navy/15 to-midnight-navy/30"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
          <span className="bg-midnight-navy/85 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-warm-gold">
            {journey.difficulty}
          </span>
          <span
            aria-hidden="true"
            className="flex size-11 items-center justify-center bg-glacier-cream text-midnight-navy transition-colors duration-150 group-hover/card:bg-warm-gold motion-reduce:transition-none"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 p-4 font-mono text-xs tabular-nums text-glacier-cream">
          <span>{journey.durationDays} days</span>
          <span className="text-warm-gold">
            Max {formatAltitude(journey.maxAltitude)}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold text-alpine-teal">
          {journey.region}
        </p>
        <h3 className="mt-2 font-editorial text-2xl leading-snug font-normal tracking-tight text-midnight-navy sm:text-3xl">
          <Link
            href={journey.href}
            className="underline-offset-4 hover:text-alpine-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal"
          >
            {journey.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-ink/85">
          {journey.summary}
        </p>

        <ul className="mt-4 space-y-1.5 border-t border-midnight-navy/10 pt-4 text-xs leading-5 text-slate-ink/80">
          {journey.highlights.slice(0, 2).map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-alpine-teal"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-midnight-navy/10 pt-4 text-xs leading-5">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate-ink/70">
              Best season
            </dt>
            <dd className="mt-1 font-medium text-midnight-navy">
              {journey.season}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate-ink/70">
              Highest point
            </dt>
            <dd className="mt-1 font-mono font-medium tabular-nums text-midnight-navy">
              {formatAltitude(journey.maxAltitude)}
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-midnight-navy/15 pt-4">
            <Link
              href={journey.href}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-midnight-navy underline-offset-4 hover:text-alpine-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpine-teal"
            >
              <span>View itinerary</span>
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
              Inquire
            </InquiryButton>
          </div>
        </div>
      </div>
    </article>
  );
}
