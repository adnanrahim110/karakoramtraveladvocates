import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { JourneyPreview } from "@/lib/types/home";

export function JourneyIndexRow({
  journey,
  index,
  isActive,
  onSelect,
}: {
  journey: JourneyPreview;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <li className="border-b border-midnight-navy/20">
      <button
        type="button"
        aria-pressed={isActive}
        aria-controls="journey-preview"
        onClick={onSelect}
        className={cn(
          "group flex min-h-24 w-full cursor-pointer items-center gap-4 p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-alpine-teal",
          isActive
            ? "bg-midnight-navy text-glacier-cream"
            : "text-midnight-navy hover:bg-midnight-navy/5",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 font-mono text-xs",
            isActive ? "text-warm-gold" : "text-alpine-teal",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="relative hidden h-16 w-16 shrink-0 overflow-hidden sm:block">
          <Image
            src={journey.image.src}
            alt=""
            fill
            quality={90}
            sizes="64px"
            className="object-cover transition-transform duration-[140ms] ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover:scale-110 group-hover:duration-[220ms] motion-reduce:transition-none motion-reduce:transform-none"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold leading-6">
            {journey.title}
          </span>
          <span
            className={cn(
              "mt-2 block font-mono text-[10px] uppercase tracking-[0.1em]",
              isActive ? "text-glacier-cream/85" : "text-slate-ink/75",
            )}
          >
            {journey.durationDays} days / {journey.serviceType}
          </span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0",
            isActive ? "text-warm-gold" : "text-alpine-teal",
          )}
        />
      </button>
    </li>
  );
}
