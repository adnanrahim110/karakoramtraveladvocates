import { InquiryButton } from "@/components/ui/InquiryButton";

export function PlanningCalloutSection({ title = "A better journey starts with the right questions.", description = "Tell us your dates, interests and experience. We’ll help you turn an idea into a route that makes sense." }: { title?: string; description?: string }) {
  return (
    <section aria-labelledby="planning-callout-title" className="border-t border-midnight-navy/20 bg-midnight-navy text-glacier-cream">
      <div className="mx-auto grid max-w-360 items-center gap-8 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-20">
        <div className="lg:col-span-8"><h2 id="planning-callout-title" className="max-w-3xl font-editorial text-4xl font-normal leading-tight sm:text-5xl">{title}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-glacier-cream/85">{description}</p></div>
        <InquiryButton variant="light" className="w-fit lg:col-span-4 lg:justify-self-end">Discuss your journey</InquiryButton>
      </div>
    </section>
  );
}
