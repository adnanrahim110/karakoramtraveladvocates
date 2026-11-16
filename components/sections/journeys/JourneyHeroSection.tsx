import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { journeyKindLabels, journeyKindPaths, type TravelJourney } from "@/lib/data/travel-content";

export function JourneyHeroSection({ journey }: { journey: TravelJourney }) {
  return (
    <section aria-labelledby="journey-title" className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-360 px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
        <Link href={journeyKindPaths[journey.kind]} className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-alpine-teal hover:text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-4"><ArrowLeft className="size-4" aria-hidden="true" /> {journeyKindLabels[journey.kind]}</Link>
        <p className="mt-6 text-xs uppercase tracking-widest text-alpine-teal">{journey.region}</p>
        <div className="mt-4 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8"><h1 id="journey-title" className="max-w-4xl font-editorial text-4xl font-normal leading-tight text-midnight-navy sm:text-5xl xl:text-6xl">{journey.title}</h1><p className="mt-6 max-w-2xl text-base leading-8 text-slate-ink/80 sm:text-lg">{journey.summary}</p>{journey.accessNotice && <a href="#route-advice" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-amber-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Regional access advice: review before planning</a>}</div>
          <div className="lg:col-span-4 lg:justify-self-end"><InquiryButton context={{ tripTitle: journey.title, tripSlug: journey.slug, serviceType: journey.kind, regionName: journey.region }}>{journey.accessNotice ? "Discuss route alternatives" : journey.kind === "expedition" ? "Discuss this objective" : "Plan this journey"}</InquiryButton><p className="mt-3 text-xs text-slate-ink/75">A tailored proposal. A clear quote.</p></div>
        </div>
      </div>
      <figure className="relative mx-auto max-w-360 overflow-hidden">
        <div className="relative aspect-4/3 sm:aspect-16/9 lg:aspect-21/9"><Image src={journey.image.src} alt={journey.image.alt} fill preload sizes="(min-width: 1440px) 1440px, 100vw" className="object-cover" /></div>
        <figcaption className="border-b border-midnight-navy/15 px-6 py-3 text-[11px] leading-5 text-slate-ink/75 sm:px-10 lg:px-16"><a href={journey.image.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-2">{journey.image.credit}</a> · <a href={journey.image.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-2">{journey.image.license}</a> · {journey.image.alt}</figcaption>
      </figure>
      <dl className="mx-auto grid max-w-360 grid-cols-2 gap-x-6 gap-y-8 border-b border-midnight-navy/20 px-6 py-8 sm:grid-cols-3 sm:px-10 lg:grid-cols-6 lg:px-16 lg:py-10">
        <div><dt className="text-xs text-slate-ink/75">Route allowance</dt><dd className="mt-2 text-sm font-semibold text-midnight-navy">{journey.durationDays} days</dd></div>
        <div><dt className="text-xs text-slate-ink/75">Challenge</dt><dd className="mt-2 text-sm font-semibold text-midnight-navy">{journey.difficulty}</dd></div>
        <div><dt className="text-xs text-slate-ink/75">Highest point</dt><dd className="mt-2 text-sm font-semibold text-midnight-navy">{journey.maxAltitude.toLocaleString("en-US")} m</dd></div>
        <div><dt className="text-xs text-slate-ink/75">Typical season</dt><dd className="mt-2 text-sm font-semibold text-midnight-navy">{journey.season}</dd></div>
        <div><dt className="text-xs text-slate-ink/75">Group</dt><dd className="mt-2 text-sm font-semibold leading-6 text-midnight-navy">{journey.groupSize}</dd></div>
        <div><dt className="text-xs text-slate-ink/75">Price</dt><dd className="mt-2 text-sm font-semibold text-midnight-navy">Quote on request</dd></div>
      </dl>
    </section>
  );
}
