import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import test from "node:test";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PerspectiveCamera, Texture, NormalBlending, Mesh, MeshBasicMaterial, Raycaster, Vector3 } from "three";
import { createTerrainSeasonLayers } from "../lib/hero-terrain-materials.ts";
import { scenePointerPosition, sceneRevealRadius, sceneLabelPositions } from "../lib/hero-scene-interaction.ts";
import { HERO_TERRAIN_ROUTES } from "../lib/data/hero-routes.ts";
import { HERO_LANDMARKS } from "../lib/data/hero-landmarks.ts";
import {
  buildTerrainGeometry, buildTerrainRoute, sampleTerrainSurfaceHeight, sampleGridHeight, sampleWorldHeight,
  MESH_SIZE, HEIGHT_SCALE, HEIGHT_GRID_SIZE, HORIZON_RADIUS,
  HAZE_END, CAMERA_FAR, MAX_TARGET_RADIUS, MAX_ORBIT_DISTANCE,
} from "../lib/hero-terrain.ts";

const bytes = readFileSync(new URL("../public/imgs/terrain/k2-height-grid.bin", import.meta.url));
const grid = new Float32Array(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));

test("floating peak cards render in an isolated HTML root with accessible names and units", async () => {
  // Exercise the same context-free root used by Drei Html without a browser.
  const source = readFileSync(new URL("../components/spatial/PeakViewChip.tsx", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
  }).outputText.replace(/from "([^"]+)"/g, (_, specifier) => {
    const url = specifier.startsWith("@/")
      ? new URL("../" + specifier.slice(2) + ".ts", import.meta.url).href
      : import.meta.resolve(specifier);
    return 'from "' + url + '"';
  });
  const { PeakViewChip } = await import("data:text/javascript;base64," + Buffer.from(compiled).toString("base64"));
  for (const unit of ["metric", "imperial"]) {
    for (const landmark of HERO_LANDMARKS) {
      const html = renderToStaticMarkup(createElement(PeakViewChip, { landmark, unit, isActive: true, variant: "pin", onSelect: () => {} }));
      assert.ok(html.includes(landmark.shortName));
      assert.ok(html.includes('aria-pressed="true"'));
      assert.ok(html.includes('aria-label="Focus on ' + landmark.name));
      assert.ok(html.includes(unit === "metric" ? " m" : " ft"));
    }
  }
});

test("summer imagery retains a verified real RGB capture and the original terrain extent", () => {
  const provenance = JSON.parse(readFileSync(new URL("../public/imgs/terrain/k2-summer-provenance.json", import.meta.url), "utf8"));
  assert.equal(provenance.item_id, "S2B_43SFV_20250913_0_L2A");
  assert.ok(provenance.capture_time.startsWith("2025-09-13"));
  assert.deepEqual(provenance.rgb_bands, ["B04", "B03", "B02"]);
  assert.deepEqual(provenance.bbox, [76.38, 35.7, 76.7, 35.96]);
  assert.equal(provenance.target_crs, "EPSG:4326");
  assert.ok(provenance.valid_coverage_percent >= 99.99);
  const source = readFileSync(new URL("../" + provenance.source_file, import.meta.url));
  const output = readFileSync(new URL("../public/imgs/terrain/" + provenance.webp_file, import.meta.url));
  assert.equal(createHash("sha256").update(source).digest("hex"), provenance.source_sha256, "source crop is unchanged");
  assert.equal(createHash("sha256").update(output).digest("hex"), provenance.webp_sha256, "display image matches the verified crop derivative");
  assert.equal(source.readUInt32BE(16), provenance.width);
  assert.equal(source.readUInt32BE(20), provenance.height);
  for (let i = 0; i < 3; i++) {
    assert.ok(provenance.source_urls[i].includes(provenance.item_id));
    assert.ok(provenance.source_urls[i].endsWith(provenance.rgb_bands[i] + ".tif"));
  }
});

