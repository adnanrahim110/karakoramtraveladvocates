import { ScrollStage } from "@/components/motion/ScrollStage";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { HOME_FILM } from "@/lib/data/home-media";
import { LandscapeFilm } from "./LandscapeFilm";

export function FieldFilmSection() {
  return (
    <section
      id="field-film"
      aria-labelledby="film-title"
      className="overflow-hidden bg-midnight-navy text-glacier-cream"
    >
      <header className="mx-auto grid max-w-400 gap-8 px-6 pt-20 pb-12 sm:px-10 sm:pt-28 sm:pb-16 lg:grid-cols-12 lg:items-end lg:px-16 lg:pt-32 lg:pb-20">
        <div className="min-w-0 lg:col-span-7">
          <FieldLabel className="text-warm-gold">Hunza &amp; Nagar</FieldLabel>
          <HomeSectionHeading
            id="film-title"
            variant="feature"
            className="mt-4 text-glacier-cream"
          >
            When the clouds{" "}
            <span className="block font-editorial font-normal lowercase italic text-warm-gold">
              lift off the ridge.
            </span>
          </HomeSectionHeading>
        </div>
        <p className="max-w-md text-base leading-8 text-glacier-cream/85 lg:col-span-4 lg:col-start-9">
          Between the scheduled days of a route are the hours you cannot
          plan—afternoon light crossing an orchard terrace, mist rising from
          the river gorge, and seven-thousand-metre ice appearing above the
          valley.
        </p>
      </header>

      <ScrollStage
        mode="aperture"
        offset={88}
        className="relative lg:h-[175svh]"
      >
        <div
          data-scroll-frame
          className="relative grid min-h-140 lg:sticky lg:top-22 lg:h-[calc(100svh-88px)] lg:min-h-150"
        >
          <LandscapeFilm film={HOME_FILM} />
        </div>
      </ScrollStage>

      <div className="mx-auto flex max-w-400 flex-wrap items-center justify-between gap-6 border-t border-glacier-cream/15 px-6 py-8 sm:px-10 lg:px-16">
        <p className="text-xs leading-6 text-glacier-cream/75">
          {HOME_FILM.description}{" "}
          <span className="text-glacier-cream/55">
            · Film by {HOME_FILM.credit}
          </span>
        </p>
        <TextLink
          href="/destinations/hunza"
          className="w-fit text-glacier-cream hover:text-warm-gold focus-visible:outline-warm-gold"
        >
          Explore Hunza &amp; Gojal
        </TextLink>
      </div>
    </section>
  );
}
