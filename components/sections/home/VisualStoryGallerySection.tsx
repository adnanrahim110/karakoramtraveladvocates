"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Camera, MapPin, Compass, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface StoryFrame {
  id: string;
  code: string;
  title: string;
  location: string;
  coordinates: string;
  elevation: string;
  season: string;
  image: string;
  caption: string;
  cameraSpec: string;
}

const STORY_FRAMES: StoryFrame[] = [
  {
    id: "frame-01",
    code: "ARCHIVE // 01",
    title: "First Alpenglow on K2's West Wall",
    location: "Concordia Amphitheatre, Baltoro Muztagh",
    coordinates: "35.7408° N, 76.5131° E",
    elevation: "4,691m",
    season: "Late July — 05:14 PKT",
    image: "/imgs/moodboard/scene-02.png",
    caption:
      "At dawn, the sun strikes the 8,611-meter pyramid of K2 twelve minutes before touching Broad Peak or the Gasherbrum massif below.",
    cameraSpec: "50mm f/2.0 • ISO 100 • 1/250s",
  },
  {
    id: "frame-02",
    code: "ARCHIVE // 02",
    title: "Autumn Gold Beneath Passu Cones",
    location: "Gojal Upper Hunza Valley",
    coordinates: "36.4867° N, 74.8781° E",
    elevation: "2,480m",
    season: "Late October — 16:40 PKT",
    image: "/imgs/moodboard/scene-05.png",
    caption:
      "Poplar and apricot orchards ignite in amber along the Indus tributary while the 6,106-meter Tupopdan cathedrals tower above.",
    cameraSpec: "35mm f/4.0 • ISO 64 • 1/500s",
  },
  {
    id: "frame-03",
    code: "ARCHIVE // 03",
    title: "Turquoise Meltwater of Attabad",
    location: "Attabad Gorge, Hunza",
    coordinates: "36.3358° N, 74.8689° E",
    elevation: "2,559m",
    season: "June — 11:20 PKT",
    image: "/imgs/moodboard/scene-08.png",
    caption:
      "Glacial rock flour suspended in deep canyon meltwater refracts emerald and cobalt light across our private wooden hull.",
    cameraSpec: "24mm f/5.6 • ISO 100 • 1/1000s",
  },
  {
    id: "frame-04",
    code: "ARCHIVE // 04",
    title: "Starlight Over Deosai High Plains",
    location: "Sheosar Lake, Deosai Plateau",
    coordinates: "34.9912° N, 75.2361° E",
    elevation: "4,142m",
    season: "August — 22:45 PKT",
    image: "/imgs/moodboard/scene-13.png",
    caption:
      "On the roof of the world above tree-line, zero light pollution reveals the Milky Way core mirrored over Nanga Parbat's Rupal silhouette.",
    cameraSpec: "16mm f/1.4 • ISO 1600 • 15s",
  },
];

export function VisualStoryGallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setParallaxY(Math.round((v - 0.5) * 40));
  });

  const activeFrame = STORY_FRAMES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? STORY_FRAMES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === STORY_FRAMES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="visual-story-heading"
      className="relative bg-midnight-navy py-20 lg:py-28 text-glacier-cream border-b border-glacier-cream/15 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionHeader
          index="12"
          eyebrow="Field Dispatches & Visual Archive"
          title="Light, Ice, and Granite Across the Seasons"
          description="Explore curated photographic field plates captured by our expedition leaders and guest visual documentarians."
          theme="dark"
          actions={
            <div className="flex items-center gap-0 border border-glacier-cream/25 bg-slate-ink">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous field plate"
                className="flex h-11 w-11 items-center justify-center border-r border-glacier-cream/20 text-glacier-cream transition-colors hover:bg-warm-gold hover:text-midnight-navy focus-visible:outline-2 focus-visible:outline-warm-gold"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-gold">
                0{activeIndex + 1} / 0{STORY_FRAMES.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next field plate"
                className="flex h-11 w-11 items-center justify-center border-l border-glacier-cream/20 text-glacier-cream transition-colors hover:bg-warm-gold hover:text-midnight-navy focus-visible:outline-2 focus-visible:outline-warm-gold"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          }
        />

        {/* Architectural Split Viewport + Telemetry Ledger */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 border border-glacier-cream/20 bg-slate-ink/50">
          {/* Primary Viewport (8 cols) */}
          <div
            data-cursor="PLATE VIEW"
            className="lg:col-span-8 relative min-h-[400px] sm:min-h-[540px] overflow-hidden border-b lg:border-b-0 lg:border-r border-glacier-cream/20 bg-midnight-navy"
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={activeFrame.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1.05, y: parallaxY }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative h-full w-full min-h-[400px] sm:min-h-[540px]"
              >
                <Image
                  src={activeFrame.image}
                  alt={activeFrame.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-midnight-navy/25" />
              </motion.figure>
            </AnimatePresence>

            {/* Compact Top Corner HUD */}
            <div className="pointer-events-none absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
              <div className="border border-glacier-cream/25 bg-midnight-navy/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-warm-gold">
                {activeFrame.code} • {activeFrame.coordinates}
              </div>
              <div className="border border-glacier-cream/25 bg-midnight-navy/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-glacier-cream">
                ELEV: {activeFrame.elevation}
              </div>
            </div>
          </div>

          {/* Right Specification & Selector Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-midnight-navy">
            {/* Active Frame Dossier */}
            <div className="p-6 sm:p-8 border-b border-glacier-cream/15">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-warm-gold">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {activeFrame.location}
                </span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-semibold tracking-wide text-glacier-cream">
                {activeFrame.title}
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-glacier-cream/75">
                {activeFrame.caption}
              </p>

              {/* Optical & Temporal Telemetry Grid */}
              <dl className="mt-6 grid grid-cols-2 border-t border-l border-glacier-cream/15">
                <div className="border-r border-b border-glacier-cream/15 p-3">
                  <dt className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.16em] text-glacier-cream/50">
                    <Compass className="h-3 w-3 text-warm-gold" aria-hidden="true" />
                    TIMESTAMP
                  </dt>
                  <dd className="mt-1 font-mono text-[10px] font-semibold text-glacier-cream">
                    {activeFrame.season}
                  </dd>
                </div>
                <div className="border-r border-b border-glacier-cream/15 p-3">
                  <dt className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.16em] text-glacier-cream/50">
                    <Camera className="h-3 w-3 text-warm-gold" aria-hidden="true" />
                    OPTICS
                  </dt>
                  <dd className="mt-1 font-mono text-[10px] font-semibold text-glacier-cream">
                    {activeFrame.cameraSpec}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Plate Index Selector */}
            <div className="divide-y divide-glacier-cream/15">
              {STORY_FRAMES.map((frame, index) => {
                const isSelected = index === activeIndex;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-3.5 p-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-warm-gold",
                      isSelected
                        ? "bg-slate-ink text-glacier-cream"
                        : "bg-midnight-navy text-glacier-cream/65 hover:bg-slate-ink/50 hover:text-glacier-cream"
                    )}
                  >
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden border border-glacier-cream/20">
                      <Image
                        src={frame.image}
                        alt={frame.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em]">
                        <span className={isSelected ? "text-warm-gold font-semibold" : "text-glacier-cream/45"}>
                          {frame.code}
                        </span>
                        <span className="text-glacier-cream/50">{frame.elevation}</span>
                      </div>
                      <p className="mt-0.5 truncate font-display text-xs font-semibold text-glacier-cream">
                        {frame.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
