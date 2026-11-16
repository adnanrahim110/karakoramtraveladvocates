import assert from "node:assert/strict";

const origin = new URL(process.env.VERIFY_BASE_URL ?? "http://127.0.0.1:3021");
assert.ok(["127.0.0.1", "localhost", "[::1]"].includes(origin.hostname), "Run content checks against a local server.");

async function read(path) {
  const response = await fetch(new URL(path, origin));
  return { status: response.status, html: await response.text() };
}

const sitemap = await read("/sitemap.xml");
assert.equal(sitemap.status, 200, "Sitemap responds successfully.");
const urls = [...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
assert.ok(urls.length > 20, "The sitemap contains the full content collection.");
assert.equal(new Set(urls.map((url) => url.href)).size, urls.length, "Sitemap URLs are unique.");
const paths = new Set(urls.map((url) => url.pathname));

for (let start = 0; start < urls.length; start += 4) {
  await Promise.all(urls.slice(start, start + 4).map(async (url) => {
    assert.equal(url.origin, "https://karakoramtraveladvocates.com", "Production origin is correct.");
    const { status, html } = await read(url.pathname);
    assert.equal(status, 200, `${url.pathname} is reachable.`);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
    assert.equal([...main.matchAll(/<h1\b/g)].length, 1, `${url.pathname} has one primary heading.`);
    assert.doesNotMatch(html, /<select\b/i, `${url.pathname} uses custom selects.`);
    const canonicalTag = html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0];
    const canonical = canonicalTag?.match(/href="([^"]+)"/)?.[1];
    assert.ok(canonical, `${url.pathname} includes a canonical link.`);
    assert.equal(new URL(canonical).href, url.href, `${url.pathname} has the correct canonical.`);
    for (const match of html.matchAll(/<a\b[^>]*href="(\/[^"?#]*)[^"\s]*"/g)) {
      const href = match[1];
      if (href.startsWith("/imgs/") || href.startsWith("/_next/")) continue;
      assert.ok(paths.has(href), `${url.pathname} links to a known page: ${href}`);
    }
    if (url.pathname === "/") {
      const formSection = html.indexOf('id="plan-your-trip"');
      assert.ok(formSection > 0 && formSection < html.indexOf("<footer"), "Homepage inquiry section precedes the footer.");
      assert.match(main, /role="combobox"/, "Homepage inquiry includes custom dropdowns.");
    }
  }));
}

for (const route of ["/treks/unknown-route", "/tours/unknown-tour", "/expeditions/unknown-objective", "/destinations/unknown-region", "/travel-guide/unknown-guide", "/treks/%2F"]) {
  const { status } = await read(route);
  assert.equal(status, 404, `${route} returns a proper not-found status.`);
}
const flight = await fetch(new URL("/treks/k2-base-camp-trek?_rsc=verification", origin), { headers: { RSC: "1", "Next-Router-Prefetch": "1" } });
assert.equal(flight.status, 200, "Known routes preserve client navigation responses.");
assert.match(flight.headers.get("content-type") ?? "", /text\/x-component/);
assert.match(await flight.text(), /K2 Base Camp/);
const missingFlight = await fetch(new URL("/treks/unknown-route?_rsc=verification", origin), { headers: { RSC: "1" } });
assert.equal(missingFlight.status, 404, "Unknown client-navigation routes preserve the 404 response.");
assert.match(missingFlight.headers.get("content-type") ?? "", /text\/x-component/);
const robots = await read("/robots.txt");
assert.match(robots.html, /Sitemap: https:\/\/karakoramtraveladvocates\.com\/sitemap\.xml/);
console.log(`Verified ${urls.length} pages, canonicals, navigation links, custom dropdown markup, homepage form placement and 404 responses without a browser.`);
