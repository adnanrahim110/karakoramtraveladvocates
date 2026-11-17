"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
} from "react";

function isElementFocusVisible(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  try {
    return target.matches(":focus-visible");
  } catch {
    return false;
  }
}

export function useHeroAutoplay({
  activeIndex,
  totalSlides,
  durationMs = 6000,
  reducedMotion,
  onAdvance,
}: {
  activeIndex: number;
  totalSlides: number;
  durationMs?: number;
  reducedMotion: boolean;
  onAdvance: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const progressBarRef = useRef<HTMLSpanElement | null>(null);
  const animationRef = useRef<Animation | null>(null);
  const remainingMsRef = useRef<number>(durationMs);
  const onAdvanceRef = useRef(onAdvance);

  const isPaused = isHovered || isFocusPaused || isHidden;

  useEffect(() => {
    onAdvanceRef.current = onAdvance;
  }, [onAdvance]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    remainingMsRef.current = durationMs;
    const bar = progressBarRef.current;

    if (!bar || reducedMotion || totalSlides <= 1) {
      animationRef.current = null;
      return;
    }

    const animation = bar.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      {
        duration: durationMs,
        easing: "linear",
        fill: "both",
      },
    );
    animation.pause();
    animationRef.current = animation;

    return () => {
      animation.cancel();
      animationRef.current = null;
    };
  }, [activeIndex, durationMs, reducedMotion, totalSlides]);

  useEffect(() => {
    const animation = animationRef.current;
    if (reducedMotion || isPaused || totalSlides <= 1) {
      animation?.pause();
      return;
    }

    const delay = Math.max(0, remainingMsRef.current);
    const startTime = performance.now();
    animation?.play();

    const timer = window.setTimeout(() => {
      onAdvanceRef.current();
    }, delay);

    return () => {
      window.clearTimeout(timer);
      animation?.pause();
      remainingMsRef.current = Math.max(
        0,
        delay - (performance.now() - startTime),
      );
    };
  }, [activeIndex, isPaused, reducedMotion, totalSlides]);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  const onFocusCapture = useCallback((event: FocusEvent<HTMLElement>) => {
    if (isElementFocusVisible(event.target)) {
      setIsFocusPaused(true);
    }
  }, []);

  const onBlurCapture = useCallback((event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocusPaused(false);
      return;
    }
    setIsFocusPaused(isElementFocusVisible(event.relatedTarget));
  }, []);

  return {
    progressBarRef,
    containerHandlers: {
      onMouseEnter,
      onMouseLeave,
      onFocusCapture,
      onBlurCapture,
    },
  };
}
