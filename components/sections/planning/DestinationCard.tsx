import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { TravelDestination } from "@/lib/data/destination-content";

export function DestinationCard({
  destination,
  headingLevel = "h2",
}: {
  destination: TravelDestination;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden bg-midnight-navy text-glacier-cream">
      <Image
        src={destination.image.src}
        alt={destination.image.alt}
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-midnight-navy/85 via-midnight-navy/25 to-transparent"
      />
      <div className="relative z-10 p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-warm-gold uppercase">
          {destination.region}
        </p>
        <Heading className="mt-2 font-editorial text-3xl font-normal leading-tight text-glacier-cream">
          <Link
            href={destination.href}
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold"
          >
            {destination.name}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-glacier-cream/85">
          {destination.summary}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-warm-gold">
          <span>{destination.suggestedStay}</span>
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
            aria-hidden="true"
          />
        </p>
      </div>
    </article>
  );
}
