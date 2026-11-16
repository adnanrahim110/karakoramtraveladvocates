import type { Metadata } from "next";
import { JourneyCatalogSection } from "@/components/sections/journeys/JourneyCatalogSection";

export const metadata: Metadata = {
  title: "Private Cultural Tours in Northern Pakistan",
  description: "Explore private route ideas for Hunza, Upper Hunza, Skardu and Deosai, plus cultural journeys beyond Gilgit-Baltistan. Adapt the pace and details around your group.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  return <JourneyCatalogSection kind="tour" />;
}
