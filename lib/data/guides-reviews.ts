import type { GuideProfile, GuestReview } from "@/lib/types/cms";

export const GUIDES: GuideProfile[] = [
  {
    id: "guide-karim-hunzai",
    name: "Karim Ullah Baig",
    slug: "karim-ullah-baig",
    urlPath: "/our-guides/karim-ullah-baig",
    roleTitle: "Director of Treks & Cultural Journeys",
    homeRegion: "Karimabad & Shimshal, Hunza Valley",
    languages: ["English", "Burushaski", "Wakhi", "Urdu"],
    yearsExperience: 16,
    portraitSrc: "/imgs/moodboard/scene-13.png",
    portraitAlt: "Mountain guide standing on an alpine ridge in the Karakoram",
    bio: "Born in Hunza and raised between Karimabad and Shimshal, Karim has led over 65 international trekking and private cultural journeys across the Baltoro, Biafo–Hispar, and Upper Gojal corridors.",
    specialties: ["High-Pass Glacier Logistics", "Wakhi & Burusho Architectural History", "Wilderness First Responder (WFR) Protocols"],
    qualifications: [
      "Licensed Department of Tourist Services (DTS) Senior Mountain Guide",
      "Wilderness First Responder (80-Hour Certification, Renewed 2025)",
      "Central Karakoram National Park (CKNP) Certified Environmental Leader",
    ],
    notableRoutes: ["K2 Base Camp & Gondogoro La (28 crossings)", "Snow Lake & Hispar La Traverse (11 crossings)", "Shimshal Pamir & Minglik Sar"],
    safetyPhilosophy: "Altitude respects patience. We build extra acclimatization margins into every itinerary and monitor every guest twice daily.",
    favoriteJourney: "Snow Lake & Hispar La Traverse in mid-July when the Biafo ice highway meets the orchards of Nagar.",
  },
  {
    id: "guide-ali-sadpara-jr",
    name: "Fida Hussain Balti",
    slug: "fida-hussain-balti",
    urlPath: "/our-guides/fida-hussain-balti",
    roleTitle: "Head of Mountaineering & 7000m/8000m Operations",
    homeRegion: "Shigar & Sadpara Valley, Baltistan",
    languages: ["English", "Balti", "Urdu"],
    yearsExperience: 19,
    portraitSrc: "/imgs/moodboard/scene-08.png",
    portraitAlt: "High-altitude Karakoram mountaineering leader overlooking snow peaks",
    bio: "A veteran of the Baltoro and Chogo Lungma ranges, Fida oversees technical climbing screening, high-camp rope fixing, and satellite meteorology for our 6,000m to 8,000m expeditions.",
    specialties: ["7000m & 8000m Expedition Logistics", "Glacier Crevasse Rescue & Fixed-Line Systems", "Base Camp Risk & Weather Management"],
    qualifications: [
      "Alpine Club of Pakistan High-Altitude Mountaineering Instructor",
      "Summits on Broad Peak (8,051m), Gasherbrum II (8,035m), and Spantik (7,027m x 9)",
      "High-Altitude Medical & Hyperbaric Chamber Operations Lead",
    ],
    notableRoutes: ["Spantik Southeast Ridge", "Broad Peak West Spur", "K2 Abruzzi Spur Logistics", "Laila Peak Northwest Face Approach"],
    safetyPhilosophy: "The summit is halfway. Every expedition member agrees to objective turnaround times, weather cutoffs, and honest readiness screening before leaving Skardu.",
    favoriteJourney: "Spantik (7,027m)—watching climbers achieve their first 7,000-meter summit with dawn light hitting K2 and Nanga Parbat.",
  },
  {
    id: "guide-samina-baig-lead",
    name: "Zehra Noor Wakhi",
    slug: "zehra-noor-wakhi",
    urlPath: "/our-guides/zehra-noor-wakhi",
    roleTitle: "Senior Cultural Curator & Women's Travel Lead",
    homeRegion: "Gulmit, Upper Hunza (Gojal)",
    languages: ["English", "Wakhi", "Urdu", "German (Conversational)"],
    yearsExperience: 11,
    portraitSrc: "/imgs/moodboard/scene-12.png",
    portraitAlt: "Alpine landscape in Upper Hunza where cultural journeys take place",
    bio: "An architectural heritage researcher and mountain trek leader from Gojal, Zehra designs our bespoke private tours, photography itineraries, and women-led trekking departures across Gilgit-Baltistan.",
    specialties: ["Heritage Fort & Palace History", "Women & Solo Traveler Advisories", "Community Artisan & Culinary Access"],
    qualifications: [
      "M.Phil. Cultural Heritage & Sustainable Tourism",
      "Certified DTS Cultural & Trekking Guide (Gilgit-Baltistan)",
      "Leave No Trace (LNT) Master Educator",
    ],
    notableRoutes: ["Hunza, Passu & Khunjerab Private Odyssey", "Skardu, Shigar & Khaplu Royal Heritage Route", "Patundas & Batura Meadows Trek"],
    safetyPhilosophy: "True comfort in the mountains comes from clarity—knowing your driver, your guide, the road conditions ahead, and how to engage respectfully with every village.",
    favoriteJourney: "Autumn in Upper Hunza and Khaplu when the poplar trees turn gold against 7,000-meter granite walls.",
  },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: "rev-claire-uk",
    consentedName: "Claire & David Thornton",
    travelerCountry: "United Kingdom",
    travelerType: "Small-Group Trekking",
    journeyId: "journey-k2-bc",
    journeyTitle: "K2 Base Camp & Concordia Classic Trek",
    journeyCategory: "trek",
    travelDate: "July 2026",
    quote:
      "Nothing prepares you for your first view of K2 from Concordia, but what stood out even more was the calm, clockwork professionalism of Karim and the Balti camp crew.",
    storyExcerpt:
      "When our inbound flight to Skardu was delayed by clouds, the team seamlessly activated their 4x4 contingency plan without a moment of stress. On the Baltoro, our oxygen saturation was checked every evening, the meals were extraordinary, and every porter was properly equipped and respected.",
    routeContext: "20-Day Baltoro & Concordia Circuit (Max Altitude: 5,150m)",
    verifiedContext: "Verified Past Guests • Consented Story & Itinerary Reference #KT-2026-108",
  },
  {
    id: "rev-elena-us",
    consentedName: "Dr. Elena Rostova",
    travelerCountry: "United States",
    travelerType: "Private Tailored Tour",
    journeyId: "journey-hunza-private",
    journeyTitle: "Hunza, Passu & Skardu Private Cultural Odyssey",
    journeyCategory: "tour",
    travelDate: "October 2026",
    quote:
      "Traveling through Hunza and Shigar felt deeply personal—never packaged or touristy. Our guide Zehra opened doors to historians, women weavers, and quiet viewpoints we would never have found alone.",
    storyExcerpt:
      "From the Visa Letter of Invitation before we flew to Islamabad, to sleeping in 400-year-old fort suites and crossing Deosai by private 4x4, every detail matched what was promised.",
    routeContext: "12-Day Custom Hunza, Deosai & Shigar Private Journey",
    verifiedContext: "Verified Past Guest • Consented Story & Itinerary Reference #KT-2026-214",
  },
  {
    id: "rev-markus-ch",
    consentedName: "Markus Weber",
    travelerCountry: "Switzerland",
    travelerType: "7000m Expedition Climber",
    journeyId: "journey-spantik-exp",
    journeyTitle: "Spantik (7,027m) Guided Expedition",
    journeyCategory: "expedition",
    travelDate: "August 2026",
    quote:
      "As an Alpine climber from Zurich, I appreciated that Karakoram didn't just take a credit card online. Fida screened my climbing history, gave honest answers on fixed lines and weather windows, and ran an impeccable Base Camp.",
    storyExcerpt:
      "Our acclimatization schedule to Camp 1 and Camp 2 on the Southeast Ridge was textbook. Five of six team members reached the 7,027m summit safely and descended in full control.",
    routeContext: "28-Day Spantik Southeast Ridge Expedition (7,027m)",
    verifiedContext: "Verified Expedition Member • Reference #KT-2026-089",
  },
];

