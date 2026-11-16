"use client";

import Link from "next/link";
import { Compass, BookOpen, ArrowUpRight } from "lucide-react";
import { useInteractive } from "@/components/spatial/InteractiveContext";

export function StickyMobileBar() {
  const { openInquiry } = useInteractive();

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 grid grid-cols-3 border-t border-glacier-cream/25 bg-midnight-navy text-glacier-cream lg:hidden">
      <Link
        href="/treks"
        className="flex min-h-13 flex-col items-center justify-center border-r border-glacier-cream/20 px-2 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-glacier-cream active:bg-slate-ink focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
      >
        <Compass
          className="mb-1 h-4 w-4 text-warm-gold"
          aria-hidden="true"
        />
        Journeys
      </Link>

      <Link
        href="/travel-guide"
        className="flex min-h-13 flex-col items-center justify-center border-r border-glacier-cream/20 px-2 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-glacier-cream active:bg-slate-ink focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
      >
        <BookOpen
          className="mb-1 h-4 w-4 text-warm-gold"
          aria-hidden="true"
        />
        Travel Guide
      </Link>

      <button
        type="button"
        onClick={() => openInquiry()}
        className="flex min-h-13 flex-col items-center justify-center bg-warm-gold px-2 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-midnight-navy active:bg-glacier-cream focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
      >
        <ArrowUpRight className="mb-1 h-4 w-4" aria-hidden="true" />
        Inquire Now
      </button>
    </div>
  );
}
