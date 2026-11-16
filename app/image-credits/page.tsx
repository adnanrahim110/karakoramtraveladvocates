import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { MediaCreditsSection } from "@/components/sections/planning/MediaCreditsSection";
import { TerrainImageryCreditsSection } from "@/components/sections/planning/TerrainImageryCreditsSection";

export const metadata: Metadata = { title: "Image credits", description: "Photographers, sources and licenses for images used by Karakoram Travel Advocates.", alternates: { canonical: "/image-credits" } };

export default function ImageCreditsPage() {
  return <><PageIntro eyebrow="Behind the photographs" title="Credit where it belongs." description="Meet the photographers whose work brings these mountains and valleys into view." /><MediaCreditsSection /><TerrainImageryCreditsSection /></>;
}
