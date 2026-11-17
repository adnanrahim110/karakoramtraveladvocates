import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContentSection } from "@/components/sections/planning/ArticleContentSection";
import { PlanningCalloutSection } from "@/components/sections/planning/PlanningCalloutSection";
import { PageIntro } from "@/components/ui/PageIntro";
import {
  getPlanningArticle,
  planningArticles,
} from "@/lib/data/planning-content";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return planningArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPlanningArticle(slug);
  if (!article) notFound();
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: article.href },
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [
        {
          url: article.image.src,
          width: article.image.width,
          height: article.image.height,
          alt: article.image.alt,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getPlanningArticle(slug);
  if (!article) notFound();
  return (
    <>
      <PageIntro
        eyebrow={`${article.category} / ${article.readTime}`}
        title={article.title}
        description={article.summary}
        image={article.image}
        showCredit
        stats={[
          { label: "Category", value: article.category },
          { label: "Reading time", value: article.readTime },
          { label: "Sections", value: `${article.sections.length} topics` },
        ]}
      />
      <ArticleContentSection article={article} />
      <PlanningCalloutSection />
    </>
  );
}
