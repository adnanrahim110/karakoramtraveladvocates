"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Journey } from "@/lib/types/cms";
import { cn, formatAltitude, formatDistance } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ServicePillarIcon } from "@/components/ui/BrandIcons";
import { useInteractive } from "@/components/spatial/InteractiveContext";

interface JourneyCardProps {
  journey: Journey;
  index?: number;
  variant?: "light" | "dark";
  className?: string;
}

export function JourneyCard({
  journey,
  index = 0,
  variant = "light",
  className,
}: JourneyCardProps) {
  const { unit, openInquiry, setCursorTelemetry } = useInteractive();
  const isDark = variant === "dark";

  const pillarLabel =
    journey.serviceType === "trek"
      ? "Trek"
      : journey.serviceType === "expedition"
      ? "Expedition"
      : "Tour";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onMouseEnter={() =>
        setCursorTelemetry(
          `${pillarLabel.toUpperCase()} • MAX ${formatAltitude(
            journey.maxAltitudeMeters,
            unit
          )}`
        )
      }
      onMouseLeave={() => setCursorTelemetry(null)}
      className={cn(
        "group relative flex flex-col border transition-colors duration-300",
        isDark
          ? "bg-midnight-navy border-glacier-cream/15 text-glacier-cream hover:border-warm-gold"
          : "bg-glacier-cream border-midnight-navy/20 text-slate-ink hover:border-midnight-navy",
        className
      )}
    >
      {/* Top Architectural Specification Bar */}
      <div
        className={cn(
          "px-5 py-3 border-b flex items-center justify-between gap-2 text-[10px] font-mono tracking-[0.16em] uppercase",
          isDark
            ? "border-glacier-cream/15 text-glacier-cream/70"
            : "border-midnight-navy/15 text-midnight-navy/75"
        )}
      >
        <span>
          {String(index + 1).padStart(2, "0")} / {pillarLabel} •{" "}
          {journey.destinationNames[0]}
        </span>
        <span className="text-warm-gold font-semibold">
          MAX {formatAltitude(journey.maxAltitudeMeters, unit)}
        </span>
      </div>

      {/* Crisp Un-Rounded Editorial Image Frame */}
      <figure className="relative h-64 w-full overflow-hidden bg-midnight-navy">
        <Image
          src={journey.heroMedia.src}
          alt={journey.heroMedia.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />

        {/* Minimal Top-Left Grade Tag */}
        <div className="absolute top-3 left-3">
          <Badge variant="navy" size="sm">
            {journey.grade}
          </Badge>
        </div>

        {/* Minimal Bottom-Right Coordinate Micro-Tag */}
        <figcaption className="absolute bottom-3 right-3 px-2 py-0.5 bg-midnight-navy/90 border border-glacier-cream/20 text-[9px] font-mono tracking-[0.14em] text-glacier-cream/90 uppercase">
          {journey.heroMedia.coordinates}
        </figcaption>
      </figure>

      {/* Main Content Cell */}
      <div className="flex flex-col flex-1 p-6 gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "text-[10px] font-mono tracking-[0.18em] uppercase",
                isDark ? "text-warm-gold" : "text-alpine-teal"
              )}
            >
              {journey.categoryLabel}
            </span>
            <h3
              className={cn(
                "font-display text-xl font-semibold leading-snug transition-colors",
                isDark
                  ? "text-glacier-cream group-hover:text-warm-gold"
                  : "text-midnight-navy group-hover:text-alpine-teal"
              )}
            >
              <Link href={journey.urlPath} className="focus-visible:outline-none">
                {journey.title}
              </Link>
            </h3>
          </div>
          <ServicePillarIcon
            pillar={journey.serviceType}
            className={cn(
              "w-9 h-6 shrink-0",
              isDark ? "text-glacier-cream/80" : "text-midnight-navy"
            )}
          />
        </div>

        <p
          className={cn(
            "text-xs leading-relaxed line-clamp-2",
            isDark ? "text-glacier-cream/75" : "text-slate-ink/80"
          )}
        >
          {journey.introduction}
        </p>

        {/* Architectural Hairline Telemetry Table */}
        <dl
          className={cn(
            "grid grid-cols-3 border-y py-3 text-[11px] font-mono",
            isDark
              ? "border-glacier-cream/15 text-glacier-cream"
              : "border-midnight-navy/15 text-midnight-navy"
          )}
        >
          <div className="flex flex-col gap-0.5 pr-2">
            <dt className="text-[9px] uppercase tracking-widest opacity-60">
              Duration
            </dt>
            <dd className="font-semibold">{journey.durationDays} Days</dd>
          </div>
          <div
            className={cn(
              "flex flex-col gap-0.5 px-3 border-x",
              isDark ? "border-glacier-cream/15" : "border-midnight-navy/15"
            )}
          >
            <dt className="text-[9px] uppercase tracking-widest opacity-60">
              Window
            </dt>
            <dd className="font-semibold truncate">
              {journey.bestSeason.split("(")[0].trim()}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5 pl-3">
            <dt className="text-[9px] uppercase tracking-widest opacity-60">
              Distance
            </dt>
            <dd className="font-semibold">
              {formatDistance(journey.distanceKm, unit)}
            </dd>
          </div>
        </dl>

        {/* Bottom Commercial & Action Row */}
        <div className="mt-auto pt-1 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono uppercase tracking-[0.16em] opacity-65">
              {journey.priceModel === "expedition_application"
                ? "Vetted Application"
                : "Starting Tariff (USD)"}
            </span>
            <span className="font-mono text-base font-bold">
              {journey.startingPriceUsd
                ? `$${journey.startingPriceUsd.toLocaleString("en-US")}`
                : "Custom Dossier"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isDark ? "outline-cream" : "outline-navy"}
              size="sm"
              onClick={() =>
                openInquiry({
                  tripTitle: journey.title,
                  tripSlug: journey.slug,
                  serviceType: journey.serviceType,
                  regionName: journey.destinationNames[0],
                })
              }
            >
              {journey.serviceType === "expedition" ? "Apply" : "Enquire"}
            </Button>
            <Button
              variant={isDark ? "gold" : "navy"}
              size="sm"
              href={journey.urlPath}
            >
              Route
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
