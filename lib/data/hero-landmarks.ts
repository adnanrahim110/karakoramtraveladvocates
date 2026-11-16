export interface PeakLandmark {
  id: string;
  code: string;
  name: string;
  shortName: string;
  sublabel: string;
  elevationMeters: number;
  coordinates: string;
  pillarHref: string;
  uv: [number, number];
  worldPos: [number, number, number];
  camOffset: [number, number, number];
}

// Real-world SRTM N35E076 summit & glacier confluence coordinates
export const HERO_LANDMARKS: PeakLandmark[] = [
  {
    id: "k2-summit",
    code: "PK-01",
    name: "K2 (Chhogori)",
    shortName: "K2",
    sublabel: "Abruzzi Spur • 8,611m Summit",
    elevationMeters: 8611,
    coordinates: "35.8817° N, 76.5133° E",
    pillarHref: "/expeditions",
    uv: [0.417, 0.301],
    worldPos: [-2.34, 5.6, -5.57],
    camOffset: [-1.4, 4.15, 15.8],
  },
  {
    id: "broad-peak",
    code: "PK-02",
    name: "Broad Peak",
    shortName: "Broad Peak",
    sublabel: "West Spur • 8,051m Massif",
    elevationMeters: 8051,
    coordinates: "35.8136° N, 76.5658° E",
    pillarHref: "/expeditions",
    uv: [0.581, 0.563],
    worldPos: [2.26, 4.84, 1.77],
    camOffset: [-0.8, 3.95, 13.4],
  },
  {
    id: "gasherbrum-iv",
    code: "PK-03",
    name: "Gasherbrum IV",
    shortName: "Gasherbrum IV",
    sublabel: "Shining Wall • 7,925m",
    elevationMeters: 7925,
    coordinates: "35.7592° N, 76.6414° E",
    pillarHref: "/expeditions",
    uv: [0.817, 0.772],
    worldPos: [8.87, 4.72, 7.62],
    camOffset: [2.4, 4.1, 14.4],
  },
  {
    id: "k2-bc",
    code: "PK-04",
    name: "K2 Base Camp",
    shortName: "K2 Base Camp",
    sublabel: "Godwin-Austen Glacier • 5,150m",
    elevationMeters: 5150,
    coordinates: "35.8340° N, 76.5090° E",
    pillarHref: "/treks",
    uv: [0.403, 0.485],
    worldPos: [-2.71, 1.14, -0.43],
    camOffset: [-2.8, 3.35, 11.6],
  },
  {
    id: "concordia",
    code: "PK-05",
    name: "Concordia Amphitheatre",
    shortName: "Concordia",
    sublabel: "Baltoro & Godwin-Austen Junction",
    elevationMeters: 4691,
    coordinates: "35.7380° N, 76.5080° E",
    pillarHref: "/treks",
    uv: [0.4, 0.854],
    worldPos: [-2.8, 0.67, 9.91],
    camOffset: [-2.2, 3.65, 16.0],
  },
];
