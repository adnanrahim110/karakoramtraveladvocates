import { HOME_MEDIA, type HomeMediaAsset } from "@/lib/data/home-media";
import { TRAVEL_MEDIA } from "@/lib/data/travel-media";

export { travelMediaAssets } from "@/lib/data/travel-media";

export type JourneyKind = "trek" | "tour" | "expedition";
export type JourneyDifficulty = "Easy" | "Moderate" | "Challenging" | "Technical";

export interface TravelJourney {
  slug: string;
  href: string;
  kind: JourneyKind;
  title: string;
  region: string;
  durationDays: number;
  maxAltitude: number;
  distanceKm?: number;
  season: string;
  difficulty: JourneyDifficulty;
  groupSize: string;
  summary: string;
  image: HomeMediaAsset;
  highlights: string[];
  overview: string[];
  suitability: string[];
  considerations: string[];
  itinerary: { days: string; title: string; description: string }[];
  included: string[];
  excluded: string[];
  practical: { label: string; description: string }[];
  accessNotice?: { title: string; description: string; sourceUrl: string; sourceLabel: string };
}

const trekScope = {
  included: ["A route and acclimatization plan", "Guide, camp and transport arrangements specified in your quote", "Permit and documentation guidance for the agreed route"],
  excluded: ["International flights unless explicitly quoted", "Personal equipment and travel insurance", "Extra nights or itinerary changes outside the agreed plan"],
};

const tourScope = {
  included: ["A private route designed around your interests", "Accommodation, guide and transport options itemized in your quote", "A practical arrival plan and agreed sightseeing programme"],
  excluded: ["International flights unless explicitly quoted", "Travel insurance and personal purchases", "Optional activities and upgrades outside the agreed programme"],
};

const mountainPractical = [
  { label: "Permits & visa", description: "Visa and permit requirements depend on your nationality and exact route. Confirm the documentation and lead time before buying non-refundable flights." },
  { label: "Arrival & contingency", description: "Mountain flights and roads can be disrupted by weather. The final itinerary should allow a practical alternative and time before your international return." },
  { label: "Altitude & insurance", description: "Ask your insurer to confirm cover for the activity, maximum altitude and evacuation. Discuss high-altitude travel with a qualified clinician before departure." },
  { label: "Your final quote", description: "Travel dates, group size, camp or room arrangements and transport all affect the cost. We confirm a written itinerary and inclusions before a booking decision." },
];

const valleyPractical = [
  { label: "Getting there", description: "Your journey can be planned from Islamabad or an agreed arrival point in the north. Domestic flight schedules and road conditions should be checked for your dates." },
  { label: "Pace & accommodation", description: "Walking, driving time and accommodation can be adjusted to your group. Tell us about mobility requirements or preferences when you inquire." },
  { label: "Culture & photography", description: "Ask before photographing people, follow local guidance at religious sites and dress considerately in villages. Festival visits depend on the community and current arrangements." },
  { label: "Your final quote", description: "The confirmed proposal sets out room arrangements, transport, meals, entrance fees and optional activities so you can compare the full cost." },
];

