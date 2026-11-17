import { cn } from "@/lib/utils";

export interface SeasonTabInfo {
  readonly id: string;
  readonly indexLabel: string;
  readonly months: string;
  readonly shortTitle: string;
  readonly altitudeBand: string;
}

export const ALMANAC_MONTHS = [
  { index: 0, short: "Apr", upper: "APR" },
  { index: 1, short: "May", upper: "MAY" },
  { index: 2, short: "Jun", upper: "JUN" },
  { index: 3, short: "Jul", upper: "JUL" },
  { index: 4, short: "Aug", upper: "AUG" },
  { index: 5, short: "Sep", upper: "SEP" },
  { index: 6, short: "Oct", upper: "OCT" },
] as const;

interface DepartureSeasonTabProps {
  season: SeasonTabInfo;
  isActive: boolean;
  onSelect: (id: string) => void;
  controlsId: string;
}

export function DepartureSeasonTab({
  season,
  isActive,
  onSelect,
  controlsId,
}: DepartureSeasonTabProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-controls={controlsId}
      onClick={() => onSelect(season.id)}
      className={cn(
        "group/tab relative flex min-h-24 w-full cursor-pointer flex-col justify-between border border-midnight-navy/15 text-left transition-colors duration-150 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-warm-gold motion-reduce:transition-none",
        isActive
          ? "bg-midnight-navy text-glacier-cream"
          : "bg-white text-midnight-navy hover:bg-white/80",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block h-1 w-full transition-colors duration-150 motion-reduce:transition-none",
          isActive
            ? "bg-warm-gold"
            : "bg-transparent group-hover/tab:bg-alpine-teal/40",
        )}
      />
      <span className="flex w-full flex-col gap-3 p-4 sm:p-6">
        <span className="flex flex-wrap items-baseline justify-between gap-2">
          <span
            className={cn(
              "font-mono text-xs font-medium uppercase tracking-[0.14em]",
              isActive ? "text-warm-gold" : "text-alpine-teal",
            )}
          >
            {season.indexLabel} · {season.months}
          </span>
          <span
            className={cn(
              "font-mono text-xs tabular-nums",
              isActive ? "text-glacier-cream/75" : "text-slate-ink/70",
            )}
          >
            {season.altitudeBand}
          </span>
        </span>
        <span className="font-editorial text-2xl leading-tight font-normal tracking-tight sm:text-3xl">
          {season.shortTitle}
        </span>
      </span>
    </button>
  );
}
