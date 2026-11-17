import { HorizontalScrollStage } from "@/components/motion/HorizontalScrollStage";
import { ExperienceChapter } from "@/components/sections/home/journal/ExperienceChapter";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { HOME_MEDIA, type HomeMediaAsset } from "@/lib/data/home-media";
import { TRAVEL_MEDIA } from "@/lib/data/travel-media";
import type { JourneyKind } from "@/lib/data/travel-content";

interface CorridorChapterData {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly href: string;
  readonly linkLabel: string;
  readonly altitude: string;
  readonly image: HomeMediaAsset;
}

interface CorridorConfig {
  readonly eyebrow: string;
  readonly headingMain: string;
  readonly headingItalic: string;
  readonly paragraphs: readonly [string, string];
  readonly chapters: readonly CorridorChapterData[];
}

const CORRIDORS_BY_KIND: Record<JourneyKind, CorridorConfig> = {
  trek: {
    eyebrow: "Trekking corridors",
    headingMain: "Three landscapes.",
    headingItalic: "Three rhythms on foot.",
    paragraphs: [
      "Walking in northern Pakistan divides naturally between alpine meadow approaches—five to seven days beneath Rakaposhi or Nanga Parbat—and sustained glacier expeditions deep into the central Karakoram.",
      "Choose between granite spires and base camps on the Baltoro, the remote white expanse of Snow Lake, or high pasture trails above settled valleys.",
    ],
    chapters: [
      {
        title: "Into the throne room.",
        subtitle: "Central Karakoram · 21 days",
        description:
          "Follow the Braldu and Baltoro glaciers past Trango Towers into Concordia, with time to walk beneath K2 or cross Gondogoro La.",
        href: "/treks/k2-base-camp-trek",
        linkLabel: "Explore Baltoro routes",
        altitude: "3,050 — 5,585 m",
        image: HOME_MEDIA.expedition,
      },
      {
        title: "The great ice highway.",
        subtitle: "Biafo & Hispar · 21 days",
        description:
          "Leave settled valleys behind on the linked Biafo and Hispar glaciers, crossing the vast open basin of Lukpe Lawo.",
        href: "/treks/snow-lake-hispar-la-trek",
        linkLabel: "Explore Snow Lake",
        altitude: "3,000 — 5,150 m",
        image: HOME_MEDIA.snowLake,
      },
      {
        title: "High pastures, giant walls.",
        subtitle: "Nagar, Raikot & Astore · 5–7 days",
        description:
          "Climb through pine forest and village pastures toward Tagaphari, Fairy Meadows, or the Rupal face of Nanga Parbat.",
        href: "/treks/rakaposhi-base-camp",
        linkLabel: "Explore short treks",
        altitude: "2,400 — 3,900 m",
        image: TRAVEL_MEDIA.rakaposhi,
      },
    ],
  },
  tour: {
    eyebrow: "Valley corridors",
    headingMain: "Three valleys.",
    headingItalic: "Three cultural rhythms.",
    paragraphs: [
      "Private overland journeys follow historic river valleys, apricot terraces, and fort settlements across Hunza, Nagar, and Baltistan.",
      "Pair gentle village walks around Karimabad and Shigar with seasonal drives over high plateaus including Deosai and Khunjerab.",
    ],
    chapters: [
      {
        title: "Terraces, forts & orchard paths.",
        subtitle: "Hunza & Nagar · 10 days",
        description:
          "Stay around Karimabad and Nagar with unhurried mornings inside Altit and Baltit forts, irrigation paths, and ridge viewpoints.",
        href: "/tours/hunza-valley-private-journey",
        linkLabel: "Explore Hunza routes",
        altitude: "1,850 — 2,900 m",
        image: HOME_MEDIA.hunza,
      },
      {
        title: "Balti lakes & cold-desert plateaus.",
        subtitle: "Skardu, Shigar & Deosai · 9 days",
        description:
          "Link Kachura lakeside calm and restored Shigar architecture with seasonal summer excursions onto the Deosai plains.",
        href: "/tours/skardu-shigar-signature-tour",
        linkLabel: "Explore Baltistan routes",
        altitude: "2,200 — 4,100 m",
        image: HOME_MEDIA.skardu,
      },
      {
        title: "Lakes & granite spires to the border.",
        subtitle: "Gojal & Khunjerab · 8 days",
        description:
          "Follow turquoise Attabad Lake beneath the Passu Cones toward Wakhi villages, glacier overlooks, and high border passes.",
        href: "/tours/passu-khunjerab",
        linkLabel: "Explore Upper Hunza",
        altitude: "2,450 — 4,693 m",
        image: HOME_MEDIA.tailor,
      },
    ],
  },
  expedition: {
    eyebrow: "Climbing corridors",
    headingMain: "Three altitudes.",
    headingItalic: "Three climbing frameworks.",
    paragraphs: [
      "Mountaineering in the Karakoram spans 7,000-meter snow ridges on Spantik to multi-month siege logistics high above the Baltoro.",
      "Every expedition scope begins with verified alpine credentials, explicit permit delineation, and conservative team judgement.",
    ],
    chapters: [
      {
        title: "7,000m alpine ridge progression.",
        subtitle: "Chogo Lungma · 30 days",
        description:
          "Spantik pairs an accessible approach with sustained high-altitude camp progression along its classic southeast ridge toward 7,027m.",
        href: "/expeditions/spantik-peak-expedition",
        linkLabel: "Explore Spantik",
        altitude: "4,300 — 7,027 m",
        image: HOME_MEDIA.spantik,
      },
      {
        title: "Eight-thousander expedition scope.",
        subtitle: "Baltoro Karakoram · 60 days",
        description:
          "Bespoke K2 permit logistics, Baltoro approach planning, and negotiated high-camp support built around qualified climbers.",
        href: "/expeditions/k2-expedition",
        linkLabel: "Explore K2 framework",
        altitude: "5,000 — 8,611 m",
        image: HOME_MEDIA.expedition,
      },
      {
        title: "Technical glacier preparation.",
        subtitle: "Baltoro & Gondogoro · 21 days",
        description:
          "Build Karakoram altitude experience across fixed-line crossings above Concordia ahead of committed 7,000m or 8,000m objectives.",
        href: "/treks/gondogoro-la",
        linkLabel: "Explore pass traverse",
        altitude: "3,300 — 5,585 m",
        image: HOME_MEDIA.trek,
      },
    ],
  },
};

