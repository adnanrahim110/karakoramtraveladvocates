import type { TravelDestination } from "@/lib/data/destination-content";

export function DestinationOverviewSection({
  destination,
}: {
  destination: TravelDestination;
}) {
  return (
    <section
      aria-labelledby="destination-overview-title"
      className="mx-auto w-full max-w-360 px-6 pb-16 pt-16 sm:px-10 sm:pt-20 lg:px-16 lg:pb-24"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">
            A closer look
          </p>
          <h2
            id="destination-overview-title"
            className="mt-4 font-editorial text-4xl font-normal leading-tight text-midnight-navy"
          >
            Time well spent in {destination.name}.
          </h2>
        </div>
        <div className="space-y-6 text-base leading-8 text-slate-ink/85 lg:col-span-7 lg:col-start-6">
          {destination.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
