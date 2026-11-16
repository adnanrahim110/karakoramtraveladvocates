import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  standard: "text-[clamp(2.5rem,1.5rem_+_2.5vw,4.5rem)]",
  feature: "text-[clamp(2.75rem,1.75rem_+_2.7vw,5rem)]",
  compact: "text-[clamp(2.25rem,1.25rem_+_2vw,3.5rem)]",
};

interface HomeSectionHeadingProps {
  children: ReactNode;
  id: string;
  className?: string;
  variant?: keyof typeof variants;
}

export function HomeSectionHeading({
  children,
  id,
  className,
  variant = "standard",
}: HomeSectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "min-w-0 max-w-full break-words whitespace-normal text-wrap font-sans font-semibold uppercase leading-[1.05] tracking-[-0.04em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </h2>
  );
}
