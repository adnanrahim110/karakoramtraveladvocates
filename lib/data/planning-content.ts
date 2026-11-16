import { HOME_MEDIA, type HomeMediaAsset } from "@/lib/data/home-media";

export interface PlanningSection {
  id: string;
  title: string;
  paragraphs: string[];
  checklist?: string[];
}

export interface PlanningArticle {
  slug: string;
  href: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  image: HomeMediaAsset;
  sections: PlanningSection[];
  sources?: { label: string; href: string }[];
}

export const planningArticles: PlanningArticle[] = [
  {
    slug: "best-time-to-visit",
    href: "/travel-guide/best-time-to-visit",
    title: "Choose your season, then your route.",
    category: "Seasons & routes",
    summary: "Blossom in the valleys, summer on the glaciers, autumn in Hunza. A good travel window depends on what you want to do.",
    readTime: "5 min read",
    image: HOME_MEDIA.hunza,
    sections: [
      { id: "spring", title: "Spring belongs to the valleys", paragraphs: ["Spring brings blossom to the lower valleys before the high passes become accessible. Hunza, Nagar, Shigar and Skardu can work well for village walks, photography and cultural travel. Blossom timing shifts with elevation and each year's weather.", "Keep early-season plans flexible. A valley road being open does not mean its higher walking routes or mountain passes are ready."] },
      { id: "summer", title: "Summer opens the high country", paragraphs: ["The main planning window for Baltoro treks, Snow Lake and Deosai is summer. It offers longer days and a better chance of access, but snow, river crossings and glacier conditions still determine the route.", "Choose the route first and confirm its operating window with the team. A comfortable Hunza tour and a glaciated pass crossing ask very different things of the same month."] },
      { id: "autumn", title: "Autumn rewards a slower journey", paragraphs: ["Autumn is a natural fit for Hunza's orchards, village terraces and changing poplars. Lower valleys remain useful for cultural journeys as the high mountains turn colder.", "Daylight shortens and overnight temperatures drop. We plan shorter walking days and check the access window for every high excursion."] },
      { id: "decision", title: "What to decide before booking", paragraphs: ["Tell us your preferred dates and the experience you want, rather than selecting a month by a photograph alone. We can help resolve the tradeoff between seasonal scenery, route access and the time you have."], checklist: ["Choose between valley travel, a multi-day trek and technical climbing.", "Allow travel buffer around domestic flights and long road transfers.", "Confirm the route's actual access and permit requirements.", "Keep one or two priorities; allow the remaining days to follow conditions."] },
    ],
  },
  {
    slug: "travel-costs", href: "/travel-guide/travel-costs", title: "What actually shapes the cost of your trip?", category: "Budget & planning", summary: "Compare the whole journey: transport, accommodation, mountain support, permits and the days that protect your itinerary.", readTime: "5 min read", image: HOME_MEDIA.skardu,
    sections: [
      { id: "whole-trip", title: "Price the whole journey", paragraphs: ["Daily spending in a valley is only one part of a northern Pakistan trip. International flights, domestic connections and the distance between places can have a larger effect on the total than an individual meal or room.", "Start with your number of days, group size and accommodation preferences. These make a more useful basis for a quote than a single daily-budget figure."] },
      { id: "trek-support", title: "Mountain support changes the equation", paragraphs: ["A remote camping trek needs a different support system from a lodge-based cultural journey. Staff, food, campsite arrangements, load transport, permits and route logistics belong in the comparison.", "For a technical expedition, ask for a clear description of base-camp and on-mountain support. Two prices for the same summit may cover very different responsibilities."] },
      { id: "compare-quotes", title: "Compare scope before comparing totals", paragraphs: ["Your confirmed proposal should say what is included, what is paid separately, and which changes could affect the total. Ask how flight disruption, extra road travel and added hotel nights are handled."], checklist: ["Domestic flights, road transfers and trailhead transport.", "Hotel category, camping equipment and room or tent sharing.", "Guide and support-staff scope, meals and drinking water.", "Permit arrangements, park fees and personal insurance.", "Single-room supplements, equipment hire and discretionary tips."] },
      { id: "quote", title: "A quote built around your brief", paragraphs: ["We use your dates, group size, chosen route and preferred level of comfort to prepare a journey proposal. Published route outlines help you choose a direction; a written quote confirms the actual price and arrangements before you commit."] },
    ],
  },
  {
    slug: "visas-and-permits", href: "/travel-guide/visas-and-permits", title: "Your visa and your mountain permissions are separate questions.", category: "Visas & permits", summary: "Understand the documents to ask about before committing to a valley journey, restricted-zone trek or climbing expedition.", readTime: "5 min read", image: HOME_MEDIA.journal,
    sections: [
      { id: "visa", title: "Start with your passport and proposed route", paragraphs: ["Check the official Pakistan Online Visa System for the entry requirements that apply to your nationality and intended activities. Category names, eligibility, fees and supporting documents can change, so use the official portal for the current rules.", "Share your proposed itinerary with the team early. A cultural visit, a remote trek and a climbing expedition may require different documentation."] },
      { id: "route-permits", title: "Check permissions for the exact route", paragraphs: ["A visa does not automatically establish access to every mountain area. Restricted zones, protected areas and climbing objectives can require additional permissions, registrations or fees.", "Before booking, ask which arrangements the operator will handle, which documents you must supply, and when each item is needed. Avoid assuming that neighbouring valleys follow identical rules."] },
      { id: "documents", title: "Prepare a clear document checklist", paragraphs: ["Use the application authority's current instructions as the source of truth. Your confirmed trip documentation should match the names, dates and route used in your application."], checklist: ["Passport validity and personal details checked against the official requirements.", "Correct visa category for your intended activity.", "Accommodation and itinerary documentation where required.", "Route-specific permit responsibilities and submission deadlines.", "Copies available securely during travel, including offline access."] },
      { id: "timing", title: "Allow time before your departure", paragraphs: ["Discuss paperwork before paying for inflexible flights. Processing can involve several authorities and cannot be guaranteed by a website estimate. We can clarify the documentation linked to your proposed journey; issuing authorities make the final decision."] },
    ],
    sources: [{ label: "Pakistan Online Visa System — official portal", href: "https://visa.nadra.gov.pk/" }],
  },
  {
    slug: "altitude-and-safety", href: "/travel-guide/altitude-and-safety", title: "Plan for altitude before you plan for the summit.", category: "Altitude & preparation", summary: "Understand sleeping elevations, recovery days, communication and insurance before choosing a high mountain route.", readTime: "6 min read", image: HOME_MEDIA.expedition,
    sections: [
      { id: "altitude", title: "Elevation changes the itinerary", paragraphs: ["High-altitude travel needs time for acclimatisation. Fitness alone does not remove the risk of altitude illness. Ask about sleeping elevations, rest days and descent options, rather than judging a route only by its highest point.", "Discuss your medical history and proposed altitude with a qualified travel-health professional before departure. The NHS provides an accessible introduction to altitude illness and when to seek help."] },
      { id: "speak-up", title: "Speak up early", paragraphs: ["Report headache, nausea, dizziness or unusual fatigue to your guide. Do not continue higher when symptoms suggest altitude illness. Severe or worsening symptoms require urgent medical help and a descent decision.", "Keep the plan flexible enough to stop. A planned pass crossing or summit is always secondary to the condition of the people travelling."] },
      { id: "support", title: "Ask what support means on this route", paragraphs: ["Remote valleys and glaciers can be far from roads, reliable phone signal and medical facilities. Ask your operator how the party communicates, who makes turnaround decisions and what the emergency plan covers.", "Confirm insurance for your full route, maximum altitude, planned activities and evacuation arrangements. Read exclusions alongside your own government's current travel advice."] },
      { id: "readiness", title: "Four questions for your planning conversation", paragraphs: ["Your answer helps us suggest a suitable route rather than simply a famous destination."], checklist: ["What are the sleeping elevations and built-in recovery days?", "What comparable walking or climbing have you done recently?", "What communication and evacuation arrangements are confirmed?", "Does your insurance cover the itinerary and current regional advice?"] },
    ],
    sources: [{ label: "NHS — altitude sickness", href: "https://www.nhs.uk/conditions/altitude-sickness/" }, { label: "FCDO — Pakistan travel advice", href: "https://www.gov.uk/foreign-travel-advice/pakistan" }],
  },
  {
    slug: "getting-there", href: "/travel-guide/getting-there", title: "Getting north is part of the journey.", category: "Flights & access", summary: "Plan the connections between Islamabad, the mountain valleys and your trailhead, with room for conditions to change.", readTime: "5 min read", image: HOME_MEDIA.tailor,
    sections: [
      { id: "connections", title: "Work backwards from your route", paragraphs: ["Islamabad is the usual starting point for journeys into Gilgit-Baltistan. The next leg depends on your destination: Hunza is approached through Gilgit, while Baltistan and the Baltoro are approached through Skardu.", "Domestic schedules and available services vary. Confirm the actual connection for your dates before arranging a tight onward itinerary."] },
      { id: "buffer", title: "Give mountain travel some breathing room", paragraphs: ["Weather can disrupt flights, and long road journeys depend on conditions and access. Allow buffer between returning from the mountains and your international flight home.", "A road alternative must be reviewed for its specific route, current advisories and realistic driving time. It is a planning decision, not an automatic guarantee that every itinerary can be preserved."] },
      { id: "regional-advice", title: "Check the whole route, not only the destination", paragraphs: ["Regional travel advice may differ between a mountain valley and the roads used to reach it. Review your own government's current advice and ask the team which transit corridors are being considered.", "Some advisories cover parts of the Karakoram Highway and routes towards Swat and the Kalash valleys. Access plans should be confirmed against current conditions before booking."] },
      { id: "arrival-list", title: "Keep the first day simple", paragraphs: ["Arrival works better with a clear meeting point and essentials close to hand."], checklist: ["Confirm airport, arrival time and transfer arrangements.", "Keep medication, documents and essential clothing in hand luggage.", "Have an offline copy of your itinerary and contact details.", "Allow recovery time before a long drive or a higher sleeping altitude."] },
    ],
    sources: [{ label: "FCDO — Pakistan travel advice and regional risks", href: "https://www.gov.uk/foreign-travel-advice/pakistan" }],
  },
  {
    slug: "packing", href: "/travel-guide/packing", title: "Pack for the route you are actually taking.", category: "Packing & gear", summary: "A practical starting point for valley journeys and camping treks, with equipment requirements confirmed for your route.", readTime: "5 min read", image: HOME_MEDIA.trek,
    sections: [
      { id: "layers", title: "Start with a flexible layering system", paragraphs: ["Choose clothing that can adapt from warm travel days to cool evenings and sudden weather changes. Comfortable walking shoes, sun protection and a weatherproof outer layer are useful across many valley itineraries.", "Camping at altitude needs a route-specific sleeping system and additional insulation. Confirm the equipment list and expected conditions rather than borrowing a checklist for a different mountain range."] },
      { id: "footwear", title: "Bring footwear you already trust", paragraphs: ["For a multi-day trek, use footwear suited to the terrain and already worn on comparable walks. Rocky moraine, wet crossings and a technical snow pass have different requirements.", "Crampons, harnesses and rope equipment are specific to the route and your skills. Ask which items are needed, what is supplied and whether any rental arrangement is confirmed."] },
      { id: "essentials", title: "Keep essentials independent of your main bag", paragraphs: ["Carry the items you need for the day and anything difficult to replace."], checklist: ["Passport, insurance details and offline journey documents.", "Personal medication and a day supply of essential items.", "Sun hat, sunglasses, sunscreen and refillable water bottles.", "Head torch, batteries and practical charging arrangements.", "A small day pack with weather protection and warm layers."] },
      { id: "final-list", title: "Confirm the final list with your proposal", paragraphs: ["Before departure, settle luggage limits, porter or vehicle allowances, sleeping arrangements and shared equipment. This prevents both unnecessary purchases and missing essentials."] },
    ],
  },
];

export function getPlanningArticle(slug: string) {
  return planningArticles.find((article) => article.slug === slug);
}
