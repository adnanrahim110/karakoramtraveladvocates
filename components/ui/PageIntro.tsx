import Image from "next/image";
import type { ReactNode } from "react";
import { PointerSurface } from "@/components/motion/PointerSurface";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { HOME_MEDIA, type HomeMediaAsset } from "@/lib/data/home-media";

export interface PageIntroStat {
  readonly label: string;
  readonly value: string;
}

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  image?: HomeMediaAsset;
  stats?: readonly PageIntroStat[];
  showCredit?: boolean;
  children?: ReactNode;
}

export function PageIntro({
  eyebrow,
  title,
  description,
  image = HOME_MEDIA.intro,
  stats,
  showCredit = false,
  children,
}: PageIntroProps) {
  const eyebrowLine =
    stats && stats.length > 0
      ? [eyebrow, ...stats.map((stat) => stat.value)].join(" · ")
      : eyebrow;

  return (
    <section className="relative isolate overflow-hidden border-b border-glacier-cream/15 bg-midnight-navy pt-20 text-glacier-cream lg:pt-22">
      <PointerSurface
        strength={20}
        className="relative isolate flex min-h-[calc(100svh-80px)] flex-col justify-end overflow-hidden lg:min-h-[calc(100svh-88px)]"
      >
        <div
          data-pointer-layer
          className="pointer-events-none absolute -inset-8 -z-20"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-midnight-navy/85 via-midnight-navy/25 to-transparent"
        />

        <div className="mx-auto grid w-full max-w-400 items-end gap-8 px-6 pt-24 pb-10 sm:px-10 sm:pb-12 lg:grid-cols-12 lg:px-16 lg:pb-14">
          <div className="min-w-0 lg:col-span-8">
            <FieldLabel className="text-warm-gold drop-shadow-[0_1px_12px_rgba(11,44,54,0.85)]">
              {eyebrowLine}
            </FieldLabel>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-glacier-cream drop-shadow-[0_2px_18px_rgba(11,44,54,0.75)] sm:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h1>
            <p className="mt-4 line-clamp-2 max-w-xl font-editorial text-lg leading-relaxed text-glacier-cream/95 drop-shadow-[0_2px_16px_rgba(11,44,54,0.8)] sm:text-xl">
              {description}
            </p>
            {children ? (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {children}
              </div>
            ) : null}
          </div>

          {showCredit ? (
            <div className="text-xs text-glacier-cream/80 drop-shadow-[0_1px_10px_rgba(11,44,54,0.85)] lg:col-span-4 lg:justify-self-end">
              <a
                href={image.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-warm-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-gold"
              >
                {image.credit}
              </a>{" "}
              ·{" "}
              <a
                href={image.licenseUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-warm-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-gold"
              >
                {image.license}
              </a>
            </div>
          ) : null}
        </div>
      </PointerSurface>
    </section>
  );
}
