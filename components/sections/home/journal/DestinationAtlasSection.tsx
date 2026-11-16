import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { HOME_MEDIA } from "@/lib/data/home-media";
import { DestinationAtlas } from "./DestinationAtlas";

const destinations = [
  {
    id: "hunza",
    href: "/destinations/hunza",
    name: "Hunza & Gojal",
    note: "Orchards, old forts, the Silk Road",
    coordinates: "36.3167° N / 74.6500° E",
    description:
      "Slow days in Karimabad, the silhouettes of Passu and villages threaded along the Karakoram Highway. A place for culture, photography and time well spent.",
    season: "Spring blossom & autumn colour",
    imageKey: "hunza",
    x: 54,
    y: 28,
  },
  {
    id: "skardu",
    href: "/destinations/skardu",
    name: "Skardu & Shigar",
    note: "River valleys and Balti heritage",
    coordinates: "35.2971° N / 75.6333° E",
    description:
      "Follow the Indus into Baltistan, where mountain deserts meet river valleys. Explore Shigar and Khaplu, then make room for the high plains of Deosai.",
    season: "May–October, route dependent",
    imageKey: "skardu",
    x: 70,
    y: 58,
  },
  {
    id: "baltoro",
    href: "/destinations/baltoro-concordia",
    name: "Baltoro & Concordia",
    note: "Into the theatre of giants",
    coordinates: "35.7419° N / 76.5133° E",
    description:
      "A demanding glacier journey through granite towers to the meeting of the Baltoro and Godwin-Austen glaciers. At Concordia, K2 finally fills the horizon.",
    season: "June–early September",
    imageKey: "trek",
    x: 84,
    y: 39,
  },
  {
    id: "fairy-meadows",
    href: "/destinations/fairy-meadows",
    name: "Fairy Meadows",
    note: "Forest trails beneath Nanga Parbat",
    coordinates: "35.4210° N / 74.5960° E",
    description:
      "A quieter mountain rhythm: pine forests, meadow camps and the vast north face of Nanga Parbat. Build in time for the approach and the change in altitude.",
    season: "May–September",
    imageKey: "fairyMeadows",
    x: 37,
    y: 65,
  },
] as const;

export function DestinationAtlasSection() {
  const places = destinations.map(({ imageKey, ...place }) => ({
    ...place,
    image: HOME_MEDIA[imageKey],
  }));
  return (
    <section
      id="destinations"
      aria-labelledby="atlas-title"
      className="bg-glacier-cream py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <header className="mb-12 grid items-end gap-8 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <FieldLabel>05 / A small atlas of the north</FieldLabel>
            <HomeSectionHeading
              id="atlas-title"
              className="mt-5 text-midnight-navy"
            >
              Point your{" "}
              <span className="font-editorial font-normal lowercase italic">
                compass.
              </span>
            </HomeSectionHeading>
          </div>
          <p className="max-w-sm text-sm leading-7 text-slate-ink/80 lg:col-span-4 lg:col-start-9">
            Explore four starting points. Every valley has its own rhythm,
            landscape and reason to stay a little longer.
          </p>
        </header>
        <DestinationAtlas places={places} />
      </div>
    </section>
  );
}
