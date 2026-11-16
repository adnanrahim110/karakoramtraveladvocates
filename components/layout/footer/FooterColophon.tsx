import { ArrowUp } from "lucide-react";
import { FooterNavLink } from "@/components/layout/footer/FooterNavLink";

const UTILITY_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Photography & film credits", href: "/image-credits" },
];

export function FooterColophon() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-glacier-cream/20 py-4">
      <p className="text-xs leading-5 text-glacier-cream/65">© 2026 Karakoram Travel Advocates.</p>
      <nav aria-label="Footer legal and credits">
        <ul className="flex flex-wrap gap-x-6">
          {UTILITY_LINKS.map((link) => (
            <li key={link.href}>
              <FooterNavLink href={link.href} label={link.label} className="text-xs text-glacier-cream/75" />
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] leading-5 tracking-wider text-glacier-cream/65">PKT / UTC +05:00</span>
        <a href="#main-content" aria-label="Back to the top" className="flex size-11 shrink-0 items-center justify-center rounded-full border border-glacier-cream/25 text-glacier-cream hover:border-warm-gold hover:bg-warm-gold hover:text-midnight-navy active:bg-glacier-cream active:text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold">
          <ArrowUp aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  );
}
