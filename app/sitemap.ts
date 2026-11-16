import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { travelJourneys } from "@/lib/data/travel-content";
import { travelDestinations } from "@/lib/data/destination-content";
import { planningArticles } from "@/lib/data/planning-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/treks", "/tours", "/expeditions", "/destinations", "/why-pakistan", "/about", "/travel-guide", "/contact", "/privacy", "/image-credits", ...travelJourneys.map((journey) => journey.href), ...travelDestinations.map((destination) => destination.href), ...planningArticles.map((article) => article.href)];
  return [...new Set(paths)].map((path) => ({ url: new URL(path, SITE_URL).href }));
}
