import { HeroSplitHorizonSection } from "@/components/sections/home/HeroSplitHorizonSection";
import { HomeInquirySection } from "@/components/sections/home/HomeInquirySection";
import { DepartureLedgerSection } from "@/components/sections/home/journal/DepartureLedgerSection";
import { DestinationAtlasSection } from "@/components/sections/home/journal/DestinationAtlasSection";
import { ExperiencesSection } from "@/components/sections/home/journal/ExperiencesSection";
import { FieldFilmSection } from "@/components/sections/home/journal/FieldFilmSection";
import { FieldNotesSection } from "@/components/sections/home/journal/FieldNotesSection";
import { JourneyCollectionSection } from "@/components/sections/home/journal/JourneyCollectionSection";
import { LocalApproachSection } from "@/components/sections/home/journal/LocalApproachSection";
import { OpeningNoteSection } from "@/components/sections/home/journal/OpeningNoteSection";
import { QuestionsSection } from "@/components/sections/home/journal/QuestionsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Pakistan Treks, Private Tours & Mountain Journeys | Karakoram Travel Advocates",
  },
  description:
    "Find your way north with cultural journeys, guided Karakoram treks and mountain expeditions. Explore routes, read practical travel guides and plan a journey around you.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSplitHorizonSection />
      <OpeningNoteSection />
      <ExperiencesSection />
      <JourneyCollectionSection />
      <FieldFilmSection />
      <DestinationAtlasSection />
      <LocalApproachSection />
      <DepartureLedgerSection />
      <FieldNotesSection />
      <QuestionsSection />
      <HomeInquirySection />
    </>
  );
}
