import { PlanningCard } from "./PlanningCard";
import { planningArticles } from "@/lib/data/planning-content";

export function PlanningCollectionSection() {
  return (
    <section aria-label="Travel planning guides" className="mx-auto w-full max-w-360 px-6 pb-20 pt-12 sm:px-10 lg:px-16 lg:pb-28">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {planningArticles.map((article) => <PlanningCard key={article.slug} article={article} />)}
      </div>
    </section>
  );
}
