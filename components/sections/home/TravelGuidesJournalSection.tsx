import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight, BookOpen } from "lucide-react";
import { PLANNING_ARTICLES } from "@/lib/data/articles-faqs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export function TravelGuidesJournalSection() {
  return (
    <section
      aria-labelledby="journal-heading"
      className="relative bg-glacier-cream py-20 lg:py-28 border-b border-midnight-navy/20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionHeader
          index="13"
          eyebrow="The Karakoram Dispatch & Planning Hub"
          title="Authoritative Intelligence for Northern Pakistan"
          description="Practical briefings on NOC permits, Skardu flight contingencies, seasonal weather windows, and physiological preparation written by our senior expedition directors."
          actions={
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="md">
                <Link href="/travel-guide">Travel Planning Hub</Link>
              </Button>
              <Button asChild variant="secondary" size="md">
                <Link href="/journal">
                  All Dispatches
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          }
        />

        {/* Architectural 2x2 Dispatch Matrix */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 border-t border-l border-midnight-navy/20 bg-white">
          {PLANNING_ARTICLES.map((article, idx) => (
            <article
              key={article.id}
              data-cursor="READ BRIEF"
              className="group grid grid-cols-1 sm:grid-cols-12 border-r border-b border-midnight-navy/20 transition-colors hover:bg-sandstone/20"
            >
              {/* Left Thumbnail Frame (5 cols) */}
              <div className="sm:col-span-5 relative min-h-[220px] overflow-hidden border-b sm:border-b-0 sm:border-r border-midnight-navy/15 bg-midnight-navy">
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-midnight-navy/20" />
                <div className="absolute top-3 left-3 border border-glacier-cream/25 bg-midnight-navy/90 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-warm-gold">
                  BRIEF • 0{idx + 1}
                </div>
              </div>

              {/* Right Content Dossier (7 cols) */}
              <div className="sm:col-span-7 flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-midnight-navy/15 pb-2.5 font-mono text-[9px] uppercase tracking-[0.14em]">
                    <span className="font-semibold text-alpine-teal">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-ink/60">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {article.readTimeMinutes} MIN READ
                    </span>
                  </div>

                  <h3 className="mt-3.5 font-display text-lg font-semibold leading-snug text-midnight-navy group-hover:text-alpine-teal transition-colors">
                    <Link href={article.urlPath}>{article.title}</Link>
                  </h3>

                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-ink/75">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-midnight-navy/15 pt-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-ink/60">
                    {article.reviewerRole}
                  </span>
                  <Link
                    href={article.urlPath}
                    className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-midnight-navy group-hover:text-alpine-teal"
                  >
                    Read Brief
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Quick Resource Strip */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-midnight-navy/20 bg-glacier-cream">
          {[
            { label: "Best Time to Visit Matrix", href: "/travel-guide/best-time-to-visit" },
            { label: "Pakistan Visa & NOC Guide", href: "/travel-guide/pakistan-visas" },
            { label: "Trekking & Climbing Permits", href: "/travel-guide/trekking-mountaineering-permits" },
            { label: "K2 Base Camp Packing List", href: "/travel-guide/k2-base-camp-packing-list" },
          ].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between border-r border-b border-midnight-navy/20 bg-white px-5 py-4 transition-colors hover:bg-midnight-navy hover:text-glacier-cream"
            >
              <span className="flex items-center gap-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">
                <BookOpen className="h-3.5 w-3.5 text-warm-gold" aria-hidden="true" />
                0{i + 1}. {link.label}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-alpine-teal group-hover:text-warm-gold" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
