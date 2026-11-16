"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { NavLink } from "@/components/ui/NavLink";
import { cn } from "@/lib/utils";

const links = [
  { href: "/treks", label: "Treks" },
  { href: "/tours", label: "Private tours" },
  { href: "/expeditions", label: "Expeditions" },
  { href: "/destinations", label: "Destinations" },
  { href: "/travel-guide", label: "Travel guide" },
];

export function SiteNavigation() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menuRef.current?.open) return;
      menuRef.current.open = false;
      triggerRef.current?.focus();
    };
    const closeOnOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target) && menuRef.current) menuRef.current.open = false;
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutside);
    };
  }, []);

  const closeMenu = () => { if (menuRef.current) menuRef.current.open = false; };
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <nav aria-label="Primary navigation" className="hidden items-center gap-6 xl:flex">
        {links.map((link) => <NavLink key={link.href} href={link.href} isActive={isActive(link.href)}>{link.label}</NavLink>)}
      </nav>
      <InquiryButton className="hidden min-h-11 gap-4 px-4 py-2 text-xs xl:inline-flex">Plan your journey</InquiryButton>
      <details ref={menuRef} onBlurCapture={(event) => { if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false; }} className="group xl:hidden">
        <summary ref={triggerRef} aria-label="Navigation menu" className="flex size-12 cursor-pointer list-none items-center justify-center text-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal [&::-webkit-details-marker]:hidden"><Menu aria-hidden="true" className="size-6 group-open:hidden" /><X aria-hidden="true" className="hidden size-6 group-open:block" /></summary>
        <nav aria-label="Mobile navigation" data-lenis-prevent className="absolute inset-x-0 top-full max-h-[calc(100dvh-80px)] overflow-y-auto overscroll-contain border-b border-midnight-navy/20 bg-glacier-cream px-6 py-6 shadow-lg sm:px-10 lg:max-h-[calc(100dvh-88px)]">
          {[...links, { href: "/why-pakistan", label: "Why Pakistan" }, { href: "/about", label: "About us" }, { href: "/contact", label: "Contact" }].map((link) => <Link key={link.href} href={link.href} onClick={closeMenu} aria-current={isActive(link.href) ? "page" : undefined} className={cn("flex min-h-14 items-center border-b border-midnight-navy/15 font-editorial text-2xl text-midnight-navy hover:text-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpine-teal", isActive(link.href) && "text-alpine-teal")}>{link.label}</Link>)}
          <div onClick={() => { closeMenu(); triggerRef.current?.focus({ preventScroll: true }); }}><InquiryButton className="mt-6 w-full">Plan your journey</InquiryButton></div>
        </nav>
      </details>
    </>
  );
}
