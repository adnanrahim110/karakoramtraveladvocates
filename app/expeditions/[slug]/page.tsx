import type { Metadata } from "next";
import { JourneyDetail } from "@/components/sections/journeys/JourneyDetail";
import { journeysByKind } from "@/lib/data/travel-content";
import { findJourneyOrNotFound, journeyMetadata } from "@/lib/journey-pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journeysByKind("expedition").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return journeyMetadata("expedition", (await params).slug);
}

export default async function ExpeditionPage({ params }: Props) {
  return <JourneyDetail journey={findJourneyOrNotFound("expedition", (await params).slug)} />;
}
