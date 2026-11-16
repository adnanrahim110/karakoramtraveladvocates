type TerrainWaypoint = readonly [number, number];

export interface HeroTerrainRoute {
  id: string;
  landmarkIds: readonly string[];
  waypoints: readonly TerrainWaypoint[];
}

// Geographic overview guides, rather than turn-by-turn climbing itineraries.
// Shared glacier approaches join before the individual mountain branches.
export const HERO_TERRAIN_ROUTES: readonly HeroTerrainRoute[] = [
  {
    id: "baltoro",
    landmarkIds: ["concordia", "k2-bc", "k2-summit", "broad-peak", "gasherbrum-iv"],
    waypoints: [[0.19, 1], [0.26, 0.965], [0.34, 0.922], [0.4, 0.854]],
  },
  {
    id: "godwin-austen",
    landmarkIds: ["k2-bc", "k2-summit", "broad-peak"],
    waypoints: [[0.4, 0.854], [0.428, 0.78], [0.434, 0.715], [0.422, 0.605]],
  },
  {
    id: "k2-base-camp",
    landmarkIds: ["k2-bc", "k2-summit"],
    waypoints: [[0.422, 0.605], [0.416, 0.547], [0.403, 0.485]],
  },
  {
    id: "k2-spur",
    landmarkIds: ["k2-summit"],
    waypoints: [[0.403, 0.485], [0.448, 0.415], [0.455, 0.384], [0.442, 0.352], [0.417, 0.301]],
  },
  {
    id: "broad-peak-spur",
    landmarkIds: ["broad-peak"],
    waypoints: [[0.422, 0.605], [0.47, 0.632], [0.515, 0.619], [0.556, 0.59], [0.581, 0.563]],
  },
  {
    id: "gasherbrum-approach",
    landmarkIds: ["gasherbrum-iv"],
    waypoints: [[0.4, 0.854], [0.48, 0.874], [0.56, 0.887], [0.648, 0.88], [0.73, 0.831], [0.78, 0.8], [0.817, 0.772]],
  },
];
