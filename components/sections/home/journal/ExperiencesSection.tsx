import { ScrollStage } from "@/components/motion/ScrollStage";
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
      <ScrollStage
        mode="horizontal"
        offset={88}
        className="relative lg:h-[220svh]"
      >
        <div
          data-scroll-frame
          className="mx-auto max-w-[1800px] px-6 py-20 sm:px-10 lg:sticky lg:top-22 lg:flex lg:h-[calc(100svh-88px)] lg:min-h-[640px] lg:gap-12 lg:px-16 lg:py-12"
        >
          <header className="mb-10 flex min-w-0 shrink-0 flex-col justify-between lg:mb-0 lg:w-80 xl:w-96">
            <div>
              <FieldLabel>02 / Choose your altitude</FieldLabel>
              <HomeSectionHeading
                id="experiences-title"
                variant="compact"
                className="mt-8"
              >
                One north.{" "}
                <span className="font-editorial font-normal lowercase italic">
                  Three ways to feel it.
                </span>
              </HomeSectionHeading>
              <p className="mt-8 max-w-sm text-sm leading-7 text-slate-ink/80">
                From valley life to the top of the world. Follow the experience
                that calls to you.
              </p>
            </div>
            <div data-scroll-instruction className="mt-8 hidden lg:block">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.12em]">
                Scroll to explore →
              </p>
              <div className="h-1 bg-midnight-navy/15">
                <div
                  data-scroll-progress
                  className="h-full origin-left bg-alpine-teal"
                />
              </div>
            </div>
          </header>
          <div
            data-scroll-viewport
            className="min-w-0 flex-1 lg:overflow-hidden"
          >
            <div
              data-scroll-track
              className="grid gap-8 md:grid-cols-3 lg:flex lg:h-full lg:w-max lg:gap-8"
            >
              <ExperienceChapter
                number="01"
                title="Valley life."
                subtitle="Cultural journeys"
                description="Forts, orchards and the old Silk Road. Let Hunza and Baltistan unfold at your pace."
                serviceType="tour"
                altitude="1,800 — 4,700 m"
                image={HOME_MEDIA.tour}
              />
              <ExperienceChapter
                number="02"
                title="Glacier days."
                subtitle="Guided treks"
                description="Walk into the Baltoro’s theatre of granite and ice. Sleep beneath a sky with no city lights."
                serviceType="trek"
                altitude="3,000 — 5,650 m"
                image={HOME_MEDIA.trek}
              />
              <ExperienceChapter
                number="03"
                title="Above it all."
                subtitle="Mountaineering"
                description="Spantik to K2. Serious objectives matched to your experience, preparation and conditions."
                serviceType="expedition"
                altitude="6,000 — 8,611 m"
                image={HOME_MEDIA.expedition}
              />
            </div>
          </div>
        </div>
      </ScrollStage>
    </section>
  );
}
