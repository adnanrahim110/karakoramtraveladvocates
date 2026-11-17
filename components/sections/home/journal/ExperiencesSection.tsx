import { HorizontalScrollStage } from "@/components/motion/HorizontalScrollStage";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { HOME_MEDIA } from "@/lib/data/home-media";
import { ExperienceChapter } from "./ExperienceChapter";

export function ExperiencesSection() {
  return (
    <section
      id="experiences"
      aria-labelledby="experiences-title"
      className="bg-glacier-cream text-midnight-navy"
    >
      <HorizontalScrollStage>
        <div
          data-scroll-frame
          className="mx-auto grid max-w-450 items-center gap-10 px-6 py-16 sm:px-10 lg:gap-12 xl:px-16 group-data-[scroll-pinned=true]/scroll:sticky group-data-[scroll-pinned=true]/scroll:top-0 group-data-[scroll-pinned=true]/scroll:h-svh group-data-[scroll-pinned=true]/scroll:grid-cols-[clamp(17rem,24vw,24rem)_minmax(0,1fr)] group-data-[scroll-pinned=true]/scroll:pt-28 group-data-[scroll-pinned=true]/scroll:pb-10"
        >
          <header className="min-w-0">
            <FieldLabel>Travel styles</FieldLabel>
            <HomeSectionHeading id="experiences-title" variant="compact" className="mt-4">
              One north.{" "}
              <span className="block font-editorial font-normal lowercase italic">
                Three ways to feel it.
              </span>
            </HomeSectionHeading>
            <div className="mt-6 max-w-xl space-y-4 text-sm leading-7 text-slate-ink/85">
              <p>
                Take time for old forts, orchards and village walks on a
                private tour of Hunza or Baltistan. For more time on foot, trek
                across the Baltoro Glacier toward Concordia, where some of the
                Karakoram’s highest peaks come into view.
              </p>
              <p>
                If you’re an experienced climber, we can help you choose an
                expedition that fits your skills and the time you have to
                acclimatize.
              </p>
            </div>
          </header>
          <div
            data-scroll-viewport
            className="@container min-w-0 group-data-[scroll-pinned=true]/scroll:overflow-hidden"
          >
            <div
              data-scroll-track
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 group-data-[scroll-pinned=true]/scroll:flex group-data-[scroll-pinned=true]/scroll:w-max"
            >
              <ExperienceChapter
                title="Valley life."
                subtitle="Cultural journeys"
                description="Forts, orchards and the old Silk Road. Let Hunza and Baltistan unfold at your pace."
                href="/tours"
                linkLabel="Explore private tours"
                altitude="1,800 — 4,700 m"
                image={HOME_MEDIA.tour}
              />
              <ExperienceChapter
                title="Glacier days."
                subtitle="Guided treks"
                description="Walk into the Baltoro’s theatre of granite and ice. Sleep beneath a sky with no city lights."
                href="/treks"
                linkLabel="Explore guided treks"
                altitude="3,000 — 5,650 m"
                image={HOME_MEDIA.trek}
              />
              <ExperienceChapter
                title="Above it all."
                subtitle="Mountaineering"
                description="Spantik to K2. Serious objectives matched to your experience, preparation and conditions."
                href="/expeditions"
                linkLabel="Explore expeditions"
                altitude="6,000 — 8,611 m"
                image={HOME_MEDIA.expedition}
              />
            </div>
          </div>
        </div>
      </HorizontalScrollStage>
    </section>
  );
}
