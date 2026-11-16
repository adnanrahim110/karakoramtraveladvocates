import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOME_MEDIA } from "@/lib/data/home-media";

export function WhyTravelPakistanSection() {
  return (
    <section aria-labelledby="home-why-title" className="border-y border-midnight-navy/15 bg-white/50 px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <figure className="relative aspect-[4/3] overflow-hidden lg:col-span-5"><Image src={HOME_MEDIA.fairyMeadows.src} alt={HOME_MEDIA.fairyMeadows.alt} fill sizes="(min-width: 1024px) 500px, 100vw" className="object-cover" /></figure>
        <div className="lg:col-span-7"><p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">Why Pakistan?</p><h2 id="home-why-title" className="mt-4 font-editorial text-4xl font-normal leading-tight text-midnight-navy sm:text-5xl">The peaks draw you in.<br /><em>The valleys stay with you.</em></h2><p className="mt-6 text-base leading-8 text-slate-ink/80">The Karakoram is home to immense glaciers and some of the world’s highest mountains. Between them are living landscapes: orchards, old trade routes, Balti stone villages, and the varied cultures of Hunza and Gojal.</p><p className="mt-4 text-sm leading-7 text-slate-ink/80">Come for a demanding trek or travel at a gentler pace. Either way, choose a route with a clear view of its season, logistics, and what a day on the ground involves.</p><Link href="/why-pakistan" className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-midnight-navy py-2 text-sm font-semibold text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">Get the fuller picture<ArrowUpRight aria-hidden="true" className="size-4" /></Link></div>
      </div>
    </section>
  );
}
