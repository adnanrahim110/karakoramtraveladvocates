import type { Metadata } from "next";
import { JourneyCatalogSection } from "@/components/sections/journeys/JourneyCatalogSection";

export const metadata: Metadata = {
  title: "Karakoram Mountaineering Expedition Planning",
  description: "Start an assessed expedition conversation for Spantik or K2. Understand the experience requirements, planning scope, indicative timelines and support responsibilities.",
  alternates: { canonical: "/expeditions" },
};

export default function ExpeditionsPage() {
  return <JourneyCatalogSection kind="expedition" />;
}
