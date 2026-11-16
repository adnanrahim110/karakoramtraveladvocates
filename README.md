# Karakoram Travel Advocates

Next.js 16 App Router website with Tailwind CSS 4, original travel content, reusable inquiry forms and Lenis scrolling. The production origin is `https://karakoramtraveladvocates.com` in `lib/site-config.ts`.

## Development

```sh
pnpm dev
```

The development server runs at `http://localhost:3010`.

## Content

- `lib/data/travel-content.ts`: six treks, four cultural tours and two expedition objectives.
- `lib/data/destination-content.ts`: destination guides and related journeys.
- `lib/data/planning-content.ts`: travel seasons, costs, access, permits, altitude and packing.
- `components/sections/home/HeroSplitHorizonSection.tsx` and `components/sections/home/journal`: the premium homepage, interactive 3D terrain and immersive editorial sections. Preserve this visual system when updating content.
- `components/sections/home/HomeInquirySection.tsx`: the custom-field inquiry form immediately before the footer.
- `public/imgs/travel/ATTRIBUTIONS.md` and `/image-credits`: photography sources and licenses.

Route outlines and costs are confirmed in a personal proposal. The site does not display unverified live availability, reviews or package prices.

## Inquiry forms

The reusable two-step form validates travel preferences and contact details, then prepares an email draft for the traveler to review and send. It includes copy/manual recovery and does not claim that a message was sent. Server email delivery is not configured.

Set `NEXT_PUBLIC_INQUIRY_EMAIL` to change the recipient; the existing fallback is `dispatch@karakoram.pk`. This is a public address, not a secret. Custom dropdowns support keyboard navigation, typeahead, local scrolling and disabled options.

Lenis runs throughout the root layout with nested scrolling enabled. Native touch scrolling, reduced-motion preferences and modal scroll locking are respected.

## Hero terrain

The original measured K2 terrain joins a continuous landscape that fades into the horizon in every direction. Surrounding mountains are an artistic continuation; geographic telemetry stays inside the measured area. The original winter imagery and lighting remain on an opaque base. A separate summer mesh shares the exact geometry, camera and lighting, with native pointer tracking controlling its softly feathered transparency. The overlay becomes completely hidden when the pointer leaves.

Summer uses genuine Sentinel-2B RGB reflectance captured on 13 September 2025, geographically cropped to the original DEM bounds. The late-summer capture was selected for low cloud cover and less seasonal snow than the clear July and August alternatives. Only reprojection, resampling and a uniform photographic exposure are applied; vegetation and snow are never painted. The source crop is retained in `scripts/assets/hero`, with acquisition details and checksums in `public/imgs/terrain/k2-summer-provenance.json`. Run `scripts/acquire-hero-summer.py` to reacquire it (Pillow, NumPy, requests and rasterio 1.4.3), or `bake_summer_texture()` from `scripts/prepare-hero-terrain.py` to recompress the verified local source. Acquisition does not modify the winter assets.

`lib/hero-terrain.ts` controls terrain geometry, fog and camera bounds. `lib/hero-scene-interaction.ts` handles cursor coordinates and keeps projected chips within the scene without overlapping touch targets. Non-browser tests cover both, including scrolling, display density and full camera rotation. The peak chips share accessible controls in `components/spatial/PeakViewChip.tsx`; all viewpoint choices remain visible on narrow screens.

## Verification

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm build
```

To verify server-rendered content without a browser, start a production server in one terminal and run the checks in another:

```sh
pnpm start --port 3021
pnpm check:content
```

The HTTP checks inspect the sitemap, all content pages, canonical URLs, internal navigation, homepage form placement and unknown-route 404 responses. `VERIFY_BASE_URL` can point them to another local port. Browser testing remains manual.
