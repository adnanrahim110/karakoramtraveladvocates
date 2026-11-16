import Link from "next/link";
import { Scale, Leaf, Users, HeartHandshake, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

const STEWARDSHIP_PILLARS = [
  {
    code: "ETH-01",
    icon: Scale,
    metric: "22 KG MAX",
    title: "Strict Porter Welfare Standard",
    description:
      "Strict 22kg maximum load limit per Balti and Shimshali porter, comprehensive high-altitude life & evacuation insurance, warm technical mountain footwear, and nutritious hot rations.",
  },
  {
    code: "ETH-02",
    icon: Leaf,
    metric: "100% PACK-OUT",
    title: "Zero-Trace Glacier Protocol",
    description:
      "Every expedition carries sealed waste drums out of the Baltoro and Hispar glaciers to Central Karakorum National Park (CKNP) recycling stations in Skardu.",
  },
  {
    code: "ETH-03",
    icon: Users,
    metric: "94% LOCAL",
    title: "Direct Valley Economics",
    description:
      "94% of operational expenditure remains directly inside Hunza, Nagar, Skardu, and Ghanche through locally owned heritage forts, organic orchards, and family guides.",
  },
  {
    code: "ETH-04",
    icon: HeartHandshake,
    metric: "WOMEN ARTISANS",
    title: "Cultural & Craft Preservation",
    description:
      "Direct patronage of Wakhi carpet weavers in Gulmit, female carpentry collectives in Altit, and traditional Balti stone architecture restoration.",
  },
];

export function ResponsibleTravelSection() {
  return (
    <section
      aria-labelledby="stewardship-heading"
      className="relative bg-sandstone/35 py-20 lg:py-28 border-b border-midnight-navy/20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionHeader
          index="10"
          eyebrow="Ethical Mountain Charter"
          title="Stewardship of the Karakoram & Its People"
          description="True luxury in the high mountains is measured by the dignity accorded to the porters, communities, and fragile glacial ecosystems that make your passage possible."
          actions={
            <Button asChild variant="outline" size="md">
              <Link href="/about">
                Read Full Charter
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-midnight-navy/20 bg-white">
          {STEWARDSHIP_PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.code}
                className="flex flex-col justify-between border-r border-b border-midnight-navy/20 p-6 sm:p-7 transition-colors hover:bg-glacier-cream"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-midnight-navy/15 pb-4">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-alpine-teal">
                      {item.code}
                    </span>
                    <span className="border border-midnight-navy/20 bg-glacier-cream px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-midnight-navy">
                      {item.metric}
                    </span>
                  </div>

                  <div className="mt-5 flex h-10 w-10 items-center justify-center border border-midnight-navy/20 bg-midnight-navy text-warm-gold">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold tracking-wide text-midnight-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-ink/80">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-midnight-navy/10 pt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-slate-ink/55">
                  <span>AUDITED ANNUALLY</span>
                  <span className="text-alpine-teal font-semibold">CKNP COMPLIANT</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
