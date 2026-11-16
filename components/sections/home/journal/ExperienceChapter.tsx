import Image from "next/image";
import { PointerSurface } from "@/components/motion/PointerSurface";
import { InquiryButton } from "@/components/ui/InquiryButton";
import type { ServicePillar } from "@/lib/types/cms";
interface ExperienceChapterProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  serviceType: ServicePillar;
  altitude: string;
  image: { src: string; alt: string };
}
export function ExperienceChapter({
  number,
  title,
  subtitle,
  description,
  serviceType,
  altitude,
  image,
}: ExperienceChapterProps) {
  return (
    <PointerSurface
      strength={24}
      className="group relative isolate min-w-0 overflow-hidden bg-midnight-navy text-glacier-cream lg:h-full lg:w-[480px] lg:shrink-0 xl:w-[560px]"
    >
      <article
        data-scroll-panel
        className="relative isolate flex min-h-[560px] flex-col justify-between p-6 md:min-h-[600px] md:p-4 lg:h-full lg:min-h-0 lg:p-8"
      >
        <div
          data-pointer-layer
          className="pointer-events-none absolute -inset-8 -z-20"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            quality={90}
            sizes="(max-width:768px) 100vw, (max-width:1024px) 33vw, 560px"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-midnight-navy/55 via-midnight-navy/5 to-midnight-navy/90"
        />
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.16em]">
            {subtitle}
          </span>
          <span className="font-editorial text-5xl leading-none text-glacier-cream/75">
            {number}
          </span>
        </div>
        <div className="mt-24 lg:mt-8">
          <p className="mb-4 font-mono text-xs text-warm-gold">{altitude}</p>
          <h3 className="break-words font-sans text-2xl font-semibold uppercase leading-[1.05] tracking-[-0.04em] sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl">
            {title}
          </h3>
          <p className="mt-6 max-w-sm text-sm leading-7 text-glacier-cream/90">
            {description}
          </p>
          <InquiryButton
            href={serviceType === "tour" ? "/tours" : serviceType === "trek" ? "/treks" : "/expeditions"}
            context={{ serviceType }}
            variant="light"
            className="mt-8 w-full md:gap-3 md:px-3 lg:gap-8 lg:px-6"
          >
            Explore{" "}
            {serviceType === "expedition" ? "expeditions" : serviceType + "s"}
          </InquiryButton>
        </div>
      </article>
    </PointerSurface>
  );
}