export const travelJourneys: TravelJourney[] = [
  {
    slug: "k2-base-camp-trek", href: "/treks/k2-base-camp-trek", kind: "trek",
    title: "K2 Base Camp & Concordia", region: "Baltoro, Baltistan", durationDays: 21, maxAltitude: 5150,
    season: "June–September", difficulty: "Challenging", groupSize: "Private or a group by arrangement",
    summary: "Follow the Baltoro into an amphitheatre of giant peaks, with time for acclimatization and the walk beneath K2.",
    image: HOME_MEDIA.expedition,
    highlights: ["The granite walls of Trango and Cathedral peaks", "Concordia and the meeting of the glaciers", "An optional K2 Base Camp excursion, subject to conditions", "Balti villages and the approach through Shigar"],
    overview: ["This is a sustained journey through the heart of the Karakoram. The approach moves from the villages of Baltistan into a landscape of glacier, moraine and immense mountain faces.", "Concordia is the centrepiece. Rather than treat it as a checkpoint, the outline allows time to settle into the altitude and decide with your guide whether the additional walk toward K2 Base Camp is appropriate."],
    suitability: ["Experienced walkers comfortable with consecutive long days on rough ground", "Travelers prepared for remote camping and changing weather", "People who can keep their itinerary flexible around mountain conditions"],
    considerations: ["Moraine walking is tiring even where the distance looks modest.", "There are no hotel facilities on the glacier, and evacuation can be complicated.", "Reaching base camp depends on conditions, acclimatization and the group's wellbeing."],
    itinerary: [
      { days: "1–3", title: "Arrival, Skardu & preparations", description: "Meet in Islamabad, travel toward Skardu and complete the route briefing and preparations. Keep the overland alternative available if mountain flights are disrupted." },
      { days: "4–7", title: "The Braldu approach", description: "Continue toward Askole and begin the walk to the early trail camps. An acclimatization pause helps prepare for the transition onto the Baltoro." },
      { days: "8–11", title: "Along the Baltoro", description: "Move progressively through the glacier camps, with the Trango Towers and surrounding peaks defining the horizon." },
      { days: "12–14", title: "Concordia & K2", description: "Reach Concordia, rest and assess an excursion toward K2 Base Camp with your guide. The route is adapted to the group's condition and the weather." },
      { days: "15–18", title: "Retrace the glacier", description: "Descend through familiar camps at a measured pace and return to the trailhead for the drive to Skardu." },
      { days: "19–21", title: "Return with room to spare", description: "Travel back toward Islamabad, keeping the remaining time available for delays before your international departure." },
    ],
    ...trekScope, practical: mountainPractical,
  },
  {
    slug: "gondogoro-la", href: "/treks/gondogoro-la", kind: "trek",
    title: "Gondogoro La & the Hushe Valley", region: "Baltoro & Hushe, Baltistan", durationDays: 21, maxAltitude: 5585,
    season: "June–August", difficulty: "Technical", groupSize: "Group composition agreed after experience review",
    summary: "A committing extension of the Baltoro journey: cross a glaciated high pass and descend into the Hushe valley.",
    image: HOME_MEDIA.trek,
    highlights: ["The full Baltoro approach to Concordia", "A high-pass crossing above the glacier systems", "A descent toward the peaks surrounding Hushe", "A traverse with a different route home"],
    overview: ["Gondogoro La changes the character of the trek. The approach shares the Baltoro's landscapes, but the pass adds steep snow or ice, an early start and the need to move confidently with mountaineering equipment.", "The crossing is a decision made on the ground. If snow, weather or the team's condition does not support it, returning along the Baltoro is the appropriate alternative."],
    suitability: ["Trekkers with previous altitude experience", "People confident using crampons and following fixed-rope instructions", "Groups willing to accept a changed route when the pass is unsuitable"],
    considerations: ["This is more technical than the K2 Base Camp route.", "Pass access, fixed ropes and snow conditions vary each season.", "A traverse cannot be guaranteed in advance."],
    itinerary: [
      { days: "1–4", title: "Arrive & reach the trailhead", description: "Travel through Islamabad and Skardu, review equipment and continue toward the Baltoro approach." },
      { days: "5–11", title: "Build toward Concordia", description: "Progress through the glacier camps with acclimatization built into the approach." },
      { days: "12–14", title: "Rest, assess & prepare", description: "Spend time at Concordia and prepare for the high-pass leg only if conditions and group readiness support it." },
      { days: "15–16", title: "The pass decision", description: "Approach the pass and attempt the crossing with specialist support, or take the agreed Baltoro return alternative." },
      { days: "17–21", title: "Hushe & the journey home", description: "Descend toward Hushe if the crossing is completed, return to Skardu and retain contingency time before onward travel." },
    ],
    ...trekScope, practical: mountainPractical,
  },
  {
    slug: "snow-lake-hispar-la-trek", href: "/treks/snow-lake-hispar-la-trek", kind: "trek",
    title: "Snow Lake & the Biafo–Hispar Traverse", region: "Central Karakoram", durationDays: 21, maxAltitude: 5150,
    season: "June–August", difficulty: "Technical", groupSize: "Small group after an experience review",
    summary: "A remote glacier journey through the great Snow Lake basin, linking Baltistan with the Hispar valley when conditions allow.",
    image: HOME_MEDIA.snowLake,
    highlights: ["The scale and quiet of the Biafo Glacier", "The open snow basin of Lukpe Lawo", "The Hispar La watershed", "A route connecting two very different valleys"],
    overview: ["Snow Lake asks for time, patience and comfort with real remoteness. The Biafo approach leads toward a broad snow basin framed by peaks, far from the facilities of a village or mountain hut.", "Glacier travel, crevasses and weather make local judgement central to the plan. The full traverse is an objective to assess, with alternatives discussed before departure."],
    suitability: ["Experienced multi-day trekkers with previous high-altitude camping", "People comfortable with roped glacier travel", "Travelers drawn to remoteness more than a fixed checklist"],
    considerations: ["Daily progress depends on glacier and snow conditions.", "Communications and evacuation options are limited.", "This route demands a more flexible schedule than a valley tour."],
    itinerary: [
      { days: "1–4", title: "Baltistan & the approach", description: "Arrive, complete preparations in Skardu and continue toward the Braldu trailhead." },
      { days: "5–11", title: "The Biafo Glacier", description: "Advance through successive camps, adapting distance and rest to the surface conditions and the group's acclimatization." },
      { days: "12–14", title: "Snow Lake & Hispar La", description: "Explore the upper basin and assess the crossing with the guide team. Extra time here serves acclimatization and weather decisions." },
      { days: "15–18", title: "The Hispar descent", description: "If the traverse is viable, descend through the Hispar glacier system toward the valley. Otherwise follow the agreed return plan." },
      { days: "19–21", title: "Valley recovery & return", description: "Return to settled accommodation and travel toward the agreed end point with contingency time available." },
    ],
    ...trekScope, practical: mountainPractical,
  },
  {
    slug: "rakaposhi-base-camp", href: "/treks/rakaposhi-base-camp", kind: "trek",
    title: "Rakaposhi Base Camp", region: "Nagar Valley", durationDays: 5, maxAltitude: 3500,
    season: "May–October", difficulty: "Moderate", groupSize: "Private or a group by arrangement",
    summary: "From Minapin's village paths to the meadow at Tagaphari, with Rakaposhi's ice-covered face filling the skyline.",
    image: TRAVEL_MEDIA.rakaposhi,
    highlights: ["Village life in Minapin", "Forest and pasture on the ascent", "The Rakaposhi–Diran mountain landscape", "A short trek that pairs naturally with Hunza"],
    overview: ["This route makes a rewarding introduction to multi-day walking in the Karakoram. The climb gains height quickly, but the schedule can leave room for a steady approach and an unhurried day around the upper meadow.", "Five days describes the northern route outline. Transfers from Islamabad, extra rest nights or a Hunza extension can be added to the proposal."],
    suitability: ["Regular walkers ready for an uphill mountain trail", "People trying their first multi-night mountain camp", "Travelers combining a short trek with a valley journey"],
    considerations: ["Moderate still means sustained uphill walking.", "Upper camps can be cold even during the valley's warm season.", "The standard meadow route does not imply a glacier crossing."],
    itinerary: [
      { days: "1", title: "Minapin & a route briefing", description: "Reach Minapin, settle into the village and review the trail, camp plan and equipment." },
      { days: "2", title: "Into the forest & pasture", description: "Climb steadily toward an intermediate camp, with breaks and walking pace adjusted to the group." },
      { days: "3", title: "Tagaphari meadow", description: "Continue to the upper meadow and spend the afternoon taking in the mountain views without adding unnecessary elevation." },
      { days: "4", title: "A mountain morning & descent", description: "Enjoy the early light before descending at a controlled pace toward the village." },
      { days: "5", title: "Continue your northern journey", description: "Return to the agreed departure point or continue into Hunza with an optional extension." },
    ],
    ...trekScope, practical: mountainPractical,
  },
  {
    slug: "fairy-meadows-nanga-parbat", href: "/treks/fairy-meadows-nanga-parbat", kind: "trek",
    title: "Fairy Meadows & Nanga Parbat", region: "Raikot Valley", durationDays: 6, maxAltitude: 3900,
    season: "May–October", difficulty: "Moderate", groupSize: "Private or a group by arrangement",
    summary: "Pine forest, open meadows and the Raikot face of Nanga Parbat, with optional walking beyond Beyal.",
    image: HOME_MEDIA.fairyMeadows,
    highlights: ["The forest trail above the Raikot valley", "Mountain mornings at Fairy Meadows", "A quieter walk toward Beyal", "Views toward the Raikot Glacier and Nanga Parbat"],
    overview: ["Fairy Meadows combines a mountain setting with a shorter walking commitment than a long glacier trek. Staying more than a single night gives the place room to breathe and creates options for day walks.", "The jeep access is a significant part of the experience. We discuss the road, your comfort with it and the appropriate level of walking before choosing a final programme."],
    suitability: ["Walkers who want a mountain stay rather than a long traverse", "Travelers comfortable with steep road access", "People happy to treat further walking as an option"],
    considerations: ["The approach road is narrow and can be uncomfortable for some travelers.", "Fairy Meadows can be busy during peak holiday periods.", "A base-camp walk is longer and more demanding than the stay in the meadows."],
    itinerary: [
      { days: "1–2", title: "Reach the Raikot valley", description: "Travel toward Raikot, take the locally arranged mountain-road transfer and walk to the meadow accommodation." },
      { days: "3", title: "Settle into the mountain setting", description: "Take an easy day around the meadows and discuss the next walk with your guide." },
      { days: "4", title: "Beyal & optional further walking", description: "Walk through the forest toward Beyal. Continue toward the viewpoint or base-camp area only if conditions and fitness are appropriate." },
      { days: "5–6", title: "Descend & continue", description: "Walk back to the road access and return toward your agreed end point, allowing time for the onward transfer." },
    ],
    ...trekScope, practical: mountainPractical,
  },
  {
    slug: "rupal-valley", href: "/treks/rupal-valley", kind: "trek",
    title: "Rupal Valley & Nanga Parbat's South Face", region: "Astore Valley", durationDays: 7, maxAltitude: 3650,
    season: "June–September", difficulty: "Moderate", groupSize: "Private or a group by arrangement",
    summary: "Approach Nanga Parbat from the Astore side through villages, pastures and camps beneath the Rupal face.",
    image: TRAVEL_MEDIA.rupal,
    highlights: ["Tarashing and the villages of the Rupal valley", "Pastures beneath Nanga Parbat's south side", "A different perspective from the Raikot route", "Time in Astore away from the main Hunza corridor"],
    overview: ["Rupal offers another way to meet Nanga Parbat. The route begins with the lived-in landscape around Tarashing before moving into a valley dominated by the mountain's south face.", "The outline is about walking and camping beneath the mountain. It does not involve climbing Nanga Parbat, and the exact camp locations are confirmed with local conditions."],
    suitability: ["Regular hikers interested in a less familiar Nanga Parbat approach", "Travelers comfortable with basic camps", "People combining mountain walking with an Astore visit"],
    considerations: ["Road access and stream crossings can change with weather.", "Walking stages and camps need local assessment.", "Services are simpler than in the main Hunza and Skardu towns."],
    itinerary: [
      { days: "1–2", title: "Astore & Tarashing", description: "Travel into Astore and onward to Tarashing, reviewing the camp plan and current access conditions." },
      { days: "3–4", title: "Walk into Rupal", description: "Move through villages and pasture toward the planned camps, gaining height gradually." },
      { days: "5", title: "A day beneath the south face", description: "Use the day for a local walk and mountain views, with the objective chosen around weather and trail conditions." },
      { days: "6–7", title: "Return through Astore", description: "Descend toward Tarashing and travel back to the agreed end point." },
    ],
    ...trekScope, practical: mountainPractical,
  },
  {
    slug: "hunza-valley-private-journey", href: "/tours/hunza-valley-private-journey", kind: "tour",
    title: "Hunza, Orchards & Old Forts", region: "Hunza & Nagar", durationDays: 10, maxAltitude: 2900,
    season: "April–October", difficulty: "Easy", groupSize: "Private, tailored to your group",
    summary: "A slower valley journey with village walks, the forts of Altit and Baltit, orchard landscapes and space for an unscheduled day.",
    image: HOME_MEDIA.hunza,
    highlights: ["Altit and Baltit's heritage", "Village paths and orchard landscapes", "Mountain views around Karimabad", "Time for food, photography and unhurried exploration"],
    overview: ["Hunza rewards a slower visit. Rather than string every viewpoint together, this outline leaves room for walking through a village, sitting over a meal and returning to a landscape at a different time of day.", "The route stays around the main valley. Higher excursions, longer walks or a separate Upper Hunza extension can be discussed when you share your interests."],
    suitability: ["Couples, families and travelers who prefer a flexible private pace", "People interested in heritage, landscape and everyday life", "Photographers wanting time beyond a roadside stop"],
    considerations: ["Fort opening times and local arrangements should be confirmed.", "Some village walks include uneven steps and slopes.", "A private route can still involve long arrival journeys."],
    itinerary: [
      { days: "1–2", title: "Travel north & settle in", description: "Arrive through the agreed airport or road route and settle into accommodation near Karimabad." },
      { days: "3–4", title: "Forts, villages & gardens", description: "Explore Altit, Baltit and surrounding lanes at a comfortable pace, with local interests shaping the order." },
      { days: "5–6", title: "Valley walks & mountain views", description: "Choose suitable short walks and viewpoints, with time for a Nagar visit or a relaxed afternoon." },
      { days: "7–8", title: "Your interests, your pace", description: "Leave room for photography, local food, a lake excursion or a free day before the journey home." },
      { days: "9–10", title: "Return with flexibility", description: "Travel toward the agreed departure city, retaining contingency time for the return connection." },
    ],
    ...tourScope, practical: valleyPractical,
  },
  {
    slug: "passu-khunjerab", href: "/tours/passu-khunjerab", kind: "tour",
    title: "Passu & the Upper Hunza Road", region: "Gojal & Upper Hunza", durationDays: 8, maxAltitude: 4693,
    season: "May–October", difficulty: "Easy", groupSize: "Private, tailored to your group",
    summary: "Follow the Karakoram Highway past Attabad Lake and the Passu Cones, with a possible high-country excursion toward Khunjerab.",
    image: HOME_MEDIA.tailor,
    highlights: ["Attabad Lake and the villages of Gojal", "The Passu Cones and glacier viewpoints", "Wakhi cultural landscapes", "A high-road excursion if access and conditions allow"],
    overview: ["Upper Hunza is a journey along a remarkable road, but the villages beside it deserve more than a passing glance. This outline balances road travel with gentle walks and time around Gulmit and Passu.", "Khunjerab is an optional excursion that reaches substantial altitude. Its inclusion depends on current access, weather and whether the journey suits your group."],
    suitability: ["Travelers who enjoy landscape journeys and short walks", "People wanting a focused Upper Hunza visit", "Groups comfortable discussing high-altitude day-trip suitability"],
    considerations: ["Easy describes the walking, rather than the altitude of every excursion.", "Border-area and national-park access can change.", "A Patundas trek is a separate, more demanding extension."],
    itinerary: [
      { days: "1–2", title: "Arrive & follow the lake road", description: "Travel through Hunza toward Attabad and Gojal, keeping the first days paced around the arrival journey." },
      { days: "3–4", title: "Gulmit & Passu", description: "Explore village paths, lake views and suitable glacier viewpoints with a flexible local programme." },
      { days: "5", title: "The high-road option", description: "Travel toward Khunjerab only when access, weather and the group's needs support the excursion." },
      { days: "6", title: "A day to linger", description: "Return to a favourite view, take a gentle walk or leave the day open for local interests." },
      { days: "7–8", title: "Return through Hunza", description: "Travel back toward the agreed departure point with time for connection changes." },
    ],
    ...tourScope, practical: valleyPractical,
  },
  {
    slug: "skardu-shigar-signature-tour", href: "/tours/skardu-shigar-signature-tour", kind: "tour",
    title: "Skardu, Shigar & the Deosai Plains", region: "Baltistan", durationDays: 9, maxAltitude: 4100,
    season: "June–September for Deosai", difficulty: "Easy", groupSize: "Private, tailored to your group",
    summary: "Link lakes and fort landscapes with a seasonal journey onto Deosai, allowing time for Baltistan beyond the main road.",
    image: HOME_MEDIA.skardu,
    highlights: ["Skardu's lakes and wide valley landscapes", "The heritage of Shigar", "The open Deosai plateau in its accessible season", "A mix of gentle walks and road travel"],
    overview: ["This route brings together several sides of Baltistan: settled valleys, lakes, historic architecture and the wide high-country landscape of Deosai.", "The plateau is seasonal and much higher than Skardu. When its roads are inaccessible or the excursion is unsuitable, a valley-focused version offers an appealing alternative."],
    suitability: ["Travelers who want a varied Baltistan introduction", "Groups preferring road access with optional easy walks", "People happy to adjust a plateau day around conditions"],
    considerations: ["Deosai access depends on seasonal snow and road conditions.", "A road-accessible plateau still presents altitude considerations.", "Domestic flight changes can affect the arrival and return plan."],
    itinerary: [
      { days: "1–2", title: "Arrive in Baltistan", description: "Reach Skardu and settle into the valley, keeping the first programme adaptable around the arrival route." },
      { days: "3–4", title: "Lakes & Shigar", description: "Spend time around the lakes and Shigar's heritage, with walking and visits chosen for your interests." },
      { days: "5–6", title: "The Deosai option", description: "Travel onto the plateau if the season and conditions allow. Confirm the pace, return route and any camp arrangements beforehand." },
      { days: "7", title: "A valley day", description: "Keep time for a local visit or a quieter day in Baltistan before returning." },
      { days: "8–9", title: "Return & contingency", description: "Travel toward Islamabad or the agreed end point, allowing flexibility around mountain transport." },
    ],
    ...tourScope, practical: valleyPractical,
  },
  {
    slug: "kalash-swat", href: "/tours/kalash-swat", kind: "tour",
    title: "Kalash Valleys & Swat", region: "Chitral & Swat", durationDays: 12, maxAltitude: 2500,
    season: "May–October", difficulty: "Easy", groupSize: "Private, tailored to your group",
    summary: "A cultural route through the northwest, shaped around community visits, mountain valleys and the heritage of Swat.",
    image: TRAVEL_MEDIA.kalash,
    accessNotice: {
      title: "Regional travel advice requires review",
      description: "Current UK FCDO advice warns against all travel to Swat and parts of the Kalash access route. This is a cultural route outline, not a currently confirmed departure. Review your own government's advice and discuss alternatives before making travel plans.",
      sourceUrl: "https://www.gov.uk/foreign-travel-advice/pakistan",
      sourceLabel: "Read current FCDO Pakistan travel advice",
    },
    highlights: ["The valleys and cultural landscapes around Chitral", "Respectful visits to Kalash communities", "Swat's Buddhist heritage and settled valleys", "A route centred on context rather than a checklist"],
    overview: ["This journey looks beyond the main Gilgit-Baltistan corridor. Chitral, the Kalash valleys and Swat bring different landscapes, languages and histories into one cultural route.", "Community access and regional conditions matter to the programme. Festival visits are arranged only around current local guidance, with respect for ceremonies and the people hosting them."],
    suitability: ["Travelers with a strong interest in cultural context", "Groups comfortable with longer road journeys", "People willing to follow local advice on visits and photography"],
    considerations: ["Security advice and route access must be reviewed for your dates.", "Festival attendance and community visits cannot be assumed.", "Driving days may be longer than those of a single-valley itinerary."],
    itinerary: [
      { days: "1–3", title: "Travel toward Chitral", description: "Arrive and follow the agreed route toward Chitral, with appropriate overnight stops and current access checks." },
      { days: "4–6", title: "The Kalash valleys", description: "Spend time in the valleys with locally appropriate visits, walks and an introduction to the region's cultural setting." },
      { days: "7–9", title: "Continue into Swat", description: "Travel onward and choose heritage visits and valley walks around your interests and local guidance." },
      { days: "10–12", title: "A measured return", description: "Return toward the agreed departure point, keeping time for rest and the practical demands of road travel." },
    ],
    ...tourScope, practical: valleyPractical,
  },
  {
    slug: "spantik-peak-expedition", href: "/expeditions/spantik-peak-expedition", kind: "expedition",
    title: "Spantik / Golden Peak", region: "Shigar & Chogo Lungma", durationDays: 30, maxAltitude: 7027,
    season: "June–August", difficulty: "Technical", groupSize: "Application and experience review required",
    summary: "An expedition objective above the Chogo Lungma Glacier, planned around approach, acclimatization rotations and a weather-dependent summit window.",
    image: HOME_MEDIA.spantik,
    highlights: ["The Chogo Lungma approach", "A base-camp setting in the central Karakoram", "Acclimatization rotations on the proposed route", "A climbing plan shaped around conditions and experience"],
    overview: ["Spantik is a mountaineering objective, not an extension of an ordinary trek. Altitude, snow conditions and glacier travel require a climbing background and a carefully agreed support plan.", "An inquiry begins with your experience, proposed dates and insurance. The final expedition proposal defines the guiding arrangement, equipment responsibilities, permit scope and decision-making process."],
    suitability: ["Climbers with previous altitude and glacier experience", "Applicants confident with crampons, ropes and expedition camping", "People who understand that a summit remains a conditional objective"],
    considerations: ["No summit attempt or success is guaranteed.", "Support levels and equipment responsibilities must be agreed in writing.", "Altitude illness, weather and snow hazards may change the plan."],
    itinerary: [
      { days: "1–5", title: "Arrival & expedition preparations", description: "Meet, travel toward Skardu and complete the agreed documentation, equipment checks and logistics." },
      { days: "6–10", title: "The approach to base camp", description: "Travel toward the trailhead and approach through the Chogo Lungma valley and glacier system." },
      { days: "11–23", title: "Rotations & a summit window", description: "Build acclimatization and assess the route progressively. Any higher movement is determined by conditions and team readiness." },
      { days: "24–30", title: "Descent, return & contingency", description: "Descend, clear camps according to the agreed responsibilities and return with flexibility for delays." },
    ],
    ...trekScope, practical: mountainPractical,
  },
  {
    slug: "k2-expedition", href: "/expeditions/k2-expedition", kind: "expedition",
    title: "K2 Expedition Planning", region: "Baltoro, Baltistan", durationDays: 60, maxAltitude: 8611,
    season: "June–August", difficulty: "Technical", groupSize: "Individual assessment before any proposal",
    summary: "A serious high-altitude objective that starts with a detailed conversation about experience, support, risk and expedition responsibilities.",
    image: HOME_MEDIA.expedition,
    highlights: ["A tailored assessment of your climbing background", "A defined expedition support and equipment scope", "An approach and acclimatization framework", "Clear responsibilities before committing to the objective"],
    overview: ["K2 involves extreme altitude and substantial objective hazards. This page introduces the planning conversation; it is not an instant-bookable climbing package.", "Any proposal must be based on a detailed experience review and verified operational arrangements. The duration is an indicative expedition allowance, while higher-camp plans and objectives are decided by the responsible climbing team."],
    suitability: ["Highly experienced high-altitude mountaineers", "Applicants with a detailed climbing history and relevant technical experience", "People prepared for conservative decisions and the possibility of no summit attempt"],
    considerations: ["K2 carries serious risks that cannot be removed by a support package.", "Insurance must explicitly cover the activity and maximum altitude.", "Route, weather, health and team decisions take precedence over a timetable."],
    itinerary: [
      { days: "1–12", title: "Arrival & the Baltoro approach", description: "Complete preparations and approach base camp through the Baltoro corridor with an agreed acclimatization plan." },
      { days: "13–45", title: "Assessment & climbing rotations", description: "The responsible climbing team assesses conditions, establishes its support plan and determines appropriate rotations and rest." },
      { days: "46–50", title: "Conditional objective window", description: "A higher objective is considered only if the conditions, team readiness and responsible leaders support it." },
      { days: "51–60", title: "Descent & return allowance", description: "Return from the mountain, complete camp and logistics responsibilities and retain flexibility for onward travel." },
    ],
    ...trekScope, practical: mountainPractical,
  },
];

export const journeyKindLabels: Record<JourneyKind, string> = {
  trek: "Treks", tour: "Private tours", expedition: "Expeditions",
};

export const journeyKindPaths: Record<JourneyKind, string> = {
  trek: "/treks", tour: "/tours", expedition: "/expeditions",
};

export function journeysByKind(kind: JourneyKind): TravelJourney[] {
  return travelJourneys.filter((journey) => journey.kind === kind);
}

export function getTravelJourney(kind: JourneyKind, slug: string): TravelJourney | undefined {
  return travelJourneys.find((journey) => journey.kind === kind && journey.slug === slug);
}