test("the independent summer layer never mutates the original winter material", () => {
  const winterMap = new Texture();
  const summerMap = new Texture();
  const normalMap = new Texture();
  const layers = createTerrainSeasonLayers({ winterMap, summerMap, normalMap, hazeStart: 24, hazeEnd: 160 });
  assert.equal(layers.winter.uniforms.uSeasonMap.value, winterMap);
  assert.equal(layers.summer.uniforms.uSeasonMap.value, summerMap);
  assert.equal(layers.winter.vertexShader, layers.summer.vertexShader, "both layers transform identical geometry identically");
  assert.equal(layers.winter.transparent, false);
  assert.equal(layers.winter.depthWrite, true);
  assert.equal(layers.summer.transparent, true);
  assert.equal(layers.summer.depthWrite, false, "summer does not overwrite depth for the scene or pins");
  assert.equal(layers.summer.blending, NormalBlending);
  assert.equal(layers.summer.visible, false);
  const winterHaze = layers.winter.uniforms.uHazeColor.value.clone();
  layers.summer.uniforms.uRevealCenter.value.set(0.8, 2.4, -0.6);
  layers.summer.uniforms.uRevealStrength.value = 1;
  layers.summer.uniforms.uHazeColor.value.set("#000000");
  assert.equal(layers.winter.uniforms.uSeasonMap.value, winterMap);
  assert.ok(layers.winter.uniforms.uHazeColor.value.equals(winterHaze));
  assert.equal(layers.winter.uniforms.uRevealStrength, undefined);
  assert.equal(layers.winter.uniforms.uRevealCenter, undefined);
  layers.winter.dispose(); layers.summer.dispose();
  winterMap.dispose(); summerMap.dispose(); normalMap.dispose();
});

test("cursor tracking uses canvas bounds through page scrolling and nested DOM targets", () => {
  const bounds = { left: 80, top: -240, width: 1200, height: 800 };
  assert.deepEqual(scenePointerPosition(680, 160, bounds), [0, 0]);
  assert.deepEqual(scenePointerPosition(80, -240, bounds), [-1, 1]);
  assert.deepEqual(scenePointerPosition(1280, 560, bounds), [1, -1]);
  assert.deepEqual(scenePointerPosition(40, 60, { left: 0, top: 0, width: 0, height: 0 }), [0, 0]);
  // Framebuffer coordinates divided by DPR land on the same CSS cursor point.
  for (const dpr of [1, 1.4, 2]) {
    const ndc = scenePointerPosition(390, 110, bounds);
    const cursor = [(ndc[0] * 0.5 + 0.5) * bounds.width, (ndc[1] * 0.5 + 0.5) * bounds.height];
    assert.ok(Math.abs(310 * dpr / dpr - cursor[0]) < 1e-9);
    assert.ok(Math.abs(450 * dpr / dpr - cursor[1]) < 1e-9);
  }
});

test("surface reveal radius keeps a consistent apparent size across camera distances", () => {
  const radius = sceneRevealRadius(8, 900, 36);
  assert.ok(Math.abs(sceneRevealRadius(16, 900, 36) - radius * 2) < 1e-10);
  assert.ok(Math.abs(sceneRevealRadius(8, 1800, 36) - radius / 2) < 1e-10);
  assert.equal(sceneRevealRadius(0, 0, 36), 0.3);
  assert.equal(sceneRevealRadius(1000, 320, 36), 2.8);
});

test("every selected guide connects from the glacier approach to its landmark", () => {
  for (const landmark of HERO_LANDMARKS) {
    const route = HERO_TERRAIN_ROUTES.filter((item) => item.landmarkIds.includes(landmark.id));
    assert.ok(route.length > 0);
    for (let i = 1; i < route.length; i++) {
      assert.deepEqual(route[i - 1].waypoints.at(-1), route[i].waypoints[0]);
    }
    assert.deepEqual(route.at(-1).waypoints.at(-1), landmark.uv);
  }
});

