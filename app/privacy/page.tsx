import type { Metadata } from "next";
import { PrivacyContentSection } from "@/components/sections/planning/PrivacyContentSection";
import { PageIntro } from "@/components/ui/PageIntro";
import { HOME_MEDIA } from "@/lib/data/home-media";

export const metadata: Metadata = {
  title: "Privacy Information",
  description:
    "How the Karakoram Travel Advocates inquiry form prepares your brief and how to contact us about information you share.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Your information"
        title="A clear start to the conversation."
        description="Understand what happens to the details you enter in an inquiry and the information you choose to send us."
        image={HOME_MEDIA.skardu}
      />
      <PrivacyContentSection />
    </>
  );
}
