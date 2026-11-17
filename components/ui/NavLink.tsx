"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  type FocusEvent,
  type ReactNode,
} from "react";
import { useReducedMotionPreference } from "@/lib/motion/preferences";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  isActive?: boolean;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
  className?: string;
}

const MOUNTAIN_RIDGE_PATH =
  "M 0 9.5 Q 18 9.5 30 8.2 L 42 5.2 L 48 6.8 L 62 1.2 L 71 5.8 L 78 3.4 L 87 7.8 Q 98 9.5 120 9.5";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const ENTER_DURATION = 520;
const LEAVE_DURATION = 440;

export function NavLink({
  href,
  children,
  isActive = false,
  variant = "desktop",
  onNavigate,
  className,
}: NavLinkProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const animRef = useRef<{
    animation: Animation;
    from: number;
    to: number;
    duration: number;
  } | null>(null);
  const engagedRef = useRef(false);
  const prevActiveRef = useRef(isActive);
  const reducedMotion = useReducedMotionPreference();

  const currentOffset = useCallback((fallback: number) => {
    const active = animRef.current;
    if (!active || active.animation.playState !== "running") return fallback;
    const computedProgress =
      active.animation.effect?.getComputedTiming().progress;
    const ratio =
      typeof computedProgress === "number"
        ? Math.min(1, Math.max(0, computedProgress))
        : Math.min(
            1,
            Math.max(
              0,
              Number(active.animation.currentTime ?? 0) / active.duration,
            ),
          );
    return active.from + (active.to - active.from) * ratio;
  }, []);

  const animateMountain = useCallback(
    (direction: "enter" | "leave") => {
      const path = pathRef.current;
      if (!path) return;

      const target = direction === "enter" ? 0 : -1;
      if (reducedMotion || typeof path.animate !== "function") {
        animRef.current?.animation.cancel();
        animRef.current = null;
        path.setAttribute(
          "stroke-dashoffset",
          direction === "enter" ? "0" : "1",
        );
        return;
      }

      const from =
        direction === "enter"
          ? animRef.current?.to === -1
            ? 1
            : currentOffset(1)
          : currentOffset(0);

      animRef.current?.animation.cancel();
      const baseDuration =
        direction === "enter" ? ENTER_DURATION : LEAVE_DURATION;
      const distance = Math.abs(target - from);
      const duration = Math.max(160, Math.round(baseDuration * distance));
      const animation = path.animate(
        [
          { strokeDashoffset: String(from) },
          { strokeDashoffset: String(target) },
        ],
        { duration, easing: EASE, fill: "forwards" },
      );

      animRef.current = { animation, from, to: target, duration };
      animation.onfinish = () => {
        if (animRef.current?.animation !== animation) return;
        animRef.current = null;
        path.setAttribute("stroke-dashoffset", String(target));
        animation.cancel();
      };
    },
    [currentOffset, reducedMotion],
  );

  useEffect(() => {
    const wasActive = prevActiveRef.current;
    prevActiveRef.current = isActive;
    const path = pathRef.current;
    if (!path || wasActive === isActive) return;

    if (isActive) {
      animRef.current?.animation.cancel();
      animRef.current = null;
      path.setAttribute("stroke-dashoffset", "0");
    } else if (!engagedRef.current) {
      animateMountain("leave");
    }
  }, [isActive, animateMountain]);

  useEffect(
    () => () => {
      animRef.current?.animation.cancel();
      animRef.current = null;
    },
    [],
  );

  const handleEnter = () => {
    engagedRef.current = true;
    if (!isActive) animateMountain("enter");
  };

  const handleLeave = () => {
    engagedRef.current = false;
    if (!isActive) animateMountain("leave");
  };

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    let focusVisible = false;
    try {
      focusVisible = event.currentTarget.matches(":focus-visible");
    } catch {
      focusVisible = true;
    }
    if (!focusVisible) return;
    engagedRef.current = true;
    if (!isActive) animateMountain("enter");
  };

  const handleBlur = () => {
    if (!engagedRef.current) return;
    engagedRef.current = false;
    if (!isActive) animateMountain("leave");
  };

  const ridgeSvg = (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 11"
      fill="none"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 h-2 w-full overflow-visible transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none",
        isActive
          ? "text-warm-gold group-hover/nav:text-alpine-teal"
          : "text-alpine-teal group-active/nav:text-warm-gold",
      )}
    >
      <path
        ref={pathRef}
        d={MOUNTAIN_RIDGE_PATH}
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 2"
        strokeDashoffset={isActive ? 0 : 1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "group/nav relative flex min-h-14 items-center justify-between gap-4 border-b border-midnight-navy/15 py-3 font-editorial text-2xl transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpine-teal active:opacity-75 motion-reduce:transition-none",
          isActive
            ? "italic text-alpine-teal"
            : "text-midnight-navy hover:text-alpine-teal",
          className,
        )}
      >
        <span className="relative inline-block pb-2 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/nav:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">
          <span className="whitespace-nowrap">{children}</span>
          {ridgeSvg}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            "size-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transform-none motion-reduce:transition-none",
            isActive
              ? "text-warm-gold"
              : "text-midnight-navy/45 group-hover/nav:translate-x-1 group-hover/nav:-translate-y-1 group-hover/nav:text-alpine-teal",
          )}
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onNavigate}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group/nav relative inline-flex min-h-11 items-center px-1 py-2 text-sm font-medium tracking-[-0.01em] transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal active:opacity-75 motion-reduce:transition-none",
        isActive
          ? "text-alpine-teal"
          : "text-midnight-navy hover:text-alpine-teal",
        className,
      )}
    >
      <span className="relative inline-block pb-2">
        <span className="whitespace-nowrap leading-5">{children}</span>
        {ridgeSvg}
      </span>
    </Link>
  );
}
