import * as THREE from "three";

export const MESH_SIZE = 28;
export const HEIGHT_SCALE = 5.6;
export const HEIGHT_GRID_SEGMENTS = 320;
export const HEIGHT_GRID_SIZE = HEIGHT_GRID_SEGMENTS + 1;
export const SCENE_Y_OFFSET = -1.75;
export const HORIZON_RADIUS = 384;
export const HAZE_START = 24;
export const HAZE_END = 160;
export const CAMERA_FAR = 220;
export const MAX_TARGET_RADIUS = 12.5;
export const MAX_ORBIT_DISTANCE = 23;

const HALF_SIZE = MESH_SIZE / 2;
// Closely spaced rings join the real DEM without a skirt, wall or separate tile.
// Detail decreases towards a horizon beyond both the fog and camera far plane.
const SURROUNDING_RADII = [
  14.125, 14.25, 14.5, 14.75, 15, 15.5, 16, 16.75, 17.5, 18.5,
  20, 22, 24, 27, 30, 34, 40, 48, 60, 76, 96, 128, 176, 240, 320,
  HORIZON_RADIUS,
];

function smoothstep(low: number, high: number, value: number): number {
  const t = THREE.MathUtils.clamp((value - low) / (high - low), 0, 1);
  return t * t * (3 - 2 * t);
}

export function sampleGridHeight(grid: Float32Array, u: number, v: number): number {
  const x = THREE.MathUtils.clamp(u, 0, 1) * HEIGHT_GRID_SEGMENTS;
  const y = THREE.MathUtils.clamp(v, 0, 1) * HEIGHT_GRID_SEGMENTS;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(x0 + 1, HEIGHT_GRID_SEGMENTS);
  const y1 = Math.min(y0 + 1, HEIGHT_GRID_SEGMENTS);
  const upper = THREE.MathUtils.lerp(
    grid[y0 * HEIGHT_GRID_SIZE + x0],
    grid[y0 * HEIGHT_GRID_SIZE + x1],
    x - x0,
  );
  const lower = THREE.MathUtils.lerp(
    grid[y1 * HEIGHT_GRID_SIZE + x0],
    grid[y1 * HEIGHT_GRID_SIZE + x1],
    x - x0,
  );
  return THREE.MathUtils.lerp(upper, lower, y - y0) * HEIGHT_SCALE;
}

// Match the rendered triangle plane at either production quality. Bilinear DEM
// interpolation alone can put a line underneath a coarse terrain triangle.
export function sampleTerrainSurfaceHeight(grid: Float32Array, u: number, v: number, segments: number): number {
  const x = THREE.MathUtils.clamp(u, 0, 1) * segments;
  const z = THREE.MathUtils.clamp(v, 0, 1) * segments;
  const column = Math.min(Math.floor(x), segments - 1);
  const row = Math.min(Math.floor(z), segments - 1);
  const fx = x - column;
  const fz = z - row;
  const a = sampleGridHeight(grid, column / segments, row / segments);
  const b = sampleGridHeight(grid, column / segments, (row + 1) / segments);
  const c = sampleGridHeight(grid, (column + 1) / segments, row / segments);
  const d = sampleGridHeight(grid, (column + 1) / segments, (row + 1) / segments);
  return fx + fz <= 1
    ? a + (c - a) * fx + (b - a) * fz
    : d + (b - d) * (1 - fx) + (c - d) * (1 - fz);
}

export function buildTerrainRoute(grid: Float32Array, waypoints: readonly (readonly [number, number])[], segments: number): THREE.Vector3[] {
  const curve = new THREE.CatmullRomCurve3(
    waypoints.map(([u, v]) => new THREE.Vector3(u, 0, v)),
    false,
    "centripetal",
  );
  // Subdivide beyond mesh resolution so the guide follows ridges and valleys.
  const steps = Math.max(64, Math.ceil(curve.getLength() * segments * 4));
  const planar = curve.getSpacedPoints(steps);
  const surfacePoints: THREE.Vector3[] = [];
  for (let i = 0; i < planar.length - 1; i++) {
    const start = planar[i];
    const end = planar[i + 1];
    const cuts = [0];
    // Split at vertical, horizontal and diagonal triangle edges. Every final
    // line segment then stays on one plane, even across a sharp summit ridge.
    for (const [a, b] of [[start.x, end.x], [start.z, end.z], [start.x + start.z, end.x + end.z]]) {
      const low = Math.min(a, b) * segments;
      const high = Math.max(a, b) * segments;
      for (let boundary = Math.floor(low) + 1; boundary < high; boundary++) {
        const t = (boundary / segments - a) / (b - a);
        if (t > 0.000001 && t < 0.999999) cuts.push(t);
      }
    }
    cuts.sort((a, b) => a - b);
    for (let j = 0; j < cuts.length; j++) {
      if (j > 0 && cuts[j] - cuts[j - 1] < 0.000001) continue;
      surfacePoints.push(start.clone().lerp(end, cuts[j]));
    }
  }
  surfacePoints.push(planar[planar.length - 1]);
  return surfacePoints.map((point) => {
    const u = THREE.MathUtils.clamp(point.x, 0, 1);
    const v = THREE.MathUtils.clamp(point.z, 0, 1);
    return new THREE.Vector3(
      (u - 0.5) * MESH_SIZE,
      sampleTerrainSurfaceHeight(grid, u, v, segments) + 0.045,
      (v - 0.5) * MESH_SIZE,
    );
  });
}

function mirroredCoordinate(value: number): number {
  const tile = ((value % 2) + 2) % 2;
  return tile <= 1 ? tile : 2 - tile;
}

