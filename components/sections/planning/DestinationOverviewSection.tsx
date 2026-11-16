import Image from "next/image";
import type { TravelDestination } from "@/lib/data/destination-content";

export function DestinationOverviewSection({ destination }: { destination: TravelDestination }) {
  return (
    <section aria-labelledby="destination-overview-title" className="mx-auto w-full max-w-360 px-6 pb-16 pt-12 sm:px-10 lg:px-16 lg:pb-24">
      <figure><div className="relative aspect-[3/2] overflow-hidden sm:aspect-[16/7]"><Image src={destination.image.src} alt={destination.image.alt} fill sizes="(min-width: 1440px) 1312px, 100vw" preload className="object-cover" /></div><figcaption className="mt-3 text-xs leading-6 text-slate-ink/70">{destination.image.credit} · <a href={destination.image.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-2">{destination.image.license}</a></figcaption></figure>
      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16"><div className="lg:col-span-4"><p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">A closer look</p><h2 id="destination-overview-title" className="mt-4 font-editorial text-4xl font-normal leading-tight text-midnight-navy">Time well spent in {destination.name}.</h2></div><div className="space-y-6 text-base leading-8 text-slate-ink/85 lg:col-span-7 lg:col-start-6">{destination.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
    </section>
  );
}
