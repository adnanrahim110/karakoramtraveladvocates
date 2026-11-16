const principles = [
  { title: "Room for local life", text: "A village is someone's home. Ask before taking portraits, respect local customs and choose encounters that make sense for the community." },
  { title: "Time for the unexpected", text: "Weather, a conversation or an interesting path can change a day. Flexible plans make room for both discovery and practical adjustments." },
  { title: "Care in the mountains", text: "Minimise waste, protect water sources and leave campsites carefully. Respect for the people supporting a journey matters alongside its scenery." },
];

export function TravelPrinciplesSection() {
  return <section aria-labelledby="travel-principles-title" className="mx-auto max-w-360 px-6 py-16 sm:px-10 lg:px-16 lg:py-24"><h2 id="travel-principles-title" className="font-editorial text-4xl font-normal text-midnight-navy">A thoughtful way to travel.</h2><div className="mt-10 grid gap-10 md:grid-cols-3">{principles.map((item) => <article key={item.title}><h3 className="font-editorial text-2xl font-normal text-midnight-navy">{item.title}</h3><p className="mt-4 text-sm leading-7 text-slate-ink/85">{item.text}</p></article>)}</div></section>;
}