export const SAFETY_PILLARS = [
  {
    id: "safety-acclimatization",
    title: "Structured Altitude & Acclimatization",
    href: "/safety/altitude-acclimatization",
    metric: "2x Daily SpO2 Checks",
    summary:
      "Gradual ascent profiles adhering to international wilderness medicine guidelines, mandatory rest days at Paiju (3,420m) and Urdukas (4,050m), and portable hyperbaric bags on high-altitude treks.",
  },
  {
    id: "safety-emergency",
    title: "Realistic Emergency & Satellite Comms",
    href: "/safety/emergency-response",
    metric: "Garmin inReach + Thuraya",
    summary:
      "Every remote party carries redundant satellite communication and trauma kits. We explain Askari Aviation helicopter rescue bond protocols honestly—never promising impossible weather-blind evacuations.",
  },
  {
    id: "safety-weather",
    title: "Skardu Flight & KKH Weather Contingencies",
    href: "/safety/weather-contingencies",
    metric: "Built-In Buffer Days",
    summary:
      "Mountain flights to Skardu and Gilgit depend on visual corridor weather. Every itinerary includes clear road-transfer backups via Babusar Pass or the Karakoram Highway.",
  },
  {
    id: "safety-guides",
    title: "Verified Guide Ratios & Readiness Screening",
    href: "/safety/guide-standards",
    metric: "DTS & WFR Trained",
    summary:
      "Licensed Gilgit-Baltistan guides, transparent guide-to-guest ratios, and pre-trip readiness screening for strenuous pass crossings and 6,000m–8,000m climbs.",
  },
];

export const PORTER_COMMITMENTS = [
  {
    title: "Strict 25kg Maximum Load Limit",
    detail: "Every load is weighed at Askole, Hushe, and Minapin trailheads to prevent overloading on glacier and pass approaches.",
  },
  {
    title: "Full Mountain Footwear, Eyewear & Shelter",
    detail: "Porters receive insulated sleeping mats, weatherproof communal shelter tents, polarized glacier glasses, and hot meals alongside the group.",
  },
  {
    title: "Mandatory Accident & Evacuation Insurance",
    detail: "100% of our Balti, Wakhi, and Burusho mountain crew are covered by comprehensive life, medical, and high-altitude evacuation insurance.",
  },
  {
    title: "Direct Local Valley Employment",
    detail: "Over 82% of every trip cost stays directly within Gilgit-Baltistan families, community jeep cooperatives, and heritage lodges.",
  },
];
