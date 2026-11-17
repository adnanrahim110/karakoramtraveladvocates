"use client";

import {
    useInteractive,
    type InquiryContextPayload,
} from "@/components/spatial/InteractiveContext";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  dark: "border-midnight-navy bg-midnight-navy text-glacier-cream hover:border-warm-gold hover:text-midnight-navy focus-visible:text-midnight-navy",
  light:
    "border-glacier-cream bg-glacier-cream text-midnight-navy hover:border-warm-gold hover:text-midnight-navy focus-visible:text-midnight-navy",
  outline:
    "border-current bg-transparent text-inherit hover:border-warm-gold hover:text-midnight-navy focus-visible:text-midnight-navy",
};

export function InquiryButton({
  children = "Plan your journey",
  context,
  className,
  variant = "dark",
  href,
}: {
  children?: ReactNode;
  context?: InquiryContextPayload;
  className?: string;
  variant?: keyof typeof variants;
  href?: string;
}) {
  const { openInquiry } = useInteractive();
  const classes = cn(
    "group relative isolate inline-flex min-h-14 cursor-pointer items-center justify-between gap-8 overflow-hidden border px-6 py-4 text-sm font-semibold transition-colors duration-150 ease-[cubic-bezier(0.2,0.65,0.3,1)] hover:duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold active:brightness-90",
    variants[variant],
    className,
  );
  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 -translate-x-full bg-warm-gold transition-transform duration-140 ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover:translate-x-0 group-hover:duration-220 group-focus-visible:translate-x-0 motion-reduce:transition-none"
      />
      <span className="relative min-w-0 text-left">{children}</span>
      <span
        aria-hidden="true"
        className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center border border-current/30"
      >
        <ArrowUpRight className="h-4 w-4 transition-transform duration-140 ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:duration-220 motion-reduce:transition-none motion-reduce:transform-none" />
      </span>
    </>
  );
  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <button
      type="button"
      onClick={() => openInquiry(context)}
      className={classes}
    >
      {content}
    </button>
  );
}
