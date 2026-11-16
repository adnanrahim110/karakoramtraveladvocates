"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PointerSurface } from "@/components/motion/PointerSurface";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { JourneyIndexRow } from "./JourneyIndexRow";
import { cn, formatAltitude } from "@/lib/utils";
import type { ServicePillar } from "@/lib/types/cms";
import type { JourneyPreview } from "@/lib/types/home";

const filters: { value: "all" | ServicePillar; label: string }[] = [
  { value: "all", label: "All" },
  { value: "tour", label: "Tours" },
  { value: "trek", label: "Treks" },
  { value: "expedition", label: "Expeditions" },
];

export function JourneyExplorer({ journeys }: { journeys: JourneyPreview[] }) {
  const [filter, setFilter] = useState<"all" | ServicePillar>("all");
  const [selectedId, setSelectedId] = useState(journeys[0]?.id);
  const previewRef = useRef<HTMLElement>(null);
  const filtered =
    filter === "all"
      ? journeys
      : journeys.filter((journey) => journey.serviceType === filter);
  const selected =
    filtered.find((journey) => journey.id === selectedId) ?? filtered[0];
  const selectJourney = (id: string) => {
    setSelectedId(id);
    if (window.matchMedia("(max-width:1023px)").matches)
      requestAnimationFrame(() => {
        previewRef.current?.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
        previewRef.current?.focus({ preventScroll: true });
      });
  };
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6 border-y border-midnight-navy/20 py-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-alpine-teal">
          The collection / {journeys.length} ways into the north
        </p>
        <div aria-label="Filter journeys" className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
              className={cn(
                "min-h-12 cursor-pointer border px-4 py-3 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal",
                filter === item.value
                  ? "border-midnight-navy bg-midnight-navy text-glacier-cream"
                  : "border-midnight-navy/20 bg-transparent text-midnight-navy hover:border-alpine-teal hover:bg-alpine-teal hover:text-glacier-cream",
              )}
            >
              {item.label}
              <span className="ml-2 font-mono text-[10px]">
                {item.value === "all"
                  ? journeys.length
                  : journeys.filter(
                      (journey) => journey.serviceType === item.value,
                    ).length}
              </span>
            </button>
          ))}
        </div>
      </div>
      {selected ? (
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <article
            ref={previewRef}
            id="journey-preview"
            tabIndex={-1}
            aria-label="Selected journey details"
            className="min-w-0 scroll-mt-28 focus:outline-none lg:col-span-8"
          >
            <h3 className="sr-only">{selected.title}</h3>
            <PointerSurface
              label="EXPLORE THIS ROUTE"
              strength={18}
              className="group relative isolate overflow-hidden bg-midnight-navy"
            >
              <Link
                href={selected.href}
                aria-label={"Explore " + selected.title}
                className="relative isolate flex min-h-[520px] w-full cursor-pointer flex-col justify-between overflow-hidden p-6 text-left text-glacier-cream focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-warm-gold sm:min-h-[600px] sm:p-10"
              >
                <span
                  data-pointer-layer
                  className="pointer-events-none absolute -inset-6 -z-20"
                >
                  <Image
                    src={selected.image.src}
                    alt={selected.image.alt}
                    fill
                    quality={90}
                    sizes="(max-width:1024px) 100vw, 67vw"
                    className="object-cover"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-midnight-navy/95 via-midnight-navy/10 to-midnight-navy/45"
                />
                <span className="flex w-full items-center justify-between gap-4">
                  <span className="border border-glacier-cream/60 bg-midnight-navy/30 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em]">
                    {selected.serviceType === "tour"
                      ? "Private tour"
                      : selected.serviceType === "trek"
                        ? "Guided trek"
                        : "Expedition"}
                  </span>
                  <ArrowUpRight
                    className="h-8 w-8 transition-transform duration-[140ms] ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:duration-[220ms] motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-24">
                  <span className="block font-mono text-xs uppercase tracking-[0.16em] text-warm-gold">
                    A different perspective
                  </span>
                  <span className="mt-4 block max-w-2xl break-words font-sans text-3xl font-semibold uppercase leading-[1.05] tracking-[-0.04em] sm:text-4xl">
                    {selected.title}
                  </span>
                  <span className="mt-6 block text-sm text-glacier-cream/90">
                    Explore the route. Make it your own.
                  </span>
                </span>
              </Link>
            </PointerSurface>
            <dl className="grid grid-cols-2 border-b border-midnight-navy/20 py-8 sm:grid-cols-3">
              <div className="min-w-0 border-r border-midnight-navy/20 pr-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-alpine-teal">
                  Days away
                </dt>
                <dd className="mt-3 font-editorial text-4xl leading-none text-midnight-navy sm:text-5xl">
                  {selected.durationDays}
                </dd>
              </div>
              <div className="min-w-0 pl-4 sm:border-r sm:border-midnight-navy/20 sm:pr-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-alpine-teal">
                  Highest point
                </dt>
                <dd className="mt-3 text-lg font-semibold text-midnight-navy sm:text-2xl">
                  {formatAltitude(selected.maxAltitudeMeters)}
                </dd>
              </div>
              <div className="col-span-2 mt-6 min-w-0 border-t border-midnight-navy/20 pt-6 sm:col-span-1 sm:mt-0 sm:border-t-0 sm:pl-4 sm:pt-0">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-alpine-teal">
                  Your proposal
                </dt>
                <dd className="mt-3 text-lg font-semibold text-midnight-navy sm:text-2xl">
                  {selected.price
                    ? "$" + selected.price.toLocaleString("en-US")
                    : "On request"}
                </dd>
              </div>
            </dl>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <p className="text-sm leading-7 text-slate-ink/85">
                {selected.summary}
              </p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-midnight-navy">
                  Your route at a glance
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-ink/80">
                  {selected.season}
                  <br />
                  {selected.grade}
                </p>
                <InquiryButton
                  className="mt-6 w-full"
                  context={{
                    tripTitle: selected.title,
                    tripSlug: selected.slug,
                    serviceType: selected.serviceType,
                    regionName: selected.region,
                  }}
                >
                  Discuss this journey
                </InquiryButton>
              </div>
            </div>
            <details className="group mt-7 border-y border-midnight-navy/20">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4">
                What makes this route extraordinary
                <span aria-hidden="true" className="text-2xl group-open:hidden">
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-2xl group-open:block"
                >
                  −
                </span>
              </summary>
              <ul className="space-y-3 pb-6 text-sm leading-7 text-slate-ink/85">
                {selected.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </details>
          </article>
          <aside
            aria-label="Journey collection index"
            className="min-w-0 lg:col-span-4"
          >
            <div className="mb-4 flex justify-between font-mono text-xs uppercase tracking-[0.12em] text-alpine-teal">
              <span>Route directory</span>
              <span>Select a route</span>
            </div>
            <ol data-lenis-prevent className="max-h-160 overflow-y-auto overscroll-contain">
              {filtered.map((journey, index) => (
                <JourneyIndexRow
                  key={journey.id}
                  journey={journey}
                  index={index}
                  isActive={selected.id === journey.id}
                  onSelect={() => selectJourney(journey.id)}
                />
              ))}
            </ol>
            <div className="mt-8 border border-midnight-navy/20 bg-[#eee9df] p-6">
              <p className="font-editorial text-2xl italic text-midnight-navy">
                Nothing here quite you?
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-ink/80">
                These are starting points. Your dates, pace and interests can
                shape a route of your own.
              </p>
              <InquiryButton
                variant="outline"
                className="mt-5 w-full"
                context={{}}
              >
                Create your own
              </InquiryButton>
            </div>
            <p className="mt-5 text-xs leading-6 text-slate-ink/75">
              These are route outlines. Dates, costs and final inclusions are
              confirmed in a written proposal before booking.
            </p>
          </aside>
          <p role="status" className="sr-only">
            {filtered.length} journeys. Showing details for {selected.title}.
          </p>
        </div>
      ) : (
        <p role="status" className="py-12">
          No journeys in this category. Select another to explore.
        </p>
      )}
    </div>
  );
}
