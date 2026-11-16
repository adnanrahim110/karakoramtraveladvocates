import type { Metadata } from "next";
import { JourneyDetail } from "@/components/sections/journeys/JourneyDetail";
import { journeysByKind } from "@/lib/data/travel-content";
import { findJourneyOrNotFound, journeyMetadata } from "@/lib/journey-pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journeysByKind("tour").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return journeyMetadata("tour", (await params).slug);
}

export default async function TourPage({ params }: Props) {
  return <JourneyDetail journey={findJourneyOrNotFound("tour", (await params).slug)} />;
}
