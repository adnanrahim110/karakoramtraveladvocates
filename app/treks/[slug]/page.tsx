import type { Metadata } from "next";
import { JourneyDetail } from "@/components/sections/journeys/JourneyDetail";
import { journeysByKind } from "@/lib/data/travel-content";
import { findJourneyOrNotFound, journeyMetadata } from "@/lib/journey-pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journeysByKind("trek").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return journeyMetadata("trek", (await params).slug);
}

export default async function TrekPage({ params }: Props) {
  return <JourneyDetail journey={findJourneyOrNotFound("trek", (await params).slug)} />;
}
