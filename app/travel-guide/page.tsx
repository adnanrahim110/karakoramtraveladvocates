import type { Metadata } from "next";
import { PlanningCalloutSection } from "@/components/sections/planning/PlanningCalloutSection";
import { PlanningCollectionSection } from "@/components/sections/planning/PlanningCollectionSection";
import { PageIntro } from "@/components/ui/PageIntro";
import { HOME_MEDIA } from "@/lib/data/home-media";

export const metadata: Metadata = {
  title: "Pakistan Travel Planning Guides",
  description:
    "Practical guides to seasons, travel costs, visas, altitude, mountain access and packing for a journey through northern Pakistan.",
  alternates: { canonical: "/travel-guide" },
};

export default function TravelGuidePage() {
  return (
    <>
      <PageIntro
        eyebrow="Before you go"
        title="Good questions. Better journeys."
        description="Useful planning notes for the decisions that shape your trip, from the right season to the details behind a mountain quote."
        image={HOME_MEDIA.journal}
        stats={[
          { label: "Guides", value: "6 field notes" },
          { label: "Topics", value: "Seasons, visas & gear" },
          { label: "Region", value: "Gilgit-Baltistan" },
        ]}
      />
      <PlanningCollectionSection />
      <PlanningCalloutSection />
    </>
  );
}
