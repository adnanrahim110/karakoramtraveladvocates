import { heroSummerImagery } from "@/lib/data/hero-terrain-imagery";

export function TerrainImageryCreditsSection() {
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(heroSummerImagery.captureTime));
  return (
    <section aria-labelledby="terrain-imagery-title" className="px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl border-t border-midnight-navy/20 pt-8">
        <h2 id="terrain-imagery-title" className="font-editorial text-3xl font-normal text-midnight-navy">Summer in the mountain scene</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-ink/80">
          The summer reveal uses Sentinel-2 satellite imagery of K2 and the Baltoro glaciers, captured on <time dateTime={heroSummerImagery.captureDate}>{date}</time>.
          The image is aligned to the mountain terrain and adjusted for display while retaining its actual rock, snow and glacier detail.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-ink/80">{heroSummerImagery.credit}</p>
        <div className="mt-2 flex flex-wrap gap-6">
          <a href={heroSummerImagery.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-xs font-medium text-alpine-teal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Satellite source and capture details</a>
          <a href={heroSummerImagery.licenseUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-xs font-medium text-alpine-teal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Copernicus Sentinel data terms</a>
        </div>
      </div>
    </section>
  );
}
