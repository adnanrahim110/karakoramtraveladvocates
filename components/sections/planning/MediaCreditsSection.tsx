import { HOME_MEDIA, HOME_FILM } from "@/lib/data/home-media";
import { travelMediaAssets } from "@/lib/data/travel-media";

export function MediaCreditsSection() {
  const assets = Array.from(new Map([...Object.values(HOME_MEDIA), ...travelMediaAssets, { ...HOME_FILM, alt: HOME_FILM.description }].map((asset) => [asset.src, asset])).values());
  return (
    <section aria-labelledby="credits-title" className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h2 id="credits-title" className="font-editorial text-3xl font-normal text-midnight-navy">Photography &amp; film sources</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-ink/80">Photographs are resized, compressed and cropped for display. Creative Commons derivatives retain their original licenses. The photographers do not endorse this operator.</p>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">{assets.map((asset) => <li key={asset.src} className="border-t border-midnight-navy/20 pt-6"><h3 className="font-sans text-sm font-semibold text-midnight-navy">{asset.credit}</h3><p className="mt-2 text-sm leading-7 text-slate-ink/80">{asset.alt}</p><div className="mt-2 flex flex-wrap gap-6"><a href={asset.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-xs font-medium text-alpine-teal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Original source</a><a href={asset.licenseUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-xs font-medium text-alpine-teal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{asset.license}</a></div></li>)}</ul>
      </div>
    </section>
  );
}
