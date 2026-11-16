import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TextLink({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-between gap-6 border-b border-current/30 py-3 text-[13px] font-semibold text-midnight-navy transition-colors duration-[140ms] ease-[cubic-bezier(0.2,0.65,0.3,1)] hover:text-alpine-teal hover:duration-[220ms] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-[140ms] after:ease-[cubic-bezier(0.2,0.65,0.3,1)] hover:after:scale-x-100 hover:after:duration-[220ms] focus-visible:after:scale-x-100 motion-reduce:after:transition-none",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-5 w-5 shrink-0 transition-transform duration-[140ms] ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:duration-[220ms] motion-reduce:transition-none motion-reduce:transform-none"
      />
    </Link>
  );
}
