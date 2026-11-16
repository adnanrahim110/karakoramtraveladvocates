import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PlanningArticle } from "@/lib/data/planning-content";

export function PlanningCard({ article, headingLevel = "h2" }: { article: PlanningArticle; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group flex h-full flex-col border border-midnight-navy/20 bg-white/35">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image src={article.image.src} alt={article.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-xs font-semibold text-alpine-teal">{article.category} <span aria-hidden="true">/</span> {article.readTime}</p>
        <Heading className="mt-4 font-editorial text-3xl font-normal leading-tight text-midnight-navy">
          <Link href={article.href} className="hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">{article.title}</Link>
        </Heading>
        <p className="mt-4 flex-1 text-sm leading-7 text-slate-ink/80">{article.summary}</p>
        <Link href={article.href} aria-label={`Read ${article.title}`} className="mt-6 inline-flex min-h-11 w-fit items-center gap-3 text-xs font-semibold text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">
          Read the guide <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
