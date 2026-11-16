import { type Camera, Vector3 } from "three";

interface SceneBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function scenePointerPosition(clientX: number, clientY: number, bounds: SceneBounds): [number, number] {
  if (bounds.width <= 0 || bounds.height <= 0) return [0, 0];
  return [
    ((clientX - bounds.left) / bounds.width) * 2 - 1,
    1 - ((clientY - bounds.top) / bounds.height) * 2,
  ];
}

export function sceneRevealRadius(distance: number, viewportHeight: number, verticalFov: number): number {
  const worldHeight = 2 * Math.max(0, distance) * Math.tan(verticalFov * Math.PI / 360);
  return Math.max(0.3, Math.min(2.8, worldHeight * 144 / Math.max(1, viewportHeight)));
}

export interface SceneLabelAnchor {
  id: string;
  position: [number, number, number];
  width: number;
  priority?: number;
}

export interface SceneLabelPlacement {
  position: [number, number];
  pointPosition: [number, number];
  visible: boolean;
  width: number;
}

// Keep projected labels clear of the hero copy and controls, including when a
// peak is near the frustum edge. Resolve collisions in screen space, not in DEM.
export function sceneLabelPositions(
  camera: Camera,
  size: { width: number; height: number },
  anchors: readonly SceneLabelAnchor[],
): Record<string, SceneLabelPlacement> {
  const top = Math.min(280, size.height * 0.4);
  const bottom = Math.max(top, size.height - (size.width < 640 ? 140 : 88));
  const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));
  const projected = anchors.map((anchor) => {
    const world = new Vector3(...anchor.position);
    const inFront = world.clone().applyMatrix4(camera.matrixWorldInverse).z < 0;
    const point = world.project(camera);
    const visible = inFront && Math.abs(point.x) <= 1 && Math.abs(point.y) <= 1 && point.z >= -1 && point.z <= 1;
    const halfWidth = Math.min(anchor.width / 2 + 8, size.width / 2);
    const pointX = (Number.isFinite(point.x) ? point.x * 0.5 + 0.5 : 0.5) * size.width;
    const pointY = (Number.isFinite(point.y) ? 0.5 - point.y * 0.5 : 0.5) * size.height;
    const pointPosition: [number, number] = [pointX, pointY];
    return {
      id: anchor.id,
      width: anchor.width,
      priority: anchor.priority ?? 0,
      visible,
      pointPosition,
      x: clamp(pointX, halfWidth, size.width - halfWidth),
      y: clamp(pointY - 48, top, bottom),
    };
  }).sort((a, b) => Number(b.visible) - Number(a.visible) || b.priority - a.priority || a.y - b.y);
  const result: Record<string, SceneLabelPlacement> = {};
  for (const label of projected) {
    const placements = Object.values(result).filter((item) => item.visible);
    const collides = (y: number) => placements.some((item) =>
      Math.abs(item.position[0] - label.x) < (item.width + label.width) / 2 + 8
      && Math.abs(item.position[1] - y) < 64,
    );
    let y = label.y;
    if (label.visible && collides(y)) {
      const candidates = placements.flatMap((item) => [item.position[1] - 64, item.position[1] + 64]);
      const available = candidates.filter((candidate) => candidate >= top && candidate <= bottom && !collides(candidate));
      available.sort((a, b) => Math.abs(a - label.y) - Math.abs(b - label.y));
      if (available.length === 0) label.visible = false;
      y = available[0] ?? y;
    }
    result[label.id] = { position: [label.x, y], pointPosition: label.pointPosition, visible: label.visible, width: label.width };
  }
  return result;
}
