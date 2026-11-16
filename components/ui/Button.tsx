import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "gold"
  | "navy"
  | "teal"
  | "outline-cream"
  | "outline-navy"
  | "ghost-cream"
  | "ghost-navy"
  | "primary"
  | "secondary"
  | "outline"
  | "outlineLight";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isActive?: boolean;
  href?: string;
  asChild?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  gold: "bg-warm-gold text-midnight-navy border border-warm-gold hover:bg-glacier-cream hover:border-glacier-cream active:bg-warm-gold/90 focus-visible:ring-warm-gold",
  primary:
    "bg-warm-gold text-midnight-navy border border-warm-gold hover:bg-glacier-cream hover:border-glacier-cream active:bg-warm-gold/90 focus-visible:ring-warm-gold",
  navy: "bg-midnight-navy text-glacier-cream border border-midnight-navy hover:bg-alpine-teal hover:border-alpine-teal active:bg-slate-ink focus-visible:ring-midnight-navy",
  secondary:
    "bg-midnight-navy text-glacier-cream border border-midnight-navy hover:bg-alpine-teal hover:border-alpine-teal active:bg-slate-ink focus-visible:ring-midnight-navy",
  teal: "bg-alpine-teal text-glacier-cream border border-alpine-teal hover:bg-midnight-navy hover:border-midnight-navy active:bg-slate-ink focus-visible:ring-alpine-teal",
  "outline-cream":
    "bg-transparent border border-glacier-cream/35 text-glacier-cream hover:border-warm-gold hover:text-warm-gold active:bg-glacier-cream/5 focus-visible:ring-warm-gold",
  outlineLight:
    "bg-transparent border border-glacier-cream/35 text-glacier-cream hover:border-warm-gold hover:text-warm-gold active:bg-glacier-cream/5 focus-visible:ring-warm-gold",
  "outline-navy":
    "bg-transparent border border-midnight-navy/30 text-midnight-navy hover:border-midnight-navy hover:bg-midnight-navy hover:text-glacier-cream active:bg-midnight-navy/90 focus-visible:ring-midnight-navy",
  outline:
    "bg-transparent border border-midnight-navy/30 text-midnight-navy hover:border-midnight-navy hover:bg-midnight-navy hover:text-glacier-cream active:bg-midnight-navy/90 focus-visible:ring-midnight-navy",
  "ghost-cream":
    "bg-transparent text-glacier-cream/85 hover:text-warm-gold focus-visible:ring-warm-gold",
  "ghost-navy":
    "bg-transparent text-midnight-navy hover:text-alpine-teal focus-visible:ring-alpine-teal",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase gap-2",
  md: "min-h-11 px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase gap-3",
  lg: "min-h-12 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase gap-3",
};

export function Button({
  variant = "gold",
  size = "md",
  isActive = false,
  disabled = false,
  href,
  asChild = false,
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const composedClassName = cn(
    "inline-flex items-center justify-center rounded-none font-sans transition-colors duration-200 ease-[cubic-bezier(0.2,0.65,0.3,1)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    isActive && "border-warm-gold text-warm-gold",
    disabled && "opacity-40 pointer-events-none cursor-not-allowed",
    className
  );

  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
      className: cn(composedClassName, children.props.className),
    });
  }

  if (href && !disabled) {
    return (
      <Link href={href} className={composedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={composedClassName}
      {...props}
    >
      {children}
    </button>
  );
}
