import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HOME_MEDIA } from "@/lib/data/home-media";

const routes = [
  { label: "Walk the high trails", caption: "Treks", href: "/treks" },
  { label: "Take the scenic route", caption: "Private tours", href: "/tours" },
  { label: "Go a little higher", caption: "Expeditions", href: "/expeditions" },
];

export function TravelHeroSection() {
  return (
    <section aria-labelledby="home-title" className="overflow-hidden border-b border-midnight-navy/15 pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto grid max-w-360 gap-10 px-6 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-16">
        <div className="flex flex-col justify-center pb-4 lg:col-span-6 lg:pb-12 lg:pr-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">Pakistan / Mountains, culture &amp; the unexpected</p>
          <h1 id="home-title" className="mt-6 text-balance font-editorial text-6xl font-normal leading-none tracking-tight text-midnight-navy sm:text-7xl xl:text-8xl">A different<br />kind of <em className="text-alpine-teal">north.</em></h1>
          <p className="mt-8 max-w-lg text-base leading-8 text-slate-ink/80 sm:text-lg">Walk beneath K2. Follow the orchards of Hunza. Make time for a conversation in a mountain village. Discover Pakistan through a journey built around you.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/treks" className="inline-flex min-h-14 items-center justify-between gap-6 bg-midnight-navy px-6 py-4 text-sm font-semibold text-glacier-cream hover:bg-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">Find your journey <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
            <a href="#plan-your-trip" className="inline-flex min-h-14 items-center gap-3 border-b border-midnight-navy px-4 py-4 text-sm font-semibold text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">Plan something personal <ArrowDown aria-hidden="true" className="size-4" /></a>
          </div>
          <p className="mt-8 text-xs leading-6 text-slate-ink/70">Cultural journeys · Guided treks · Mountain expeditions</p>
        </div>
        <figure className="relative min-h-112 lg:col-span-6 lg:min-h-152">
          <Image src={HOME_MEDIA.tailor.src} alt={HOME_MEDIA.tailor.alt} fill preload sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <figcaption className="absolute bottom-0 inset-x-0 bg-midnight-navy/90 px-6 py-4 text-glacier-cream">
            <span className="block text-sm font-medium">The road to Passu, Upper Hunza</span>
            <span className="mt-1 block text-xs leading-5 text-glacier-cream/80">A journey begins long before the trail.</span>
          </figcaption>
        </figure>
      </div>
      <nav aria-label="Choose your travel style" className="mx-auto mt-10 grid max-w-360 divide-y divide-midnight-navy/15 border-t border-midnight-navy/15 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-10 lg:px-16">
        {routes.map((route) => (
          <Link key={route.href} href={route.href} className="group flex min-h-24 items-center justify-between gap-4 py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0 hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">
            <span><span className="block text-xs font-medium text-alpine-teal">{route.caption}</span><span className="mt-1 block font-editorial text-xl text-midnight-navy lg:text-2xl">{route.label}</span></span><ArrowUpRight aria-hidden="true" className="size-5 shrink-0" />
          </Link>
        ))}
      </nav>
    </section>
  );
}
