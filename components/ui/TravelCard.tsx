import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { TravelJourney } from "@/lib/data/travel-content";
import { cn } from "@/lib/utils";

export function TravelCard({ journey, className }: { journey: TravelJourney; className?: string }) {
  return (
    <article className={cn("flex min-w-0 flex-col", className)}>
      <Link href={journey.href} aria-label={`Explore ${journey.title}`} className="group relative block aspect-[4/3] overflow-hidden bg-midnight-navy/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">
        <Image src={journey.image.src} alt={journey.image.alt} fill sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 100vw" className="object-cover" />
        <span className="absolute bottom-4 left-4 bg-glacier-cream px-3 py-2 text-xs font-semibold text-midnight-navy">{journey.durationDays} days · {journey.difficulty}</span>
        <span aria-hidden="true" className="absolute right-4 top-4 flex size-11 items-center justify-center bg-glacier-cream text-midnight-navy group-hover:bg-warm-gold"><ArrowUpRight className="size-5" /></span>
      </Link>
      <div className="flex flex-1 flex-col border-b border-midnight-navy/20 pb-6 pt-5">
        <p className="text-xs font-medium text-alpine-teal">{journey.region}</p>
        <h3 className="mt-2 font-editorial text-3xl font-normal leading-tight text-midnight-navy"><Link href={journey.href} className="hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">{journey.title}</Link></h3>
        <p className="mt-3 text-sm leading-7 text-slate-ink/80">{journey.summary}</p>
        <dl className="mt-auto grid grid-cols-2 gap-4 pt-6 text-xs leading-6">
          <div><dt className="text-slate-ink/70">Best season</dt><dd className="font-medium text-midnight-navy">{journey.season}</dd></div>
          <div><dt className="text-slate-ink/70">Highest point</dt><dd className="font-medium text-midnight-navy">{journey.maxAltitude.toLocaleString("en-US")} m</dd></div>
        </dl>
      </div>
    </article>
  );
}
