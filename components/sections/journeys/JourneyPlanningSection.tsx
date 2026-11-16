import { InquiryButton } from "@/components/ui/InquiryButton";
import type { TravelJourney } from "@/lib/data/travel-content";

export function JourneyPlanningSection({ journey }: { journey: TravelJourney }) {
  return (
    <section aria-labelledby="journey-plan-title" className="bg-midnight-navy text-glacier-cream">
      <div className="mx-auto flex max-w-360 flex-col justify-between gap-8 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:px-16 lg:py-20"><div className="max-w-2xl"><p className="text-xs uppercase tracking-widest text-warm-gold">Make the route your own</p><h2 id="journey-plan-title" className="mt-4 font-editorial text-3xl font-normal sm:text-4xl">Start with what matters to you.</h2><p className="mt-5 text-sm leading-7 text-glacier-cream/85">Your time, interests, walking experience and preferred comfort level help shape a useful proposal. Share a brief and we can take the next step together.</p></div><InquiryButton variant="light" context={{ tripTitle: journey.title, tripSlug: journey.slug, serviceType: journey.kind, regionName: journey.region }} className="w-fit shrink-0">{journey.accessNotice ? "Discuss suitable alternatives" : journey.kind === "expedition" ? "Begin an expedition inquiry" : "Ask for a tailored proposal"}</InquiryButton></div>
    </section>
  );
}
