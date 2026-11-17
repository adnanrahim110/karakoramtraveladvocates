"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useImmediatePageScroll } from "@/components/spatial/SmoothScrollProvider";
import { useDesktopPointerPreference, useReducedMotionPreference } from "@/lib/motion/preferences";
import { horizontalScrollOffset, observeHorizontalScroll, scrollContentFitsFrame } from "@/lib/motion/scroll-runtime";

export function HorizontalScrollStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const desktopPointer = useDesktopPointerPreference();
  const reducedMotion = useReducedMotionPreference();
  const scrollImmediately = useImmediatePageScroll();

  useEffect(() => {
    const stage = stageRef.current;
    const spacer = spacerRef.current;
    if (!desktopPointer || reducedMotion || !stage || !spacer) return;

    const frame = stage.querySelector<HTMLElement>("[data-scroll-frame]");
    const viewport = frame?.querySelector<HTMLElement>("[data-scroll-viewport]");
    const track = viewport?.querySelector<HTMLElement>("[data-scroll-track]");
    if (!frame || !viewport || !track) return;

    let travel = 0;
    let pendingMeasure: number | null = null;

    const measure = () => {
      pendingMeasure = null;
      stage.dataset.scrollPinned = "true";
      const distance = viewport.scrollWidth - viewport.clientWidth;
      const fits = frame.scrollHeight <= frame.clientHeight + 1 && scrollContentFitsFrame(
        frame.getBoundingClientRect(),
        Array.from(frame.children, (child) => child.getBoundingClientRect()),
        window.innerHeight,
        0,
      );

      travel = fits ? Math.max(0, distance) : 0;
      stage.dataset.scrollPinned = String(travel > 0);
      // The sticky frame stays in flow, so add only the track's overflow.
      spacer.style.blockSize = `${travel}px`;
      viewport.scrollLeft = horizontalScrollOffset(stage.getBoundingClientRect().top, travel);
    };

    const scheduleMeasure = () => {
      if (pendingMeasure === null) pendingMeasure = requestAnimationFrame(measure);
    };

    measure();
    const resize = new ResizeObserver(scheduleMeasure);
    for (const element of [frame, viewport, track, ...frame.children]) resize.observe(element);
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    document.fonts.addEventListener("loadingdone", scheduleMeasure);

    // Scroll past viewport top to advance the cards. Scroll back to reverse.
    // Lenis applies the site's 800ms quartic ease-out to wheel input. The cards
    // follow the resulting position every frame without a second easing curve.
    const unsubscribe = observeHorizontalScroll(stage, () => travel, (offset) => {
      if (viewport.scrollLeft !== offset) viewport.scrollLeft = offset;
    });

    const revealFocusedCard = (event: FocusEvent) => {
      if (!travel || !(event.target instanceof HTMLElement)) return;
      const panel = event.target.closest<HTMLElement>("[data-scroll-panel]");
      if (!panel || !track.contains(panel)) return;

      const stageTop = stage.getBoundingClientRect().top;
      const currentOffset = horizontalScrollOffset(stageTop, travel);
      const trackLeft = track.getBoundingClientRect().left;
      const focus = event.target.getBoundingClientRect();
      const left = focus.left - trackLeft;
      const right = focus.right - trackLeft;
      if (!event.target.matches(":focus-visible") || (left >= currentOffset && right <= currentOffset + viewport.clientWidth)) {
        viewport.scrollLeft = currentOffset;
        return;
      }

      const panelLeft = panel.getBoundingClientRect().left - trackLeft;
      const offset = horizontalScrollOffset(-panelLeft, travel);
      viewport.scrollLeft = offset;
      scrollImmediately(window.scrollY + stageTop + offset);
    };
    viewport.addEventListener("focusin", revealFocusedCard);

    return () => {
      unsubscribe();
      resize.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      document.fonts.removeEventListener("loadingdone", scheduleMeasure);
      viewport.removeEventListener("focusin", revealFocusedCard);
      if (pendingMeasure !== null) cancelAnimationFrame(pendingMeasure);
      viewport.scrollLeft = 0;
      spacer.style.removeProperty("block-size");
      stage.dataset.scrollPinned = "false";
    };
  }, [desktopPointer, reducedMotion, scrollImmediately]);

  return (
    <div ref={stageRef} data-scroll-pinned="false" className="group/scroll relative">
      {children}
      <div ref={spacerRef} aria-hidden="true" className="pointer-events-none" />
    </div>
  );
}
