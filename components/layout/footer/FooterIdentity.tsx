import Image from "next/image";
import Link from "next/link";
import { FooterNavLink } from "@/components/layout/footer/FooterNavLink";
import { FooterRangeIllustration } from "@/components/layout/footer/FooterRangeIllustration";
import { INQUIRY_EMAIL } from "@/lib/inquiry-email";

export function FooterIdentity() {
  return (
    <div className="relative isolate min-w-0 lg:col-span-4">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex max-w-88 items-end opacity-35">
        <FooterRangeIllustration />
      </div>
      <Link href="/" aria-label="Karakoram Travel Advocates home" className="block w-80 max-w-full border-l-2 border-warm-gold bg-glacier-cream p-4 hover:bg-white active:bg-glacier-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold">
        <Image src="/imgs/logo.png" alt="Karakoram Travel Advocates — treks, expeditions and tours" width={1947} height={389} sizes="(min-width: 1280px) 288px, (min-width: 1024px) 256px, (min-width: 375px) 288px, 80vw" className="h-auto w-full" />
      </Link>
      <p className="mt-6 font-editorial text-[clamp(2.5rem,3.5vw,3.5rem)] leading-[1.05] tracking-[-0.055em]">
        Always <em className="font-normal text-warm-gold">north.</em>
      </p>
      <address className="mt-4 text-xs leading-6 not-italic text-glacier-cream/75">
        Gilgit-Baltistan, Pakistan
        <FooterNavLink href={"mailto:" + INQUIRY_EMAIL} label={INQUIRY_EMAIL} className="text-glacier-cream" />
      </address>
    </div>
  );
}
