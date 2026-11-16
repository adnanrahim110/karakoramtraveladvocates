import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { travelJourneys } from "@/lib/data/travel-content";
import { TextLink } from "@/components/ui/TextLink";
import type { JourneyPreview } from "@/lib/types/home";
import { JourneyExplorer } from "./JourneyExplorer";

export function JourneyCollectionSection() {
  const journeys: JourneyPreview[] = travelJourneys.map((journey) => ({
    id: journey.slug,
    href: journey.href,
    slug: journey.slug,
    region: journey.region,
    title: journey.title,
    serviceType: journey.kind,
    durationDays: journey.durationDays,
    maxAltitudeMeters: journey.maxAltitude,
    grade: journey.difficulty,
    season: journey.season,
    summary: journey.summary,
    highlights: journey.highlights.slice(0, 3),
    image: journey.image,
  }));
  return (
    <section
      id="journeys"
      aria-labelledby="journeys-title"
      className="bg-glacier-cream py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <header className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="min-w-0 flex-1">
            <FieldLabel>03 / The journey collection</FieldLabel>
            <HomeSectionHeading
              id="journeys-title"
              className="mt-5 text-midnight-navy"
            >
              Find your{" "}
              <span className="font-editorial font-normal lowercase italic">
                elsewhere.
              </span>
            </HomeSectionHeading>
          </div>
          <p className="max-w-sm text-sm leading-7 text-slate-ink/80 lg:shrink-0">
            A few of our favourite ways into the north. Explore the routes, then
            shape the details with us.
          </p>
        </header>
        <JourneyExplorer journeys={journeys} />
        <nav aria-label="Explore all journey categories" className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-midnight-navy/20 pt-6">
          <TextLink href="/treks">All treks</TextLink>
          <TextLink href="/tours">All private tours</TextLink>
          <TextLink href="/expeditions">All expeditions</TextLink>
        </nav>
      </div>
    </section>
  );
}
