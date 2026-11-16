import type { TravelDestination } from "@/lib/data/destination-content";
import { travelJourneys } from "@/lib/data/travel-content";
import { TravelCard } from "@/components/ui/TravelCard";

export function DestinationJourneysSection({ destination }: { destination: TravelDestination }) {
  const related = travelJourneys.filter((journey) => destination.journeySlugs.includes(journey.slug));
  if (!related.length) return null;
  return <section aria-labelledby="destination-journeys-title" className="mx-auto w-full max-w-360 px-6 py-16 sm:px-10 lg:px-16 lg:py-24"><p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">Find a route</p><h2 id="destination-journeys-title" className="mt-4 font-editorial text-4xl font-normal text-midnight-navy">Journeys through this region.</h2><div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">{related.map((journey) => <TravelCard key={journey.slug} journey={journey} />)}</div></section>;
}
