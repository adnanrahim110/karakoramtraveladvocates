import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  theme?: "light" | "dark";
  align?: "left" | "center";
  actions?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  theme = "light",
  align = "left",
  actions,
  className,
}: SectionHeaderProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8 border-b",
        isDark ? "border-glacier-cream/15" : "border-midnight-navy/15",
        align === "center" && "text-center",
        className
      )}
    >
      <div className="lg:col-span-3 flex items-start gap-3 pt-1">
        <span className="w-2 h-2 bg-warm-gold mt-1 shrink-0" aria-hidden="true" />
        <span
          className={cn(
            "text-[11px] font-mono font-medium tracking-[0.2em] uppercase leading-tight",
            isDark ? "text-warm-gold" : "text-alpine-teal"
          )}
        >
          {eyebrow}
        </span>
      </div>

      <div
        className={cn(
          "lg:col-span-6 flex flex-col gap-3",
          !actions && "lg:col-span-9"
        )}
      >
        <h2
          className={cn(
            "font-display text-[30px] sm:text-[38px] lg:text-[44px] font-semibold leading-[1.08] tracking-tight",
            isDark ? "text-glacier-cream" : "text-midnight-navy"
          )}
        >
          {title}
        </h2>

        {description && (
          <p
            className={cn(
              "text-sm sm:text-base leading-relaxed max-w-2xl",
              isDark ? "text-glacier-cream/75" : "text-slate-ink/80"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="lg:col-span-3 flex lg:justify-end items-end">
          {actions}
        </div>
      )}
    </div>
  );
}
