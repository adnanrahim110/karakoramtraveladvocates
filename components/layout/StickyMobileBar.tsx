"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Compass, BookOpen, ArrowUpRight } from "lucide-react";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { cn } from "@/lib/utils";

export function StickyMobileBar() {
  const { openInquiry } = useInteractive();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const heroSection = document.querySelector<HTMLElement>(
        "#main-content > section:first-of-type",
      );
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setIsVisible(rect.height > 0 && rect.bottom <= rect.height * 0.5);
        return;
      }
      setIsVisible(window.scrollY >= window.innerHeight * 0.5);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden={!isVisible}
      inert={!isVisible}
      className={cn(
        "fixed right-0 bottom-0 left-0 z-40 grid grid-cols-3 border-t border-glacier-cream/25 bg-midnight-navy text-glacier-cream transition-all duration-300 ease-[cubic-bezier(0.2,0.65,0.3,1)] motion-reduce:transition-none lg:hidden",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
    >
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
