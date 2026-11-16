import type { ReactNode } from "react";

export const inquiryInputClass =
  "mt-2 min-h-12 w-full rounded-none border border-midnight-navy/30 bg-white px-4 py-3 text-base text-midnight-navy placeholder:text-slate-ink/70 hover:border-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpine-teal aria-invalid:border-red-800 disabled:cursor-not-allowed disabled:bg-midnight-navy/5 disabled:opacity-60";

export function FormField({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-midnight-navy"
      >
        {label}{required && <span aria-hidden="true" className="ml-1 text-alpine-teal">*</span>}
      </label>
      {children}
      {hint && <p id={`${id}-hint`} className="mt-2 text-xs leading-5 text-slate-ink/75">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-2 text-xs leading-5 text-red-800">{error}</p>}
    </div>
  );
}