function hash(x: number, z: number): number {
  const value = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function noise(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = smoothstep(0, 1, x - ix);
  const fz = smoothstep(0, 1, z - iz);
  return THREE.MathUtils.lerp(
    THREE.MathUtils.lerp(hash(ix, iz), hash(ix + 1, iz), fx),
    THREE.MathUtils.lerp(hash(ix, iz + 1), hash(ix + 1, iz + 1), fx),
    fz,
  );
}

// Surroundings are an artistic continuation; named peaks and their routes stay
// on the original measured DEM. No geographic telemetry is invented outside it.
export function sampleWorldHeight(grid: Float32Array, x: number, z: number): number {
  const edgeX = THREE.MathUtils.clamp(x, -HALF_SIZE, HALF_SIZE);
  const edgeZ = THREE.MathUtils.clamp(z, -HALF_SIZE, HALF_SIZE);
  const u = edgeX / MESH_SIZE + 0.5;
  const v = edgeZ / MESH_SIZE + 0.5;
  const edgeHeight = sampleGridHeight(grid, u, v);
  const dx = x - edgeX;
  const dz = z - edgeZ;
  const distance = Math.hypot(dx, dz);
  if (distance === 0) return edgeHeight;

  const step = MESH_SIZE / HEIGHT_GRID_SEGMENTS;
  let outwardSlope = 0;
  if (dx !== 0) {
    const inside = sampleGridHeight(grid, u - Math.sign(dx) / HEIGHT_GRID_SEGMENTS, v);
    outwardSlope += ((edgeHeight - inside) / step) * Math.abs(dx);
  }
  if (dz !== 0) {
    const inside = sampleGridHeight(grid, u, v - Math.sign(dz) / HEIGHT_GRID_SEGMENTS);
    outwardSlope += ((edgeHeight - inside) / step) * Math.abs(dz);
  }
  const apron = edgeHeight + THREE.MathUtils.clamp(outwardSlope, -1.8, 1.8)
    * Math.exp(-distance / 1.25);
  const mirroredHeight = sampleGridHeight(
    grid,
    mirroredCoordinate(x / MESH_SIZE + 0.5),
    mirroredCoordinate(z / MESH_SIZE + 0.5),
  );
  let ridge = 0;
  let weight = 0.56;
  let frequency = 0.075;
  for (let octave = 0; octave < 4; octave++) {
    ridge += (1 - Math.abs(noise(x * frequency + 17, z * frequency - 9) * 2 - 1)) * weight;
    frequency *= 2.1;
    weight *= 0.48;
  }
  const distantMountains = 0.35 + ridge * 5.8;
  const surrounding = THREE.MathUtils.lerp(
    mirroredHeight,
    distantMountains,
    smoothstep(3, 18, distance),
  );
  return THREE.MathUtils.lerp(apron, surrounding, smoothstep(0, 3, distance));
}

export function buildTerrainGeometry(grid: Float32Array, segments: number): THREE.BufferGeometry {
  if (grid.length !== HEIGHT_GRID_SIZE * HEIGHT_GRID_SIZE) {
    throw new Error("The Karakoram elevation data could not be read.");
  }
  if (!Number.isInteger(segments) || segments < 2 || !grid.every(Number.isFinite)) {
    throw new Error("The Karakoram terrain resolution or elevation data is invalid.");
  }
  const stride = segments + 1;
  const coreCount = stride * stride;
  const perimeterCount = segments * 4;
  const vertexCount = coreCount + SURROUNDING_RADII.length * perimeterCount;
  const positions = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices = new Uint32Array(
    segments * segments * 6 + SURROUNDING_RADII.length * perimeterCount * 6,
  );
  const setVertex = (index: number, x: number, z: number) => {
    positions[index * 3] = x;
    positions[index * 3 + 1] = sampleWorldHeight(grid, x, z);
    positions[index * 3 + 2] = z;
    uvs[index * 2] = x / MESH_SIZE + 0.5;
    uvs[index * 2 + 1] = 0.5 - z / MESH_SIZE;
  };
  for (let row = 0; row <= segments; row++) {
    for (let column = 0; column <= segments; column++) {
      setVertex(row * stride + column,
        (column / segments - 0.5) * MESH_SIZE,
        (row / segments - 0.5) * MESH_SIZE);
    }
  }
  let cursor = 0;
  for (let row = 0; row < segments; row++) {
    for (let column = 0; column < segments; column++) {
      const a = row * stride + column;
      const b = a + stride;
      indices.set([a, b, a + 1, b, b + 1, a + 1], cursor);
      cursor += 6;
    }
  }
  // Reuse core boundary vertices so heights, normals and connectivity are shared.
  let inner = [
    ...Array.from({ length: segments }, (_, i) => i),
    ...Array.from({ length: segments }, (_, i) => i * stride + segments),
    ...Array.from({ length: segments }, (_, i) => segments * stride + segments - i),
    ...Array.from({ length: segments }, (_, i) => (segments - i) * stride),
  ];
  SURROUNDING_RADII.forEach((radius, ring) => {
    const outer = Array.from({ length: perimeterCount }, (_, i) => coreCount + ring * perimeterCount + i);
    for (let i = 0; i < perimeterCount; i++) {
      const edge = Math.floor(i / segments);
      const t = (i % segments) / segments;
      const along = (t * 2 - 1) * radius;
      const x = edge === 0 ? along : edge === 1 ? radius : edge === 2 ? -along : -radius;
      const z = edge === 0 ? -radius : edge === 1 ? along : edge === 2 ? radius : -along;
      setVertex(outer[i], x, z);
      const next = (i + 1) % perimeterCount;
      indices.set([inner[i], inner[next], outer[i], inner[next], outer[next], outer[i]], cursor);
      cursor += 6;
    }
    inner = outer;
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}
