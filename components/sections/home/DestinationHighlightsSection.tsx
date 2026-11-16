import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DestinationCard } from "@/components/sections/planning/DestinationCard";
import { travelDestinations } from "@/lib/data/destination-content";

export function DestinationHighlightsSection() {
  return (
    <section id="destinations" aria-labelledby="home-destinations-title" className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">Find your place</p><h2 id="home-destinations-title" className="mt-4 font-editorial text-4xl font-normal leading-tight text-midnight-navy sm:text-5xl">One country.<br /><em>So many ways to feel far away.</em></h2></div><Link href="/destinations" className="inline-flex min-h-11 items-center gap-3 border-b border-midnight-navy py-2 text-sm font-semibold text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">Explore destinations<ArrowUpRight aria-hidden="true" className="size-4" /></Link></div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">{travelDestinations.slice(0, 3).map((destination) => <DestinationCard key={destination.slug} destination={destination} headingLevel="h3" />)}</div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-midnight-navy/20 pt-4"><span className="text-xs font-medium text-slate-ink/70">Further along the way</span>{travelDestinations.slice(3).map((destination) => <Link key={destination.slug} href={destination.href} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-alpine-teal hover:text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-4">{destination.name}<ArrowUpRight aria-hidden="true" className="size-4" /></Link>)}</div>
      </div>
    </section>
  );
}
