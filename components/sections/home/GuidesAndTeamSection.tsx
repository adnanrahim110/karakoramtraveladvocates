import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Radio, Award, ArrowUpRight } from "lucide-react";
import { GUIDES } from "@/lib/data/guides-reviews";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export function GuidesAndTeamSection() {
  return (
    <section
      aria-labelledby="guides-heading"
      className="relative bg-glacier-cream py-20 lg:py-28 border-b border-midnight-navy/20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionHeader
          index="09"
          eyebrow="Sovereign Local Leadership"
          title="Born in the Valleys They Lead"
          description="Our high-altitude mountaineers, cultural historians, and expedition logistics directors are indigenous to Hushe, Shimshal, Hunza, and Skardu—bringing generational terrain knowledge no external operator can replicate."
          actions={
            <Button asChild variant="outline" size="md">
              <Link href="/our-guides">
                Meet All 18 Guides
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        {/* Architectural 3-Column Roster Matrix */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 border-t border-l border-midnight-navy/20 bg-white">
          {GUIDES.map((guide, index) => (
            <article
              key={guide.id}
              data-cursor={`DOSSIER 0${index + 1}`}
              className="group flex flex-col justify-between border-r border-b border-midnight-navy/20 transition-colors duration-200 hover:bg-sandstone/20"
            >
              <div>
                {/* Top Roster Strip */}
                <div className="flex items-center justify-between border-b border-midnight-navy/15 bg-glacier-cream px-5 py-2.5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-alpine-teal">
                    LEADER • 0{index + 1}
                  </span>
                  <span className="border border-midnight-navy/20 bg-white px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-midnight-navy">
                    {guide.yearsExperience} YRS EXP
                  </span>
                </div>

                {/* Portrait Frame with Architectural Coordinate Tags */}
                <div className="relative h-80 w-full overflow-hidden border-b border-midnight-navy/15 bg-midnight-navy">
                  <Image
                    src={guide.portraitSrc}
                    alt={guide.portraitAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 bg-midnight-navy/25" />

                  <div className="absolute top-3 left-3 border border-glacier-cream/25 bg-midnight-navy/90 px-2.5 py-1">
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-warm-gold">
                      ORIGIN: {guide.homeRegion}
                    </span>
                  </div>

                  <div className="absolute right-0 bottom-0 left-0 border-t border-glacier-cream/20 bg-midnight-navy/95 px-5 py-3">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-warm-gold">
                      {guide.roleTitle}
                    </p>
                    <h3 className="mt-0.5 font-display text-xl font-semibold tracking-wide text-glacier-cream">
                      {guide.name}
                    </h3>
                  </div>
                </div>

                {/* Notable Routes & Bio */}
                <div className="p-6">
                  <div className="border border-alpine-teal/25 bg-glacier-cream p-3.5">
                    <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-alpine-teal">
                      <Award className="h-3.5 w-3.5 text-warm-gold" aria-hidden="true" />
                      Notable Route Command
                    </div>
                    <p className="mt-1.5 text-xs font-semibold text-midnight-navy">
                      {guide.notableRoutes.slice(0, 2).join(" • ")}
                    </p>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-slate-ink/80">
                    {guide.bio}
                  </p>

                  {/* Certifications Table */}
                  <div className="mt-5 border-t border-midnight-navy/15 pt-4">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-ink/55">
                      Accredited Qualifications
                    </span>
                    <div className="mt-2 flex flex-col gap-1.5">
                      {guide.qualifications.map((cert) => (
                        <span
                          key={cert}
                          className="inline-flex items-center gap-1.5 border border-midnight-navy/15 bg-glacier-cream px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-midnight-navy"
                        >
                          <ShieldCheck
                            className="h-3 w-3 shrink-0 text-alpine-teal"
                            aria-hidden="true"
                          />
                          <span className="truncate">{cert}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Language & Dispatch Bar */}
              <div className="flex items-center justify-between border-t border-midnight-navy/15 bg-glacier-cream/60 px-6 py-3.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-ink/70">
                  LANG: {guide.languages.slice(0, 3).join(" / ")}
                </span>
                <Link
                  href={guide.urlPath}
                  className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-midnight-navy transition-colors hover:text-alpine-teal"
                >
                  Full Dossier
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Field Operations Callout Strip */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 border border-midnight-navy/20 bg-midnight-navy text-glacier-cream">
          <div className="lg:col-span-8 flex items-start gap-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-glacier-cream/15">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-warm-gold/40 bg-warm-gold/10 text-warm-gold">
              <Radio className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold tracking-wide text-glacier-cream">
                Direct Skardu &amp; Hunza Operations Desk — Zero Sub-Contracting
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-glacier-cream/75">
                Unlike international brokers who outsource operations upon arrival in Islamabad, Karakoram operates its own equipment depots, Toyota 4x4 fleet, and certified high-altitude kitchen crews across Gilgit-Baltistan.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-4 p-6 sm:p-8 bg-slate-ink/50">
            <Button asChild variant="primary" size="md" className="w-full sm:w-auto">
              <Link href="/about">
                Inspect Operations Infrastructure
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
