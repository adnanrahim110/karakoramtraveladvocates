"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQS } from "@/lib/data/articles-faqs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export function FaqPreviewSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative bg-sandstone/30 py-20 lg:py-28 border-b border-midnight-navy/20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionHeader
          index="14"
          eyebrow="Pre-Departure Intelligence"
          title="Frequently Asked Operational Questions"
          description="Clear, transparent answers regarding Skardu aviation contingencies, NOC border permits, medical evacuation protocols, and bespoke itinerary design."
          actions={
            <Button asChild variant="outline" size="md">
              <Link href="/faqs">
                Full FAQ Knowledgebase
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 border-t border-l border-midnight-navy/20 bg-white">
          {/* Left Operational Advisory Column (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col justify-between border-r border-b border-midnight-navy/20 bg-midnight-navy p-6 sm:p-8 text-glacier-cream">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-gold">
                DIRECT SPECIALIST DESK
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-wide text-glacier-cream">
                Need Route-Specific Permit or Altitude Advice?
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-glacier-cream/75">
                Every foreign passport nationality and high-altitude objective has distinct Ministry of Tourism and Gilgit-Baltistan district clearance timelines. Speak directly with our Skardu &amp; Islamabad permit officers.
              </p>
            </div>

            <div className="mt-8 space-y-3 border-t border-glacier-cream/15 pt-6">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
                <span className="text-glacier-cream/55">AVG RESPONSE TIME</span>
                <span className="text-warm-gold font-semibold">&lt; 4 HOURS</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
                <span className="text-glacier-cream/55">OPERATIONS HOURS</span>
                <span className="text-glacier-cream font-semibold">08:00–22:00 PKT</span>
              </div>
              <div className="pt-3">
                <Button asChild variant="primary" size="md" className="w-full">
                  <Link href="/schedule-call">
                    Book 1-on-1 Briefing Call
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </aside>

          {/* Right Accordion Ledger (8 cols) */}
          <div className="lg:col-span-8 divide-y divide-midnight-navy/20 border-r border-b border-midnight-navy/20">
            {FAQS.map((faq, index) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={cn(
                    "transition-colors",
                    isOpen ? "bg-glacier-cream" : "bg-white hover:bg-glacier-cream/50"
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left focus-visible:outline-2 focus-visible:outline-alpine-teal"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 border border-midnight-navy/20 bg-white px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-alpine-teal">
                        Q.0{index + 1}
                      </span>
                      <div>
                        <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-ink/55">
                          {faq.category}
                        </span>
                        <h3 className="mt-1 font-display text-base sm:text-lg font-semibold text-midnight-navy">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-midnight-navy/20 bg-white text-midnight-navy">
                      {isOpen ? (
                        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-midnight-navy/10 px-6 pb-6 pt-4 pl-16">
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-ink/85">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
