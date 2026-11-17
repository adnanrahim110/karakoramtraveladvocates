import {
  DepartureAlmanac,
  type AlmanacSeason,
} from "@/components/sections/home/journal/DepartureAlmanac";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { HOME_MEDIA, type HomeMediaAsset } from "@/lib/data/home-media";
import { travelJourneys, type TravelJourney } from "@/lib/data/travel-content";
import { TRAVEL_MEDIA } from "@/lib/data/travel-media";

interface SeasonRouteConfig {
  readonly slug: string;
  readonly activeMonths: readonly number[];
}

interface SeasonDefinition {
  readonly id: string;
  readonly indexLabel: string;
  readonly months: string;
  readonly shortTitle: string;
  readonly title: string;
  readonly altitudeBand: string;
  readonly minAltitude: number;
  readonly maxAltitude: number;
  readonly description: string;
  readonly daytime: string;
  readonly snowline: string;
  readonly suitedFor: string;
  readonly seasonMonthIndices: readonly number[];
  readonly image: HomeMediaAsset;
  readonly routes: readonly SeasonRouteConfig[];
}

const SEASON_DEFINITIONS: readonly SeasonDefinition[] = [
  {
    id: "spring",
    indexLabel: "01",
    months: "Apr – May",
    shortTitle: "Spring blossom.",
    title: "Orchards in blossom below snowbound passes.",
    altitudeBand: "1,800 – 3,500 m",
    minAltitude: 1800,
    maxAltitude: 3500,
    description:
      "Apricot, cherry and almond orchards break into blossom across Hunza and Nagar while the high glacier approaches remain sealed in winter snow.",
    daytime: "14°C – 22°C in valleys",
    snowline: "Passes snowbound above 3,800 m",
    suitedFor: "Orchards, heritage forts & first ridges",
    seasonMonthIndices: [0, 1],
    image: TRAVEL_MEDIA.rakaposhi,
    routes: [
      {
        slug: "hunza-valley-private-journey",
        activeMonths: [0, 1, 2, 3, 4, 5, 6],
      },
      {
        slug: "rakaposhi-base-camp",
        activeMonths: [1, 2, 3, 4, 5, 6],
      },
      {
        slug: "kalash-swat",
        activeMonths: [1, 2, 3, 4, 5, 6],
      },
    ],
  },
  {
    id: "summer",
    indexLabel: "02",
    months: "Jun – Aug",
    shortTitle: "High summer ice.",
    title: "The brief corridor when the giant glaciers open.",
    altitudeBand: "3,500 – 8,611 m",
    minAltitude: 3500,
    maxAltitude: 8611,
    description:
      "Snow bridges stabilize and high passes clear across the central Karakoram—opening the sole window for Concordia, Snow Lake and high-altitude peaks.",
    daytime: "18°C valleys · -5°C glacier camps",
    snowline: "5,000 m+ passes open",
    suitedFor: "Glacier traverses & 7,000 m+ climbs",
    seasonMonthIndices: [2, 3, 4],
    image: HOME_MEDIA.snowLake,
    routes: [
      {
        slug: "k2-base-camp-trek",
        activeMonths: [2, 3, 4, 5],
      },
      {
        slug: "snow-lake-hispar-la-trek",
        activeMonths: [2, 3, 4],
      },
      {
        slug: "spantik-peak-expedition",
        activeMonths: [2, 3, 4],
      },
    ],
  },
  {
    id: "autumn",
    indexLabel: "03",
    months: "Sep – Oct",
    shortTitle: "Autumn gold.",
    title: "Calm post-monsoon clarity and amber valley terraces.",
    altitudeBand: "2,200 – 4,693 m",
    minAltitude: 2200,
    maxAltitude: 4693,
    description:
      "Poplar groves turn bronze and gold from Gojal to Baltistan beneath cloudless blue horizons—bringing the year's crispest mountain light.",
    daytime: "10°C – 18°C · crisp dry air",
    snowline: "Early dusting on high peaks",
    suitedFor: "Photography, lakes & high road passes",
    seasonMonthIndices: [5, 6],
    image: HOME_MEDIA.hunza,
    routes: [
      {
        slug: "passu-khunjerab",
        activeMonths: [1, 2, 3, 4, 5, 6],
      },
      {
        slug: "skardu-shigar-signature-tour",
        activeMonths: [2, 3, 4, 5],
      },
      {
        slug: "fairy-meadows-nanga-parbat",
        activeMonths: [1, 2, 3, 4, 5, 6],
      },
    ],
  },
];

export function DepartureLedgerSection() {
  const journeyBySlug = new Map<string, TravelJourney>(
    travelJourneys.map((journey) => [journey.slug, journey]),
  );

  const seasons: AlmanacSeason[] = SEASON_DEFINITIONS.map(
    ({ routes, ...definition }) => ({
      ...definition,
      routes: routes.flatMap(({ slug, activeMonths }) => {
        const journey = journeyBySlug.get(slug);
        return journey ? [{ journey, activeMonths }] : [];
      }),
    }),
  );

  return (
    <section
      id="departures"
      aria-labelledby="departures-title"
      className="border-t border-midnight-navy/10 bg-glacier-cream py-16 text-midnight-navy sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-400 px-6 sm:px-10 lg:px-16">
        <header className="mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="min-w-0">
            <FieldLabel>Seasonal almanac</FieldLabel>
            <HomeSectionHeading
              id="departures-title"
              className="mt-4 max-w-3xl text-midnight-navy"
            >
              When the north{" "}
              <span className="block font-editorial font-normal lowercase italic text-alpine-teal">
                opens up.
              </span>
            </HomeSectionHeading>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-ink/85 lg:pb-1">
            Explore how altitude, snowline and valley colour shift from April
            through October. Select a season to compare elevation envelopes and
            matching journeys.
          </p>
        </header>

        <DepartureAlmanac seasons={seasons} />

        <div className="mt-8 flex flex-col justify-between gap-6 border-t border-midnight-navy/15 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-7 text-slate-ink/80">
            Seasons and durations are planning references. Your dates, quote,
            permits and final itinerary are confirmed with the team before
            booking.
          </p>
          <InquiryButton
            variant="dark"
            className="w-fit max-w-full shrink-0"
          >
            Plan around your dates
          </InquiryButton>
        </div>
      </div>
    </section>
  );
}
