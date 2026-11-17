import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { travelDestinations } from "@/lib/data/destination-content";
import { DestinationCard } from "./DestinationCard";

export function DestinationCollectionSection() {
  return (
    <section
      aria-labelledby="destination-collection-title"
      className="mx-auto w-full max-w-400 px-6 pb-20 pt-14 sm:px-10 sm:pt-16 lg:px-16 lg:pb-28"
    >
      <header className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div>
          <FieldLabel>Northern regions</FieldLabel>
          <HomeSectionHeading
            id="destination-collection-title"
            variant="compact"
            className="mt-3 text-midnight-navy"
          >
            Six distinct valleys.{" "}
            <span className="font-editorial font-normal lowercase italic text-alpine-teal">
              One mountain corridor.
            </span>
          </HomeSectionHeading>
        </div>
        <p className="max-w-md text-sm leading-7 text-slate-ink/85">
          Open a regional field note for access logistics, seasonal timing, and
          connected overland or trekking itineraries.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {travelDestinations.map((destination) => (
          <DestinationCard
            key={destination.slug}
            destination={destination}
            headingLevel="h3"
          />
        ))}
      </div>
    </section>
  );
}
