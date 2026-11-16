"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PointerSurface } from "@/components/motion/PointerSurface";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/utils";

interface AtlasPlace {
  id: string;
  href: string;
  name: string;
  note: string;
  coordinates: string;
  description: string;
  season: string;
  image: { src: string; alt: string };
  x: number;
  y: number;
}
export function DestinationAtlas({ places }: { places: AtlasPlace[] }) {
  const [selectedId, setSelectedId] = useState(places[0]?.id);
  const selected = places.find((place) => place.id === selectedId) ?? places[0];
  const { openInquiry } = useInteractive();
  if (!selected) return null;
  const coordinateValues = selected.coordinates.match(/[\d.]+/g);
  const mapUrl = coordinateValues
    ? "https://www.google.com/maps/search/?api=1&query=" +
      coordinateValues.slice(0, 2).join(",")
    : "https://www.google.com/maps";
  return (
    <PointerSurface
      strength={28}
      label="EXPLORE"
      className="group relative isolate overflow-hidden bg-midnight-navy text-glacier-cream"
    >
      <div
        data-pointer-layer
        className="pointer-events-none absolute -inset-8 -z-20"
      >
        <Image
          src={selected.image.src}
          alt={selected.image.alt}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-midnight-navy/70 via-midnight-navy/20 to-midnight-navy/55"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-midnight-navy/90 via-transparent to-midnight-navy/25"
      />
      <button
        type="button"
        onClick={() => openInquiry({ regionName: selected.name })}
        aria-label={"Plan a journey to " + selected.name}
        className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-warm-gold"
      />
      <div className="relative z-10 mx-auto grid min-h-[760px] max-w-[1600px] gap-12 px-6 py-10 sm:px-10 lg:grid-cols-12 lg:items-end lg:px-16 lg:py-16">
        <div className="pointer-events-none flex min-w-0 flex-col justify-between gap-20 lg:col-span-7 lg:min-h-[620px]">
          <div className="flex items-start justify-between gap-6">
            <p className="font-mono text-xs uppercase leading-6 tracking-[0.14em]">
              Coordinates, not crowds.
              <br />
              <span className="text-warm-gold">{selected.coordinates}</span>
            </p>
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="h-24 w-24 shrink-0 fill-none text-glacier-cream/80"
            >
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="25"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <path
                d="M50 4V96M4 50H96M22 22L78 78M78 22L22 78"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <path d="M50 16L58 50L50 84L42 50Z" fill="currentColor" />
              <text
                x="47"
                y="11"
                fill="currentColor"
                fontSize="8"
                stroke="none"
              >
                N
              </text>
            </svg>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-warm-gold">
              {selected.note}
            </p>
            <h3 className="mt-5 max-w-3xl break-words font-sans text-3xl font-semibold uppercase leading-[1.05] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              {selected.name}
            </h3>
            <p className="mt-6 max-w-xl text-base leading-8 text-glacier-cream/90">
              {selected.description}
            </p>
            <div className="pointer-events-auto mt-8">
              <TextLink href={selected.href} className="mb-4 w-fit text-glacier-cream hover:text-warm-gold">Explore this destination</TextLink>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex min-h-12 items-center gap-4 border-b border-glacier-cream/60 py-3 text-sm font-semibold hover:text-warm-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                See it on the map
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-[140ms] ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none"
                />
              </a>
            </div>
          </div>
        </div>
        <aside
          aria-label="Explore destinations"
          className="min-w-0 border border-glacier-cream/40 bg-midnight-navy/85 p-5 lg:col-span-4 lg:col-start-9 lg:p-7"
        >
          <div className="flex justify-between gap-4 border-b border-glacier-cream/25 pb-5 font-mono text-xs uppercase tracking-[0.12em]">
            <span>A small atlas</span>
            <span className="text-warm-gold">04 places</span>
          </div>
          <div className="py-2">
            {places.map((place, index) => (
              <button
                key={place.id}
                type="button"
                aria-pressed={place.id === selected.id}
                aria-controls="destination-season"
                onClick={() => setSelectedId(place.id)}
                className={cn(
                  "group/place flex min-h-20 w-full cursor-pointer items-center gap-4 border-b border-glacier-cream/20 px-3 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-warm-gold",
                  place.id === selected.id
                    ? "bg-glacier-cream text-midnight-navy"
                    : "text-glacier-cream hover:bg-glacier-cream/10",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs",
                    place.id === selected.id
                      ? "text-alpine-teal"
                      : "text-warm-gold",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-base font-semibold">
                  {place.name}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            ))}
          </div>
          <p
            id="destination-season"
            className="mt-6 text-xs uppercase tracking-[0.12em] text-warm-gold"
          >
            When to go
          </p>
          <p className="mt-3 text-sm leading-7 text-glacier-cream/90">
            {selected.season}
          </p>
          <InquiryButton
            variant="light"
            className="mt-6 w-full"
            context={{ regionName: selected.name }}
          >
            Make this your starting point
          </InquiryButton>
        </aside>
      </div>
      <p role="status" className="sr-only">
        Exploring {selected.name}. {selected.note}.
      </p>
    </PointerSurface>
  );
}
