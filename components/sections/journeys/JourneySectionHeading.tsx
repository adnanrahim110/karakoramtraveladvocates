export function JourneySectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">{eyebrow}</p>
      <h2 className="mt-4 font-editorial text-3xl font-normal leading-tight text-midnight-navy sm:text-4xl">{title}</h2>
      {description && <p className="mt-5 text-sm leading-7 text-slate-ink/80 sm:text-base">{description}</p>}
    </div>
  );
}
