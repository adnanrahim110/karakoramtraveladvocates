"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotionPreference } from "@/lib/motion/preferences";
import {
  createScrubAnimation,
  observeScrollProgress,
} from "@/lib/motion/scroll-runtime";
import { cn } from "@/lib/utils";

export interface ParallaxImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  amount?: "subtle" | "medium";
  credit?: string;
  quality?: 75 | 90;
}

export function ParallaxImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
  priority = false,
  amount = "subtle",
  credit,
  quality = 90,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (reducedMotion || !imageRef.current || !imageRef.current.animate) return;
    const container = containerRef.current;
    if (!container) return;
    const distance = amount === "medium" ? 112 : 64;
    // Scroll reveals the landscape inside its frame. The reversible 1000ms
    // timeline is scrubbed directly; no playback loop or React scroll updates.
    const animation = createScrubAnimation(imageRef.current, [
      { transform: `translateY(-${distance}px)` },
      { transform: `translateY(${distance}px)` },
    ]);
    const update = (progress: number) => {
      animation.currentTime = progress * 1000;
    };
    const unsubscribe = observeScrollProgress(container, update);
    return () => {
      unsubscribe();
      animation.cancel();
    };
  }, [amount, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate overflow-hidden bg-midnight-navy/10",
        className,
      )}
    >
      <div
        ref={imageRef}
        className={cn(
          "absolute inset-x-0 motion-reduce:transform-none",
          amount === "medium" ? "-inset-y-28" : "-inset-y-16",
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={priority}
          quality={quality}
          className="object-cover"
        />
      </div>
      {credit && (
        <span className="absolute bottom-3 right-3 max-w-[80%] bg-midnight-navy/80 px-2 py-1 text-[9px] text-glacier-cream">
          {credit}
        </span>
      )}
    </div>
  );
}
