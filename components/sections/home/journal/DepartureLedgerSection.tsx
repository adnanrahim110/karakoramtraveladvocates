import { DepartureLedgerRow } from "@/components/sections/home/journal/DepartureLedgerRow";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { travelJourneys } from "@/lib/data/travel-content";

const SELECTED_DEPARTURES = new Set([
  "hunza-valley-private-journey",
  "k2-base-camp-trek",
  "spantik-peak-expedition",
  "snow-lake-hispar-la-trek",
]);

export function DepartureLedgerSection() {
  const journeys = travelJourneys.filter((journey) =>
    SELECTED_DEPARTURES.has(journey.slug),
  );
  return (
    <section
      id="departures"
      aria-labelledby="departures-title"
      className="relative overflow-hidden bg-glacier-cream py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="min-w-0 lg:col-span-8">
            <FieldLabel>07 / Choose a season. Go further.</FieldLabel>
            <HomeSectionHeading
              id="departures-title"
              className="mt-6 text-midnight-navy"
            >
              NEXT STOP:{" "}
              <span className="font-editorial font-normal italic normal-case tracking-[-0.055em] text-alpine-teal">
                the high north.
              </span>
            </HomeSectionHeading>
          </div>
          <div className="lg:col-span-4">
            <span
              className="block font-sans text-4xl font-semibold leading-none tracking-[-0.04em] text-midnight-navy sm:text-5xl lg:text-[56px]"
              aria-hidden="true"
            >
              Your dates.
            </span>
            <p className="mt-4 max-w-sm text-base leading-7 text-slate-ink/80">
              Spring orchards. Summer glaciers. An objective to work towards.
              Your next chapter has a starting point.
            </p>
          </div>
        </header>
        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          {journeys.map((journey, index) => (
            <DepartureLedgerRow
              key={journey.slug}
              journey={journey}
              index={index}
            />
          ))}
        </div>
        <div className="mt-10 flex flex-col justify-between gap-6 border-t border-midnight-navy/20 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-7 text-slate-ink/80">
            Seasons and durations are planning references. Your dates, quote,
            permits and final itinerary are confirmed with the team before booking.
          </p>
          <InquiryButton variant="outline" className="shrink-0">
            Choose your own dates
          </InquiryButton>
        </div>
      </div>
    </section>
  );
}
