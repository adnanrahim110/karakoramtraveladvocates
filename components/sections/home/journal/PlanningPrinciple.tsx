interface PlanningPrincipleProps {
  number: string;
  title: string;
  description: string;
}

export function PlanningPrinciple({
  number,
  title,
  description,
}: PlanningPrincipleProps) {
  return (
    <div className="relative border-t border-glacier-cream/20 px-0 py-10 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:px-8">
      <dt>
        <span
          className="block font-sans text-5xl font-medium tracking-[-0.06em] text-warm-gold/90"
          aria-hidden="true"
        >
          {number}
        </span>
        <span className="mt-6 block max-w-xs font-sans text-xl font-semibold leading-snug tracking-[-0.02em]">
          {title}
        </span>
      </dt>
      <dd className="mt-5 max-w-sm text-sm leading-7 text-glacier-cream/85">
        {description}
      </dd>
    </div>
  );
}
