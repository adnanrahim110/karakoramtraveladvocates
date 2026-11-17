import { FooterColophon } from "@/components/layout/footer/FooterColophon";
import { FooterIdentity } from "@/components/layout/footer/FooterIdentity";
import { FooterJourneyIndex } from "@/components/layout/footer/FooterJourneyIndex";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-glacier-cream/15 bg-midnight-navy pb-16 text-glacier-cream lg:pb-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-transparent to-alpine-teal/15"
      />
      <div className="mx-auto max-w-400 px-6 sm:px-10 lg:px-16">
        <div className="grid gap-10 py-10 sm:py-12 lg:grid-cols-12 lg:items-start lg:gap-12">
          <FooterIdentity />
          <FooterJourneyIndex />
        </div>
        <FooterColophon />
      </div>
    </footer>
  );
}
