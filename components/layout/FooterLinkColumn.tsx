import { FooterNavLink } from "@/components/layout/footer/FooterNavLink";

export function FooterLinkColumn({
  title,
  label,
  links,
}: {
  title: string;
  label: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <nav aria-label={label} className="min-w-0">
      <p className="font-mono text-[10px] leading-5 tracking-[0.12em] uppercase text-warm-gold">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <FooterNavLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
