import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { PointerSurface } from "@/components/motion/PointerSurface";
import { HOME_MEDIA } from "@/lib/data/home-media";
import { PlanningPrinciple } from "./PlanningPrinciple";

const PRINCIPLES = [
  {
    number: "01",
    title: "TIME IS PART OF THE PLAN.",
    description:
      "Gradual ascent. Acclimatization days. Space for a change in the weather. A thoughtful itinerary gives the mountains the time they ask for.",
  },
  {
    number: "02",
    title: "THE RIGHT OBJECTIVE.",
    description:
      "A valley road trip and a glacier crossing ask different things of a traveller. Your experience, interests and comfort at altitude shape the route.",
  },
  {
    number: "03",
    title: "A GUEST, NOT A SPECTATOR.",
    description:
      "Choose local stays, respect village customs, ask before taking a portrait, and carry your waste back out. The way we travel matters.",
  },
];

export function LocalApproachSection() {
  return (
    <section
      id="our-approach"
      aria-labelledby="approach-title"
      className="relative overflow-hidden bg-midnight-navy text-glacier-cream"
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-glacier-cream/20 pb-6">
          <FieldLabel className="text-warm-gold">
            06 / The groundwork
          </FieldLabel>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-glacier-cream/80">
            The extraordinary takes preparation.
          </p>
        </div>
        <header className="relative grid gap-8 py-12 lg:grid-cols-12 lg:items-end">
          <HomeSectionHeading id="approach-title" className="lg:col-span-8">
            BASE <span className="text-warm-gold">CAMP.</span>
          </HomeSectionHeading>
          <p className="max-w-sm text-base leading-8 text-glacier-cream/85 lg:col-span-4 lg:pb-4">
            The peaks bring you here. The care taken before you arrive makes
            room for the experience that follows.
          </p>
        </header>
      </div>
      <PointerSurface
        strength={24}
        className="relative mx-auto h-64 max-w-[1680px] overflow-hidden sm:h-88 lg:h-112"
      >
        <div data-pointer-layer className="absolute -inset-8">
          <ParallaxImage
            src={HOME_MEDIA.snowLake.src}
            alt={HOME_MEDIA.snowLake.alt}
            sizes="100vw"
            amount="medium"
            className="h-full w-full"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-midnight-navy/60 via-transparent to-transparent"
        />
        <div className="pointer-events-none absolute inset-x-6 bottom-8 mx-auto max-w-[1312px] sm:inset-x-10 lg:inset-x-16">
          <p className="max-w-xl font-editorial text-2xl italic leading-tight text-glacier-cream sm:text-3xl lg:text-4xl">
            Behind every great journey, there is solid ground.
          </p>
        </div>
      </PointerSurface>
      <div className="mx-auto max-w-[1440px] px-6 pb-20 sm:px-10 sm:pb-28 lg:px-16">
        <dl className="grid border-b border-glacier-cream/20 md:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <PlanningPrinciple key={principle.number} {...principle} />
          ))}
        </dl>
        <div className="flex flex-col justify-between gap-6 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-lg text-sm leading-7 text-glacier-cream/80">
            Ask about the details that matter: sleeping altitudes, weather
            alternatives, guide arrangements and the pace of your days.
          </p>
          <InquiryButton
            variant="outline"
            className="shrink-0 text-glacier-cream"
          >
            Build your route with us
          </InquiryButton>
        </div>
      </div>
    </section>
  );
}
