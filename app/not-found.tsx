import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";

export default function NotFound() {
  return <PageIntro eyebrow="A different route" title="This trail leads somewhere else." description="We could not find that page. Return to the journey collection or tell us what you are looking for."><div className="flex flex-wrap gap-4"><Link href="/treks" className="inline-flex min-h-12 items-center bg-midnight-navy px-6 py-3 text-sm font-semibold text-glacier-cream hover:bg-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">Explore treks</Link><Link href="/contact" className="inline-flex min-h-12 items-center border border-midnight-navy px-6 py-3 text-sm font-semibold text-midnight-navy hover:bg-midnight-navy hover:text-glacier-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">Contact us</Link></div></PageIntro>;
}
