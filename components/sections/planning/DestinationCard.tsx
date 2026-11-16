import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { TravelDestination } from "@/lib/data/destination-content";

export function DestinationCard({ destination, headingLevel = "h2" }: { destination: TravelDestination; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="border-t border-midnight-navy/25 pt-4">
      <div className="relative aspect-[4/3] overflow-hidden"><Image src={destination.image.src} alt={destination.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div>
      <p className="mt-5 text-xs font-semibold text-alpine-teal">{destination.region}</p>
      <Heading className="mt-3 font-editorial text-3xl font-normal leading-tight text-midnight-navy"><Link href={destination.href} className="hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4">{destination.name}</Link></Heading>
      <p className="mt-4 text-sm leading-7 text-slate-ink/80">{destination.summary}</p>
      <Link href={destination.href} aria-label={`Explore ${destination.name}`} className="mt-4 inline-flex min-h-11 items-center gap-3 text-xs font-semibold text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4">Explore the region <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
    </article>
  );
}
