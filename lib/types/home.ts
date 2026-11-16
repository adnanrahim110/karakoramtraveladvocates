import type { ServicePillar } from "./cms";

export interface JourneyPreview {
  id: string;
  href: string;
  slug: string;
  region: string;
  title: string;
  serviceType: ServicePillar;
  durationDays: number;
  maxAltitudeMeters: number;
  grade: string;
  season: string;
  summary: string;
  price?: number;
  highlights: string[];
  image: { src: string; alt: string };
}
