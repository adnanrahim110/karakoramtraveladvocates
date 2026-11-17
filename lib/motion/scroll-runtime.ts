export type ScrollMeasurementMode = "view" | "sticky";
type ScrollMeasurementSource =
  | ScrollMeasurementMode
  | (() => ScrollMeasurementMode);

interface ScrollEntry {
  element: HTMLElement;
  measure: (rect: DOMRect) => number;
  update: (value: number) => void;
  visible: boolean;
}

const entries = new Set<ScrollEntry>();
let pendingFrame: number | null = null;
let listening = false;

export function scrollContentFitsFrame(
  frame: Pick<DOMRect, "top" | "bottom" | "height">,
  content: ReadonlyArray<Pick<DOMRect, "top" | "bottom">>,
  viewportHeight: number,
  offset: number,
): boolean {
  const tolerance = 1;
  return (
    frame.height > 0 &&
    frame.height <= viewportHeight - offset + tolerance &&
    content.every(
      (bounds) =>
        bounds.top >= frame.top - tolerance &&
        bounds.bottom <= frame.bottom + tolerance,
    )
  );
}

export function scrollMeasurementModeForFrame(
  position: string,
  height: number,
  viewportHeight: number,
  offset: number,
): ScrollMeasurementMode {
  return position === "sticky" && height <= viewportHeight - offset
    ? "sticky"
    : "view";
}

export function scrollProgressForRect(
  top: number,
  height: number,
  viewportHeight: number,
  mode: ScrollMeasurementMode,
  offset = 0,
): number {
  const viewport = Math.max(1, viewportHeight);
  const travel =
    mode === "sticky" ? height - (viewport - offset) : height + viewport;
  const progress =
    mode === "sticky" && travel > 1
      ? (offset - top) / travel
      : (viewport - top) / Math.max(1, height + viewport);
  return Math.min(1, Math.max(0, progress));
}

export function horizontalScrollOffset(stageTop: number, distance: number): number {
  return Math.min(Math.max(0, distance), Math.max(0, -stageTop));
}

function flushScrollFrame() {
  pendingFrame = null;
  if (document.hidden) return;
  // Batch all layout reads before compositor writes; only intersecting regions
  // participate. A scroll/resize event requests one frame, never an idle loop.
  const measurements = Array.from(entries)
    .filter((entry) => entry.visible)
    .map((entry) => ({
      entry,
      value: entry.measure(entry.element.getBoundingClientRect()),
    }));
  for (const { entry, value } of measurements) entry.update(value);
}

function requestScrollFrame() {
  if (pendingFrame === null && !document.hidden)
    pendingFrame = requestAnimationFrame(flushScrollFrame);
}

function onVisibilityChange() {
  if (document.hidden && pendingFrame !== null) {
    cancelAnimationFrame(pendingFrame);
    pendingFrame = null;
  } else requestScrollFrame();
}

function setListening(shouldListen: boolean) {
  if (shouldListen === listening) return;
  listening = shouldListen;
  if (shouldListen) {
    window.addEventListener("scroll", requestScrollFrame, { passive: true });
    window.addEventListener("resize", requestScrollFrame, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
  } else {
    window.removeEventListener("scroll", requestScrollFrame);
    window.removeEventListener("resize", requestScrollFrame);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    if (pendingFrame !== null) cancelAnimationFrame(pendingFrame);
    pendingFrame = null;
  }
}

function observeScrollValue(
  element: HTMLElement,
  measure: ScrollEntry["measure"],
  update: ScrollEntry["update"],
) {
  const entry: ScrollEntry = { element, measure, update, visible: false };
  entries.add(entry);
  setListening(true);
  const intersection = new IntersectionObserver(([record]) => {
    entry.visible = record.isIntersecting;
    if (entry.visible) requestScrollFrame();
  });
  intersection.observe(element);
  const resize = new ResizeObserver(requestScrollFrame);
  resize.observe(element);
  return () => {
    intersection.disconnect();
    resize.disconnect();
    entries.delete(entry);
    if (!entries.size) setListening(false);
  };
}

export function observeScrollProgress(
  element: HTMLElement,
  update: (progress: number) => void,
  { mode = "view", offset = 0 }: { mode?: ScrollMeasurementSource; offset?: number } = {},
) {
  return observeScrollValue(element, (rect) => scrollProgressForRect(
    rect.top,
    rect.height,
    window.innerHeight,
    typeof mode === "function" ? mode() : mode,
    offset,
  ), update);
}

export function observeHorizontalScroll(
  element: HTMLElement,
  getDistance: () => number,
  update: (offset: number) => void,
) {
  return observeScrollValue(element, (rect) => horizontalScrollOffset(rect.top, getDistance()), update);
}

export const SCROLL_EASING = "cubic-bezier(0.2, 0.65, 0.3, 1)";

export function createScrubAnimation(
  element: HTMLElement,
  keyframes: Keyframe[],
  easing = SCROLL_EASING,
): Animation {
  const animation = element.animate(keyframes, {
    duration: 1000,
    easing,
    fill: "both",
  });
  animation.pause();
  animation.currentTime = 0;
  return animation;
}
