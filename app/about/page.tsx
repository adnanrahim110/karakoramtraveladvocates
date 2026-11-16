import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { AboutApproachSection } from "@/components/sections/planning/AboutApproachSection";
import { PlanningProcessSection } from "@/components/sections/planning/PlanningProcessSection";
import { TravelPrinciplesSection } from "@/components/sections/planning/TravelPrinciplesSection";
import { PlanningCalloutSection } from "@/components/sections/planning/PlanningCalloutSection";

export const metadata: Metadata = { title: "Our Approach", description: "Meet the planning approach behind Karakoram Travel Advocates: thoughtful cultural journeys, mountain treks and expeditions in northern Pakistan.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <><PageIntro eyebrow="Karakoram / Travel Advocates" title="Adventure, with intention." description="Thoughtful planning, a clear conversation and time to experience more than the famous view." /><AboutApproachSection /><PlanningProcessSection /><TravelPrinciplesSection /><PlanningCalloutSection title="Let’s start with what matters to you." /></>;
}
