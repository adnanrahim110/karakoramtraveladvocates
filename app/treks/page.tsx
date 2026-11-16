import type { Metadata } from "next";
import { JourneyCatalogSection } from "@/components/sections/journeys/JourneyCatalogSection";

export const metadata: Metadata = {
  title: "Treks in the Karakoram & Northern Pakistan",
  description: "Compare K2 Base Camp, Gondogoro La, Snow Lake, Rakaposhi and Nanga Parbat trek outlines by duration, challenge and region. Plan a tailored mountain journey.",
  alternates: { canonical: "/treks" },
};

export default function TreksPage() {
  return <JourneyCatalogSection kind="trek" />;
}
