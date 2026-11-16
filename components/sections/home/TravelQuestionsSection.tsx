import Link from "next/link";
import { Plus, Minus } from "lucide-react";

const questions = [
  { question: "Do I need trekking experience to travel with you?", answer: "It depends on the route. Private cultural tours can include gentle walks, while remote treks require sustained walking and camping experience. Technical expeditions need a separate experience review. Tell us what you have done before and we can discuss a suitable starting point." },
  { question: "Can the itinerary be made private or tailored?", answer: "Share the places you want to see, your dates and the pace you enjoy. We can explore a private route, adapt a cultural journey, or discuss combining a valley stay with a trek. The proposed itinerary and arrangements are agreed before booking." },
  { question: "When is the best time to visit?", answer: "Spring and autumn are rewarding for valley travel; summer is the usual planning window for high glacier routes. Access depends on the exact route and current conditions. Start with what you want to do, then choose the season with the team." },
  { question: "Why are prices quoted individually?", answer: "Group size, transport, accommodation, permit requirements and the level of mountain support all affect the cost. A written proposal lets you compare the actual scope and exclusions before you commit." },
  { question: "How do I start planning?", answer: "Complete the brief below with your interests, dates and group size. Review the prepared email draft and send it to the team. You can also contact us directly by email. An inquiry starts a conversation and does not make a booking." },
];

export function TravelQuestionsSection() {
  return (
    <section id="travel-questions" aria-labelledby="home-questions-title" className="border-t border-midnight-navy/15 bg-white/50 px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4"><p className="text-xs font-semibold uppercase tracking-widest text-alpine-teal">A few useful answers</p><h2 id="home-questions-title" className="mt-4 font-editorial text-4xl font-normal leading-tight text-midnight-navy">Before we<br /><em>head north.</em></h2><Link href="/travel-guide" className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-alpine-teal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">More planning guidance</Link></div>
        <div className="lg:col-span-8">{questions.map((item) => <details key={item.question} className="group border-b border-midnight-navy/25 first:border-t"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-medium text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal [&::-webkit-details-marker]:hidden"><span>{item.question}</span><Plus aria-hidden="true" className="size-5 shrink-0 group-open:hidden" /><Minus aria-hidden="true" className="hidden size-5 shrink-0 group-open:block" /></summary><p className="max-w-2xl pb-6 text-sm leading-7 text-slate-ink/80">{item.answer}</p></details>)}</div>
      </div>
    </section>
  );
}
