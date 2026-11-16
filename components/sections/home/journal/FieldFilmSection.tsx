import { FieldLabel } from "@/components/ui/FieldLabel";
import { ScrollStage } from "@/components/motion/ScrollStage";
import { HOME_FILM } from "@/lib/data/home-media";
import { LandscapeFilm } from "./LandscapeFilm";

export function FieldFilmSection() {
  return (
    <section
      id="field-film"
      aria-labelledby="film-title"
      className="overflow-hidden bg-midnight-navy text-glacier-cream"
    >
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 border-b border-glacier-cream/25 px-6 py-8 sm:px-10 lg:px-16">
        <FieldLabel className="text-warm-gold">
          04 / A mountain moment
        </FieldLabel>
        <p className="font-mono text-xs uppercase tracking-[0.12em]">
          Hunza & Nagar / Pakistan
        </p>
      </div>
      <ScrollStage mode="depth" offset={88} className="relative lg:h-[140svh]">
        <div data-scroll-frame className="lg:sticky lg:top-22">
          <LandscapeFilm film={HOME_FILM} />
        </div>
      </ScrollStage>
      <div className="mx-auto flex max-w-[1600px] flex-wrap justify-between gap-4 border-t border-glacier-cream/25 px-6 py-6 text-xs leading-6 text-glacier-cream/85 sm:px-10 lg:px-16">
        <span>{HOME_FILM.description}</span>
        <span>Film / {HOME_FILM.credit}</span>
      </div>
    </section>
  );
}
