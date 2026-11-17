import type { Metadata } from "next";
import { PakistanReasonsSection } from "@/components/sections/planning/PakistanReasonsSection";
import { PakistanRouteChoiceSection } from "@/components/sections/planning/PakistanRouteChoiceSection";
import { PakistanTradeoffsSection } from "@/components/sections/planning/PakistanTradeoffsSection";
import { PlanningCalloutSection } from "@/components/sections/planning/PlanningCalloutSection";
import { PageIntro } from "@/components/ui/PageIntro";
import { HOME_MEDIA } from "@/lib/data/home-media";

export const metadata: Metadata = {
  title: "Why Visit Pakistan",
  description:
    "Explore the appeal of northern Pakistan: Karakoram mountains, valley cultures and journeys matched to your experience, with practical planning considerations.",
  alternates: { canonical: "/why-pakistan" },
};

export default function WhyPakistanPage() {
  return (
    <>
      <PageIntro
        eyebrow="Why Pakistan"
        title="A bigger landscape. A closer connection."
        description="The mountains draw you here. The valleys, people and unhurried days give the journey its character."
        image={HOME_MEDIA.intro}
        stats={[
          { label: "Ranges", value: "3 mountain ranges" },
          { label: "8,000 m peaks", value: "5 in Pakistan" },
          { label: "Style", value: "Private & guided routes" },
        ]}
      />
      <PakistanReasonsSection />
      <PakistanTradeoffsSection />
      <PakistanRouteChoiceSection />
      <PlanningCalloutSection />
    </>
  );
}
