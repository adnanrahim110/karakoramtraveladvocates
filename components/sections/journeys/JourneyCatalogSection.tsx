import Link from "next/link";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { PageIntro } from "@/components/ui/PageIntro";
import { TravelCard } from "@/components/ui/TravelCard";
import { JourneyCatalogExplorer } from "./JourneyCatalogExplorer";
import { journeysByKind, journeyKindLabels, journeyKindPaths, type JourneyKind } from "@/lib/data/travel-content";
import { cn } from "@/lib/utils";

const catalogCopy: Record<JourneyKind, { title: string; description: string; note: string }> = {
  trek: { title: "Take the longer way into the mountains.", description: "From a few nights above a village to a full glacier journey. Compare the time, terrain and practical demands before choosing your route.", note: "Durations are route outlines. Arrival transfers, acclimatization and contingency days are confirmed in your personal proposal." },
  tour: { title: "The valleys deserve your time.", description: "Heritage, village paths and remarkable landscapes, at a pace that leaves room to experience them. These private routes are starting points for your own journey.", note: "Each itinerary can be adapted to your interests, travel dates, comfort preferences and group. Seasonal access is reviewed before confirmation." },
  expedition: { title: "A higher objective. A considered plan.", description: "Mountaineering begins with experience, preparation and a clear support agreement. Explore the planning scope, then talk to us about your background and objectives.", note: "Expeditions require individual assessment. Published durations are indicative; permits, support arrangements and a written proposal are confirmed before any booking." },
};

const categories: JourneyKind[] = ["trek", "tour", "expedition"];

export function JourneyCatalogSection({ kind }: { kind: JourneyKind }) {
  const journeys = journeysByKind(kind);
  const copy = catalogCopy[kind];
  const items = journeys.map(({ slug, title, region, difficulty, durationDays, summary }) => ({ slug, title, region, difficulty, durationDays, summary }));
  return (
    <>
      <PageIntro eyebrow={journeyKindLabels[kind]} title={copy.title} description={copy.description}>
        <nav aria-label="Journey categories" className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link key={category} href={journeyKindPaths[category]} aria-current={category === kind ? "page" : undefined} className={cn("inline-flex min-h-12 items-center border px-5 py-3 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal", category === kind ? "border-midnight-navy bg-midnight-navy text-glacier-cream" : "border-midnight-navy/25 text-midnight-navy hover:border-alpine-teal hover:text-alpine-teal")}>{journeyKindLabels[category]}</Link>
          ))}
        </nav>
      </PageIntro>
      <section aria-label={`${journeyKindLabels[kind]} collection`} className="mx-auto w-full max-w-360 px-6 pb-16 sm:px-10 lg:px-16 lg:pb-24">
        <h2 className="sr-only">Explore {journeyKindLabels[kind].toLowerCase()}</h2>
        <JourneyCatalogExplorer items={items}>
          {journeys.map((journey) => <TravelCard key={journey.slug} journey={journey} />)}
        </JourneyCatalogExplorer>
        <p className="mt-10 max-w-3xl text-xs leading-6 text-slate-ink/75">{copy.note}</p>
      </section>
      <section aria-labelledby="catalog-plan-title" className="border-y border-midnight-navy/15 bg-white/40">
        <div className="mx-auto flex max-w-360 flex-col justify-between gap-8 px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:px-16 lg:py-16">
          <div className="max-w-2xl"><h2 id="catalog-plan-title" className="font-editorial text-3xl font-normal text-midnight-navy">Unsure where to begin?</h2><p className="mt-4 text-sm leading-7 text-slate-ink/80">Share your time, interests and experience. We can help narrow the options and shape a route around you.</p></div>
          <InquiryButton context={{ serviceType: kind }} className="w-fit shrink-0">Talk through your options</InquiryButton>
        </div>
      </section>
    </>
  );
}
