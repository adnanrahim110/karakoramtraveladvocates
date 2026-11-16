import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { ContactInquirySection } from "@/components/sections/planning/ContactInquirySection";

export const metadata: Metadata = { title: "Plan Your Journey", description: "Start a conversation with Karakoram Travel Advocates about a private cultural trip, mountain trek or expedition in northern Pakistan.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <><PageIntro eyebrow="Start a conversation" title="Your idea. Our next conversation." description="Choose a journey or tell us what you have in mind. We’ll help you work through the route, timing and practical details." /><ContactInquirySection /></>;
}
