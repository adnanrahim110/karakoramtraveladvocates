import type { Metadata } from "next";
import { MediaCreditsSection } from "@/components/sections/planning/MediaCreditsSection";
import { TerrainImageryCreditsSection } from "@/components/sections/planning/TerrainImageryCreditsSection";
import { PageIntro } from "@/components/ui/PageIntro";
import { HOME_MEDIA } from "@/lib/data/home-media";

export const metadata: Metadata = {
  title: "Image credits",
  description:
    "Photographers, sources and licenses for images used by Karakoram Travel Advocates.",
  alternates: { canonical: "/image-credits" },
};

export default function ImageCreditsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Behind the photographs"
        title="Credit where it belongs."
        description="Meet the photographers whose work brings these mountains and valleys into view."
        image={HOME_MEDIA.fairyMeadows}
      />
      <MediaCreditsSection />
      <TerrainImageryCreditsSection />
    </>
  );
}
