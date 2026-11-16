import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlanningCard } from "@/components/sections/planning/PlanningCard";
import { planningArticles } from "@/lib/data/planning-content";

export function PlanningHighlightsSection() {
  const articles = planningArticles.filter((article) => ["best-time-to-visit", "travel-costs", "getting-there"].includes(article.slug));
  return (
    <section id="field-notes" aria-labelledby="home-planning-title" className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">Before you pack</p><h2 id="home-planning-title" className="mt-4 font-editorial text-4xl font-normal leading-tight text-midnight-navy sm:text-5xl">Good journeys start<br /><em>with good questions.</em></h2><p className="mt-5 text-sm leading-7 text-slate-ink/80 sm:text-base">Useful guidance on when to travel, how to get there, and what to ask before you book.</p></div><Link href="/travel-guide" className="inline-flex min-h-11 items-center gap-3 border-b border-midnight-navy py-2 text-sm font-semibold text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">Read the travel guide<ArrowUpRight aria-hidden="true" className="size-4" /></Link></div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{articles.map((article) => <PlanningCard key={article.slug} article={article} headingLevel="h3" />)}</div>
      </div>
    </section>
  );
}
