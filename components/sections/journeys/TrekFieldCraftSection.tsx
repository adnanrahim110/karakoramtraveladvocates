"use client";

import { PointerSurface } from "@/components/motion/PointerSurface";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { TextLink } from "@/components/ui/TextLink";
import { HOME_MEDIA, type HomeMediaAsset } from "@/lib/data/home-media";
import { TRAVEL_MEDIA } from "@/lib/data/travel-media";
import type { JourneyKind } from "@/lib/data/travel-content";
import { useReducedMotionPreference } from "@/lib/motion/preferences";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface FieldCraftChapter {
  readonly id: string;
  readonly name: string;
  readonly note: string;
  readonly telemetryLabel: string;
  readonly telemetryValue: string;
  readonly title: string;
  readonly description: string;
  readonly confirmNote: string;
  readonly guideHref: string;
  readonly guideLabel: string;
  readonly image: HomeMediaAsset;
}

interface FieldCraftConfig {
  readonly eyebrow: string;
  readonly ctaLabel: string;
  readonly chapters: readonly FieldCraftChapter[];
}

const CHAPTERS_BY_KIND: Record<JourneyKind, FieldCraftConfig> = {
  trek: {
    eyebrow: "Trail preparation",
    ctaLabel: "Talk through your trek plan",
    chapters: [
      {
        id: "pace-altitude",
        name: "Pace & Acclimatization",
        note: "Gradual ascent above 3,000 m",
        telemetryLabel: "Sleeping elevations",
        telemetryValue: "1,850 m → 5,150 m",
        title: "Pace is the real route design.",
        description:
          "Fitness alone does not protect against altitude. Every Baltoro, Snow Lake, and Nanga Parbat itinerary builds conservative daily height gains, dedicated rest camps, and clear turnaround judgement if conditions shift.",
        confirmNote:
          "Maximum sleeping elevations, acclimatization days, and evacuation insurance matching your peak altitude.",
        guideHref: "/travel-guide/altitude-and-safety",
        guideLabel: "Read altitude & safety guide",
        image: TRAVEL_MEDIA.rupal,
      },
      {
        id: "camp-craft",
        name: "Camp Craft & Local Crew",
        note: "Glacier camps & trail logistics",
        telemetryLabel: "Trailhead to glacier camp",
        telemetryValue: "Balti & Wakhi teams",
        title: "Living well on the moraine.",
        description:
          "Multi-week Karakoram treks move with experienced local guides, camp cooks, and porter teams who know every water source and moraine shelf. Expect crisp frost at dawn and warm meals in mess tents.",
        confirmNote:
          "Supplied camp equipment, duffel weight limits, boot break-in, and technical gear for high passes.",
        guideHref: "/travel-guide/packing",
        guideLabel: "Read packing & equipment guide",
        image: HOME_MEDIA.trek,
      },
      {
        id: "permits-access",
        name: "Permits & Restricted Zones",
        note: "Paperwork before flights",
        telemetryLabel: "Restricted-zone lead time",
        telemetryValue: "Confirm several weeks ahead",
        title: "Permissions vary valley by valley.",
        description:
          "A Pakistan entry visa is separate from mountain access permissions. Open-zone meadow walks follow simpler procedures than restricted glacier corridors along the Baltoro or Biafo–Hispar.",
        confirmNote:
          "Current visa category for your passport and which route-specific permits the team arranges for you.",
        guideHref: "/travel-guide/visas-and-permits",
        guideLabel: "Read visas & permits guide",
        image: HOME_MEDIA.snowLake,
      },
      {
        id: "flights-buffers",
        name: "Flights, Roads & Buffers",
        note: "Mountain weather contingency",
        telemetryLabel: "Approach corridors",
        telemetryValue: "Skardu · Gilgit · KKH",
        title: "Build room for mountain weather.",
        description:
          "Flights into Skardu or Gilgit depend on clear skies through high river gorges. Well-paced itineraries include realistic buffer days and an overland Karakoram Highway alternative.",
        confirmNote:
          "Buffer days before international departures and how overland road alternatives are scheduled.",
        guideHref: "/travel-guide/getting-there",
        guideLabel: "Read flights & access guide",
        image: HOME_MEDIA.tailor,
      },
    ],
  },
  tour: {
    eyebrow: "Private valley craft",
    ctaLabel: "Shape your private itinerary",
    chapters: [
      {
        id: "pace-transfers",
        name: "Pace & Private Transfers",
        note: "Room for the days between viewpoints",
        telemetryLabel: "Route rhythm",
        telemetryValue: "Flexible daily starts",
        title: "Leave space for unhurried stops.",
        description:
          "Private valley journeys work best when transfers do not swallow the day. Choose fewer bases, linger inside fort courtyards or orchards, and adapt driving hours to light and local curiosity.",
        confirmNote:
          "Vehicle class, private driver hours, walking duration options, and flexible meal timing.",
        guideHref: "/travel-guide/getting-there",
        guideLabel: "Read flights & road access",
        image: HOME_MEDIA.tour,
      },
      {
        id: "heritage-stays",
        name: "Heritage & Valley Stays",
        note: "Restored forts & quiet garden lodges",
        telemetryLabel: "Base selection",
        telemetryValue: "Hunza · Shigar · Gojal",
        title: "Stay where the landscape belongs.",
        description:
          "From heritage timber-and-stone rooms in Shigar to garden views overlooking Ultar Sar in Karimabad, accommodation sets the rhythm of mornings and evenings across the valleys.",
        confirmNote:
          "Preferred room categories, heating availability in shoulder seasons, and multi-night stays.",
        guideHref: "/travel-guide/travel-costs",
        guideLabel: "Compare trip scope & pricing",
        image: HOME_MEDIA.journal,
      },
      {
        id: "blossom-autumn",
        name: "Blossom & Autumn Timing",
        note: "April spring · October golden foliage",
        telemetryLabel: "Seasonal windows",
        telemetryValue: "Mar–Nov valley windows",
        title: "Match the month to the elevation.",
        description:
          "Apricot blossom climbs village by village in spring while poplar foliage turns gold through October. Meanwhile high excursions like Deosai or Khunjerab require summer road clearance.",
        confirmNote:
          "Expected temperatures by valley elevation and seasonal access for plateau drives.",
        guideHref: "/travel-guide/best-time-to-visit",
        guideLabel: "Explore seasonal timing guide",
        image: HOME_MEDIA.hunza,
      },
      {
        id: "connections",
        name: "Flight & Road Connections",
        note: "Islamabad links & contingency routing",
        telemetryLabel: "Gateway airports",
        telemetryValue: "Gilgit · Skardu · KKH",
        title: "Plan mountain links with composure.",
        description:
          "Domestic mountain flights offer dramatic transit over Nanga Parbat but always bow to cloud. Every private itinerary leaves practical road-staging flexibility before your flight home.",
        confirmNote:
          "Arrival buffering in Islamabad and contingency overnight options along the Karakoram Highway.",
        guideHref: "/travel-guide/getting-there",
        guideLabel: "Read mountain connections guide",
        image: HOME_MEDIA.tailor,
      },
    ],
  },
  expedition: {
    eyebrow: "Expedition standards",
    ctaLabel: "Discuss expedition credentials",
    chapters: [
      {
        id: "team-roster",
        name: "Team Experience & Roster",
        note: "Credential review prior to commitment",
        telemetryLabel: "Application review",
        telemetryValue: "Prior 6,000m+ / glacier log",
        title: "Match ambition to verified history.",
        description:
          "High-altitude objectives above 7,000m begin with a candid look at your technical snow-and-ice background, altitude history, and comfort moving independently or in roped teams.",
        confirmNote:
          "Climbing resume summary, fixed-line competence, and team-to-climber support ratios.",
        guideHref: "/travel-guide/altitude-and-safety",
        guideLabel: "Read altitude & readiness notes",
        image: HOME_MEDIA.spantik,
      },
      {
        id: "camp-support",
        name: "High-Altitude Camp Support",
        note: "Transparent gear & staffing lines",
        telemetryLabel: "Base & upper camps",
        telemetryValue: "Explicit written scope",
        title: "Define every responsibility on paper.",
        description:
          "Two quotes for the same mountain can cover vastly different logistics. Your written proposal separates base-camp mess operations, high-altitude porterage, oxygen where applicable, and personal hardware.",
        confirmNote:
          "Included shared stoves/tents, upper-camp food, emergency communications, and salvage scope.",
        guideHref: "/travel-guide/travel-costs",
        guideLabel: "Compare expedition cost structure",
        image: HOME_MEDIA.expedition,
      },
      {
        id: "ministry-permits",
        name: "Ministry Permits & Liaison",
        note: "Restricted peak royalties & briefings",
        telemetryLabel: "Lead time",
        telemetryValue: "Submit 8–12 weeks prior",
        title: "Clear royalties well ahead of summer.",
        description:
          "Peak royalty paperwork, Alpine Club briefings, and restricted-zone clearances follow strict lead schedules in Islamabad and Skardu before your Baltoro or Chogo Lungma approach starts.",
        confirmNote:
          "Passport submission cutoffs, royalty tiers, liaison arrangements, and waste deposit terms.",
        guideHref: "/travel-guide/visas-and-permits",
        guideLabel: "Read visas & permits guide",
        image: HOME_MEDIA.snowLake,
      },
      {
        id: "weather-windows",
        name: "Weather Windows & Buffers",
        note: "Multi-week rotation allowances",
        telemetryLabel: "Operating season",
        telemetryValue: "June — August window",
        title: "Respect the mountain’s calendar.",
        description:
          "Published expedition lengths are planning frameworks. Jet-stream winds, avalanche cycles, and glacier travel govern summit pushes, with conservative turnarounds prioritized above schedules.",
        confirmNote:
          "Acclimatization rotation windows, weather-forecasting access, and helicopter evacuation cover.",
        guideHref: "/travel-guide/altitude-and-safety",
        guideLabel: "Read evacuation & insurance guide",
        image: HOME_MEDIA.trek,
      },
    ],
  },
};

