import { JourneySectionHeading } from "./JourneySectionHeading";
import type { TravelJourney } from "@/lib/data/travel-content";

export function JourneyItinerarySection({ journey }: { journey: TravelJourney }) {
  return (
    <section id="itinerary" aria-label="Itinerary outline" className="border-y border-midnight-navy/15 bg-white/35">
      <div className="mx-auto grid max-w-360 gap-10 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-24">
        <div className="lg:col-span-4"><JourneySectionHeading eyebrow="The journey, in chapters" title="An outline with room for reality." description="This is a planning outline. Your confirmed proposal sets out the daily programme, accommodation, transport and contingency arrangements before booking." /><a href="#practical" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-alpine-teal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Read the practical details</a></div>
        <ol className="divide-y divide-midnight-navy/20 border-y border-midnight-navy/20 lg:col-span-8">
          {journey.itinerary.map((stage) => <li key={stage.days} className="grid gap-4 py-6 sm:grid-cols-12 sm:gap-6"><p className="text-xs font-semibold uppercase tracking-wider text-alpine-teal sm:col-span-3">Day{stage.days.includes("–") ? "s" : ""} {stage.days}</p><div className="sm:col-span-9"><h3 className="font-editorial text-2xl font-normal text-midnight-navy">{stage.title}</h3><p className="mt-3 text-sm leading-7 text-slate-ink/80">{stage.description}</p></div></li>)}
        </ol>
      </div>
    </section>
  );
}
