import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { planningArticles } from "@/lib/data/planning-content";
import { PlanningCard } from "./PlanningCard";

export function PlanningCollectionSection() {
  return (
    <section
      aria-labelledby="planning-guides-title"
      className="mx-auto w-full max-w-400 px-6 pb-20 pt-14 sm:px-10 sm:pt-16 lg:px-16 lg:pb-28"
    >
      <header className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div>
          <FieldLabel>Practical references</FieldLabel>
          <HomeSectionHeading
            id="planning-guides-title"
            variant="compact"
            className="mt-3 text-midnight-navy"
          >
            Read before{" "}
            <span className="font-editorial font-normal lowercase italic text-alpine-teal">
              you commit.
            </span>
          </HomeSectionHeading>
        </div>
        <p className="max-w-md text-sm leading-7 text-slate-ink/85">
          Independent field notes covering seasonal access, cost transparency,
          permits, mountain flights, and acclimatization.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {planningArticles.map((article, index) => (
          <PlanningCard
            key={article.slug}
            article={article}
            index={index}
            headingLevel="h3"
          />
        ))}
      </div>
    </section>
  );
}