test("route guides remain above the rendered terrain at both production resolutions", () => {
  for (const segments of [160, 320]) {
    const geometry = buildTerrainGeometry(grid, segments);
    const material = new MeshBasicMaterial();
    const mesh = new Mesh(geometry, material);
    const ray = new Raycaster();
    for (const [u, v] of [[0.403, 0.485], [0.417, 0.301], [0.556, 0.59], [0.734, 0.826]]) {
      ray.set(new Vector3((u - 0.5) * MESH_SIZE, HEIGHT_SCALE + 1, (v - 0.5) * MESH_SIZE), new Vector3(0, -1, 0));
      const hit = ray.intersectObject(mesh)[0];
      assert.ok(hit);
      assert.ok(Math.abs(hit.point.y - sampleTerrainSurfaceHeight(grid, u, v, segments)) < 0.00001, "sampling matches the actual triangle plane");
    }
    for (const route of HERO_TERRAIN_ROUTES) {
      const points = buildTerrainRoute(grid, route.waypoints, segments);
      assert.ok(points.length > 64);
      for (let i = 0; i < points.length - 1; i++) {
        const mid = points[i].clone().lerp(points[i + 1], 0.5);
        const height = sampleTerrainSurfaceHeight(grid, mid.x / MESH_SIZE + 0.5, mid.z / MESH_SIZE + 0.5, segments);
        assert.ok(mid.y >= height + 0.015, route.id + " clears the terrain between samples");
        assert.ok(Math.max(Math.abs(mid.x), Math.abs(mid.z)) <= MESH_SIZE / 2);
      }
    }
    geometry.dispose(); material.dispose();
  }
});

test("labels preserve their pin positions, prioritize selection, and hide points outside the view", () => {
  const camera = new PerspectiveCamera(36, 1, 0.1, CAMERA_FAR);
  camera.position.set(0, 4, 16);
  camera.lookAt(0, 3, 0);
  camera.updateMatrixWorld();
  const anchors = [
    { id: "neighbor", width: 176, position: [0, 3, 0] },
    { id: "selected", width: 176, position: [0, 3, 0], priority: 1 },
    { id: "behind", width: 176, position: [0, 3, 30] },
    { id: "outside", width: 176, position: [80, 3, 0] },
  ];
  const placements = sceneLabelPositions(camera, { width: 900, height: 900 }, anchors);
  assert.ok(placements.selected.visible);
  assert.equal(placements.behind.visible, false);
  assert.equal(placements.outside.visible, false);
  assert.deepEqual(placements.neighbor.pointPosition, placements.selected.pointPosition);
  assert.ok(placements.selected.position[1] < placements.selected.pointPosition[1]);
  assert.ok(Math.abs(placements.neighbor.position[1] - placements.selected.position[1]) >= 64);
});

test("visible peak chips stay inside the scene and do not collide during full rotation", () => {
  const anchors = [[0.417, 0.301], [0.581, 0.563], [0.817, 0.772], [0.403, 0.485], [0.4, 0.854]]
    .map(([u, v], index) => ({
      id: String(index), width: 144,
      position: [(u - 0.5) * MESH_SIZE, sampleGridHeight(grid, u, v) - 1.75 + 0.43, (v - 0.5) * MESH_SIZE],
    }));
  for (const [width, height] of [[320, 640], [768, 800], [1440, 900], [2480, 1080]]) {
    for (let step = 0; step < 24; step++) {
      const angle = step * Math.PI / 12;
      const camera = new PerspectiveCamera(36, width / height, 0.1, CAMERA_FAR);
      camera.position.set(Math.sin(angle) * 16, 4.15, Math.cos(angle) * 16);
      camera.lookAt(0, 3.18, 0);
      camera.updateMatrixWorld();
      const labels = Object.values(sceneLabelPositions(camera, { width, height }, anchors));
      for (const label of labels) {
        assert.ok(Number.isFinite(label.position[0]) && Number.isFinite(label.position[1]));
        assert.ok(label.position[0] - label.width / 2 >= 0);
        assert.ok(label.position[0] + label.width / 2 <= width);
        assert.ok(label.position[1] >= Math.min(280, height * 0.4));
        assert.ok(label.position[1] <= height - (width < 640 ? 140 : 88));
      }
      const visible = labels.filter((label) => label.visible);
      for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
          const a = visible[i], b = visible[j];
          assert.ok(Math.abs(a.position[0] - b.position[0]) >= (a.width + b.width) / 2 + 8
            || Math.abs(a.position[1] - b.position[1]) >= 48, "pin touch targets do not overlap");
        }
      }
    }
  }
});

