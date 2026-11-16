import { NextResponse, type NextRequest } from "next/server";
import { travelJourneys, journeyKindPaths } from "@/lib/data/travel-content";
import { travelDestinations } from "@/lib/data/destination-content";
import { planningArticles } from "@/lib/data/planning-content";

const contentPaths = new Set([...travelJourneys, ...travelDestinations, ...planningArticles].map((item) => item.href));
const collectionPaths = new Set([...Object.values(journeyKindPaths), "/destinations", "/travel-guide"]);

export function proxy(request: NextRequest) {
  // Check before the cached shell streams so missing content has a real 404.
  // Next preserves its client Flight response format when applying the rewrite.
  let pathname: string;
  try {
    pathname = decodeURIComponent(request.nextUrl.pathname).replace(/\/$/, "");
  } catch {
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }
  if (collectionPaths.has(pathname) || contentPaths.has(pathname)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
}

export const config = {
  matcher: ["/treks/:path*", "/tours/:path*", "/expeditions/:path*", "/destinations/:path*", "/travel-guide/:path*"],
};
