import type { ServicePillar } from "@/lib/types/cms";

export interface DisciplineWaypoint {
  name: string;
  stage: string;
  altitudeMeters: number;
}

export interface ServiceDisciplineConfig {
  key: ServicePillar;
  code: string;
  title: string;
  shortLabel: string;
  subtitle: string;
  headline: string;
  description: string;
  href: string;
  ctaLabel: string;
  corridorTag: string;
  coordinates: string;
  imageSrc: string;
  imageAlt: string;
  minAlt: number;
  maxAlt: number;
  altitudeBarClass: string;
  durationRange: string;
  bookingModel: string;
  highlightsSummary: [string, string, string];
  waypoints: [
    DisciplineWaypoint,
    DisciplineWaypoint,
    DisciplineWaypoint,
    DisciplineWaypoint,
  ];
}

export const SERVICE_DISCIPLINES: ServiceDisciplineConfig[] = [
  {
    key: "tour",
    code: "01",
    title: "Curated Tours",
    shortLabel: "Scenic & Cultural 4x4",
    subtitle: "Private overland journeys across Hunza, Shigar & Deosai",
    headline: "Royal Silk Road forts, apricot valleys & high mountain passes.",
    description:
      "Travel in private 4x4 comfort through ancient mountain kingdoms—sleeping in restored heritage palaces, meeting Balti historians, and crossing summer plateaus.",
    href: "/tours",
    ctaLabel: "Explore Tours",
    corridorTag: "HUNZA • SHIGAR • KHUNJERAB",
    coordinates: "36.3167° N, 74.6500° E",
    imageSrc: "/imgs/moodboard/scene-06.png",
    imageAlt:
      "Expedition 4x4 cruiser driving a golden sunlit Karakoram gorge road toward snowy summits",
    minAlt: 1500,
    maxAlt: 4693,
    altitudeBarClass: "w-[54%]",
    durationRange: "5 – 14 Days",
    bookingModel: "Private & Small Group",
    highlightsSummary: [
      "Private 4x4 Fleet",
      "Heritage Fort Stays",
      "Blossom & Autumn Seasons",
    ],
    waypoints: [
      { name: "Gilgit", stage: "Valley", altitudeMeters: 1500 },
      { name: "Hunza", stage: "Forts", altitudeMeters: 2438 },
      { name: "Deosai", stage: "Plateau", altitudeMeters: 4114 },
      { name: "Khunjerab", stage: "High Pass", altitudeMeters: 4693 },
    ],
  },
  {
    key: "trek",
    code: "02",
    title: "Guided Treks",
    shortLabel: "Glaciers & Base Camps",
    subtitle: "Baltoro amphitheaters, Concordia & Snow Lake traverses",
    headline: "Measured steps up the world’s grandest glacial corridors.",
    description:
      "Structured multi-week foot journeys to K2 Base Camp, Concordia, and Gondogoro La—paced with acclimatization rotations, full camp dining, and Balti mountain crews.",
    href: "/treks",
    ctaLabel: "Explore Treks",
    corridorTag: "BALTORO • CONCORDIA • SNOW LAKE",
    coordinates: "35.7419° N, 76.5133° E",
    imageSrc: "/imgs/moodboard/scene-04.png",
    imageAlt:
      "Trekker standing along a sunlit alpine ridge overlooking vast snowy Karakoram peaks",
    minAlt: 2400,
    maxAlt: 5585,
    altitudeBarClass: "w-[65%]",
    durationRange: "7 – 22 Days",
    bookingModel: "Scheduled & Private",
    highlightsSummary: [
      "Acclimatization Rest Days",
      "Full Camp Dining Dome",
      "CKNP Restricted Permits",
    ],
    waypoints: [
      { name: "Askole", stage: "Trailhead", altitudeMeters: 3040 },
      { name: "Urdukas", stage: "Acclimatize", altitudeMeters: 4050 },
      { name: "Concordia", stage: "Base Junction", altitudeMeters: 4650 },
      { name: "Gondogoro La", stage: "Glacier Pass", altitudeMeters: 5585 },
    ],
  },
  {
    key: "expedition",
    code: "03",
    title: "Mountaineering",
    shortLabel: "Technical 6,000m–8,611m",
    subtitle: "Vetted alpine climbs on Spantik, Broad Peak & K2",
    headline: "Disciplined high-camp architecture on the world’s steepest faces.",
    description:
      "Sovereign 7,000m and 8,000m climbing expeditions led by veteran Pakistani high-altitude mountaineers—governed by pre-admission vetting, rope teams, and rescue bonds.",
    href: "/expeditions",
    ctaLabel: "Explore Climbs",
    corridorTag: "SPANTIK • BROAD PEAK • K2 SPUR",
    coordinates: "35.8817° N, 76.5133° E",
    imageSrc: "/imgs/moodboard/scene-03.png",
    imageAlt:
      "Golden morning light catching jagged snow faces and granite ridges above the clouds",
    minAlt: 6000,
    maxAlt: 8611,
    altitudeBarClass: "w-full",
    durationRange: "24 – 54 Days",
    bookingModel: "Resume Vetting",
    highlightsSummary: [
      "1-on-1 Readiness Audit",
      "Fixed Lines & Oxygen",
      "Ministry Royalty & Rescue",
    ],
    waypoints: [
      { name: "Base Camp", stage: "Hub", altitudeMeters: 5150 },
      { name: "Camp I", stage: "Lower Spur", altitudeMeters: 6065 },
      { name: "Black Pyramid", stage: "Camp II", altitudeMeters: 6700 },
      { name: "K2 Summit", stage: "Apex Crown", altitudeMeters: 8611 },
    ],
  },
];
