import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { PakistanReasonsSection } from "@/components/sections/planning/PakistanReasonsSection";
import { PakistanTradeoffsSection } from "@/components/sections/planning/PakistanTradeoffsSection";
import { PakistanRouteChoiceSection } from "@/components/sections/planning/PakistanRouteChoiceSection";
import { PlanningCalloutSection } from "@/components/sections/planning/PlanningCalloutSection";

export const metadata: Metadata = { title: "Why Visit Pakistan", description: "Explore the appeal of northern Pakistan: Karakoram mountains, valley cultures and journeys matched to your experience, with practical planning considerations.", alternates: { canonical: "/why-pakistan" } };

export default function WhyPakistanPage() {
  return <><PageIntro eyebrow="Why Pakistan" title="A bigger landscape. A closer connection." description="The mountains draw you here. The valleys, people and unhurried days give the journey its character." /><PakistanReasonsSection /><PakistanTradeoffsSection /><PakistanRouteChoiceSection /><PlanningCalloutSection /></>;
}
