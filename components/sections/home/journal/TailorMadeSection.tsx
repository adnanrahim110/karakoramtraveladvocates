import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { PointerSurface } from "@/components/motion/PointerSurface";
import { ScrollStage } from "@/components/motion/ScrollStage";
import { HOME_MEDIA } from "@/lib/data/home-media";

export function TailorMadeSection() {
  return (
    <section
      id="tailor-made"
      aria-labelledby="tailor-title"
      className="relative bg-midnight-navy text-glacier-cream"
    >
      <ScrollStage
        mode="aperture"
        offset={0}
        className="relative lg:min-h-[160svh] motion-reduce:min-h-0"
      >
        <div
          data-scroll-frame
          className="relative isolate overflow-hidden lg:sticky lg:top-0"
        >
          <PointerSurface strength={16} className="relative">
            <div
              data-scroll-aperture
              className="absolute inset-0 -z-20 overflow-hidden"
            >
              <div data-pointer-layer className="h-full w-full">
                <ParallaxImage
                  src={HOME_MEDIA.tailor.src}
                  alt={HOME_MEDIA.tailor.alt}
                  sizes="100vw"
                  amount="medium"
                  className="h-full w-full"
                />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-linear-to-r from-midnight-navy/75 via-midnight-navy/35 to-midnight-navy/10"
            />
            <div className="mx-auto flex min-h-[720px] max-w-[1440px] flex-col justify-between gap-16 px-6 py-16 sm:px-10 sm:py-20 lg:min-h-svh lg:px-16 lg:py-24">
              <div className="flex flex-wrap items-center justify-between gap-6 border-b border-glacier-cream/50 pb-6">
                <FieldLabel className="text-glacier-cream">
                  10 / Make it your own
                </FieldLabel>
                <span className="font-mono text-xs uppercase tracking-[0.16em]">
                  No two journeys alike.
                </span>
              </div>
              <HomeSectionHeading
                id="tailor-title"
                variant="feature"
                className="max-w-5xl"
              >
                YOUR OWN{" "}
                <span className="font-editorial font-normal italic normal-case tracking-[-0.065em] text-warm-gold">
                  north.
                </span>
              </HomeSectionHeading>
              <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <p className="max-w-lg text-base leading-8 text-glacier-cream lg:col-span-5">
                  A quieter valley. A longer trek. A few extra days to follow
                  the light. The most memorable route might be the one we
                  haven’t drawn yet.
                </p>
                <div className="lg:col-span-5 lg:col-start-8">
                  <InquiryButton variant="light" className="w-full">
                    Let’s make it happen
                  </InquiryButton>
                  <p className="mt-4 font-mono text-xs uppercase leading-6 tracking-[0.1em] text-glacier-cream/90">
                    Private tours / Guided treks / Expeditions
                  </p>
                </div>
              </div>
            </div>
          </PointerSurface>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1 bg-glacier-cream/25"
          >
            <div
              data-scroll-progress
              className="h-full origin-left bg-warm-gold"
            />
          </div>
        </div>
      </ScrollStage>
    </section>
  );
}
