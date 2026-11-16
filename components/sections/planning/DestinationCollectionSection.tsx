import { travelDestinations } from "@/lib/data/destination-content";
import { DestinationCard } from "./DestinationCard";

export function DestinationCollectionSection() {
  return <section aria-label="Destinations in northern Pakistan" className="mx-auto w-full max-w-360 px-6 pb-20 pt-12 sm:px-10 lg:px-16 lg:pb-28"><div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">{travelDestinations.map((destination) => <DestinationCard key={destination.slug} destination={destination} />)}</div></section>;
}
