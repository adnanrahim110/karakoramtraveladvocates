"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { InquiryForm } from "./InquiryForm";

export function InquiryDrawer() {
  const { isInquiryOpen, closeInquiry, inquiryContext } = useInteractive();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isInquiryOpen && !dialog.open) {
      previousFocusRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
      dialog.showModal();
    } else if (!isInquiryOpen && dialog.open) {
      dialog.close();
      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus({ preventScroll: true });
      }
    }
    if (!isInquiryOpen) return;
    const alreadyLocked = document.body.classList.contains("overflow-hidden");
    document.body.classList.add("overflow-hidden");
    return () => {
      if (!alreadyLocked) document.body.classList.remove("overflow-hidden");
    };
  }, [isInquiryOpen]);
  return (
    <dialog
      ref={dialogRef}
      onClose={closeInquiry}
      onCancel={(event) => { event.preventDefault(); closeInquiry(); }}
      data-lenis-prevent
      aria-labelledby="inquiry-title"
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          closeInquiry();
      }}
      className="fixed inset-0 m-0 ml-auto hidden h-dvh max-h-none w-full max-w-xl flex-col overflow-y-auto overscroll-contain border-0 bg-glacier-cream p-0 text-slate-ink shadow-xl open:flex backdrop:bg-midnight-navy/65"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-midnight-navy/20 bg-glacier-cream px-6 py-4 sm:px-8">
        <FieldLabel>Your journey starts here</FieldLabel>
        <button
          type="button"
          onClick={closeInquiry}
          aria-label="Close journey inquiry"
          className="flex h-12 w-12 cursor-pointer items-center justify-center text-midnight-navy hover:bg-midnight-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="p-6 sm:p-10">
        {(inquiryContext.tripTitle || inquiryContext.regionName) && (
          <p className="mb-5 text-xs text-alpine-teal">
            {inquiryContext.tripTitle || inquiryContext.regionName}
          </p>
        )}
        <h2
          id="inquiry-title"
          className="font-editorial text-4xl font-normal leading-tight text-midnight-navy"
        >
          Something extraordinary
          <br />
          <em>begins with a conversation.</em>
        </h2>
        <p className="mt-5 text-sm leading-7 text-slate-ink/80">
          Tell us what draws you to the mountains. We’ll help you find a route
          that fits your time, interests and experience.
        </p>
        {isInquiryOpen && (
          <InquiryForm
            key={JSON.stringify(inquiryContext)}
            context={inquiryContext}
            onNavigate={closeInquiry}
          />
        )}
      </div>
    </dialog>
  );
}
