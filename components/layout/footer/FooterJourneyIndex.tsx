import { FooterJourneyLink } from "@/components/layout/footer/FooterJourneyLink";
import { FooterLinkColumn } from "@/components/layout/FooterLinkColumn";
import { travelDestinations } from "@/lib/data/destination-content";
import { travelJourneys } from "@/lib/data/travel-content";

const EXPLORE_LINKS = [
  { number: "01", title: "Treks", href: "/treks" },
  { number: "02", title: "Private tours", href: "/tours" },
  { number: "03", title: "Expeditions", href: "/expeditions" },
  { number: "04", title: "Destinations", href: "/destinations" },
] as const;

const ROUTE_SLUGS: readonly { slug: string; label?: string }[] = [
  { slug: "k2-base-camp-trek" },
  { slug: "snow-lake-hispar-la-trek", label: "Snow Lake & Biafo–Hispar" },
  { slug: "hunza-valley-private-journey" },
  { slug: "spantik-peak-expedition" },
];

const REGION_SLUGS: readonly { slug: string; label?: string }[] = [
  { slug: "hunza" },
  { slug: "skardu" },
  { slug: "baltoro-concordia" },
  { slug: "fairy-meadows", label: "Fairy Meadows" },
];

const COMPANY_LINKS = [
  { label: "Why Pakistan", href: "/why-pakistan" },
  { label: "Travel guide", href: "/travel-guide" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function FooterJourneyIndex() {
  const journeyBySlug = new Map(
    travelJourneys.map((journey) => [journey.slug, journey]),
  );
  const routeLinks = ROUTE_SLUGS.flatMap(({ slug, label }) => {
    const journey = journeyBySlug.get(slug);
    return journey
      ? [{ href: journey.href, label: label ?? journey.title }]
      : [];
  });

  const destinationBySlug = new Map(
    travelDestinations.map((destination) => [destination.slug, destination]),
  );
  const regionLinks = REGION_SLUGS.flatMap(({ slug, label }) => {
    const destination = destinationBySlug.get(slug);
    return destination
      ? [{ href: destination.href, label: label ?? destination.name }]
      : [];
  });

  return (
    <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:col-span-8 lg:items-start lg:gap-x-8">
      <nav aria-label="Footer primary disciplines" className="min-w-0">
        <p className="font-mono text-[10px] font-medium uppercase leading-5 tracking-[0.14em] text-warm-gold">
          Explore
        </p>
        <ul className="mt-3 space-y-1">
          {EXPLORE_LINKS.map((link) => (
            <FooterJourneyLink key={link.href} {...link} />
          ))}
        </ul>
      </nav>
      <FooterLinkColumn
        title="Signature routes"
        label="Featured northern Pakistan routes"
        links={routeLinks}
      />
      <FooterLinkColumn
        title="Regions"
        label="Northern Pakistan regions"
        links={regionLinks}
      />
      <FooterLinkColumn
        title="Planning & company"
        label="About Karakoram Travel Advocates"
        links={COMPANY_LINKS}
      />
    </div>
  );
}
