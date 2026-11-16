import { FooterJourneyLink } from "@/components/layout/footer/FooterJourneyLink";
import { FooterLinkColumn } from "@/components/layout/FooterLinkColumn";

const JOURNEY_LINKS = [
  { number: "01", title: "Treks", href: "/treks" },
  { number: "02", title: "Private tours", href: "/tours" },
  { number: "03", title: "Expeditions", href: "/expeditions" },
  { number: "04", title: "Destinations", href: "/destinations" },
];

const READING_LINKS = [
  { label: "Why Pakistan", href: "/why-pakistan" },
  { label: "Travel guide", href: "/travel-guide" },
];

const COMPANY_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function FooterJourneyIndex() {
  return (
    <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-8 lg:col-span-8">
      <nav aria-label="Footer journey index" className="col-span-2 min-w-0">
        <p className="mb-4 font-mono text-[10px] leading-5 tracking-[0.12em] uppercase text-warm-gold">The journey index</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 md:gap-x-8 lg:grid-cols-1 xl:grid-cols-2">
          {JOURNEY_LINKS.map((link) => <FooterJourneyLink key={link.href} {...link} />)}
        </ul>
      </nav>
      <FooterLinkColumn title="Reading room" label="Travel information" links={READING_LINKS} />
      <FooterLinkColumn title="The company" label="About Karakoram Travel Advocates" links={COMPANY_LINKS} />
    </div>
  );
}
