import { FooterNavLink } from "@/components/layout/footer/FooterNavLink";

interface FooterJourneyLinkProps {
  number: string;
  title: string;
  href: string;
}

export function FooterJourneyLink({ number, title, href }: FooterJourneyLinkProps) {
  return (
    <li className="min-w-0">
      <FooterNavLink href={href} label={title} number={number} className="font-editorial text-xl text-glacier-cream sm:text-2xl lg:text-xl 2xl:text-2xl" />
    </li>
  );
}
