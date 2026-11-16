"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { useInteractive } from "@/components/spatial/InteractiveContext";

// Wheel and anchor smoothing: 800ms quartic ease-out, interrupted by new input.
const scrollEasing = (progress: number) => 1 - Math.pow(1 - progress, 4);

export function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const { isInquiryOpen } = useInteractive();

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

  return <>{children}</>;
}
