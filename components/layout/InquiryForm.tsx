"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CustomSelect, type CustomSelectOption } from "@/components/ui/CustomSelect";
import { FormField, inquiryInputClass } from "@/components/ui/FormField";
import { InquiryDraft } from "@/components/layout/InquiryDraft";
import { createInquiryEmail } from "@/lib/inquiry-email";
import { validateInquiryValues, type InquiryErrors, type InquiryField, type InquiryValues } from "@/lib/inquiry-validation";
import { cn } from "@/lib/utils";
import type { InquiryContextPayload } from "@/components/spatial/InteractiveContext";

const experiences: CustomSelectOption[] = [
  { value: "tour", label: "Cultural & private tour", description: "Valleys, local culture, and time to explore." },
  { value: "trek", label: "Mountain trek", description: "Day walks, base camps, and glacier journeys." },
  { value: "expedition", label: "Climbing expedition", description: "A conversation about experience and mountain objectives." },
];
const regions: CustomSelectOption[] = [
  { value: "open", label: "Open to suggestions" },
  { value: "Hunza & Upper Hunza", label: "Hunza & Upper Hunza" },
  { value: "Skardu & Baltistan", label: "Skardu & Baltistan" },
  { value: "Baltoro & Concordia", label: "Baltoro & Concordia" },
  { value: "Nanga Parbat", label: "Nanga Parbat & Fairy Meadows" },
  { value: "Chitral & Swat", label: "Chitral, Kalash & Swat" },
];
const timings: CustomSelectOption[] = [
  { value: "flexible", label: "I’m flexible" },
  { value: "spring", label: "Spring · March–May" },
  { value: "summer", label: "Summer · June–September" },
  { value: "autumn", label: "Autumn · October–November" },
  { value: "specific", label: "I have dates in mind" },
];
const fieldLabels: Record<InquiryField, string> = {
  experience: "Journey type", region: "Region", timing: "Travel season", dates: "Preferred dates", travelers: "Travelers", name: "Name", email: "Email", phone: "Phone", notes: "Message",
};
const journeyFields: readonly InquiryField[] = ["experience", "region", "timing", "dates", "travelers"];

export interface InquiryFormProps {
  context?: InquiryContextPayload;
  className?: string;
  layout?: "stacked" | "wide";
  onNavigate?: () => void;
}

