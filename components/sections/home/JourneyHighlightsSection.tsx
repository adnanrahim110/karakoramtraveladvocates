import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TravelCard } from "@/components/ui/TravelCard";
import { journeysByKind, type TravelJourney } from "@/lib/data/travel-content";
import { cn } from "@/lib/utils";

interface JourneyHighlightsSectionProps {
  kind: TravelJourney["kind"];
  eyebrow: string;
  title: string;
  description: string;
  limit?: number;
}

export function JourneyHighlightsSection({ kind, eyebrow, title, description, limit = 3 }: JourneyHighlightsSectionProps) {
  const href = kind === "tour" ? "/tours" : kind === "trek" ? "/treks" : "/expeditions";
  return (
    <section id={kind === "trek" ? "journeys" : "cultural-journeys"} aria-labelledby={`${kind}-highlights-title`} className={cn("px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24", kind === "tour" && "bg-white/50")}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">{eyebrow}</p><h2 id={`${kind}-highlights-title`} className="mt-4 text-balance font-editorial text-4xl font-normal leading-tight text-midnight-navy sm:text-5xl">{title}</h2><p className="mt-5 max-w-xl text-sm leading-7 text-slate-ink/80 sm:text-base">{description}</p></div>
          <Link href={href} className="inline-flex min-h-11 items-center gap-3 border-b border-midnight-navy py-2 text-sm font-semibold text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">Explore all {kind === "tour" ? "tours" : "treks"}<ArrowUpRight aria-hidden="true" className="size-4" /></Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">{journeysByKind(kind).slice(0, limit).map((journey) => <TravelCard key={journey.slug} journey={journey} />)}</div>
      </div>
    </section>
  );
}
