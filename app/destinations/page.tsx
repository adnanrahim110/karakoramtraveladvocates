import type { Metadata } from "next";
import { DestinationCollectionSection } from "@/components/sections/planning/DestinationCollectionSection";
import { DestinationsHeroSection } from "@/components/sections/planning/DestinationsHeroSection";
import { PlanningCalloutSection } from "@/components/sections/planning/PlanningCalloutSection";

export const metadata: Metadata = {
  title: "Destinations in Northern Pakistan",
  description:
    "Explore Hunza, Skardu, Passu, Deosai, Baltoro and Fairy Meadows, with practical region notes and journeys through each landscape.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <DestinationsHeroSection />
      <DestinationCollectionSection />
      <PlanningCalloutSection
        title="You don’t have to fit everything into one trip."
        description="Tell us the places that interest you. We’ll help connect them into a realistic journey, with time for the days in between."
      />
    </>
  );
}
