import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EditorialHeading({
  children,
  id,
  className,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "break-words font-editorial text-4xl font-normal leading-[1.08] tracking-[-0.04em] text-midnight-navy text-balance sm:text-5xl lg:text-6xl xl:text-7xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