export function TrekFieldCraftSection({
  kind = "trek",
}: {
  kind?: JourneyKind;
}) {
  const reducedMotion = useReducedMotionPreference();
  const config = CHAPTERS_BY_KIND[kind];
  const [selectedId, setSelectedId] = useState<string>(config.chapters[0].id);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const hasMountedRef = useRef(false);

  const selected =
    config.chapters.find((chapter) => chapter.id === selectedId) ??
    config.chapters[0];

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    const bgEl = bgLayerRef.current;
    if (!bgEl || reducedMotion) {
      return;
    }
    const animation = bgEl.animate(
      [
        { opacity: 0.72, transform: "scale(1.04)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      {
        duration: 750,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
      },
    );
    return () => animation.cancel();
  }, [selected.id, reducedMotion]);

  return (
    <section
      id={`${kind}-craft`}
      aria-labelledby={`${kind}-craft-title`}
      className="relative overflow-hidden bg-midnight-navy text-glacier-cream"
    >
      <PointerSurface
        strength={24}
        className="relative isolate min-h-svh w-full overflow-hidden bg-midnight-navy text-glacier-cream"
      >
        <div
          ref={bgLayerRef}
          data-pointer-layer
          className="pointer-events-none absolute -inset-8 -z-20"
        >
          <Image
            key={selected.image.src}
            src={selected.image.src}
            alt={selected.image.alt}
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-midnight-navy/85 via-midnight-navy/25 to-transparent"
        />

        <div className="relative z-10 mx-auto grid min-h-svh max-w-400 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:items-end lg:px-16 lg:py-24">
          <div className="flex min-w-0 flex-col justify-between gap-16 lg:col-span-7 lg:self-stretch">
            <div className="flex items-start justify-between gap-6">
              <p className="font-mono text-xs uppercase leading-6 tracking-[0.14em] drop-shadow-[0_1px_10px_rgba(11,44,54,0.85)]">
                {selected.telemetryLabel}
                <br />
                <span className="text-warm-gold">
                  {selected.telemetryValue}
                </span>
              </p>
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="h-20 w-20 shrink-0 fill-none text-glacier-cream/80 drop-shadow-[0_1px_10px_rgba(11,44,54,0.85)]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="0.6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  strokeDasharray="3 3"
                />
                <path
                  d="M16 66 L36 42 L48 54 L64 26 L84 66"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                />
                <circle cx="64" cy="26" r="2.5" fill="currentColor" />
              </svg>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-warm-gold drop-shadow-[0_1px_12px_rgba(11,44,54,0.85)]">
                {selected.note}
              </p>
              <h2
                id={`${kind}-craft-title`}
                className="mt-4 max-w-2xl font-editorial text-4xl leading-[1.06] font-normal tracking-tight text-glacier-cream drop-shadow-[0_2px_18px_rgba(11,44,54,0.75)] sm:text-5xl lg:text-6xl"
              >
                {selected.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-glacier-cream/95 drop-shadow-[0_2px_16px_rgba(11,44,54,0.8)]">
                {selected.description}
              </p>
              <TextLink
                href={selected.guideHref}
                className="mt-8 w-fit text-glacier-cream hover:text-warm-gold focus-visible:outline-warm-gold"
              >
                {selected.guideLabel}
              </TextLink>
            </div>
          </div>

          <div
            role="region"
            aria-label={config.eyebrow}
            className="min-w-0 drop-shadow-[0_2px_16px_rgba(11,44,54,0.85)] lg:col-span-4 lg:col-start-9"
          >
            <div className="flex justify-between gap-4 border-b border-glacier-cream/25 pb-4 font-mono text-xs uppercase tracking-[0.14em]">
              <span>{config.eyebrow}</span>
              <span className="text-warm-gold">04 chapters</span>
            </div>

            <div className="divide-y divide-glacier-cream/15">
              {config.chapters.map((chapter, index) => {
                const isActive = chapter.id === selected.id;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    aria-pressed={isActive}
                    aria-controls={`${kind}-confirm-note`}
                    onClick={() => setSelectedId(chapter.id)}
                    className={cn(
                      "group/chapter flex min-h-14 w-full cursor-pointer items-center gap-4 border-l-2 py-4 pl-4 pr-2 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-warm-gold motion-reduce:transition-none",
                      isActive
                        ? "border-l-warm-gold text-warm-gold"
                        : "border-l-transparent text-glacier-cream/85 hover:border-l-glacier-cream/40 hover:text-glacier-cream",
                    )}
                  >
                    <span className="font-mono text-xs text-warm-gold tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 text-base font-semibold">
                      {chapter.name}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-150 motion-reduce:transition-none motion-reduce:transform-none",
                        isActive
                          ? "translate-x-0.5 -translate-y-0.5 text-warm-gold"
                          : "group-hover/chapter:translate-x-0.5 group-hover/chapter:-translate-y-0.5",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            <p
              id={`${kind}-confirm-note`}
              className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-warm-gold"
            >
              What to confirm
            </p>
            <p className="mt-2 text-sm leading-7 text-glacier-cream/90">
              {selected.confirmNote}
            </p>

            <InquiryButton
              variant="light"
              className="mt-6 w-full"
              context={{ serviceType: kind }}
            >
              {config.ctaLabel}
            </InquiryButton>
          </div>
        </div>

        <p role="status" className="sr-only">
          Viewing {config.eyebrow.toLowerCase()} chapter: {selected.name}.{" "}
          {selected.note}.
        </p>
      </PointerSurface>
    </section>
  );
}
