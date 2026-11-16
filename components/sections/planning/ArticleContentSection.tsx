import Image from "next/image";
import Link from "next/link";
import type { PlanningArticle } from "@/lib/data/planning-content";

export function ArticleContentSection({ article }: { article: PlanningArticle }) {
  return (
    <div className="mx-auto w-full max-w-360 px-6 pb-20 pt-12 sm:px-10 lg:px-16 lg:pb-28">
      <figure>
        <div className="relative aspect-[3/2] overflow-hidden sm:aspect-[16/7]">
          <Image src={article.image.src} alt={article.image.alt} fill sizes="(min-width: 1440px) 1312px, 100vw" preload className="object-cover" />
        </div>
        <figcaption className="mt-3 text-xs leading-6 text-slate-ink/70">{article.image.credit} · <a href={article.image.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-2">{article.image.license}</a></figcaption>
      </figure>
      <div className="mt-12 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <aside className="border-t border-midnight-navy/25 pt-6 lg:sticky lg:top-28 lg:col-span-3">
          <nav aria-label="In this guide">
            <p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">In this guide</p>
            <ol className="mt-4 space-y-1">
              {article.sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="inline-flex min-h-11 items-center text-sm leading-6 text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-2">{section.title}</a></li>)}
            </ol>
          </nav>
        </aside>
        <article className="min-w-0 space-y-12 lg:col-span-8 lg:col-start-5">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`} className="font-editorial text-3xl font-normal leading-tight text-midnight-navy sm:text-4xl">{section.title}</h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-slate-ink/85">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              {section.checklist && <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-ink/85 marker:text-alpine-teal">{section.checklist.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
          {article.sources && <section aria-labelledby="guide-sources-title" className="border-t border-midnight-navy/20 pt-8"><h2 id="guide-sources-title" className="font-editorial text-2xl font-normal text-midnight-navy">Further reading from official sources</h2><ul className="mt-4 space-y-2">{article.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-sm leading-7 text-alpine-teal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{source.label}</a></li>)}</ul><p className="mt-4 text-xs leading-6 text-slate-ink/70">Entry rules, access and travel advice can change. Check the source that applies to your nationality and route before booking.</p></section>}
          <Link href="/travel-guide" className="inline-flex min-h-12 items-center border-b border-midnight-navy/25 text-sm font-semibold text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4">Back to all travel guides</Link>
        </article>
      </div>
    </div>
  );
}
