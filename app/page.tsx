import type { Metadata } from "next";
import { HeroSplitHorizonSection } from "@/components/sections/home/HeroSplitHorizonSection";
import { OpeningNoteSection } from "@/components/sections/home/journal/OpeningNoteSection";
import { ExperiencesSection } from "@/components/sections/home/journal/ExperiencesSection";
import { JourneyCollectionSection } from "@/components/sections/home/journal/JourneyCollectionSection";
import { FieldFilmSection } from "@/components/sections/home/journal/FieldFilmSection";
import { DestinationAtlasSection } from "@/components/sections/home/journal/DestinationAtlasSection";
import { LocalApproachSection } from "@/components/sections/home/journal/LocalApproachSection";
import { DepartureLedgerSection } from "@/components/sections/home/journal/DepartureLedgerSection";
import { FieldNotesSection } from "@/components/sections/home/journal/FieldNotesSection";
import { QuestionsSection } from "@/components/sections/home/journal/QuestionsSection";
import { TailorMadeSection } from "@/components/sections/home/journal/TailorMadeSection";
import { HomeInquirySection } from "@/components/sections/home/HomeInquirySection";

export const metadata: Metadata = {
  title: { absolute: "Pakistan Treks, Private Tours & Mountain Journeys | Karakoram Travel Advocates" },
  description: "Find your way north with cultural journeys, guided Karakoram treks and mountain expeditions. Explore routes, read practical travel guides and plan a journey around you.",
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
      <TailorMadeSection />
      <HomeInquirySection />
    </>
  );
}
