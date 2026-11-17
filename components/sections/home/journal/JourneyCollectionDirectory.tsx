import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { journeyKindLabels, journeyKindPaths, type JourneyKind, type TravelJourney } from "@/lib/data/travel-content";
import { JourneyDirectoryDisclosure } from "./JourneyDirectoryDisclosure";
import { JourneyDirectoryRoute } from "./JourneyDirectoryRoute";

const journeyKinds: readonly JourneyKind[] = ["trek", "tour", "expedition"];

export function JourneyCollectionDirectory({ journeys }: { journeys: readonly TravelJourney[] }) {
  return (
    <JourneyDirectoryDisclosure label={`Browse all ${journeys.length} journeys`}>
      <div className="grid gap-4 border-t border-midnight-navy/15 bg-glacier-cream/70 p-4 sm:gap-6 sm:p-6">
        {journeyKinds.map((kind) => {
          const routes = journeys.filter((journey) => journey.kind === kind);
          const headingId = `journey-directory-${kind}`;
          return (
            <section
              key={kind}
              aria-labelledby={headingId}
              className="grid min-w-0 border border-midnight-navy/15 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
            >
              <header className="bg-midnight-navy p-4 text-glacier-cream sm:px-6 sm:py-4 lg:py-5">
                <h3 id={headingId}>
                  <Link
                    href={journeyKindPaths[kind]}
                    prefetch={false}
                    className="inline-flex min-h-11 max-w-full items-center gap-3 font-editorial text-2xl leading-tight font-normal tracking-normal underline-offset-4 hover:text-warm-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-gold"
                  >
                    {journeyKindLabels[kind]}
                    <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-warm-gold" />
                  </Link>
                </h3>
                <p className="text-xs leading-5 text-glacier-cream/80">{routes.length} itineraries</p>
              </header>
              <ul className="grid min-w-0 gap-px bg-midnight-navy/15 sm:grid-cols-2">
                {routes.map((journey) => <JourneyDirectoryRoute key={journey.slug} journey={journey} />)}
              </ul>
            </section>
          );
        })}
      </div>
    </JourneyDirectoryDisclosure>
  );
}
