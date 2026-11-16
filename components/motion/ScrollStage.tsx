"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  useDesktopPointerPreference,
  useReducedMotionPreference,
  useViewportPinningPreference,
} from "@/lib/motion/preferences";
import {
  createScrubAnimation,
  observeScrollProgress,
  scrollContentFitsFrame,
  scrollMeasurementModeForFrame,
  scrollProgressForEasedFraction,
} from "@/lib/motion/scroll-runtime";

export interface ScrollStageProps {
  children: ReactNode;
  className?: string;
  mode?: "aperture" | "horizontal" | "depth";
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
  const desktopPointer = useDesktopPointerPreference();
  const viewportPinning = useViewportPinningPreference();
  const [contentFits, setContentFits] = useState(false);
  const canPin =
    !reducedMotion &&
    viewportPinning &&
    (mode !== "horizontal" || desktopPointer);
  const pinned = canPin && contentFits;
  const enabled = !reducedMotion && (mode !== "horizontal" || pinned);

  useEffect(() => {
    const stage = stageRef.current;
    const frame = stage?.querySelector<HTMLElement>("[data-scroll-frame]");
    if (!canPin || !stage || !frame) return;
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
      // Do not alternate between natural and pinned layouts when revealing a
      // pin-only instruction is the extra content that causes the overflow.
      // Retry after viewport, typography or actual content changes.
      if (environmentKey === failedEnvironmentKey) return;
      const bounds = frame.getBoundingClientRect();
      const contentBounds = content
        .map((element) => element.getBoundingClientRect())
        .filter((rect) => rect.height > 0);
      const fits = scrollContentFitsFrame(
        bounds,
        contentBounds,
        window.innerHeight,
        offset,
      );
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
    const track = stage.querySelector<HTMLElement>("[data-scroll-track]");
    const viewport = stage.querySelector<HTMLElement>("[data-scroll-viewport]");
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
        track?.scrollWidth,
        viewport?.clientWidth,
      ].join(":");
      if (layoutKey === previousLayoutKey) return;
      previousLayoutKey = layoutKey;
      for (const animation of animations) animation.cancel();
      animations = [];
      // Trigger: travel through this sticky section. Entry/exit are reversible
      // positions on a 1000ms scrubbed timeline using the explicit easing below.
      // The content itself stays visible; only image frames and spatial context move.
      if (mode === "aperture") {
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
      } else if (mode === "depth") {
        for (const image of stage.querySelectorAll<HTMLElement>(
          "[data-scroll-image]",
        ))
          animations.push(
            createScrubAnimation(image, [
              { transform: "translateY(-80px) scale(1.14)" },
              { transform: "translateY(80px) scale(1.02)" },
            ]),
          );
      } else {
        if (track && viewport) {
          const distance = Math.max(
            0,
            track.scrollWidth - viewport.clientWidth,
          );
          animations.push(
            createScrubAnimation(track, [
              { transform: "translateX(0px)" },
              { transform: `translateX(-${distance}px)` },
            ]),
          );
        }
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
    if (track) resize.observe(track);
    if (viewport) resize.observe(viewport);
    const synchronizeFocusedPanel = (event: FocusEvent) => {
      if (
        mode !== "horizontal" ||
        measurementMode() !== "sticky" ||
        !(event.target instanceof HTMLElement)
      )
        return;
      const panel = event.target.closest<HTMLElement>("[data-scroll-panel]");
      if (!panel || !track || !viewport) return;
      const focusRect = event.target.getBoundingClientRect();
      const viewportRect = viewport.getBoundingClientRect();
      if (
        viewport.scrollLeft === 0 &&
        focusRect.left >= viewportRect.left &&
        focusRect.right <= viewportRect.right
      )
        return;
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (!distance) return;
      const panelOffset =
        panel.getBoundingClientRect().left - track.getBoundingClientRect().left;
      const progress = scrollProgressForEasedFraction(
        Math.min(distance, Math.max(0, panelOffset)) / distance,
      );
      const stageRect = stage.getBoundingClientRect();
      const travel = Math.max(
        0,
        stageRect.height - (window.innerHeight - offset),
      );
      viewport.scrollLeft = 0;
      previousProgress = progress;
      for (const animation of animations)
        animation.currentTime = progress * 1000;
      // Focus navigation is instantaneous; it must never wait for a scroll tween.
      window.scrollTo({
        top: window.scrollY + stageRect.top - offset + travel * progress,
        behavior: "instant",
      });
    };
    stage.addEventListener("focusin", synchronizeFocusedPanel);
    return () => {
      unsubscribe();
      resize.disconnect();
      stage.removeEventListener("focusin", synchronizeFocusedPanel);
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
        mode === "horizontal" &&
          "[&[data-scroll-pinned=false]_[data-scroll-viewport]]:h-auto! [&[data-scroll-pinned=false]_[data-scroll-viewport]]:min-h-0! [&[data-scroll-pinned=false]_[data-scroll-viewport]]:overflow-x-auto! [&[data-scroll-pinned=false]_[data-scroll-track]]:h-auto! [&[data-scroll-pinned=false]_[data-scroll-panel]]:h-auto! [&[data-scroll-pinned=false]_[data-scroll-instruction]]:hidden [&[data-scroll-pinned=false]_[data-scroll-progress]]:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
