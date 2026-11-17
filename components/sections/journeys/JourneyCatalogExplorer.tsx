"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useId, useMemo, useState, type ReactNode } from "react";
import { CustomSelect } from "@/components/ui/CustomSelect";

export interface JourneyCatalogItem {
  slug: string;
  title: string;
  region: string;
  difficulty: string;
  durationDays: number;
  summary: string;
}

export function JourneyCatalogExplorer({
  items,
  children,
}: {
  items: JourneyCatalogItem[];
  children: ReactNode[];
}) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [duration, setDuration] = useState("all");
  const regions = useMemo(
    () => Array.from(new Set(items.map((item) => item.region))).sort(),
    [items],
  );
  const difficulties = useMemo(
    () => Array.from(new Set(items.map((item) => item.difficulty))),
    [items],
  );
  const matchingIndexes = items.flatMap((item, index) => {
    const textMatch = `${item.title} ${item.summary} ${item.region}`
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const regionMatch = region === "all" || item.region === region;
    const difficultyMatch =
      difficulty === "all" || item.difficulty === difficulty;
    const durationMatch =
      duration === "all" ||
      (duration === "short" && item.durationDays <= 10) ||
      (duration === "medium" &&
        item.durationDays > 10 &&
        item.durationDays <= 21) ||
      (duration === "long" && item.durationDays > 21);
    return textMatch && regionMatch && difficultyMatch && durationMatch
      ? [index]
      : [];
  });
  const hasFilters = Boolean(
    query || region !== "all" || difficulty !== "all" || duration !== "all",
  );
  function resetFilters() {
    setQuery("");
    setRegion("all");
    setDifficulty("all");
    setDuration("all");
  }

  return (
    <>
      <div className="border border-midnight-navy/15 bg-white p-5 sm:p-6 lg:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-midnight-navy/10 pb-4">
          <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-alpine-teal">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            <span>Filter routes</span>
          </p>
          <p role="status" aria-live="polite" className="text-xs text-slate-ink/80">
            {matchingIndexes.length}{" "}
            {matchingIndexes.length === 1 ? "journey" : "journeys"} to explore
          </p>
        </div>

        <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <label
              htmlFor={searchId}
              className="mb-2 block text-xs font-semibold text-midnight-navy"
            >
              Search journeys
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-4 size-4 text-alpine-teal"
                aria-hidden="true"
              />
              <input
                id={searchId}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="A route, valley or interest"
                maxLength={120}
                className="min-h-12 w-full border border-midnight-navy/25 bg-glacier-cream/50 py-3 pl-12 pr-4 text-base text-midnight-navy placeholder:text-slate-ink/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpine-teal"
              />
            </div>
          </div>
          <CustomSelect
            label="Region"
            value={region}
            onValueChange={setRegion}
            options={[
              { value: "all", label: "All regions" },
              ...regions.map((value) => ({ value, label: value })),
            ]}
          />
          <CustomSelect
            label="Challenge"
            value={difficulty}
            onValueChange={setDifficulty}
            options={[
              { value: "all", label: "All levels" },
              ...difficulties.map((value) => ({ value, label: value })),
            ]}
          />
          <CustomSelect
            label="Time available"
            value={duration}
            onValueChange={setDuration}
            options={[
              { value: "all", label: "Any duration" },
              { value: "short", label: "Up to 10 days" },
              { value: "medium", label: "11–21 days" },
              { value: "long", label: "Over 21 days" },
            ]}
          />
        </div>

        {hasFilters && (
          <div className="mt-5 border-t border-midnight-navy/10 pt-4">
            <button
              type="button"
              onClick={resetFilters}
              className="min-h-11 cursor-pointer px-2 text-sm font-semibold text-alpine-teal underline underline-offset-4 hover:text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {matchingIndexes.length > 0 ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {matchingIndexes.map((index) => (
            <li key={items[index].slug} className="min-w-0">
              {children[index]}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 border border-midnight-navy/20 bg-white px-6 py-12 text-center sm:px-12">
          <h3 className="font-editorial text-2xl font-normal text-midnight-navy">
            A different route may be waiting.
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-ink/80">
            Try a broader search or clear your filters. A private itinerary can
            also combine places and activities from more than one journey.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 min-h-12 cursor-pointer border border-midnight-navy bg-midnight-navy px-6 py-3 text-sm font-semibold text-glacier-cream hover:bg-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal"
          >
            Show all journeys
          </button>
        </div>
      )}
    </>
  );
}
