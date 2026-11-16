import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { DestinationCollectionSection } from "@/components/sections/planning/DestinationCollectionSection";
import { PlanningCalloutSection } from "@/components/sections/planning/PlanningCalloutSection";

export const metadata: Metadata = { title: "Destinations in Northern Pakistan", description: "Explore Hunza, Skardu, Passu, Deosai, Baltoro and Fairy Meadows, with practical region notes and journeys through each landscape.", alternates: { canonical: "/destinations" } };

export default function DestinationsPage() {
  return <><PageIntro eyebrow="Explore the north" title="Different valleys. Different ways to travel." description="Find a place that speaks to you, then choose the time and pace to experience it properly." /><DestinationCollectionSection /><PlanningCalloutSection title="You don’t have to fit everything into one trip." description="Tell us the places that interest you. We’ll help connect them into a realistic journey, with time for the days in between." /></>;
}
