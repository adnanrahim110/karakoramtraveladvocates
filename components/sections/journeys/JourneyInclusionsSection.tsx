import { JourneySectionHeading } from "./JourneySectionHeading";
import type { TravelJourney } from "@/lib/data/travel-content";

export function JourneyInclusionsSection({ journey }: { journey: TravelJourney }) {
  const columns = [{ title: "What the proposal covers", items: journey.included }, { title: "Items to check separately", items: journey.excluded }];
  return (
    <section aria-label="Quote and inclusion planning" className="border-y border-midnight-navy/15 bg-white/35">
      <div className="mx-auto max-w-360 px-6 py-16 sm:px-10 lg:px-16 lg:py-20"><JourneySectionHeading eyebrow="A clear scope" title="Understand the whole cost." description="These are planning categories, rather than a fixed package promise. The written quote confirms exactly what is included, excluded and optional for your journey." /><div className="mt-10 grid gap-8 sm:grid-cols-2">{columns.map((column) => <div key={column.title} className="border-t border-midnight-navy/20 pt-6"><h3 className="text-base font-semibold text-midnight-navy">{column.title}</h3><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-ink/85">{column.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></div>
    </section>
  );
}
