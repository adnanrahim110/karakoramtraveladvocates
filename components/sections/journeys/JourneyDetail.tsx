import { JourneyHeroSection } from "./JourneyHeroSection";
import { JourneyOverviewSection } from "./JourneyOverviewSection";
import { JourneyItinerarySection } from "./JourneyItinerarySection";
import { JourneyPracticalSection } from "./JourneyPracticalSection";
import { JourneyInclusionsSection } from "./JourneyInclusionsSection";
import { JourneyPlanningSection } from "./JourneyPlanningSection";
import { JourneyRelatedSection } from "./JourneyRelatedSection";
import type { TravelJourney } from "@/lib/data/travel-content";

export function JourneyDetail({ journey }: { journey: TravelJourney }) {
  return <><JourneyHeroSection journey={journey} /><JourneyOverviewSection journey={journey} /><JourneyItinerarySection journey={journey} /><JourneyPracticalSection journey={journey} /><JourneyInclusionsSection journey={journey} /><JourneyPlanningSection journey={journey} /><JourneyRelatedSection journey={journey} /></>;
}
