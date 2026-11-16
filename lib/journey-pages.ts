import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTravelJourney, type JourneyKind, type TravelJourney } from "@/lib/data/travel-content";

export function findJourneyOrNotFound(kind: JourneyKind, slug: string): TravelJourney {
  const journey = getTravelJourney(kind, slug);
  if (!journey) notFound();
  return journey;
}

export function journeyMetadata(kind: JourneyKind, slug: string): Metadata {
  const journey = findJourneyOrNotFound(kind, slug);
  return {
    title: journey.title,
    description: journey.summary,
    alternates: { canonical: journey.href },
    openGraph: {
      title: journey.title,
      description: journey.summary,
      url: journey.href,
      type: "website",
      images: [{ url: journey.image.src, width: journey.image.width, height: journey.image.height, alt: journey.image.alt }],
    },
  };
}