test("real DEM heights and UV alignment are retained inside the original map", () => {
  for (const [u, v] of [[0, 0], [1, 1], [0.417, 0.301], [0.4, 0.854], [0.817, 0.772]]) {
    assert.ok(Math.abs(sampleWorldHeight(grid, (u - 0.5) * MESH_SIZE, (v - 0.5) * MESH_SIZE)
      - sampleGridHeight(grid, u, v)) < 1e-10);
  }
  const geometry = buildTerrainGeometry(grid, 20);
  const positions = geometry.getAttribute("position");
  const uvs = geometry.getAttribute("uv");
  for (let i = 0; i < 21 * 21; i++) {
    assert.ok(Math.abs(positions.getY(i) - sampleGridHeight(grid, uvs.getX(i), 1 - uvs.getY(i))) < 0.00001);
  }
  geometry.dispose();
});

test("surroundings connect to every DEM side without an internal open edge", () => {
  const segments = 24;
  const geometry = buildTerrainGeometry(grid, segments);
  const positions = geometry.getAttribute("position");
  const normals = geometry.getAttribute("normal");
  const indices = geometry.getIndex();
  assert.ok(indices);
  const edges = new Map();
  const addEdge = (a, b) => {
    const key = a < b ? `${a},${b}` : `${b},${a}`;
    edges.set(key, (edges.get(key) ?? 0) + 1);
  };
  for (let i = 0; i < indices.count; i += 3) {
    const [a, b, c] = [indices.getX(i), indices.getX(i + 1), indices.getX(i + 2)];
    addEdge(a, b); addEdge(b, c); addEdge(c, a);
    const area = (positions.getZ(b) - positions.getZ(a)) * (positions.getX(c) - positions.getX(a))
      - (positions.getX(b) - positions.getX(a)) * (positions.getZ(c) - positions.getZ(a));
    assert.ok(area > 0, "all triangles face upward and have positive area");
  }
  let openEdges = 0;
  for (const [key, count] of edges) {
    assert.ok(count === 1 || count === 2, "mesh is manifold");
    if (count !== 1) continue;
    openEdges++;
    for (const index of key.split(",").map(Number)) {
      assert.equal(Math.max(Math.abs(positions.getX(index)), Math.abs(positions.getZ(index))), HORIZON_RADIUS);
    }
  }
  assert.equal(openEdges, segments * 4, "only the unseen outer horizon is open");
  for (let i = 0; i < positions.count; i++) {
    assert.ok(Number.isFinite(positions.getY(i)));
    assert.ok(normals.getY(i) > 0);
  }
  geometry.dispose();
});

test("rotation and bounded panning cannot expose the mesh boundary or fog cutoff", () => {
  const closestBoundary = HORIZON_RADIUS - MAX_TARGET_RADIUS - MAX_ORBIT_DISTANCE;
  assert.ok(closestBoundary > CAMERA_FAR);
  assert.ok(HAZE_END < CAMERA_FAR - HEIGHT_SCALE);
  const epsilon = 0.00001;
  for (const side of [-1, 1]) {
    for (const along of [-12, -6, 0, 6, 12]) {
      for (const [x, z] of [[side * MESH_SIZE / 2, along], [along, side * MESH_SIZE / 2]]) {
        const outX = Math.abs(x) === MESH_SIZE / 2 ? x + side * epsilon : x;
        const outZ = Math.abs(z) === MESH_SIZE / 2 ? z + side * epsilon : z;
        assert.ok(Math.abs(sampleWorldHeight(grid, x, z) - sampleWorldHeight(grid, outX, outZ)) < 0.001);
      }
    }
  }
});

test("both production resolutions contain valid elevation and reject damaged data", () => {
  assert.equal(grid.length, HEIGHT_GRID_SIZE ** 2);
  for (const segments of [160, 320]) {
    const geometry = buildTerrainGeometry(grid, segments);
    assert.ok(geometry.getAttribute("position").count < (segments === 160 ? 43000 : 140000));
    assert.ok(geometry.boundingSphere?.radius >= HORIZON_RADIUS);
    geometry.dispose();
  }
  assert.throws(() => buildTerrainGeometry(new Float32Array(10), 24));
  const corrupt = grid.slice();
  corrupt[20] = NaN;
  assert.throws(() => buildTerrainGeometry(corrupt, 24));
  assert.throws(() => buildTerrainGeometry(grid, 0));
});
