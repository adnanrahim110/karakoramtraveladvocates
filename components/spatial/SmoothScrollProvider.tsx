"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { useInteractive } from "@/components/spatial/InteractiveContext";

// Wheel and anchor smoothing: 800ms quartic ease-out, interrupted by new input.
const scrollEasing = (progress: number) => 1 - Math.pow(1 - progress, 4);

function scrollWindowImmediately(top: number) {
  window.scrollTo({ top, behavior: "instant" });
}

const ImmediateScrollContext = createContext(scrollWindowImmediately);

export function useImmediatePageScroll() {
  return useContext(ImmediateScrollContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const { isInquiryOpen } = useInteractive();
  const scrollImmediately = useCallback((top: number) => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(top, { immediate: true });
    else scrollWindowImmediately(top);
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    function configureScroll() {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      if (motionPreference.matches) return;
      const lenis = new Lenis({
        autoRaf: true,
        duration: 0.8,
        easing: scrollEasing,
        smoothWheel: true,
        syncTouch: false,
        allowNestedScroll: true,
        anchors: { duration: 0.8, easing: scrollEasing },
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      });
      lenisRef.current = lenis;
      if (document.body.classList.contains("overflow-hidden")) lenis.stop();
    }
    configureScroll();
    motionPreference.addEventListener("change", configureScroll);
    return () => {
      motionPreference.removeEventListener("change", configureScroll);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isInquiryOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [isInquiryOpen]);

  return <ImmediateScrollContext.Provider value={scrollImmediately}>{children}</ImmediateScrollContext.Provider>;
}
