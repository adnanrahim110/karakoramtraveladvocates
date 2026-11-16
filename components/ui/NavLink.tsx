import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  isActive?: boolean;
  onNavigate?: () => void;
  className?: string;
}

export function NavLink({ href, children, isActive = false, onNavigate, className }: NavLinkProps) {
  // Hover/focus reveals the underline in 220ms; exit retracts it in 140ms.
  // Both use cubic-bezier(0.2, 0.65, 0.3, 1), with no motion when requested.
  return (
    <Link href={href} onNavigate={onNavigate} aria-current={isActive ? "page" : undefined} className={cn(
      "group relative inline-flex min-h-11 items-center py-2 text-xs font-medium text-midnight-navy transition-colors duration-140 ease-[cubic-bezier(0.2,0.65,0.3,1)] hover:text-alpine-teal hover:duration-220 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-alpine-teal after:transition-transform after:duration-140 after:ease-[cubic-bezier(0.2,0.65,0.3,1)] hover:after:scale-x-100 hover:after:duration-220 focus-visible:after:scale-x-100 motion-reduce:after:transition-none",
      isActive ? "text-alpine-teal after:scale-x-100" : "after:scale-x-0",
      className,
    )}>{children}</Link>
  );
}
