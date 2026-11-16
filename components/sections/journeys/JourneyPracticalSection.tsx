import Link from "next/link";
import { JourneySectionHeading } from "./JourneySectionHeading";
import type { TravelJourney } from "@/lib/data/travel-content";

export function JourneyPracticalSection({ journey }: { journey: TravelJourney }) {
  return (
    <section id="practical" aria-label="Practical journey information" className="mx-auto max-w-360 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <JourneySectionHeading eyebrow="Before you commit" title="Good planning is part of the experience." description="These are the conversations to have early, so the final route fits your needs and the realities of mountain travel." />
      <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">{journey.practical.map((item) => <div key={item.label} className="border-t border-midnight-navy/20 pt-6"><dt className="text-base font-semibold text-midnight-navy">{item.label}</dt><dd className="mt-4 max-w-xl text-sm leading-7 text-slate-ink/80">{item.description}</dd></div>)}</dl>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3"><Link href="/travel-guide" className="inline-flex min-h-11 items-center text-sm font-semibold text-alpine-teal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Explore the travel guide</Link><a href="https://www.gov.uk/foreign-travel-advice/pakistan" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-alpine-teal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Check current regional travel advice</a></div>
    </section>
  );
}
