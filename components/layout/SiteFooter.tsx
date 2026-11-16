import { FooterIdentity } from "@/components/layout/footer/FooterIdentity";
import { FooterJourneyIndex } from "@/components/layout/footer/FooterJourneyIndex";
import { FooterColophon } from "@/components/layout/footer/FooterColophon";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-midnight-navy bg-midnight-navy pb-16 text-glacier-cream lg:pb-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-transparent to-alpine-teal/15" />
      <div className="mx-auto max-w-360 px-6 sm:px-10 lg:px-16">
        <div className="grid gap-10 py-12 sm:gap-12 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-16">
          <FooterIdentity />
          <FooterJourneyIndex />
        </div>
        <FooterColophon />
      </div>
    </footer>
  );
}
