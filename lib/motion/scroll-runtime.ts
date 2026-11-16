export type ScrollMeasurementMode = "view" | "sticky";
type ScrollMeasurementSource =
  | ScrollMeasurementMode
  | (() => ScrollMeasurementMode);

interface ScrollEntry {
  element: HTMLElement;
  update: (progress: number) => void;
  mode: ScrollMeasurementSource;
  offset: number;
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

function flushScrollFrame() {
  pendingFrame = null;
  if (document.hidden) return;
  // Batch all layout reads before compositor writes; only intersecting regions
  // participate. A scroll/resize event requests one frame, never an idle loop.
  const measurements = Array.from(entries)
    .filter((entry) => entry.visible)
    .map((entry) => {
      const rect = entry.element.getBoundingClientRect();
      return {
        entry,
        progress: scrollProgressForRect(
          rect.top,
          rect.height,
          window.innerHeight,
          typeof entry.mode === "function" ? entry.mode() : entry.mode,
          entry.offset,
        ),
      };
    });
  for (const { entry, progress } of measurements) entry.update(progress);
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

export function observeScrollProgress(
  element: HTMLElement,
  update: (progress: number) => void,
  {
    mode = "view",
    offset = 0,
  }: { mode?: ScrollMeasurementSource; offset?: number } = {},
) {
  const entry: ScrollEntry = { element, update, mode, offset, visible: false };
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

export const SCROLL_EASING = "cubic-bezier(0.2, 0.65, 0.3, 1)";

// Solve the same monotonic curve in reverse when keyboard focus must reveal a
// horizontal panel. This keeps the focused action aligned with scroll position.
export function scrollProgressForEasedFraction(fraction: number): number {
  const target = Math.min(1, Math.max(0, fraction));
  const bezier = (t: number, control1: number, control2: number) =>
    3 * (1 - t) * (1 - t) * t * control1 +
    3 * (1 - t) * t * t * control2 +
    t * t * t;
  let low = 0;
  let high = 1;
  for (let iteration = 0; iteration < 20; iteration++) {
    const middle = (low + high) / 2;
    if (bezier(middle, 0.65, 1) < target) low = middle;
    else high = middle;
  }
  return bezier((low + high) / 2, 0.2, 0.3);
}

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
