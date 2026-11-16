import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <section className="border-b border-midnight-navy/15 bg-glacier-cream px-6 pb-12 pt-32 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="mb-8 inline-flex min-h-11 items-center gap-2 text-xs font-medium text-alpine-teal hover:text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">
          <ArrowLeft aria-hidden="true" className="size-4" /> Home
        </Link>
        <p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-balance font-editorial text-5xl font-normal leading-tight text-midnight-navy sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-ink/80 sm:text-lg">{description}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
