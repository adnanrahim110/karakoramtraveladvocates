"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const DESKTOP_POINTER_QUERY =
  "(min-width: 1024px) and (min-height: 760px) and (hover: hover) and (pointer: fine)";
const VIEWPORT_PINNING_QUERY = "(min-width: 1024px) and (min-height: 760px)";

function subscribeQuery(query: string, listener: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

const subscribeReducedMotion = (listener: () => void) =>
  subscribeQuery(REDUCED_MOTION_QUERY, listener);
const subscribeFinePointer = (listener: () => void) =>
  subscribeQuery(FINE_POINTER_QUERY, listener);
const subscribeDesktopPointer = (listener: () => void) =>
  subscribeQuery(DESKTOP_POINTER_QUERY, listener);
const subscribeViewportPinning = (listener: () => void) =>
  subscribeQuery(VIEWPORT_PINNING_QUERY, listener);

// Unlike the installed Motion hook, these snapshots update after hydration and
// when the OS setting changes. The server snapshot always starts without motion.
export function useReducedMotionPreference(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => true,
  );
}

export function useFinePointerPreference(): boolean {
  return useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER_QUERY).matches,
    () => false,
  );
}

export function useDesktopPointerPreference(): boolean {
  return useSyncExternalStore(
    subscribeDesktopPointer,
    () => window.matchMedia(DESKTOP_POINTER_QUERY).matches,
    () => false,
  );
}

export function useViewportPinningPreference(): boolean {
  return useSyncExternalStore(
    subscribeViewportPinning,
    () => window.matchMedia(VIEWPORT_PINNING_QUERY).matches,
    () => false,
  );
}
