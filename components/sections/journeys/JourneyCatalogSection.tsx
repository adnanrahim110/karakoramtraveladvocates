import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { TravelCard } from "@/components/ui/TravelCard";
import {
  journeysByKind,
  type JourneyKind,
} from "@/lib/data/travel-content";
import { JourneyCatalogExplorer } from "./JourneyCatalogExplorer";
import { JourneySpotlightHeroSection } from "./JourneySpotlightHeroSection";
import { TrekCatalogHeroSection } from "./TrekCatalogHeroSection";
import { TrekCorridorsSection } from "./TrekCorridorsSection";
import { TrekFieldCraftSection } from "./TrekFieldCraftSection";

const catalogCopy: Record<
  JourneyKind,
  {
    eyebrow: string;
    headingLead: string;
    headingItalic: string;
    description: string;
    note: string;
  }
> = {
  trek: {
    eyebrow: "All guided treks",
    headingLead: "Explore the",
    headingItalic: "full directory.",
    description:
      "Filter by valley, technical challenge, or time available to find the route outline that matches your goals.",
    note: "Durations are route outlines. Arrival transfers, acclimatization and contingency days are confirmed in your personal proposal.",
  },
  tour: {
    eyebrow: "All private tours",
    headingLead: "Browse valley",
    headingItalic: "itinerary frameworks.",
    description:
      "Compare valley basins, seasonal access, and pacing across Hunza, Baltistan, Upper Hunza, and cultural northern corridors.",
    note: "Each itinerary can be adapted to your interests, travel dates, comfort preferences and group. Seasonal access is reviewed before confirmation.",
  },
  expedition: {
    eyebrow: "Climbing objectives",
    headingLead: "Review expedition",
    headingItalic: "planning frameworks.",
    description:
      "Assess target altitudes, climbing durations, and permit lead times before initiating a technical application.",
    note: "Expeditions require individual assessment. Published durations are indicative; permits, support arrangements and a written proposal are confirmed before any booking.",
  },
};

export function JourneyCatalogSection({ kind }: { kind: JourneyKind }) {
  const journeys = journeysByKind(kind);
  const copy = catalogCopy[kind];
  const items = journeys.map(
    ({ slug, title, region, difficulty, durationDays, summary }) => ({
      slug,
      title,
      region,
      difficulty,
      durationDays,
      summary,
    }),
  );

  return (
    <>
      {kind === "trek" ? (
        <TrekCatalogHeroSection treks={journeys} />
      ) : (
        <JourneySpotlightHeroSection kind={kind} journeys={journeys} />
      )}

      <TrekCorridorsSection kind={kind} />

      <section
        aria-labelledby={`${kind}-catalog-title`}
        className="mx-auto w-full max-w-400 border-t border-midnight-navy/10 px-6 pb-16 pt-12 sm:px-10 sm:pt-16 lg:px-16 lg:pb-24"
      >
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <FieldLabel>{copy.eyebrow}</FieldLabel>
            <HomeSectionHeading
              id={`${kind}-catalog-title`}
              variant="compact"
              className="mt-3 text-midnight-navy"
            >
              {copy.headingLead}{" "}
              <span className="font-editorial font-normal lowercase italic text-alpine-teal">
                {copy.headingItalic}
              </span>
            </HomeSectionHeading>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-ink/85">
            {copy.description}
          </p>
        </header>

        <JourneyCatalogExplorer items={items}>
          {journeys.map((journey) => (
            <TravelCard key={journey.slug} journey={journey} />
          ))}
        </JourneyCatalogExplorer>
        <p className="mt-10 max-w-3xl text-xs leading-6 text-slate-ink/75">
          {copy.note}
        </p>
      </section>

      <TrekFieldCraftSection kind={kind} />

      <section
        aria-labelledby="catalog-plan-title"
        className="border-y border-midnight-navy/15 bg-white/40"
      >
        <div className="mx-auto flex max-w-400 flex-col justify-between gap-8 px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:px-16 lg:py-16">
          <div className="max-w-2xl">
            <h2
              id="catalog-plan-title"
              className="font-editorial text-3xl font-normal text-midnight-navy"
            >
              Unsure where to begin?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-ink/80">
              Share your time, interests and experience. We can help narrow the
              options and shape a route around you.
            </p>
          </div>
          <InquiryButton
            context={{ serviceType: kind }}
            className="w-fit shrink-0"
          >
            Talk through your options
          </InquiryButton>
        </div>
      </section>
    </>
  );
}
