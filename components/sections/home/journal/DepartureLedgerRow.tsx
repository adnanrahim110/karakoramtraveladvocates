import Link from "next/link";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { PointerSurface } from "@/components/motion/PointerSurface";
import type { TravelJourney } from "@/lib/data/travel-content";

const CATEGORY_LABELS = { tour: "Cultural journey", trek: "Guided trek", expedition: "Expedition" };

export function DepartureLedgerRow({ journey, index }: { journey: TravelJourney; index: number }) {
  return (
    <article className="group relative border border-midnight-navy/25 bg-[#eee9dc]">
      <PointerSurface strength={22} className="relative h-56 overflow-hidden sm:h-64">
        <div data-pointer-layer className="absolute -inset-8">
          <ParallaxImage src={journey.image.src} alt={journey.image.alt} className="h-full w-full" sizes="(min-width: 1280px) 45vw, 90vw" amount="subtle" />
        </div>
        <div className="absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-midnight-navy/85 px-5 py-4 font-mono text-xs uppercase tracking-[0.12em] text-glacier-cream">
          <span>{CATEGORY_LABELS[journey.kind]}</span>
          <span>Route / {String(index + 1).padStart(2, "0")}</span>
        </div>
      </PointerSurface>
      <div className="grid gap-6 px-5 py-8 sm:grid-cols-[96px_1fr] sm:px-8">
        <div className="flex items-baseline gap-3 border-midnight-navy/20 sm:block sm:border-r">
          <span className="block font-sans text-5xl font-semibold leading-none tracking-[-0.05em] text-midnight-navy">{journey.durationDays}</span>
          <span className="mt-2 block font-mono text-sm uppercase tracking-[0.12em] text-alpine-teal">Days</span>
        </div>
        <div className="min-w-0">
          <h3 className="break-words font-sans text-2xl font-semibold leading-tight tracking-[-0.04em] text-midnight-navy sm:text-3xl">
            <Link href={journey.href} className="hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4">{journey.title}</Link>
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-ink/80">{journey.region}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-midnight-navy">
            <span>{journey.season}</span><span>Quote on request</span>
          </div>
        </div>
      </div>
      <div className="relative border-t border-dashed border-midnight-navy/30 px-5 py-5 sm:px-8">
        <span aria-hidden="true" className="absolute -left-3 -top-3 h-6 w-6 rounded-full border-r border-midnight-navy/25 bg-glacier-cream" />
        <span aria-hidden="true" className="absolute -right-3 -top-3 h-6 w-6 rounded-full border-l border-midnight-navy/25 bg-glacier-cream" />
        <InquiryButton variant="outline" className="w-full justify-between border-midnight-navy/35" context={{ tripTitle: journey.title, tripSlug: journey.slug, serviceType: journey.kind, regionName: journey.region }}>Discuss your dates</InquiryButton>
      </div>
    </article>
  );
}
