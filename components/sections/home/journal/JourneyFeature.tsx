import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { TravelJourney } from "@/lib/data/travel-content";
import { cn, formatAltitude } from "@/lib/utils";

interface JourneyFeatureProps {
  journey: TravelJourney;
  variant?: "lead" | "companion";
  className?: string;
}

const kindLabels: Record<TravelJourney["kind"], string> = {
  trek: "Guided trek",
  tour: "Private tour",
  expedition: "Expedition",
};

export function JourneyFeature({ journey, variant = "companion", className }: JourneyFeatureProps) {
  const lead = variant === "lead";
  const titleId = `featured-${journey.slug}`;
  return (
    <article className={cn("min-w-0", className)}>
      <Link
        href={journey.href}
        prefetch={false}
        aria-labelledby={titleId}
        className={cn(
          "group/feature relative isolate grid h-full min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4",
          lead
            ? "min-h-104 items-end overflow-hidden bg-midnight-navy text-glacier-cream focus-visible:outline-alpine-teal sm:min-h-120 xl:min-h-144"
            : "grid-rows-[auto_1fr] border border-midnight-navy/15 bg-white text-midnight-navy focus-visible:outline-alpine-teal xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:grid-rows-1",
        )}
      >
        <div className={cn(
          "overflow-hidden bg-midnight-navy/10",
          lead ? "absolute inset-0 -z-10" : "relative aspect-[4/3] xl:aspect-auto",
        )}>
          <Image
            src={journey.image.src}
            alt={journey.image.alt}
            fill
            quality={lead ? 90 : 75}
            sizes={lead
              ? "(min-width: 1600px) 848px, (min-width: 1280px) 56vw, 100vw"
              : "(min-width: 1600px) 252px, (min-width: 1280px) 18vw, (min-width: 768px) 50vw, 100vw"}
            className="object-cover"
          />
          {lead && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-t from-midnight-navy via-midnight-navy/70 to-transparent" />
          )}
        </div>
        <div className={cn(
          "relative flex min-w-0 flex-col",
          lead ? "max-w-3xl px-5 py-6 sm:p-8 xl:p-10" : "p-5 sm:p-6",
        )}>
          <p className={cn("text-xs leading-5 font-semibold", lead ? "text-warm-gold" : "text-alpine-teal")}>
            {kindLabels[journey.kind]} <span aria-hidden="true">·</span> {journey.region}
          </p>
          <h3
            id={titleId}
            className={cn(
              "mt-2 font-editorial leading-[1.05] font-normal tracking-tight text-balance wrap-anywhere",
              lead ? "text-4xl sm:text-6xl 2xl:text-7xl" : "text-2xl sm:text-3xl",
            )}
          >
            {journey.title}
          </h3>
          <p className={cn(
            "mt-4 max-w-xl text-sm leading-6",
            lead ? "text-glacier-cream/90 sm:text-base sm:leading-7" : "text-slate-ink/85",
          )}>
            {journey.summary}
          </p>
          <dl className={cn(
            "mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs leading-5 font-medium",
            lead ? "text-glacier-cream/85" : "text-slate-ink/85",
          )}>
            <div>
              <dt className="sr-only">Duration</dt>
              <dd>{journey.durationDays} days</dd>
            </div>
            <div>
              <dt className="sr-only">Difficulty</dt>
              <dd>{journey.difficulty}</dd>
            </div>
            <div>
              <dt className="sr-only">Highest point</dt>
              <dd>{formatAltitude(journey.maxAltitude)}</dd>
            </div>
            <div>
              <dt className="sr-only">Season</dt>
              <dd>{journey.season}</dd>
            </div>
          </dl>
          <div className="mt-auto pt-4">
            <span className={cn(
              "inline-flex min-h-11 items-center gap-3 text-sm font-semibold underline decoration-current underline-offset-4",
              lead
                ? "text-glacier-cream group-hover/feature:text-warm-gold group-focus-visible/feature:text-warm-gold"
                : "text-midnight-navy group-hover/feature:text-alpine-teal group-focus-visible/feature:text-alpine-teal",
            )}>
              View itinerary
              <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
