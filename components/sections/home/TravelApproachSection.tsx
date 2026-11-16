import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOME_MEDIA } from "@/lib/data/home-media";
import { TravelPrincipleItem } from "@/components/ui/TravelPrincipleItem";

const principles = [
  { number: "01", title: "The right route, for you", text: "A gentle valley walk and a glacier traverse ask very different things of you. Start with your interests, experience and available time." },
  { number: "02", title: "A plan with room to breathe", text: "Mountain weather changes. Allow time to acclimatize, travel comfortably, and enjoy the places between the headline stops." },
  { number: "03", title: "Details before commitment", text: "Understand your itinerary, accommodation, support, exclusions and quoted costs before you decide to travel." },
];

export function TravelApproachSection() {
  return (
    <section id="our-approach" aria-labelledby="approach-title" className="bg-midnight-navy px-6 py-16 text-glacier-cream sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-warm-gold">Thoughtful travel / A little more considered</p>
          <h2 id="approach-title" className="mt-5 text-balance font-editorial text-4xl font-normal leading-tight sm:text-5xl">Big landscapes.<br /><em>Small, important details.</em></h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-glacier-cream/85">The mountains are extraordinary. A good journey also depends on the quieter things: a sensible pace, clear expectations, and time to connect with the people who call these valleys home.</p>
          <figure className="relative mt-8 aspect-[4/3] overflow-hidden"><Image src={HOME_MEDIA.journal.src} alt={HOME_MEDIA.journal.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" /></figure>
        </div>
        <div className="flex flex-col justify-center">
          {principles.map((principle) => <TravelPrincipleItem key={principle.number} {...principle} />)}
          <Link href="/about" className="mt-4 inline-flex min-h-11 w-fit items-center gap-3 border-b border-glacier-cream/60 py-2 text-sm font-semibold hover:text-warm-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold">Get to know our approach<ArrowUpRight aria-hidden="true" className="size-4" /></Link>
        </div>
      </div>
    </section>
  );
}
