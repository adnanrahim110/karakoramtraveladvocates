import Image from "next/image";
import Link from "next/link";
import { INQUIRY_EMAIL } from "@/lib/inquiry-email";

export function FooterIdentity() {
  return (
    <div className="min-w-0 lg:col-span-4">
      <Link
        href="/"
        aria-label="Karakoram Travel Advocates home"
        className="block w-60 max-w-full border-l-2 border-warm-gold bg-glacier-cream p-3 transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold active:bg-glacier-cream motion-reduce:transition-none"
      >
        <Image
          src="/imgs/logo.png"
          alt="Karakoram Travel Advocates — treks, expeditions and tours"
          width={1947}
          height={389}
          sizes="(min-width: 1024px) 240px, 70vw"
          className="h-auto w-full"
        />
      </Link>
      <p className="mt-5 font-editorial text-2xl leading-tight text-glacier-cream sm:text-3xl">
        Always <em className="font-normal text-warm-gold">north.</em>
      </p>
      <p className="mt-2 max-w-xs text-xs leading-6 text-glacier-cream/75">
        Private cultural journeys, guided glacier treks and mountain
        expeditions in Gilgit-Baltistan.
      </p>
      <address className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-6 not-italic text-glacier-cream/75">
        <span>Gilgit-Baltistan, Pakistan</span>
        <span aria-hidden="true" className="text-glacier-cream/35">
          ·
        </span>
        <a
          href={`mailto:${INQUIRY_EMAIL}`}
          className="inline-flex min-h-10 items-center break-all text-glacier-cream underline decoration-glacier-cream/35 underline-offset-4 transition-colors duration-150 hover:text-warm-gold hover:decoration-warm-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold motion-reduce:transition-none pointer-coarse:min-h-11"
        >
          {INQUIRY_EMAIL}
        </a>
      </address>
    </div>
  );
}
