import { InquiryDrawer } from "@/components/layout/InquiryDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { InteractiveProvider } from "@/components/spatial/InteractiveContext";
import { SmoothScrollProvider } from "@/components/spatial/SmoothScrollProvider";
import { SITE_URL } from "@/lib/site-config";
import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Karakoram — Travel Advocates | Treks, Expeditions & Private Tours in Gilgit-Baltistan",
    template: "%s | Karakoram — Travel Advocates",
  },
  description:
    "Explore Pakistan through cultural journeys, guided Karakoram treks and mountain expeditions. Compare routes, plan your travel and shape a private itinerary with Karakoram Travel Advocates.",
  keywords: [
    "Karakoram travel",
    "Gilgit-Baltistan tours",
    "K2 Base Camp trek",
    "Hunza Valley private tour",
    "Skardu and Shigar tour",
    "Pakistan mountaineering expeditions",
    "Spantik expedition",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${montserrat.variable} h-auto antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-glacier-cream text-slate-ink font-sans">
        <InteractiveProvider>
          <SmoothScrollProvider>
            <a
            href="#main-content"
            className="fixed left-4 top-4 z-60 -translate-y-24 bg-midnight-navy px-5 py-3 text-sm text-glacier-cream focus:translate-y-0"
          >
            Skip to content
            </a>
            <SiteHeader />
            <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 flex flex-col focus:outline-none"
          >
            {children}
            </main>
            <SiteFooter />
            <StickyMobileBar />
            <InquiryDrawer />
          </SmoothScrollProvider>
        </InteractiveProvider>
      </body>
    </html>
  );
}
