const configuredInquiryEmail = process.env.NEXT_PUBLIC_INQUIRY_EMAIL?.trim();
export const INQUIRY_EMAIL = configuredInquiryEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configuredInquiryEmail)
  ? configuredInquiryEmail
  : "dispatch@karakoram.pk";

export interface InquiryEmailInput {
  name: string;
  email: string;
  experience: string;
  dates: string;
  travelers: string;
  notes: string;
  phone?: string;
  route?: string;
  region?: string;
}

export function createInquiryEmail(input: InquiryEmailInput) {
  const subject =
    `Journey inquiry: ${input.route || input.region || input.experience}`.replace(
      /[\r\n]+/g,
      " ",
    );
  const body = [
    "Hello Karakoram team,",
    "",
    "I would like to discuss a journey.",
    "",
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    ...(input.phone?.trim() ? [`Phone: ${input.phone.trim()}`] : []),
    `Experience: ${input.experience}`,
    `Route: ${input.route || "Open to suggestions"}`,
    `Region: ${input.region || "Open to suggestions"}`,
    `Travel dates: ${input.dates.trim() || "Flexible"}`,
    `Travelers: ${input.travelers}`,
    "",
    "What I have in mind:",
    input.notes.trim() || "Please help me explore the options.",
  ].join("\n");
  return {
    subject,
    body,
    href: `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
