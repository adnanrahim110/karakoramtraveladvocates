import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const choices = [
  { title: "Travel at valley pace", href: "/tours", text: "Choose heritage, village walks and comfortable bases in Hunza or Baltistan. A flexible private itinerary leaves space for what interests you." },
  { title: "Walk into the mountains", href: "/treks", text: "Start with a shorter base-camp journey or work towards a multi-week glacier trek. Compare terrain and preparation alongside the scenery." },
  { title: "Take on a climbing objective", href: "/expeditions", text: "A technical expedition begins with a conversation about previous experience, the route and the support required on the mountain." },
];

export function PakistanRouteChoiceSection() {
  return <section aria-labelledby="pakistan-route-choice-title" className="mx-auto max-w-360 px-6 py-16 sm:px-10 lg:px-16 lg:py-24"><h2 id="pakistan-route-choice-title" className="font-editorial text-4xl font-normal text-midnight-navy">Choose your way into the landscape.</h2><div className="mt-10 grid gap-8 md:grid-cols-3">{choices.map((choice) => <article key={choice.href} className="border-t border-midnight-navy/25 pt-6"><h3 className="font-editorial text-3xl font-normal leading-tight text-midnight-navy">{choice.title}</h3><p className="mt-4 text-sm leading-7 text-slate-ink/85">{choice.text}</p><Link href={choice.href} className="mt-6 inline-flex min-h-11 items-center gap-3 text-xs font-semibold text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4">Explore the journeys <ArrowUpRight className="size-4" aria-hidden="true" /></Link></article>)}</div></section>;
}
