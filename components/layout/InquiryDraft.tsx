"use client";

import { useRef, useState, type Ref } from "react";
import { ArrowLeft, ArrowUpRight, Check, Copy } from "lucide-react";
import { inquiryInputClass } from "@/components/ui/FormField";
import { INQUIRY_EMAIL, type createInquiryEmail } from "@/lib/inquiry-email";

export function InquiryDraft({ draft, titleRef, onEdit }: {
  draft: ReturnType<typeof createInquiryEmail>;
  titleRef: Ref<HTMLHeadingElement>;
  onEdit: () => void;
}) {
  const [copyState, setCopyState] = useState<"idle" | "copying" | "copied" | "failed">("idle");
  const briefRef = useRef<HTMLTextAreaElement>(null);
  const isCopyingRef = useRef(false);

  async function copyBrief() {
    if (isCopyingRef.current) return;
    isCopyingRef.current = true;
    setCopyState("copying");
    try {
      await navigator.clipboard.writeText(draft.body);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
      briefRef.current?.focus();
      briefRef.current?.select();
    } finally {
      isCopyingRef.current = false;
    }
  }

  return (
    <div className="mt-8">
      <p role="status" className="flex items-center gap-2 text-sm font-medium text-alpine-teal">
        <Check className="size-4" aria-hidden="true" /> Your inquiry brief is ready
      </p>
      <h3 ref={titleRef} tabIndex={-1} className="mt-4 font-editorial text-3xl font-normal leading-tight text-midnight-navy focus:outline-none">
        Review it. Then send it.
      </h3>
      <p className="mt-4 text-sm leading-7 text-slate-ink/80">
        Open your email app to send your brief to <a href={`mailto:${INQUIRY_EMAIL}`} className="break-all underline underline-offset-4 hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-2">{INQUIRY_EMAIL}</a>. Preparing this brief does not send a message or confirm a booking.
      </p>
      <textarea ref={briefRef} aria-label="Your prepared inquiry brief" readOnly value={draft.body} rows={8} data-lenis-prevent className={inquiryInputClass} />
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a href={draft.href} className="inline-flex min-h-12 flex-1 items-center justify-between gap-4 bg-midnight-navy px-5 py-3 text-sm font-medium text-glacier-cream hover:bg-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">
          Open email draft <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
        <button type="button" disabled={copyState === "copying"} onClick={copyBrief} className="inline-flex min-h-12 cursor-pointer items-center justify-between gap-4 border border-midnight-navy/30 px-5 py-3 text-sm font-medium text-midnight-navy hover:border-alpine-teal hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal disabled:cursor-wait disabled:opacity-60">
          {copyState === "copying" ? "Copying…" : copyState === "copied" ? "Brief copied" : "Copy brief"} <Copy className="size-4" aria-hidden="true" />
        </button>
      </div>
      <p role="status" className="mt-3 text-xs leading-6 text-slate-ink/75">
        {copyState === "failed" ? "Copy is unavailable. Your brief is selected above; copy it manually and paste it into your email." : copyState === "copied" ? "Copied. Paste your brief into your preferred email service and send it when ready." : "If you don’t use an email app, copy the brief and send it from your preferred email service."}
      </p>
      <button type="button" onClick={onEdit} className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-alpine-teal hover:text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">
        <ArrowLeft className="size-4" aria-hidden="true" /> Edit your inquiry
      </button>
    </div>
  );
}
