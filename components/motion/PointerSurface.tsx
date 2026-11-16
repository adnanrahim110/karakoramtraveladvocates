"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  useFinePointerPreference,
  useReducedMotionPreference,
} from "@/lib/motion/preferences";

export interface PointerSurfaceProps {
  children: ReactNode;
  className?: string;
  label?: string;
  strength?: number;
}

const POINTER_EASING = "cubic-bezier(0.2, 0.65, 0.3, 1)";

export function PointerSurface({
  children,
  className,
  label,
  strength = 16,
}: PointerSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const cursorPositionRef = useRef<HTMLDivElement>(null);
  const cursorRevealRef = useRef<HTMLSpanElement>(null);
  const finePointer = useFinePointerPreference();
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface || !finePointer || reducedMotion || !surface.animate) return;
    const layers = Array.from(
      surface.querySelectorAll<HTMLElement>("[data-pointer-layer]"),
    );
    const layerAnimations = new Map<HTMLElement, Animation>();
    const badgePosition = cursorPositionRef.current;
    const badgeReveal = cursorRevealRef.current;
    let badgeAnimation: Animation | undefined;
    let positionAnimation: Animation | undefined;
    let pendingFrame: number | null = null;
    let rect = surface.getBoundingClientRect();
    let inside = false;
    let badgeVisible = false;
    let pointerX = 0;
    let pointerY = 0;
    let pointerOnAction = false;

    if (badgePosition) {
      positionAnimation = badgePosition.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: "translate3d(0, 0, 0)" },
        ],
        { duration: 1, fill: "both" },
      );
      positionAnimation.pause();
      positionAnimation.currentTime = 0;
    }

    const revealBadge = (show: boolean) => {
      if (!badgeReveal || badgeVisible === show) return;
      badgeVisible = show;
      const current = getComputedStyle(badgeReveal);
      const from = { opacity: current.opacity, transform: current.transform };
      badgeAnimation?.cancel();
      // Trigger: fine-pointer entry over an actual link/button. Entry is 220ms;
      // exit is 140ms, with an explicit grounded curve and no action delay.
      badgeAnimation = badgeReveal.animate(
        [
          from,
          {
            opacity: show ? 1 : 0,
            transform: show ? "scale(1)" : "scale(0.75)",
          },
        ],
        { duration: show ? 220 : 140, easing: POINTER_EASING, fill: "both" },
      );
    };

    const updateLayers = (x: number, y: number, entering: boolean) => {
      const starts = layers.map((layer) => ({
        layer,
        transform: getComputedStyle(layer).transform,
      }));
      for (const { layer, transform } of starts) {
        layerAnimations.get(layer)?.cancel();
        // Cursor position tilts/pans the photograph to explain its depth, not
        // the action itself. Reset takes 140ms; reduced motion never registers it.
        const animation = layer.animate(
          [
            { transform },
            {
              transform: entering
                ? `translate3d(${x * strength}px, ${y * strength}px, 0) rotateX(${-y * 1.2}deg) rotateY(${x * 1.2}deg) scale(1.055)`
                : "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(1)",
            },
          ],
          {
            duration: entering ? 220 : 140,
            easing: POINTER_EASING,
            fill: "both",
          },
        );
        layerAnimations.set(layer, animation);
      }
    };

    const flushPointer = () => {
      pendingFrame = null;
      if (!inside || document.hidden) return;
      const localX = pointerX - rect.left;
      const localY = pointerY - rect.top;
      const x = Math.max(
        -1,
        Math.min(1, (localX / Math.max(1, rect.width)) * 2 - 1),
      );
      const y = Math.max(
        -1,
        Math.min(1, (localY / Math.max(1, rect.height)) * 2 - 1),
      );
      updateLayers(x, y, true);
      if (positionAnimation?.effect instanceof KeyframeEffect) {
        const transform = `translate3d(${localX - 40}px, ${localY - 40}px, 0)`;
        positionAnimation.effect.setKeyframes([{ transform }, { transform }]);
      }
      revealBadge(Boolean(label && pointerOnAction));
    };

    const trackPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (!inside) rect = surface.getBoundingClientRect();
      inside = true;
      pointerX = event.clientX;
      pointerY = event.clientY;
      const action =
        event.target instanceof Element
          ? event.target.closest("a, button, [role=button]")
          : null;
      pointerOnAction = Boolean(action && surface.contains(action));
      if (pendingFrame === null)
        pendingFrame = requestAnimationFrame(flushPointer);
    };
    const leave = () => {
      if (!inside && !badgeVisible) return;
      inside = false;
      if (pendingFrame !== null) cancelAnimationFrame(pendingFrame);
      pendingFrame = null;
      updateLayers(0, 0, false);
      revealBadge(false);
    };
    const visibility = () => {
      if (document.hidden) leave();
    };
    const resize = new ResizeObserver(() => {
      if (inside) rect = surface.getBoundingClientRect();
    });
    resize.observe(surface);
    surface.addEventListener("pointerover", trackPointer, { passive: true });
    surface.addEventListener("pointermove", trackPointer, { passive: true });
    surface.addEventListener("pointerleave", leave);
    surface.addEventListener("pointercancel", leave);
    surface.addEventListener("focusin", leave);
    window.addEventListener("scroll", leave, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    return () => {
      resize.disconnect();
      surface.removeEventListener("pointerover", trackPointer);
      surface.removeEventListener("pointermove", trackPointer);
      surface.removeEventListener("pointerleave", leave);
      surface.removeEventListener("pointercancel", leave);
      surface.removeEventListener("focusin", leave);
      window.removeEventListener("scroll", leave);
      document.removeEventListener("visibilitychange", visibility);
      if (pendingFrame !== null) cancelAnimationFrame(pendingFrame);
      for (const animation of layerAnimations.values()) animation.cancel();
      positionAnimation?.cancel();
      badgeAnimation?.cancel();
    };
  }, [finePointer, reducedMotion, label, strength]);

  return (
    <div ref={surfaceRef} className={cn("relative isolate", className)}>
      {children}
      {label && (
        <div
          ref={cursorPositionRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-30 hidden h-20 w-20 lg:block"
        >
          <span
            ref={cursorRevealRef}
            className="flex h-full w-full scale-75 items-center justify-center rounded-full border border-glacier-cream/80 bg-glacier-cream text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-midnight-navy opacity-0 shadow-lg"
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
