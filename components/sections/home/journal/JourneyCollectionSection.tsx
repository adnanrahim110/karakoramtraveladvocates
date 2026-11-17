import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { travelJourneys } from "@/lib/data/travel-content";
import { JourneyCollectionDirectory } from "./JourneyCollectionDirectory";
import { JourneyFeature } from "./JourneyFeature";

const featuredSlugs = [
  "k2-base-camp-trek",
  "hunza-valley-private-journey",
  "spantik-peak-expedition",
];

export function JourneyCollectionSection() {
  const featured = featuredSlugs.flatMap((slug) => {
    const journey = travelJourneys.find((item) => item.slug === slug);
    return journey ? [journey] : [];
  });

  return (
    <section
      id="journeys"
      aria-labelledby="journeys-title"
      className="border-t border-midnight-navy/10 bg-white py-16 text-midnight-navy sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-400 px-6 sm:px-10 lg:px-16">
        <header className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <HomeSectionHeading id="journeys-title" className="max-w-3xl">
            Journeys through{" "}
            <span className="block font-editorial font-normal lowercase italic text-alpine-teal">
              northern Pakistan.
            </span>
          </HomeSectionHeading>
          <p className="max-w-md text-sm leading-7 text-slate-ink/85 lg:pb-1">
            Start with an itinerary that suits your pace, season and experience.
            We’ll shape the details around how you want to travel.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-12 xl:gap-8">
          {featured.map((journey, index) => (
            <JourneyFeature
              key={journey.slug}
              journey={journey}
              variant={index === 0 ? "lead" : "companion"}
              className={
                index === 0
                  ? "md:col-span-2 xl:col-span-7 xl:row-span-2"
                  : "xl:col-span-5"
              }
            />
          ))}
        </div>

        <div className="mt-8">
          <JourneyCollectionDirectory journeys={travelJourneys} />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs leading-6 text-slate-ink/75">
            Dates, costs and inclusions are confirmed in writing before you
            book.
          </p>
          <InquiryButton variant="light" className="w-fit max-w-full">
            Plan a custom trip
          </InquiryButton>
        </div>
      </div>
    </section>
  );
}
