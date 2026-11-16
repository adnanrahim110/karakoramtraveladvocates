import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "navy"
  | "teal"
  | "gold"
  | "cream"
  | "confirmed"
  | "limited"
  | "ask";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
}

const badgeVariants: Record<BadgeVariant, string> = {
  navy: "bg-midnight-navy text-glacier-cream border border-glacier-cream/20",
  teal: "bg-alpine-teal/10 text-alpine-teal border border-alpine-teal/35",
  gold: "bg-warm-gold/15 text-warm-gold border border-warm-gold/45",
  cream: "bg-glacier-cream text-midnight-navy border border-midnight-navy/20",
  confirmed: "bg-alpine-teal/20 text-glacier-cream border border-alpine-teal",
  limited: "bg-warm-gold/20 text-warm-gold border border-warm-gold/60",
  ask: "bg-transparent text-glacier-cream/85 border border-glacier-cream/30",
};

const badgeSizes: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px] font-mono font-medium tracking-[0.14em] uppercase",
  md: "px-3 py-1 text-[11px] font-mono font-medium tracking-[0.16em] uppercase",
};

export function Badge({
  variant = "teal",
  size = "sm",
  isActive = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-none whitespace-nowrap",
        badgeVariants[variant],
        badgeSizes[size],
        isActive && "border-warm-gold",
        className
      )}
    >
      {children}
    </span>
  );
}
