import Image from "next/image";
import { ScrollStage } from "@/components/motion/ScrollStage";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { HOME_MEDIA } from "@/lib/data/home-media";

export function OpeningNoteSection() {
  return (
    <section
      aria-labelledby="opening-note-title"
      className="bg-midnight-navy text-glacier-cream"
    >
      <ScrollStage
        mode="aperture"
        offset={88}
        className="relative lg:h-[180svh]"
      >
        <div
          data-scroll-frame
          className="relative grid min-h-180 lg:sticky lg:top-22 lg:h-[calc(100svh-88px)] lg:min-h-160"
        >
          <div
            data-scroll-expand
            className="relative isolate flex flex-col overflow-clip px-6 py-12 sm:px-10 lg:px-16"
          >
            <div className="pointer-events-none absolute inset-0 -z-10">
              <Image
                src={HOME_MEDIA.intro.src}
                alt={HOME_MEDIA.intro.alt}
                fill
                quality={90}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-midnight-navy/75 via-midnight-navy/20 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-midnight-navy/80 via-transparent to-midnight-navy/30" />
            </div>
            <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-6">
              <FieldLabel className="text-glacier-cream">
                01 / Beyond the ordinary
              </FieldLabel>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-glacier-cream/85">
                Gilgit-Baltistan / Pakistan
              </p>
            </div>
            <div className="m-auto w-full max-w-[1600px] py-16">
              <HomeSectionHeading
                id="opening-note-title"
                variant="feature"
                className="max-w-5xl"
              >
                The north hits{" "}
                <span className="font-editorial font-normal lowercase italic tracking-[-0.04em] text-warm-gold">
                  different.
                </span>
              </HomeSectionHeading>
              <div className="mt-10 grid gap-8 lg:grid-cols-12">
                <p className="max-w-md text-base leading-8 text-glacier-cream/90 lg:col-span-4">
                  Go beyond the familiar. Into ancient valleys, immense glaciers
                  and places that change what a journey can mean.
                </p>
                <div className="self-end lg:col-span-4 lg:col-start-9">
                  <TextLink
                    href="/why-pakistan"
                    className="min-h-14 w-full min-w-14 text-glacier-cream hover:text-warm-gold focus-visible:outline-warm-gold"
                  >
                    Why Pakistan?
                  </TextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollStage>
      <div className="mx-auto grid max-w-[1600px] gap-8 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:px-16">
        <p className="text-xs uppercase tracking-[0.18em] text-warm-gold lg:col-span-3">
          A place. A pace.
          <br />A perspective.
        </p>
        <p className="max-w-4xl font-editorial text-2xl leading-relaxed sm:text-3xl lg:col-span-8 lg:text-4xl">
          Private cultural journeys. Glacier trails. High-altitude ambitions.{" "}
          <span className="text-glacier-cream/70">
            One extraordinary corner of the world, explored your way.
          </span>
        </p>
      </div>
    </section>
  );
}
