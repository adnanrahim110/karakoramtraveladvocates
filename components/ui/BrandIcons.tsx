import React from "react";
import { cn } from "@/lib/utils";
import type { ServicePillar } from "@/lib/types/cms";

interface IconProps {
  className?: string;
}

/**
 * Moodboard Page 06: Category Icon — TREKS
 * Single line weight, rounded ends, two-color system (Alpine Teal / Midnight Navy + Warm Gold sun micro-accent)
 */
export function TrekCategoryIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-12 h-8", className)}
      aria-hidden="true"
    >
      <path
        d="M6 38L18 18L26 28L38 10L58 38"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="49" cy="13" r="4" className="fill-warm-gold" />
    </svg>
  );
}

/**
 * Moodboard Page 06: Category Icon — EXPEDITIONS
 * Compass/horizon circle with two-color peak needle
 */
export function ExpeditionCategoryIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-12 h-8", className)}
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="22"
        r="16"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M24 28L33 14"
        className="stroke-warm-gold"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M33 14L40 28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Moodboard Page 06: Category Icon — TOURS
 * Clean peak silhouette with Warm Gold route arc
 */
export function TourCategoryIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-12 h-8", className)}
      aria-hidden="true"
    >
      <path
        d="M14 36L32 10L50 36"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 36C26 30 38 30 44 36"
        className="stroke-warm-gold"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ServicePillarIcon({
  pillar,
  className,
}: {
  pillar: ServicePillar;
  className?: string;
}) {
  if (pillar === "trek") return <TrekCategoryIcon className={className} />;
  if (pillar === "expedition") return <ExpeditionCategoryIcon className={className} />;
  return <TourCategoryIcon className={className} />;
}

/**
 * Moodboard Page 06: Topographic Line Motif
 * Flowing contour waves in Warm Gold or Alpine Teal
 */
export function TopographicContourSvg({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 800 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full pointer-events-none select-none", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 40C110 20 190 65 300 42C410 19 490 68 600 40C690 18 750 52 800 34"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0 88C120 64 200 112 310 88C420 64 500 114 610 86C700 63 755 98 800 80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0 136C115 112 205 160 315 134C425 108 505 162 615 134C705 110 760 144 800 128"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0 184C125 160 210 208 320 182C430 156 510 210 620 182C710 158 762 192 800 176"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0 232C120 208 205 256 315 230C425 204 505 258 615 230C705 206 760 240 800 224"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0 280C110 256 195 304 305 278C415 252 495 306 605 278C695 254 755 288 800 272"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
