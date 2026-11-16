import { Check, ArrowUpRight } from "lucide-react";
import { JourneySectionHeading } from "./JourneySectionHeading";
import type { TravelJourney } from "@/lib/data/travel-content";

export function JourneyOverviewSection({ journey }: { journey: TravelJourney }) {
  return (
    <section id="overview" aria-label="Journey overview" className="mx-auto grid max-w-360 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-24">
      <div className="lg:col-span-7">
        <JourneySectionHeading eyebrow="The experience" title="A route worth understanding." />
        <div className="mt-6 space-y-5 text-sm leading-8 text-slate-ink/85 sm:text-base">{journey.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <h3 className="mt-10 text-lg font-semibold text-midnight-navy">What makes it special</h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">{journey.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-3 text-sm leading-7"><Check className="mt-1 size-4 shrink-0 text-alpine-teal" aria-hidden="true" /><span>{highlight}</span></li>)}</ul>
        {journey.accessNotice && <aside id="route-advice" className="mt-8 scroll-mt-28 border border-amber-800/30 bg-amber-50 p-6 text-amber-950"><h3 className="text-base font-semibold">{journey.accessNotice.title}</h3><p className="mt-3 text-sm leading-7">{journey.accessNotice.description}</p><a href={journey.accessNotice.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">{journey.accessNotice.sourceLabel}<ArrowUpRight className="size-4" aria-hidden="true" /></a></aside>}
      </div>
      <aside aria-labelledby="journey-fit-title" className="h-fit border-t-4 border-alpine-teal bg-white/50 p-6 sm:p-8 lg:col-span-5">
        <h2 id="journey-fit-title" className="font-editorial text-2xl font-normal text-midnight-navy">Is this your kind of journey?</h2>
        <ul className="mt-5 space-y-3 text-sm leading-7">{journey.suitability.map((item) => <li key={item} className="border-b border-midnight-navy/10 pb-3">{item}</li>)}</ul>
        <h3 className="mt-8 text-sm font-semibold text-midnight-navy">The practical trade-offs</h3>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-ink/80">{journey.considerations.map((item) => <li key={item}>{item}</li>)}</ul>
      </aside>
    </section>
  );
}