export function TrekCorridorsSection({ kind = "trek" }: { kind?: JourneyKind }) {
  const config = CORRIDORS_BY_KIND[kind];
  const headingId = `${kind}-corridors-title`;

  return (
    <section
      id={`${kind}-corridors`}
      aria-labelledby={headingId}
      className="bg-glacier-cream text-midnight-navy"
    >
      <HorizontalScrollStage>
        <div
          data-scroll-frame
          className="mx-auto grid max-w-450 items-center gap-10 px-6 py-16 sm:px-10 lg:gap-12 xl:px-16 group-data-[scroll-pinned=true]/scroll:sticky group-data-[scroll-pinned=true]/scroll:top-0 group-data-[scroll-pinned=true]/scroll:h-svh group-data-[scroll-pinned=true]/scroll:grid-cols-[clamp(17rem,24vw,24rem)_minmax(0,1fr)] group-data-[scroll-pinned=true]/scroll:pt-28 group-data-[scroll-pinned=true]/scroll:pb-10"
        >
          <header className="min-w-0">
            <FieldLabel>{config.eyebrow}</FieldLabel>
            <HomeSectionHeading
              id={headingId}
              variant="compact"
              className="mt-4"
            >
              {config.headingMain}{" "}
              <span className="block font-editorial font-normal lowercase italic text-alpine-teal">
                {config.headingItalic}
              </span>
            </HomeSectionHeading>
            <div className="mt-6 max-w-xl space-y-4 text-sm leading-7 text-slate-ink/85">
              {config.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </header>

          <div
            data-scroll-viewport
            className="@container min-w-0 group-data-[scroll-pinned=true]/scroll:overflow-hidden"
          >
            <div
              data-scroll-track
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 group-data-[scroll-pinned=true]/scroll:flex group-data-[scroll-pinned=true]/scroll:w-max"
            >
              {config.chapters.map((chapter) => (
                <ExperienceChapter
                  key={chapter.href}
                  title={chapter.title}
                  subtitle={chapter.subtitle}
                  description={chapter.description}
                  href={chapter.href}
                  linkLabel={chapter.linkLabel}
                  altitude={chapter.altitude}
                  image={chapter.image}
                />
              ))}
            </div>
          </div>
        </div>
      </HorizontalScrollStage>
    </section>
  );
}
