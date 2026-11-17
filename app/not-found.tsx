import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { HOME_MEDIA } from "@/lib/data/home-media";

export default function NotFound() {
  return (
    <PageIntro
      eyebrow="A different route"
      title="This trail leads somewhere else."
      description="We could not find that page. Return to the journey collection or tell us what you are looking for."
      image={HOME_MEDIA.expedition}
    >
      <div className="flex flex-wrap gap-4">
        <Link
          href="/treks"
          className="inline-flex min-h-12 items-center bg-glacier-cream px-6 py-3 text-sm font-semibold text-midnight-navy transition-colors duration-150 hover:bg-warm-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold motion-reduce:transition-none"
        >
          Explore treks
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center border border-glacier-cream/40 px-6 py-3 text-sm font-semibold text-glacier-cream transition-colors duration-150 hover:border-warm-gold hover:text-warm-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold motion-reduce:transition-none"
        >
          Contact us
        </Link>
      </div>
    </PageIntro>
  );
}
