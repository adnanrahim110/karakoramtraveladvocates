import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { TravelJourney } from "@/lib/data/travel-content";

export function JourneyDirectoryRoute({ journey }: { journey: TravelJourney }) {
  const titleId = `directory-${journey.slug}`;

  return (
    <li className="min-w-0">
      <Link
        href={journey.href}
        prefetch={false}
        aria-labelledby={titleId}
        className="group/route flex h-full min-h-20 items-start justify-between gap-3 bg-white p-4 text-midnight-navy hover:bg-glacier-cream/80 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-alpine-teal sm:p-5"
      >
        <div className="min-w-0">
          <p className="text-xs leading-5 font-medium text-alpine-teal">{journey.region}</p>
          <h4 id={titleId} className="mt-1 font-editorial text-lg leading-6 font-normal tracking-normal wrap-anywhere group-hover/route:underline group-hover/route:underline-offset-4">
            {journey.title}
          </h4>
          <dl className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs leading-5 text-slate-ink/80">
            <div>
              <dt className="sr-only">Duration</dt>
              <dd>{journey.durationDays} days</dd>
            </div>
            <div>
              <dt className="sr-only">Difficulty</dt>
              <dd>{journey.difficulty}</dd>
            </div>
            <div>
              <dt className="sr-only">Season</dt>
              <dd>{journey.season}</dd>
            </div>
          </dl>
        </div>
        <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-alpine-teal group-hover/route:text-midnight-navy" />
      </Link>
    </li>
  );
}
