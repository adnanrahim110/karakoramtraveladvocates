import { FooterNavLink } from "@/components/layout/footer/FooterNavLink";

interface FooterJourneyLinkProps {
  number: string;
  title: string;
  href: string;
}

export function FooterJourneyLink({
  number,
  title,
  href,
}: FooterJourneyLinkProps) {
  return (
    <li className="min-w-0">
      <FooterNavLink href={href} label={title} number={number} />
    </li>
  );
}
