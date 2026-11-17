const steps = [
  {
    number: "01",
    title: "Start with your brief",
    text: "Tell us your dates, group size, interests and recent walking or climbing experience. You can begin with a route or leave the destination open.",
  },
  {
    number: "02",
    title: "Shape the right itinerary",
    text: "We discuss the pace, travel connections, accommodation and route requirements. Optional days and practical tradeoffs are part of the conversation.",
  },
  {
    number: "03",
    title: "Confirm the details",
    text: "A written proposal sets out the arrangements and quote. Review what is included, personal responsibilities and the conditions before committing.",
  },
];

export function PlanningProcessSection() {
  return (
    <section
      aria-labelledby="planning-process-title"
      className="border-y border-glacier-cream/15 bg-midnight-navy text-glacier-cream"
    >
      <div className="mx-auto max-w-400 px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-gold">
          How we plan
        </p>
        <h2
          id="planning-process-title"
          className="mt-4 max-w-2xl font-editorial text-4xl font-normal leading-tight text-glacier-cream sm:text-5xl"
        >
          From a first idea to a clear plan.
        </h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {steps.map((step) => (
            <li
              key={step.number}
              className="border-t border-glacier-cream/20 pt-8"
            >
              <span
                aria-hidden="true"
                className="font-mono text-4xl font-light tracking-tight text-warm-gold/80 sm:text-5xl"
              >
                {step.number}
              </span>
              <h3 className="mt-6 font-editorial text-3xl font-normal leading-snug text-glacier-cream">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-glacier-cream/80">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
