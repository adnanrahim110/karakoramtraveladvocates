import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationJourneysSection } from "@/components/sections/planning/DestinationJourneysSection";
import { DestinationOverviewSection } from "@/components/sections/planning/DestinationOverviewSection";
import { DestinationPlanningSection } from "@/components/sections/planning/DestinationPlanningSection";
import { PlanningCalloutSection } from "@/components/sections/planning/PlanningCalloutSection";
import { PageIntro } from "@/components/ui/PageIntro";
import {
  getTravelDestination,
  travelDestinations,
} from "@/lib/data/destination-content";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return travelDestinations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getTravelDestination(slug);
  if (!destination) notFound();
  return {
    title: destination.name,
    description: destination.summary,
    alternates: { canonical: destination.href },
    openGraph: {
      title: destination.name,
      description: destination.summary,
      images: [
        {
          url: destination.image.src,
          width: destination.image.width,
          height: destination.image.height,
          alt: destination.image.alt,
        },
      ],
    },
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params;
  const destination = getTravelDestination(slug);
  if (!destination) notFound();
  return (
    <>
      <PageIntro
        eyebrow={destination.region}
        title={destination.name}
        description={destination.summary}
        image={destination.image}
        showCredit
        stats={[
          { label: "Region", value: destination.region },
          { label: "Season", value: destination.season },
          { label: "Suggested stay", value: destination.suggestedStay },
        ]}
      />
      <DestinationOverviewSection destination={destination} />
      <DestinationPlanningSection destination={destination} />
      <DestinationJourneysSection destination={destination} />
      <PlanningCalloutSection />
    </>
  );
}
