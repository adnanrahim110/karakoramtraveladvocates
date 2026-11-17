import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { HOME_MEDIA } from "@/lib/data/home-media";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const choices = [
  {
    eyebrow: "Private overland",
    title: "Travel at valley pace",
    href: "/tours",
    text: "Choose heritage, village walks and comfortable bases in Hunza or Baltistan. A flexible private itinerary leaves space for what interests you.",
    image: HOME_MEDIA.hunza,
  },
  {
    eyebrow: "Guided on foot",
    title: "Walk into the mountains",
    href: "/treks",
    text: "Start with a shorter base-camp journey or work towards a multi-week glacier trek. Compare terrain and preparation alongside the scenery.",
    image: HOME_MEDIA.trek,
  },
  {
    eyebrow: "Technical climbs",
    title: "Take on a climbing objective",
    href: "/expeditions",
    text: "A technical expedition begins with a conversation about previous experience, the route and the support required on the mountain.",
    image: HOME_MEDIA.spantik,
  },
];

export function PakistanRouteChoiceSection() {
  return (
    <section
      aria-labelledby="pakistan-route-choice-title"
      className="mx-auto max-w-400 px-6 py-16 sm:px-10 lg:px-16 lg:py-24"
    >
      <header className="mb-10 max-w-2xl">
        <FieldLabel>Ways north</FieldLabel>
        <HomeSectionHeading
          id="pakistan-route-choice-title"
          variant="compact"
          className="mt-3 text-midnight-navy"
        >
          Choose your way into{" "}
          <span className="font-editorial font-normal lowercase italic text-alpine-teal">
            the landscape.
          </span>
        </HomeSectionHeading>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        {choices.map((choice) => (
          <article
            key={choice.href}
            className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden bg-midnight-navy text-glacier-cream"
          >
            <Image
              src={choice.image.src}
              alt={choice.image.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-midnight-navy/85 via-midnight-navy/25 to-transparent"
            />
            <div className="relative z-10 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-warm-gold">
                {choice.eyebrow}
              </p>
              <h3 className="mt-2 font-editorial text-3xl font-normal leading-tight text-glacier-cream">
                <Link
                  href={choice.href}
                  className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold"
                >
                  {choice.title}
                </Link>
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-glacier-cream/85">
                {choice.text}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-warm-gold">
                <span>Explore the journeys</span>
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
