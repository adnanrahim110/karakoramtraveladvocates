import { HOME_MEDIA, type HomeMediaAsset } from "@/lib/data/home-media";
import { TRAVEL_MEDIA } from "@/lib/data/travel-media";

export interface TravelDestination {
  slug: string;
  href: string;
  name: string;
  region: string;
  summary: string;
  image: HomeMediaAsset;
  season: string;
  suggestedStay: string;
  access: string;
  highlights: string[];
  story: string[];
  planning: string;
  journeySlugs: string[];
}

export const travelDestinations: TravelDestination[] = [
  {
    slug: "hunza", href: "/destinations/hunza", name: "Hunza Valley", region: "Hunza & Nagar", summary: "Village terraces, old forts and orchard paths beneath an extraordinary mountain skyline.", image: HOME_MEDIA.hunza, season: "Spring to autumn", suggestedStay: "4–7 days", access: "Approach through Gilgit and the Karakoram Highway; connections are confirmed for your travel dates.",
    highlights: ["Karimabad and its village paths", "Baltit and Altit forts", "Duikar's mountain views", "Day walks and orchard landscapes"],
    story: ["Hunza makes space for a different kind of mountain journey. Walk between village terraces, spend time in a fort courtyard, and let the skyline remain a backdrop to daily life rather than a target to reach.", "Karimabad is a useful base for lower-valley exploration. Allow several days to combine heritage, gentle walking and nearby excursions without turning every morning into another long transfer."], planning: "Blossom and autumn colours follow elevation and weather. Higher excursions need separate access checks, and a scenic trip can still reach altitudes that require care.", journeySlugs: ["hunza-valley-private-journey", "rakaposhi-base-camp"],
  },
  {
    slug: "skardu", href: "/destinations/skardu", name: "Skardu & Baltistan", region: "Baltistan", summary: "Lakes, stone villages and desert landscapes at the gateway to the Baltoro.", image: HOME_MEDIA.skardu, season: "Spring to autumn", suggestedStay: "4–6 days", access: "Fly to Skardu when schedules and conditions allow, or assess a suitable road itinerary with the team.",
    highlights: ["Upper Kachura and valley walks", "Shigar's heritage and village lanes", "Sarfaranga's cold desert", "A starting point for the high Karakoram"], story: ["The wide Skardu basin brings together mountain lakes, sandy river landscapes and settlements with a strong Balti identity. Nearby Shigar offers a different rhythm, with a restored fort and quieter village paths.", "A Baltistan journey can be rewarding in its own right or provide time to settle in before a remote trek. We favour a few well-chosen bases over a long checklist of short photo stops."], planning: "Keep some flexibility around mountain flights. Trips into Deosai or towards the Baltoro involve different access windows and logistics from a stay in the Skardu basin.", journeySlugs: ["skardu-shigar-signature-tour", "k2-base-camp-trek", "gondogoro-la", "spantik-peak-expedition"],
  },
  {
    slug: "passu", href: "/destinations/passu", name: "Passu & Upper Hunza", region: "Gojal, Upper Hunza", summary: "Serrated peaks, glacier viewpoints and Wakhi villages along the northern corridor.", image: HOME_MEDIA.tailor, season: "Late spring to autumn", suggestedStay: "3–5 days", access: "Follow the northern Karakoram Highway from central Hunza; high excursions depend on current access.",
    highlights: ["Passu Cones and village walks", "Borith Lake and nearby viewpoints", "Attabad Lake and Gulmit", "Khunjerab as a conditional high excursion"], story: ["Passu's skyline is immediately recognisable, but the villages and walking routes deserve more than a roadside stop. Upper Hunza gives you time for glacier views, lake paths and a closer understanding of Wakhi culture.", "Combine a few days here with central Hunza, or make this quieter northern corridor the focus. We shape the walking around your interests and the conditions on the ground."], planning: "Khunjerab is a high-altitude outing, even when reached by road. Opening arrangements, weather and the needs of the group determine whether it belongs in your final itinerary.", journeySlugs: ["passu-khunjerab", "hunza-valley-private-journey"],
  },
  {
    slug: "deosai", href: "/destinations/deosai", name: "Deosai Plains", region: "Baltistan high plateau", summary: "Open grassland, shifting cloud and long horizons on a high plateau above Skardu.", image: TRAVEL_MEDIA.deosai, season: "Summer, subject to opening", suggestedStay: "1–3 days within a Baltistan trip", access: "A seasonal high-road excursion from the Skardu or Astore side, subject to snow and road conditions.",
    highlights: ["Wide plateau landscapes", "Seasonal wildflowers", "Sheosar Lake when access allows", "A slower day in the high country"], story: ["Deosai feels unlike the steep valleys below it. The landscape opens into grassland and broad horizons, where weather moves visibly across the plateau.", "It works best as a carefully planned part of a Baltistan journey. There is no need to rush from viewpoint to viewpoint: give the landscape time, keep distance from wildlife, and leave room for a change in conditions."], planning: "Deosai is high, exposed and seasonal. Road access, park rules and altitude suitability must be checked for the day.", journeySlugs: ["skardu-shigar-signature-tour"],
  },
  {
    slug: "baltoro-concordia", href: "/destinations/baltoro-concordia", name: "Baltoro & Concordia", region: "Central Karakoram", summary: "A long glacier approach into the amphitheatre of K2, Broad Peak and the Gasherbrums.", image: HOME_MEDIA.trek, season: "Summer trekking window", suggestedStay: "Around three weeks including access", access: "Approach through Skardu and the Braldu valley, with route permissions and mountain support arranged in advance.",
    highlights: ["Trango Towers and the granite skyline", "The changing Baltoro Glacier", "Concordia's mountain panorama", "K2 Base Camp when conditions allow"], story: ["The Baltoro is a progression, not a single viewpoint. Rock walls rise beyond the approach valley, camps move onto the glacier, and the scale of the high peaks becomes clear as you walk towards Concordia.", "This is remote camping travel. Good preparation means understanding the terrain, support arrangements and time needed for acclimatisation before choosing between an out-and-back route and a high-pass crossing."], planning: "Expect rough moraine, cold nights and limited connectivity. Restricted-area paperwork, weather buffers and personal evacuation insurance need to be settled before departure.", journeySlugs: ["k2-base-camp-trek", "gondogoro-la"],
  },
  {
    slug: "fairy-meadows", href: "/destinations/fairy-meadows", name: "Fairy Meadows & Nanga Parbat", region: "Nanga Parbat, northern Pakistan", summary: "Pine forest, mountain meadows and a close view of Nanga Parbat's immense north face.", image: HOME_MEDIA.fairyMeadows, season: "Late spring to early autumn", suggestedStay: "4–6 days including access", access: "A road approach towards Raikot, followed by local trail access and walking; final arrangements depend on current conditions.",
    highlights: ["Nanga Parbat's north face", "Forest paths towards Beyal", "Meadow evenings and early light", "Optional higher walking with suitable preparation"], story: ["Fairy Meadows offers a shorter mountain journey with a dramatic setting. A walk through pine forest opens into meadows beneath Nanga Parbat, with time to settle into the landscape before considering a higher excursion.", "The length is more approachable than a Baltoro expedition, but the travel approach and altitude still deserve respect. We plan the access, walking and recovery days together."], planning: "Local road and trail access need a current assessment. Keep higher walks optional and choose sleeping elevations with care; a short trip is not automatically an easy one.", journeySlugs: ["fairy-meadows-nanga-parbat", "rupal-valley"],
  },
];

export function getTravelDestination(slug: string) {
  return travelDestinations.find((destination) => destination.slug === slug);
}
