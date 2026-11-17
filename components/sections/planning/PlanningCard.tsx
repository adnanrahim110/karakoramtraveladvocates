import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PlanningArticle } from "@/lib/data/planning-content";

export function PlanningCard({
  article,
  index,
  headingLevel = "h2",
}: {
  article: PlanningArticle;
  index?: number;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const formattedNumber =
    index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <article className="group flex h-full flex-col border border-midnight-navy/15 bg-white/45 transition-colors hover:border-alpine-teal/40 motion-reduce:transition-none">
      <div className="relative aspect-[16/10] overflow-hidden bg-midnight-navy">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-midnight-navy/85 via-midnight-navy/25 to-transparent"
        />
        {formattedNumber ? (
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-6 font-mono text-xs tracking-[0.2em] text-warm-gold"
          >
            NOTE {formattedNumber}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-wider text-alpine-teal uppercase">
          {article.category} <span aria-hidden="true">/</span> {article.readTime}
        </p>
        <Heading className="mt-4 font-editorial text-2xl font-normal leading-snug text-midnight-navy sm:text-3xl">
          <Link
            href={article.href}
            className="transition-colors hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal motion-reduce:transition-none"
          >
            {article.title}
          </Link>
        </Heading>
        <p className="mt-4 flex-1 text-sm leading-7 text-slate-ink/80">
          {article.summary}
        </p>
        <Link
          href={article.href}
          aria-label={`Read ${article.title}`}
          className="mt-6 inline-flex min-h-11 w-fit items-center gap-3 text-xs font-semibold tracking-wide text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal"
        >
          <span>Read the guide</span>
          <ArrowUpRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
