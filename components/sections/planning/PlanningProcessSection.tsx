const steps = [
  { number: "01", title: "Start with your brief", text: "Tell us your dates, group size, interests and recent walking or climbing experience. You can begin with a route or leave the destination open." },
  { number: "02", title: "Shape the right itinerary", text: "We discuss the pace, travel connections, accommodation and route requirements. Optional days and practical tradeoffs are part of the conversation." },
  { number: "03", title: "Confirm the details", text: "A written proposal sets out the arrangements and quote. Review what is included, personal responsibilities and the conditions before committing." },
];

export function PlanningProcessSection() {
  return <section aria-labelledby="planning-process-title" className="border-y border-midnight-navy/20 bg-white/35"><div className="mx-auto max-w-360 px-6 py-16 sm:px-10 lg:px-16 lg:py-24"><p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">How we plan</p><h2 id="planning-process-title" className="mt-4 font-editorial text-4xl font-normal text-midnight-navy">From a first idea to a clear plan.</h2><ol className="mt-12 grid gap-10 md:grid-cols-3">{steps.map((step) => <li key={step.number} className="border-t border-midnight-navy/25 pt-6"><span className="font-mono text-sm text-alpine-teal" aria-hidden="true">{step.number}</span><h3 className="mt-5 font-editorial text-3xl font-normal text-midnight-navy">{step.title}</h3><p className="mt-4 text-sm leading-7 text-slate-ink/85">{step.text}</p></li>)}</ol></div></section>;
}
