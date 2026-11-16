"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const { cursorTelemetry } = useInteractive();
  const prefersReducedMotion = useReducedMotion();
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches || prefersReducedMotion) {
      return;
    }

    const handleMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible || !cursorTelemetry) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: coords.x + 14,
        y: coords.y + 14,
      }}
      transition={{
        type: "spring",
        stiffness: 520,
        damping: 36,
        mass: 0.25,
      }}
      className={cn(
        "fixed top-0 left-0 z-50 pointer-events-none hidden lg:inline-flex items-center gap-1.5 px-2 py-1",
        "bg-midnight-navy/95 text-glacier-cream border border-warm-gold/60",
        "text-[9px] font-mono tracking-[0.18em] uppercase leading-none"
      )}
    >
      <span className="w-1 h-1 bg-warm-gold shrink-0" />
      <span>{cursorTelemetry}</span>
    </motion.div>
  );
}
