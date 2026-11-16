import type { FaqItem, PlanningArticle } from "@/lib/types/cms";

export const PLANNING_ARTICLES: PlanningArticle[] = [
  {
    id: "art-visas",
    title: "Pakistan e-Visa & Letter of Invitation (LOI) Guide for 2026–2027",
    slug: "pakistan-visas",
    urlPath: "/travel-guide/pakistan-visas",
    category: "Visas & Permits",
    readTimeMinutes: 6,
    lastReviewed: "2026-10-20",
    reviewerRole: "Operations & Permit Compliance Lead",
    officialSourceLabel: "NADRA Official Pakistan Online Visa Portal",
    officialSourceUrl: "https://visa.nadra.gov.pk/",
    summary:
      "Step-by-step guidance on Tourist Visa Prior to Arrival (VPA) vs. Trekking & Mountaineering Visa categories, required supporting documents, and how we issue your verified LOI.",
    keyTakeaways: [
      "Always verify current eligibility on the official NADRA portal (visa.nadra.gov.pk).",
      "Trekkers entering restricted zones (Baltoro/Concordia) require a dedicated Trekking Visa or NOC documentation.",
      "Apply at least 4–6 weeks before international departure.",
    ],
    heroImage: "/imgs/moodboard/scene-12.png",
  },
  {
    id: "art-permits",
    title: "Trekking & Mountaineering Permits in Gilgit-Baltistan Explained",
    slug: "trekking-mountaineering-permits",
    urlPath: "/travel-guide/trekking-mountaineering-permits",
    category: "Visas & Permits",
    readTimeMinutes: 8,
    lastReviewed: "2026-10-18",
    reviewerRole: "Head of Mountaineering Operations",
    officialSourceLabel: "Visit Gilgit-Baltistan Official Portal",
    officialSourceUrl: "https://www.visitgilgitbaltistan.gov.pk/",
    summary:
      "Understand the difference between Open Zone treks (Hunza, Fairy Meadows, Rakaposhi) and Restricted Zone treks (K2 Base Camp, Snow Lake, Gondogoro La), plus CKNP fees and briefing rules.",
    keyTakeaways: [
      "Open zone treks require passport registration at checkpoints but no advance ministry dossier.",
      "Restricted zone treks require participant passport/visa copies 35–45 days before departure.",
      "Climbing peaks above 6,500m requires an official Gilgit-Baltistan Mountaineering Royalty Permit.",
    ],
    heroImage: "/imgs/moodboard/scene-03.png",
  },
  {
    id: "art-best-season",
    title: "Best Time to Visit Gilgit-Baltistan: Month-by-Month Climate & Route Guide",
    slug: "best-time-to-visit",
    urlPath: "/travel-guide/best-time-to-visit",
    category: "Transport & Seasons",
    readTimeMinutes: 7,
    lastReviewed: "2026-10-25",
    reviewerRole: "Director of Treks & Cultural Journeys",
    summary:
      "Compare Spring Apricot Blossom (April), High-Glacier Trekking Season (June–August), and Golden Autumn Foliage (October) across Hunza, Skardu, Deosai, and the Baltoro.",
    keyTakeaways: [
      "March–April: Spring blossoms across lower Hunza, Nagar, and Shigar valleys.",
      "Mid-June–August: Optimal window for K2 Base Camp, Snow Lake, Deosai, and 7000m+ peaks.",
      "October: Crystal-clear post-monsoon skies and fiery gold poplar foliage in Hunza and Khaplu.",
    ],
    heroImage: "/imgs/moodboard/scene-05.png",
  },
  {
    id: "art-k2-packing",
    title: "K2 Base Camp & High-Karakoram Packing Checklist",
    slug: "k2-base-camp-packing-list",
    urlPath: "/travel-guide/k2-base-camp-packing-list",
    category: "Packing & Gear",
    readTimeMinutes: 9,
    lastReviewed: "2026-10-12",
    reviewerRole: "Senior Baltoro Expedition Guide",
    summary:
      "Field-tested clothing layers, footwear, sleeping system ratings (-15°C), solar charging advice, and how to pack your 20kg duffle bag for the Baltoro moraine.",
    keyTakeaways: [
      "Temperatures range from +28°C in the Braldu gorge to -12°C at Concordia at night.",
      "Bring broken-in B1/B2 ankle-support boots for sharp granite moraine underfoot.",
      "Keep critical medication, electronics, and 1 change of layers in your flight carry-on.",
    ],
    heroImage: "/imgs/moodboard/scene-04.png",
  },
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-permits",
    question: "Which trips require special trekking or mountaineering permits, and how long do they take?",
    answer:
      "Cultural tours and moderate treks in Open Zones (Hunza Valley, Fairy Meadows, Nanga Parbat Base Camp, Rakaposhi Base Camp, and Skardu/Shigar valleys) do not require advance restricted permits. High-glacier routes in Restricted Zones—including K2 Base Camp, Concordia, Gondogoro La, and Snow Lake—as well as all 6,000m–8,000m climbing expeditions require official Gilgit-Baltistan government permits and CKNP environmental registration. We manage the entire permit process; we recommend confirming your place at least 45 days before departure.",
    category: "Safety & Permits",
    lastReviewed: "2026-10-20",
  },
  {
    id: "faq-skardu-flights",
    question: "What happens if my domestic flight to Skardu or Gilgit is delayed or cancelled due to mountain weather?",
    answer:
      "Flights from Islamabad to Skardu (KDU) and Gilgit (GIL) fly along dramatic mountain corridors and operate under strict visual weather minimums. If a flight is cancelled, our operations team immediately deploys private air-conditioned 4x4/coaster road transport along the Karakoram Highway (and Babusar Pass in summer) with pre-arranged overnight lodge stops in Besham or Chilas so your core mountain itinerary remains protected.",
    category: "Planning & Visas",
    lastReviewed: "2026-10-22",
  },
  {
    id: "faq-altitude",
    question: "How do you manage altitude sickness (AMS) on high-altitude treks?",
    answer:
      "Every trek is designed around conservative elevation gain and built-in acclimatization rest days (such as Paiju at 3,420m and Urdukas at 4,050m on the Baltoro). Our guides are Wilderness First Responder trained, perform twice-daily pulse-oximeter (SpO2) and Lake Louise symptom checks, and carry comprehensive medical kits, emergency oxygen, and a portable hyperbaric chamber (Gamow bag) on high-pass and glacier departures. Note: our protocols are operational safeguards and not a substitute for personal medical advice from your physician.",
    category: "Treks & Altitude",
    lastReviewed: "2026-10-18",
  },
  {
    id: "faq-visas",
    question: "Do you provide the Letter of Invitation (LOI) for the Pakistan visa?",
    answer:
      "Yes. Once your private tour, group trek, or expedition booking deposit is confirmed, we issue an official, licensed company Letter of Invitation (LOI), hotel/camp confirmation voucher, and approved route itinerary formatted for the official NADRA Pakistan Online Visa portal (visa.nadra.gov.pk).",
    category: "Planning & Visas",
    lastReviewed: "2026-10-25",
  },
  {
    id: "faq-women-solo",
    question: "Is Gilgit-Baltistan welcoming for solo travelers and women travelers?",
    answer:
      "Yes. Gilgit-Baltistan—especially Hunza, Gojal, and Shigar—is widely recognized as one of the most hospitable and community-minded regions in South and Central Asia. Solo travelers can join our scheduled small-group departures (with optional single tent/room upgrades or same-gender room pairing where available) or book a private journey with our female cultural guides.",
    category: "Tours & Private Travel",
    lastReviewed: "2026-10-24",
  },
  {
    id: "faq-expedition-screening",
    question: "Why can't I book a 7,000m or 8,000m climbing expedition via instant online checkout?",
    answer:
      "High-altitude mountaineering in the Karakoram involves serious objective hazards. To protect every climber and our local high-altitude team, all 6,000m–8,000m climbs require an Expedition Application where our Head of Mountaineering reviews your prior summit resume, technical rope/crampon proficiency, and insurance readiness before issuing a formal expedition contract.",
    category: "Payments & Booking",
    lastReviewed: "2026-10-15",
  },
];
