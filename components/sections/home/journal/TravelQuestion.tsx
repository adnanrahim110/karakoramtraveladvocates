import { Minus, Plus } from "lucide-react";

export function TravelQuestion({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  return (
    <details className="group border-b border-glacier-cream/25">
      <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 px-4 py-6 text-glacier-cream transition-colors duration-140 ease-[cubic-bezier(0.2,0.65,0.3,1)] hover:bg-glacier-cream hover:text-midnight-navy hover:duration-220 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold group-open:bg-glacier-cream group-open:text-midnight-navy motion-reduce:transition-none sm:gap-6 sm:px-6 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="hidden shrink-0 font-mono text-xs sm:block"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-sans text-lg font-medium leading-snug tracking-[-0.025em] sm:text-xl">
          {question}
        </span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-current">
          <Plus className="h-4 w-4 group-open:hidden" aria-hidden="true" />
          <Minus
            className="hidden h-4 w-4 group-open:block"
            aria-hidden="true"
          />
        </span>
      </summary>
      <div className="grid gap-4 px-4 py-6 sm:grid-cols-[32px_1fr] sm:px-6">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-warm-gold sm:col-span-2">
          Route notes / {String(index + 1).padStart(2, "0")}
        </span>
        <p className="max-w-3xl text-base leading-8 text-glacier-cream/85 sm:col-span-2">
          {answer}
        </p>
      </div>
    </details>
  );
}
