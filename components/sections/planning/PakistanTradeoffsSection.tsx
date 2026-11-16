import Link from "next/link";

const considerations = [
  { title: "Travel takes time", text: "Distances on a map do not tell you the whole story. Mountain flights, road access and weather should shape your buffer days." },
  { title: "Altitude needs attention", text: "Even a scenic road excursion can climb high. Look at sleeping elevations, recovery days and how the route fits your experience." },
  { title: "Remote means less infrastructure", text: "Glacier treks involve camping, limited connectivity and long distances from roads. Confirm support and insurance for your actual route." },
  { title: "Conditions are regional", text: "Access and travel advice vary across Pakistan and can change. Check the destination and the corridors used to reach it." },
];

export function PakistanTradeoffsSection() {
  return <section aria-labelledby="pakistan-tradeoffs-title" className="border-y border-midnight-navy/20 bg-midnight-navy text-glacier-cream"><div className="mx-auto max-w-360 px-6 py-16 sm:px-10 lg:px-16 lg:py-24"><p className="text-xs font-semibold uppercase tracking-widest text-warm-gold">The practical side</p><h2 id="pakistan-tradeoffs-title" className="mt-4 max-w-3xl font-editorial text-4xl font-normal leading-tight sm:text-5xl">A remarkable place.<br />A journey worth preparing for.</h2><div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">{considerations.map((item) => <article key={item.title} className="border-t border-glacier-cream/30 pt-5"><h3 className="font-editorial text-2xl font-normal">{item.title}</h3><p className="mt-4 text-sm leading-7 text-glacier-cream/85">{item.text}</p></article>)}</div><Link href="/travel-guide" className="mt-10 inline-flex min-h-12 items-center text-sm font-semibold text-warm-gold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Get the practical planning details</Link></div></section>;
}
