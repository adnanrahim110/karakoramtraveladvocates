import Image from "next/image";
import { TextLink } from "@/components/ui/TextLink";
import type { HomeMediaAsset } from "@/lib/data/home-media";

interface ExperienceChapterProps {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  linkLabel: string;
  altitude: string;
  image: HomeMediaAsset;
}

export function ExperienceChapter({
  title,
  subtitle,
  description,
  href,
  linkLabel,
  altitude,
  image,
}: ExperienceChapterProps) {
  return (
    <article
      data-scroll-panel
      className="flex h-full min-w-0 flex-col self-stretch overflow-hidden rounded-sm border border-midnight-navy/15 bg-white/60 group-data-[scroll-pinned=true]/scroll:w-[min(86cqw,36rem)] group-data-[scroll-pinned=true]/scroll:shrink-0"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-midnight-navy/10 group-data-[scroll-pinned=true]/scroll:max-h-[38svh]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          quality={90}
          sizes="(min-width: 1024px) 576px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pt-5 pb-4 sm:px-6 xl:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <p className="text-xs font-semibold text-alpine-teal">
            {subtitle}
          </p>
          <p className="font-mono text-xs tabular-nums text-slate-ink/80">{altitude}</p>
        </div>
        <h3 className="mt-3 font-editorial text-3xl leading-tight font-normal tracking-tight text-balance xl:text-4xl">
          {title}
        </h3>
        <p className="mt-3 mb-4 max-w-prose text-sm leading-6 text-slate-ink/85">
          {description}
        </p>
        <div className="mt-auto border-t border-midnight-navy/15">
          <TextLink href={href} className="w-full border-b-0">
            {linkLabel}
          </TextLink>
        </div>
      </div>
    </article>
  );
}
