import Image from "next/image";
import { PointerSurface } from "@/components/motion/PointerSurface";
import { InquiryButton } from "@/components/ui/InquiryButton";
import {
  journeyKindLabels,
  type TravelJourney,
} from "@/lib/data/travel-content";
import { formatAltitude } from "@/lib/utils";

export function JourneyHeroSection({ journey }: { journey: TravelJourney }) {
  return (
    <section
      aria-labelledby="journey-title"
      className="relative isolate overflow-hidden border-b border-glacier-cream/15 bg-midnight-navy pt-20 text-glacier-cream lg:pt-22"
    >
      <PointerSurface
        strength={20}
        className="relative isolate flex min-h-[calc(100svh-80px)] flex-col justify-end overflow-hidden lg:min-h-[calc(100svh-88px)]"
      >
        <div
          data-pointer-layer
          className="pointer-events-none absolute -inset-8 -z-20"
        >
          <Image
            src={journey.image.src}
            alt={journey.image.alt}
            fill
            preload
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-midnight-navy/85 via-midnight-navy/25 to-transparent"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-400 items-end gap-8 px-6 pt-24 pb-10 sm:px-10 sm:pb-12 lg:grid-cols-12 lg:px-16 lg:pb-14">
          <div className="min-w-0 lg:col-span-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-warm-gold uppercase drop-shadow-[0_1px_12px_rgba(11,44,54,0.85)]">
              {journeyKindLabels[journey.kind]} · {journey.region} ·{" "}
              {journey.durationDays} days ·{" "}
              {formatAltitude(journey.maxAltitude)}
            </p>
            <h1
              id="journey-title"
              className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-glacier-cream drop-shadow-[0_2px_18px_rgba(11,44,54,0.75)] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {journey.title}
            </h1>
            <p className="mt-4 line-clamp-2 max-w-xl font-editorial text-lg leading-relaxed text-glacier-cream/95 drop-shadow-[0_2px_16px_rgba(11,44,54,0.8)] sm:text-xl">
              {journey.summary}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <InquiryButton
                variant="light"
                context={{
                  tripTitle: journey.title,
                  tripSlug: journey.slug,
                  serviceType: journey.kind,
                  regionName: journey.region,
                }}
              >
                Plan this journey
              </InquiryButton>
              {journey.accessNotice && (
                <a
                  href="#route-advice"
                  className="inline-flex min-h-14 items-center border border-warm-gold/60 bg-midnight-navy/50 px-5 py-3 text-xs font-semibold tracking-wide text-warm-gold backdrop-blur-sm transition-colors duration-150 hover:border-warm-gold hover:bg-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold motion-reduce:transition-none"
                >
                  Regional access advice: review before planning
                </a>
              )}
            </div>
          </div>

          <dl className="flex flex-wrap gap-x-8 gap-y-4 drop-shadow-[0_1px_12px_rgba(11,44,54,0.85)] lg:col-span-4 lg:justify-self-end lg:text-right">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-warm-gold">
                Season
              </dt>
              <dd className="mt-1 text-sm font-medium text-glacier-cream">
                {journey.season}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-warm-gold">
                Grade
              </dt>
              <dd className="mt-1 text-sm font-medium text-glacier-cream">
                {journey.difficulty}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-warm-gold">
                Group
              </dt>
              <dd className="mt-1 text-sm font-medium text-glacier-cream">
                {journey.groupSize}
              </dd>
            </div>
          </dl>
        </div>
      </PointerSurface>
    </section>
  );
}
