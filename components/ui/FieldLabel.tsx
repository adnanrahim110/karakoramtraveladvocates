import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FieldLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-alpine-teal sm:text-xs",
        className,
      )}
    >
      {children}
    </p>
  );
}
