import { FieldNote } from "@/components/sections/home/journal/FieldNote";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { planningArticles } from "@/lib/data/planning-content";

const TITLES: Record<string, string> = {
  "best-time-to-visit": "THE NORTH, IN EVERY COLOUR.",
  "visas-and-permits": "BEFORE YOU CROSS THE BORDER.",
  packing: "LESS WEIGHT. MORE POSSIBILITY.",
};

export function FieldNotesSection() {
  const notes = ["best-time-to-visit", "visas-and-permits", "packing"].flatMap(
    (slug) => {
      const article = planningArticles.find((item) => item.slug === slug);
      return article ? [article] : [];
    },
  );

  return (
    <section
      id="field-notes"
      aria-labelledby="field-notes-title"
      className="bg-[#e9e4d8] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-400 px-6 sm:px-10 lg:px-16">
        <header className="border-b border-midnight-navy/25 pb-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <FieldLabel>08 / The Karakoram dispatch</FieldLabel>
            <p className="text-sm text-slate-ink/80">
              For the curious. For the prepared.
            </p>
          </div>
          <HomeSectionHeading
            id="field-notes-title"
            className="mt-8 text-midnight-navy"
          >
            POSTCARDS{" "}
            <span className="font-editorial font-normal italic normal-case text-alpine-teal">
              from the north.
            </span>
          </HomeSectionHeading>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {notes.map((article) => (
            <FieldNote
              key={article.slug}
              article={article}
              title={TITLES[article.slug] ?? article.title}
              summary={article.summary}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
