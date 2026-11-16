import { TravelCard } from "@/components/ui/TravelCard";
import { journeysByKind, type TravelJourney } from "@/lib/data/travel-content";
import { JourneySectionHeading } from "./JourneySectionHeading";

export function JourneyRelatedSection({ journey }: { journey: TravelJourney }) {
  const related = journeysByKind(journey.kind).filter((item) => item.slug !== journey.slug).slice(0, 3);
  if (related.length === 0) return null;
  return (
    <section aria-label="Related journeys" className="mx-auto w-full max-w-360 px-6 py-16 sm:px-10 lg:px-16 lg:py-24"><JourneySectionHeading eyebrow="Keep exploring" title="Another way into the landscape." /><div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">{related.map((item) => <TravelCard key={item.slug} journey={item} />)}</div></section>
  );
}
