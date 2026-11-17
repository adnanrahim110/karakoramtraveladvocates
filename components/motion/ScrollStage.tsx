"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  useReducedMotionPreference,
  useViewportPinningPreference,
} from "@/lib/motion/preferences";
import {
  createScrubAnimation,
  observeScrollProgress,
  scrollContentFitsFrame,
  scrollMeasurementModeForFrame,
} from "@/lib/motion/scroll-runtime";

export interface ScrollStageProps {
  children: ReactNode;
  className?: string;
  mode?: "aperture" | "depth";
  offset?: number;
}

export function ScrollStage({
  children,
  className,
  mode = "aperture",
  offset = 80,
}: ScrollStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const viewportPinning = useViewportPinningPreference();
  const [contentFits, setContentFits] = useState(false);
  const canPin = !reducedMotion && viewportPinning;
  const pinned = canPin && contentFits;
  const enabled = !reducedMotion;

  useEffect(() => {
    const stage = stageRef.current;
    const frame = stage?.querySelector<HTMLElement>("[data-scroll-frame]");
    if (!canPin || !stage || !frame) return;
    const surface = frame.querySelector<HTMLElement>("[data-scroll-expand]");
    let pendingMeasurement: number | null = null;
    let disposed = false;
    let failedEnvironmentKey: string | null = null;
    // Measure real content, excluding deliberately oversized image/video layers.
    // Text zoom and localization can overflow a constrained sticky frame even
    // when its own border box still fits. In that case use the natural layout.
    const content = Array.from(
      frame.querySelectorAll<HTMLElement>(
        "[data-scroll-panel], [data-scroll-content], header, footer, h1, h2, h3, h4, h5, h6, p, a, button, form, ul, ol, table",
      ),
    );
    const measure = () => {
      pendingMeasurement = null;
      if (disposed) return;
      const environmentKey = [
        window.innerWidth,
        window.innerHeight,
        ...content.map((element) => {
          const computed = window.getComputedStyle(element);
          return `${computed.fontSize}:${computed.lineHeight}:${element.textContent}`;
        }),
      ].join("|");
      // Stay in the natural layout until the viewport or content changes.
      if (environmentKey === failedEnvironmentKey) return;
      const bounds = frame.getBoundingClientRect();
      const contentBounds = content
        .map((element) => element.getBoundingClientRect())
        .filter((rect) => rect.height > 0);
      // Measure the surface before scaling too, since the expanded state must fit.
      const fits = (!surface || surface.scrollHeight <= frame.clientHeight + 1) &&
        scrollContentFitsFrame(bounds, contentBounds, window.innerHeight, offset);
      if (!fits) failedEnvironmentKey = environmentKey;
      setContentFits(fits);
    };
    const scheduleMeasurement = () => {
      if (!disposed && pendingMeasurement === null)
        pendingMeasurement = requestAnimationFrame(measure);
    };
    const resize = new ResizeObserver(scheduleMeasurement);
    resize.observe(frame);
    for (const element of content) resize.observe(element);
    window.addEventListener("resize", scheduleMeasurement, { passive: true });
    document.fonts.addEventListener("loadingdone", scheduleMeasurement);
    void document.fonts.ready.then(scheduleMeasurement);
    scheduleMeasurement();
    return () => {
      disposed = true;
      if (pendingMeasurement !== null) cancelAnimationFrame(pendingMeasurement);
      resize.disconnect();
      window.removeEventListener("resize", scheduleMeasurement);
      document.fonts.removeEventListener("loadingdone", scheduleMeasurement);
    };
  }, [canPin, offset, children]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!enabled || !stage || !stage.animate) return;
    let animations: Animation[] = [];
    let previousProgress = 0;
    let previousLayoutKey = "";
    const frame = stage.querySelector<HTMLElement>("[data-scroll-frame]");
    const measurementMode = () =>
      pinned && frame
        ? scrollMeasurementModeForFrame(
            window.getComputedStyle(frame).position,
            frame.getBoundingClientRect().height,
            window.innerHeight,
            offset,
          )
        : "view";
    const rebuild = () => {
      const layoutKey = [
        stage.clientWidth,
        stage.clientHeight,
        frame?.clientHeight,
      ].join(":");
      if (layoutKey === previousLayoutKey) return;
      previousLayoutKey = layoutKey;
      for (const animation of animations) animation.cancel();
      animations = [];
      // Scroll in either direction scrubs the same 1000ms timeline with
      // SCROLL_EASING. The opening surface grows as one piece to full size.
      if (mode === "aperture") {
        for (const surface of stage.querySelectorAll<HTMLElement>(
          "[data-scroll-expand]",
        ))
          animations.push(
            createScrubAnimation(surface, [
              { transform: pinned ? "scale(0.8)" : "scale(0.92)" },
              { transform: "scale(1)" },
            ]),
          );
        for (const frame of stage.querySelectorAll<HTMLElement>(
          "[data-scroll-aperture]",
        ))
          animations.push(
            createScrubAnimation(frame, [
              { clipPath: "inset(14% 16% 14% 16%)" },
              { clipPath: "inset(0% 0% 0% 0%)" },
            ]),
          );
        for (const image of stage.querySelectorAll<HTMLElement>(
          "[data-scroll-image]",
        ))
          animations.push(
            createScrubAnimation(image, [
              { transform: "scale(1.22)" },
              { transform: "scale(1.02)" },
            ]),
          );
      } else {
        for (const image of stage.querySelectorAll<HTMLElement>(
          "[data-scroll-image]",
        ))
          animations.push(
            createScrubAnimation(image, [
              { transform: "translateY(-80px) scale(1.14)" },
              { transform: "translateY(80px) scale(1.02)" },
            ]),
          );
      }
      for (const bar of stage.querySelectorAll<HTMLElement>(
        "[data-scroll-progress]",
      ))
        animations.push(
          createScrubAnimation(bar, [
            { transform: "scaleX(0)", transformOrigin: "left center" },
            { transform: "scaleX(1)", transformOrigin: "left center" },
          ]),
        );
      for (const animation of animations)
        animation.currentTime = previousProgress * 1000;
    };
    rebuild();
    const unsubscribe = observeScrollProgress(
      stage,
      (progress) => {
        previousProgress = progress;
        for (const animation of animations)
          animation.currentTime = progress * 1000;
      },
      { mode: measurementMode, offset },
    );
    const resize = new ResizeObserver(rebuild);
    resize.observe(stage);
    if (frame) resize.observe(frame);
    return () => {
      unsubscribe();
      resize.disconnect();
      for (const animation of animations) animation.cancel();
    };
  }, [enabled, pinned, mode, offset]);

  return (
    <div
      ref={stageRef}
      data-scroll-enabled={enabled ? "true" : "false"}
      data-scroll-pinned={pinned ? "true" : "false"}
      className={cn(
        "group/scroll relative [&[data-scroll-pinned=false]]:h-auto! [&[data-scroll-pinned=false]]:min-h-0! [&[data-scroll-pinned=false]_[data-scroll-frame]]:static! [&[data-scroll-pinned=false]_[data-scroll-frame]]:h-auto! [&[data-scroll-pinned=false]_[data-scroll-frame]]:min-h-0!",
        className,
      )}
    >
      {children}
    </div>
  );
}
