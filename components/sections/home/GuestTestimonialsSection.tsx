import Link from "next/link";
import { Star, CheckCircle2, ArrowUpRight } from "lucide-react";
import { GUEST_REVIEWS } from "@/lib/data/guides-reviews";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export function GuestTestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative bg-glacier-cream py-20 lg:py-28 border-b border-midnight-navy/20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionHeader
          index="11"
          eyebrow="Verified Expedition Logs"
          title="Trusted by Discerning Collectors, Photographers & Alpinists"
          description="Read unedited dispatches from international guests who traversed Gilgit-Baltistan under Karakoram's private logistical command."
          actions={
            <Button asChild variant="outline" size="md">
              <Link href="/reviews">
                All Verified Dispatches
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        {/* 3-Column Architectural Dossier Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 border-t border-l border-midnight-navy/20 bg-white">
          {GUEST_REVIEWS.map((review, idx) => (
            <article
              key={review.id}
              className="flex flex-col justify-between border-r border-b border-midnight-navy/20 p-6 sm:p-8 transition-colors hover:bg-sandstone/20"
            >
              <div>
                {/* Top Verification Bar */}
                <div className="flex items-center justify-between border-b border-midnight-navy/15 pb-3.5">
                  <div className="flex items-center gap-1 text-warm-gold" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-warm-gold text-warm-gold"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="ml-1.5 font-mono text-[10px] font-semibold text-midnight-navy">
                      5.0
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 border border-alpine-teal/30 bg-glacier-cream px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-alpine-teal">
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    LOG • 0{idx + 1}
                  </span>
                </div>

                {/* Quote Body */}
                <blockquote className="mt-6">
                  <p className="text-sm leading-relaxed text-midnight-navy font-semibold">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-ink/80">
                    {review.storyExcerpt}
                  </p>
                </blockquote>
              </div>

              {/* Guest Dossier Footer */}
              <footer className="mt-8 border-t border-midnight-navy/15 pt-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-display text-base font-semibold text-midnight-navy">
                    {review.consentedName}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-ink/60">
                    {review.travelDate}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-ink/65">
                  {review.travelerCountry} • {review.travelerType}
                </p>
                <div className="mt-3 border-t border-midnight-navy/10 pt-2.5 flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-ink/50">
                    ROUTE:
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-alpine-teal truncate">
                    {review.journeyTitle}
                  </span>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
