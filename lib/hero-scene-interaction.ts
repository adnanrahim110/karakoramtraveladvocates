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

export interface SceneLabelSize {
  width: number;
  height: number;
}

export interface SceneLabelAnchor extends SceneLabelSize {
  id: string;
  position: [number, number, number];
  priority?: number;
}

export interface SceneLabelPlacement extends SceneLabelSize {
  position: [number, number];
  visible: boolean;
}

// Keep projected labels clear of the hero copy and controls, including when a
// peak is near the frustum edge. Resolve collisions in screen space, not in DEM.
export function sceneLabelPositions(
  camera: Camera,
  size: { width: number; height: number },
  anchors: readonly SceneLabelAnchor[],
): Record<string, SceneLabelPlacement> {
  const copyBottom = Math.min(280, size.height * 0.4);
  const controlsTop = size.height - (size.width < 640 ? 140 : 88);
  const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));
  const projected = anchors.map((anchor) => {
    const world = new Vector3(...anchor.position);
    const inFront = world.clone().applyMatrix4(camera.matrixWorldInverse).z < 0;
    const point = world.project(camera);
    const halfWidth = Math.min(anchor.width / 2 + 8, size.width / 2);
    const halfHeight = anchor.height / 2;
    const top = Math.max(copyBottom, halfHeight + 8);
    const bottom = Math.min(controlsTop, size.height - halfHeight - 8);
    const visible = inFront && Math.abs(point.x) <= 1 && Math.abs(point.y) <= 1 && point.z >= -1 && point.z <= 1
      && anchor.width + 16 <= size.width && top <= bottom;
    const pointX = (Number.isFinite(point.x) ? point.x * 0.5 + 0.5 : 0.5) * size.width;
    const pointY = (Number.isFinite(point.y) ? 0.5 - point.y * 0.5 : 0.5) * size.height;
    return {
      id: anchor.id,
      width: anchor.width,
      height: anchor.height,
      priority: anchor.priority ?? 0,
      visible,
      x: clamp(pointX, halfWidth, size.width - halfWidth),
      y: clamp(pointY - halfHeight - 4, top, bottom),
      top,
      bottom,
    };
  }).sort((a, b) => Number(b.visible) - Number(a.visible) || b.priority - a.priority || a.y - b.y);
  const result: Record<string, SceneLabelPlacement> = {};
  for (const label of projected) {
    const placements = Object.values(result).filter((item) => item.visible);
    const verticalSpacing = (item: SceneLabelPlacement) => (item.height + label.height) / 2 + 8;
    const collides = (y: number) => placements.some((item) =>
      Math.abs(item.position[0] - label.x) < (item.width + label.width) / 2 + 8
      && Math.abs(item.position[1] - y) < verticalSpacing(item),
    );
    let y = label.y;
    if (label.visible && collides(y)) {
      const candidates = placements.flatMap((item) => [item.position[1] - verticalSpacing(item), item.position[1] + verticalSpacing(item)]);
      const available = candidates.filter((candidate) => candidate >= label.top && candidate <= label.bottom && !collides(candidate));
      available.sort((a, b) => Math.abs(a - label.y) - Math.abs(b - label.y));
      if (available.length === 0) label.visible = false;
      y = available[0] ?? y;
    }
    result[label.id] = { position: [label.x, y], visible: label.visible, width: label.width, height: label.height };
  }
  return result;
}
