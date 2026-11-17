import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { PointerSurface } from "@/components/motion/PointerSurface";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { TextLink } from "@/components/ui/TextLink";
import type { PlanningArticle } from "@/lib/data/planning-content";

export function FieldNote({
  article,
  title,
  summary,
}: {
  article: PlanningArticle;
  title: string;
  summary?: string;
}) {
  const image = article.image;
  const checklist = article.sections.flatMap(
    (section) => section.checklist ?? [],
  );
  const takeaways =
    checklist.length > 0
      ? checklist.slice(0, 3)
      : article.sections.slice(0, 3).map((section) => section.paragraphs[0]);
  const officialSource = article.sources?.[0];

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-sm border border-midnight-navy/15 bg-glacier-cream text-midnight-navy">
      <PointerSurface
        strength={24}
        className="relative aspect-[16/10] shrink-0 overflow-hidden bg-midnight-navy/10"
      >
        <div data-pointer-layer className="absolute -inset-8">
          <ParallaxImage
            src={image.src}
            alt={image.alt}
            className="h-full w-full"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            amount="medium"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 border border-glacier-cream/50 transition-[border-color] duration-140 ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover:border-warm-gold group-hover:duration-220 motion-reduce:transition-none"
        />
        <span className="absolute bottom-4 left-4 bg-glacier-cream px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-midnight-navy">
          {article.readTime} / Field notes
        </span>
      </PointerSurface>

      <div className="flex flex-1 flex-col px-5 pt-5 pb-2 sm:px-6 xl:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <FieldLabel>{article.category}</FieldLabel>
          <p className="font-mono text-xs tabular-nums text-slate-ink/75">
            {article.readTime}
          </p>
        </div>

        <h3 className="mt-3 break-words font-sans text-2xl font-semibold leading-tight tracking-[-0.035em] text-balance text-midnight-navy sm:text-3xl">
          {title}
        </h3>

        <p className="mt-3 mb-6 text-sm leading-7 text-slate-ink/85">
          {summary ?? article.summary}
        </p>

        <div className="mt-auto border-t border-midnight-navy/15">
          <details className="group/note border-b border-midnight-navy/15">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-semibold text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpine-teal [&::-webkit-details-marker]:hidden">
              <span>Read the field note</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-midnight-navy text-glacier-cream transition-[background-color,transform] duration-140 ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover/note:bg-alpine-teal group-hover/note:duration-220 motion-reduce:transition-none">
                <Plus
                  className="h-4 w-4 group-open/note:hidden"
                  aria-hidden="true"
                />
                <Minus
                  className="hidden h-4 w-4 group-open/note:block"
                  aria-hidden="true"
                />
              </span>
            </summary>
            <div className="mb-4 border-l-2 border-alpine-teal pl-4">
              <ul className="space-y-3 text-sm leading-6 text-slate-ink/85">
                {takeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
              {officialSource && (
                <a
                  href={officialSource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group/source mt-4 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-alpine-teal underline underline-offset-4 hover:text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <span>Official guidance</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-140 ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover/source:translate-x-1 group-hover/source:-translate-y-1 group-hover/source:duration-220 motion-reduce:transform-none motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </details>

          <TextLink href={article.href} className="w-full border-b-0">
            Read the full guide
          </TextLink>
        </div>
      </div>
    </article>
  );
}