export function InquiryForm({ context = {}, className, layout = "stacked", onNavigate }: InquiryFormProps) {
  const formId = useId();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<InquiryValues>({
    experience: context.serviceType ?? "", region: context.regionName ?? "open", timing: context.preferredDates ? "specific" : "flexible", dates: context.preferredDates ?? "", travelers: "2", name: "", email: "", phone: "", notes: "",
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [draft, setDraft] = useState<ReturnType<typeof createInquiryEmail> | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const draftTitleRef = useRef<HTMLHeadingElement>(null);
  const regionOptions = context.regionName && !regions.some((region) => region.value === context.regionName)
    ? [...regions, { value: context.regionName, label: context.regionName }]
    : regions;
  const gridClass = cn("mt-6 grid gap-5", layout === "wide" && "sm:grid-cols-2");
  const idFor = (field: InquiryField) => `${formId}-${field}`;
  const describedBy = (field: InquiryField, hasHint = false) => [hasHint ? `${idFor(field)}-hint` : "", errors[field] ? `${idFor(field)}-error` : ""].filter(Boolean).join(" ") || undefined;
  const errorEntries = Object.entries(errors).filter((entry): entry is [InquiryField, string] => Boolean(entry[1]));

  function updateField(field: InquiryField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateInquiryValues(values, step === 1 ? "journey" : "all");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (journeyFields.some((field) => nextErrors[field])) setStep(1);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }
    if (step === 1) {
      setStep(2);
      requestAnimationFrame(() => titleRef.current?.focus());
      return;
    }
    setDraft(createInquiryEmail({
      name: values.name, email: values.email, phone: values.phone, notes: values.notes,
      experience: experiences.find((item) => item.value === values.experience)?.label ?? values.experience,
      dates: values.timing === "specific" ? values.dates : timings.find((item) => item.value === values.timing)?.label ?? "Flexible",
      travelers: values.travelers, route: context.tripTitle,
      region: values.region === "open" ? undefined : values.region,
    }));
    requestAnimationFrame(() => draftTitleRef.current?.focus());
  }

  if (draft) return <div className={className}><InquiryDraft draft={draft} titleRef={draftTitleRef} onEdit={() => { setDraft(null); requestAnimationFrame(() => titleRef.current?.focus()); }} /></div>;

  return (
    <form noValidate onSubmit={handleSubmit} className={cn("mt-8", className)} aria-labelledby={`${formId}-title`}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">Step {step} of 2</p>
        <p className="text-xs text-slate-ink/75">Required fields <span aria-hidden="true">*</span></p>
      </div>
      <h3 ref={titleRef} id={`${formId}-title`} tabIndex={-1} className="mt-3 font-editorial text-2xl font-normal leading-tight text-midnight-navy focus:outline-none">
        {step === 1 ? "Tell us about your journey." : "How can we reach you?"}
      </h3>
      {context.tripTitle && <p className="mt-3 text-sm leading-6 text-alpine-teal">Planning: {context.tripTitle}</p>}
      {errorEntries.length > 0 && (
        <div ref={errorSummaryRef} role="alert" tabIndex={-1} className="mt-5 border-l-4 border-red-800 bg-red-50 p-4 text-sm text-red-900 focus:outline-2 focus:outline-offset-2 focus:outline-red-800">
          <p className="font-semibold">Please check the following fields.</p>
          <ul className="mt-2 space-y-1">
            {errorEntries.map(([field, error]) => <li key={field}><a href={`#${idFor(field)}`} onClick={(event) => { event.preventDefault(); document.getElementById(idFor(field))?.focus(); }} className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">{fieldLabels[field]}: {error}</a></li>)}
          </ul>
        </div>
      )}
      {step === 1 ? (
        <fieldset className={gridClass}>
          <legend className="sr-only">Your travel preferences</legend>
          <div>
            <CustomSelect id={idFor("experience")} name="experience" label="What kind of journey?" required value={values.experience} onValueChange={(value) => updateField("experience", value)} options={experiences} invalid={Boolean(errors.experience)} describedBy={describedBy("experience")} placeholder="Choose your journey type" />
            {errors.experience && <p id={`${idFor("experience")}-error`} className="mt-2 text-xs leading-5 text-red-800">{errors.experience}</p>}
          </div>
          <div>
            <CustomSelect id={idFor("region")} name="region" label="Where would you like to go?" value={values.region} onValueChange={(value) => updateField("region", value)} options={regionOptions} invalid={Boolean(errors.region)} describedBy={describedBy("region")} />
            {errors.region && <p id={`${idFor("region")}-error`} className="mt-2 text-xs leading-5 text-red-800">{errors.region}</p>}
          </div>
          <div>
            <CustomSelect id={idFor("timing")} name="timing" label="When would you like to travel?" value={values.timing} onValueChange={(value) => updateField("timing", value)} options={timings} invalid={Boolean(errors.timing)} describedBy={describedBy("timing")} />
            {errors.timing && <p id={`${idFor("timing")}-error`} className="mt-2 text-xs leading-5 text-red-800">{errors.timing}</p>}
          </div>
          <FormField id={idFor("travelers")} label="Number of travelers" required error={errors.travelers} hint="A whole number, including yourself.">
            <input id={idFor("travelers")} name="travelers" type="number" inputMode="numeric" min={1} max={64} step={1} required value={values.travelers} onChange={(event) => updateField("travelers", event.target.value)} aria-invalid={Boolean(errors.travelers)} aria-describedby={describedBy("travelers", true)} className={inquiryInputClass} />
          </FormField>
          {values.timing === "specific" && (
            <FormField id={idFor("dates")} label="Preferred month or dates" required error={errors.dates} hint="Include the year so we can plan around your dates.">
              <input id={idFor("dates")} name="dates" type="text" required maxLength={100} value={values.dates} onChange={(event) => updateField("dates", event.target.value)} placeholder="e.g. 10–24 June 2027" aria-invalid={Boolean(errors.dates)} aria-describedby={describedBy("dates", true)} className={inquiryInputClass} />
            </FormField>
          )}
        </fieldset>
      ) : (
        <fieldset className={gridClass}>
          <legend className="sr-only">Your contact details</legend>
          <FormField id={idFor("name")} label="Your name" required error={errors.name}>
            <input id={idFor("name")} name="name" type="text" autoComplete="name" required maxLength={100} value={values.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} className={inquiryInputClass} />
          </FormField>
          <FormField id={idFor("email")} label="Email address" required error={errors.email}>
            <input id={idFor("email")} name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} value={values.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} placeholder="you@example.com" className={inquiryInputClass} />
          </FormField>
          <FormField id={idFor("phone")} label="Phone number (optional)" error={errors.phone} hint="Include your country code.">
            <input id={idFor("phone")} name="phone" type="tel" autoComplete="tel" maxLength={40} value={values.phone} onChange={(event) => updateField("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone", true)} placeholder="e.g. +44 7700 900000" className={inquiryInputClass} />
          </FormField>
          <FormField id={idFor("notes")} label="What matters to you? (optional)" error={errors.notes}>
            <textarea id={idFor("notes")} name="notes" rows={4} maxLength={3000} value={values.notes} onChange={(event) => updateField("notes", event.target.value)} aria-invalid={Boolean(errors.notes)} aria-describedby={describedBy("notes")} data-lenis-prevent placeholder="Places you’d love to see, your walking experience, comfort preferences, or questions." className={cn(inquiryInputClass, "resize-y")} />
          </FormField>
        </fieldset>
      )}
      <div className="mt-7 flex flex-wrap items-center gap-4">
        {step === 2 && <button type="button" onClick={() => { setStep(1); setErrors({}); requestAnimationFrame(() => titleRef.current?.focus()); }} className="inline-flex min-h-12 cursor-pointer items-center gap-2 text-sm font-medium text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal"><ArrowLeft className="size-4" aria-hidden="true" /> Back</button>}
        <Button type="submit" variant="navy" className="min-h-12 flex-1 gap-3 py-4 text-xs normal-case tracking-normal sm:flex-none">
          {step === 1 ? "Continue to contact details" : "Prepare my inquiry"}<ArrowUpRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
      <p className="mt-4 text-xs leading-6 text-slate-ink/75">
        {step === 1 ? "Your dates and route can stay flexible." : "You’ll review an email draft before sending it. Your details aren’t submitted automatically."} <Link href="/privacy" onNavigate={onNavigate} className="underline underline-offset-4 hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpine-teal">Privacy policy</Link>
      </p>
    </form>
  );
}
