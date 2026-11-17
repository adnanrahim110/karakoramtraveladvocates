"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { useReducedMotionPreference } from "@/lib/motion/preferences";

export function JourneyDirectoryDisclosure({ label, children }: { label: string; children: ReactNode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pending = useRef<{ animation: Animation; open: boolean } | null>(null);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (reducedMotion) pending.current?.animation.finish();
  }, [reducedMotion]);

  useEffect(() => () => {
    pending.current?.animation.cancel();
    pending.current = null;
  }, []);

  function toggle(event: MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!details || !panel || !content || typeof panel.animate !== "function") return;
    event.preventDefault();

    const active = pending.current;
    const open = !(active?.open ?? details.open);
    const from = details.open ? panel.getBoundingClientRect().height : 0;
    active?.animation.cancel();
    pending.current = null;

    if (!open && panel.contains(document.activeElement)) {
      event.currentTarget.focus({ preventScroll: true });
    }

    if (reducedMotion) {
      details.open = open;
      details.removeAttribute("data-closing");
      panel.inert = false;
      return;
    }

    details.open = true;
    details.toggleAttribute("data-closing", !open);
    panel.inert = !open;
    const to = open ? content.getBoundingClientRect().height : 0;

    // Summary activation reveals the panel in 280ms or closes it in 140ms.
    // A second activation starts from the height already on screen.
    const animation = panel.animate([{ height: `${from}px` }, { height: `${to}px` }], {
      duration: open ? 280 : 140,
      easing: open ? "cubic-bezier(0.2, 0.65, 0.3, 1)" : "cubic-bezier(0.35, 0, 0.65, 1)",
      fill: "both",
    });
    pending.current = { animation, open };
    animation.onfinish = () => {
      if (pending.current?.animation !== animation) return;
      details.open = open;
      details.removeAttribute("data-closing");
      panel.inert = false;
      pending.current = null;
      animation.cancel();
    };
  }

  return (
    <details ref={detailsRef} className="group/directory min-w-0 rounded-sm border border-midnight-navy/20">
      <summary
        onClick={toggle}
        className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-4 py-2 font-semibold text-midnight-navy hover:bg-glacier-cream/70 hover:text-alpine-teal focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-alpine-teal sm:px-6 [&::-webkit-details-marker]:hidden"
      >
        <span>{label}</span>
        <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center border border-midnight-navy/15 bg-glacier-cream text-alpine-teal">
          <Plus className="size-4 group-[&[open]:not([data-closing])]/directory:hidden" />
          <Minus className="hidden size-4 group-[&[open]:not([data-closing])]/directory:block" />
        </span>
      </summary>
      <div ref={panelRef} className="overflow-clip">
        <div ref={contentRef}>{children}</div>
      </div>
    </details>
  );
}
