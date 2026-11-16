import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { PointerSurface } from "@/components/motion/PointerSurface";
import type { PlanningArticle } from "@/lib/data/planning-content";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/utils";

export function FieldNote({
  article,
  title,
  summary,
  variant = "compact",
}: {
  article: PlanningArticle;
  title: string;
  summary?: string;
  variant?: "feature" | "compact";
}) {
  const image = article.image;
  const checklist = article.sections.flatMap((section) => section.checklist ?? []);
  const takeaways = checklist.length > 0 ? checklist.slice(0, 3) : article.sections.slice(0, 3).map((section) => section.paragraphs[0]);
  const officialSource = article.sources?.[0];
  const feature = variant === "feature";
  return (
    <article className={cn("group min-w-0", !feature && "lg:pt-12")}>
      <PointerSurface
        strength={24}
        className={cn(
          "relative overflow-hidden",
          feature ? "aspect-4/5" : "aspect-4/3",
        )}
      >
        <div data-pointer-layer className="absolute -inset-8">
          <ParallaxImage
            src={image.src}
            alt={image.alt}
            className="h-full w-full"
            sizes="(min-width: 1024px) 33vw, 90vw"
            amount="medium"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 border border-glacier-cream/50 transition-[border-color] duration-140 ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover:border-warm-gold group-hover:duration-220 motion-reduce:transition-none"
        />
        <span className="absolute bottom-5 left-5 bg-glacier-cream px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-midnight-navy">
          {article.readTime} / Field notes
        </span>
      </PointerSurface>
      <div className="border-b border-midnight-navy/25 pb-6">
        <FieldLabel className="mt-6">{article.category}</FieldLabel>
        <h3 className="mt-4 break-words font-sans text-2xl font-semibold leading-tight tracking-[-0.035em] text-midnight-navy sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-ink/80">
          {summary ?? article.summary}
        </p>
        <details className="group/note mt-6">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 border-t border-midnight-navy/20 py-4 text-sm font-semibold text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal [&::-webkit-details-marker]:hidden">
            <span>Read the field note</span>
            <span className="flex h-9 w-9 items-center justify-center bg-midnight-navy text-glacier-cream transition-[background-color,transform] duration-140 ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover/note:bg-alpine-teal group-hover/note:duration-220 motion-reduce:transition-none">
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
          <div className="mt-3 border-l-2 border-alpine-teal pl-5">
            <ul className="space-y-4 text-sm leading-7 text-slate-ink/85">
              {takeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
            {officialSource && (
              <a
                href={officialSource.href}
                target="_blank"
                rel="noreferrer"
                className="group/source mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-alpine-teal underline underline-offset-4 hover:text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-4"
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
        <TextLink href={article.href} className="mt-4 w-full">Read the full guide</TextLink>
      </div>
    </article>
  );
}
