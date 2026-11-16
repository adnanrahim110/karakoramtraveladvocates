import Image from "next/image";
import Link from "next/link";
import { SiteNavigation } from "@/components/layout/SiteNavigation";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-midnight-navy/10 bg-glacier-cream/85 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-360 items-center justify-between gap-6 px-4 sm:px-8 lg:h-22">
        <Link href="/" aria-label="Karakoram Travel Advocates home" className="shrink-0 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal">
          <Image src="/imgs/logo.png" alt="Karakoram — Travel Advocates" width={230} height={56} className="h-auto w-44 object-contain sm:w-52" />
        </Link>
        <SiteNavigation />
      </div>
    </header>
  );
}
