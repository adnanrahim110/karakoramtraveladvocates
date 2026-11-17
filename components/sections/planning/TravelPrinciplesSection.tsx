const principles = [
  {
    label: "Community",
    title: "Room for local life",
    text: "A village is someone's home. Ask before taking portraits, respect local customs and choose encounters that make sense for the community.",
  },
  {
    label: "Judgement",
    title: "Time for the unexpected",
    text: "Weather, a conversation or an interesting path can change a day. Flexible plans make room for both discovery and practical adjustments.",
  },
  {
    label: "Stewardship",
    title: "Care in the mountains",
    text: "Minimise waste, protect water sources and leave campsites carefully. Respect for the people supporting a journey matters alongside its scenery.",
  },
];

export function TravelPrinciplesSection() {
  return (
    <section
      aria-labelledby="travel-principles-title"
      className="mx-auto max-w-400 px-6 py-16 sm:px-10 lg:px-16 lg:py-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-alpine-teal">
        On the ground
      </p>
      <h2
        id="travel-principles-title"
        className="mt-3 font-editorial text-4xl font-normal text-midnight-navy sm:text-5xl"
      >
        A thoughtful way to travel.
      </h2>
      <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
        {principles.map((item) => (
          <article
            key={item.title}
            className="border-t border-midnight-navy/20 pt-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-alpine-teal">
              {item.label}
            </p>
            <h3 className="mt-3 font-editorial text-2xl font-normal text-midnight-navy">
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-ink/85">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
