import Link from "next/link";
import { InquiryForm } from "@/components/layout/InquiryForm";
import { INQUIRY_EMAIL } from "@/lib/inquiry-email";

export function HomeInquirySection() {
  return (
    <section id="plan-your-trip" aria-labelledby="home-inquiry-title" className="border-t border-midnight-navy/20 px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">Your next chapter</p>
          <h2 id="home-inquiry-title" className="mt-5 font-editorial text-4xl font-normal leading-tight text-midnight-navy sm:text-5xl">Tell us what<br /><em>takes you north.</em></h2>
          <p className="mt-6 text-sm leading-7 text-slate-ink/80">A route you have dreamed about, a few free days, or just a starting idea. Share your plans and we can begin shaping the right journey.</p>
          <div className="mt-8 border-t border-midnight-navy/20 pt-6"><p className="text-xs font-semibold text-midnight-navy">Prefer a direct conversation?</p><a href={`mailto:${INQUIRY_EMAIL}`} className="mt-2 inline-flex min-h-11 break-all text-sm text-alpine-teal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{INQUIRY_EMAIL}</a><p className="mt-3 text-xs leading-6 text-slate-ink/70">Your brief is prepared as an email draft for you to review and send. <Link href="/privacy" className="underline underline-offset-4 hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4">Privacy details</Link></p></div>
        </div>
        <div className="border border-midnight-navy/20 bg-white/60 p-6 sm:p-8 lg:col-span-8"><InquiryForm context={{}} layout="wide" /></div>
      </div>
    </section>
  );
}
