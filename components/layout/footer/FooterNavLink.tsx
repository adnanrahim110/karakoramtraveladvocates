import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterNavLinkProps {
  href: string;
  label: string;
  number?: string;
  className?: string;
}

export function FooterNavLink({
  href,
  label,
  number,
  className,
}: FooterNavLinkProps) {
  // Hover/focus confirms the target with a text-width underline: 220ms entry,
  // 140ms exit, cubic-bezier(0.2, 0.65, 0.3, 1). Reduced motion is instant.
  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        "group/footer-link flex min-h-10 w-fit max-w-full items-baseline gap-2 py-1 text-xs leading-5 text-glacier-cream/85 transition-colors duration-140 ease-[cubic-bezier(0.2,0.65,0.3,1)] hover:text-warm-gold hover:duration-220 focus-visible:text-warm-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold active:text-glacier-cream active:duration-0 motion-reduce:transition-none sm:text-sm pointer-coarse:min-h-11",
        className,
      )}
    >
      {number && (
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-[10px] font-normal tabular-nums text-warm-gold"
        >
          {number}
        </span>
      )}
      <span className="relative min-w-0 wrap-anywhere after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-140 after:ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover/footer-link:after:scale-x-100 group-hover/footer-link:after:duration-220 group-focus-visible/footer-link:after:scale-x-100 motion-reduce:after:transition-none">
        {label}
      </span>
    </Link>
  );
}
