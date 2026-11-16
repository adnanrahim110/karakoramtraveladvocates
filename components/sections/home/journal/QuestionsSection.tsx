import { TravelQuestion } from "@/components/sections/home/journal/TravelQuestion";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { FAQS } from "@/lib/data/articles-faqs";

const ANSWERS: Record<string, string> = {
  "faq-permits":
    "Requirements depend on your route and nationality. Cultural valley tours, open-zone treks, restricted glacier routes, and climbing expeditions have different paperwork. Allow time for permits and confirm the current visa and route requirements before you book flights; restricted-zone trips often need documents several weeks ahead.",
  "faq-skardu-flights":
    "Mountain weather can change domestic flight schedules. Build buffer days into your international connections and discuss a road alternative, overnight stops, and any additional costs in your trip brief. A flexible plan matters more than a promise that every flight will run.",
  "faq-altitude":
    "Choose a route suited to your experience and an itinerary with gradual ascent and acclimatization days. Discuss the maximum sleeping altitudes, emergency arrangements, and evacuation cover before departure. Seek medical advice about your own fitness for altitude; symptoms should be reported promptly to your guide.",
  "faq-women-solo":
    "You can explore a private itinerary or ask about joining a small group. Tell us your preferences for room or tent arrangements, the guide team, transport, and cultural visits so these details can be agreed before you travel.",
  "faq-expedition-screening":
    "A high-altitude climb starts with a conversation about your previous routes, technical skills, acclimatization experience, and insurance. The objective and team need to fit your readiness before a price or departure date becomes a booking.",
};
const SHORT_QUESTIONS: Record<string, string> = {
  "faq-permits": "Will I need special permits?",
  "faq-skardu-flights": "What if my mountain flight is cancelled?",
  "faq-altitude": "How should I prepare for altitude?",
  "faq-women-solo": "Can I travel solo or join a small group?",
  "faq-expedition-screening": "How do I start planning a climbing expedition?",
};

export function QuestionsSection() {
  const questions = FAQS.filter((faq) => faq.id in ANSWERS);
  return (
    <section
      id="travel-questions"
      aria-labelledby="travel-questions-title"
      className="relative overflow-hidden bg-midnight-navy py-20 text-glacier-cream sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <FieldLabel className="text-warm-gold">
          09 / A clear way forward
        </FieldLabel>
        <header className="grid gap-8 py-10 lg:grid-cols-12 lg:items-end">
          <HomeSectionHeading
            id="travel-questions-title"
            className="lg:col-span-8"
          >
            BEFORE YOU GO<span className="text-warm-gold">.</span>
          </HomeSectionHeading>
          <div className="lg:col-span-4">
            <p className="max-w-sm text-base leading-8 text-glacier-cream/85">
              Good adventures start with good questions. Here are a few of the
              things worth knowing before you head north.
            </p>
            <InquiryButton
              variant="outline"
              className="mt-6 text-glacier-cream"
            >
              Ask a different question
            </InquiryButton>
          </div>
        </header>
        <div className="border-t border-glacier-cream/30">
          {questions.map((faq, index) => (
            <TravelQuestion
              key={faq.id}
              index={index}
              question={SHORT_QUESTIONS[faq.id] ?? faq.question}
              answer={ANSWERS[faq.id] ?? faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
