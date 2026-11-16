export type ServicePillar = "tour" | "trek" | "expedition";

export type DifficultyGrade =
  | "Scenic & Cultural"
  | "Beginner Alpine"
  | "Moderate Trek"
  | "Challenging Glacier"
  | "Strenuous High-Pass"
  | "Technical 6000m–7000m"
  | "Extreme 8000m Expedition";

export type DepartureStatus = "Confirmed" | "Limited" | "Waitlist" | "Ask";

export type PriceModel = "fixed_from" | "custom_quote" | "expedition_application";

export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  caption: string;
  credit: string;
  location: string;
  coordinates: string;
  altitudeMeters: number;
  category: "experience" | "destination" | "movement" | "guide";
  verifiedLicense: boolean;
}

export interface ItineraryDay {
  day: number;
  from: string;
  to: string;
  title: string;
  summary: string;
  altitudeMeters: number;
  distanceKm: number;
  ascentMeters: number;
  descentMeters: number;
  hours: string;
  transport: string;
  meals: string;
  stay: string;
  isAcclimatizationDay?: boolean;
}

export interface Journey {
  id: string;
  title: string;
  slug: string;
  urlPath: string;
  serviceType: ServicePillar;
  categoryLabel: string;
  categorySlug: string;
  status: "published" | "illustrative_sku";
  regionIds: string[];
  destinationNames: string[];
  heroMedia: MediaAsset;
  durationDays: number;
  durationNights: number;
  maxAltitudeMeters: number;
  distanceKm: number;
  grade: DifficultyGrade;
  requiredExperience: string;
  startCity: string;
  endCity: string;
  bestSeason: string;
  groupSizeMin: number;
  groupSizeMax: number;
  privateAvailable: boolean;
  priceModel: PriceModel;
  currency: "USD";
  startingPriceUsd?: number;
  priceNotes: string;
  bookable: boolean;
  highlights: string[];
  introduction: string;
  whoFor: string[];
  whoNotFor: string[];
  itineraryDays: ItineraryDay[];
  included: string[];
  excluded: string[];
  optionalUpgrades: string[];
  accommodationSummary: string;
  mealsSummary: string;
  permitsRequired: string;
  insuranceRequirement: string;
  healthAndAltitudeNotes: string;
  equipmentSummary: string[];
  guideIds: string[];
  reviewIds: string[];
  faqIds: string[];
  lastReviewed: string;
}

export interface Departure {
  id: string;
  journeyId: string;
  journeyTitle: string;
  journeySlug: string;
  journeyUrl: string;
  serviceType: ServicePillar;
  regionName: string;
  grade: DifficultyGrade;
  maxAltitudeMeters: number;
  startDate: string;
  endDate: string;
  durationDays: number;
  meetingPoint: string;
  returnPoint: string;
  priceUsd: number;
  currency: "USD";
  status: DepartureStatus;
  capacity: number;
  remainingSeats?: number;
  minGroupSize: number;
  depositUsd: number;
  notes: string;
  bookingDeadline: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  urlPath: string;
  regionGroup: "Central Karakoram" | "Baltistan & Eastern Valleys" | "Western Valleys & Nanga Parbat" | "High Corridors & Plateaus";
  tagline: string;
  summary: string;
  elevationRangeMeters: string;
  peakElevationMeters: number;
  coordinates: string;
  mapPosition: [number, number, number];
  bestSeason: string;
  accessSummary: string;
  recommendedDuration: string;
  highlights: string[];
  attractions: string[];
  culturalNotes: string;
  safetyNotes: string;
  journeyCount: number;
  heroImage: string;
  heroAlt: string;
}

export interface MountainProfile {
  id: string;
  name: string;
  slug: string;
  urlPath: string;
  elevationMeters: number;
  range: string;
  coordinates: string;
  rankWorld?: number;
  standardRoute: string;
  technicalGrade: string;
  season: string;
  permitCategory: string;
  summary: string;
  operatedTripSlug?: string;
  lastReviewed: string;
}

export interface GuideProfile {
  id: string;
  name: string;
  slug: string;
  urlPath: string;
  roleTitle: string;
  homeRegion: string;
  languages: string[];
  yearsExperience: number;
  portraitSrc: string;
  portraitAlt: string;
  bio: string;
  specialties: string[];
  qualifications: string[];
  notableRoutes: string[];
  safetyPhilosophy: string;
  favoriteJourney: string;
}

export interface GuestReview {
  id: string;
  consentedName: string;
  travelerCountry: string;
  travelerType: string;
  journeyId: string;
  journeyTitle: string;
  journeyCategory: ServicePillar;
  travelDate: string;
  quote: string;
  storyExcerpt: string;
  routeContext: string;
  verifiedContext: string;
}

export interface PlanningArticle {
  id: string;
  title: string;
  slug: string;
  urlPath: string;
  category: "Visas & Permits" | "Safety & Altitude" | "Packing & Gear" | "Transport & Seasons" | "Culture & Etiquette" | "Journal Story";
  readTimeMinutes: number;
  lastReviewed: string;
  reviewerRole: string;
  officialSourceLabel?: string;
  officialSourceUrl?: string;
  summary: string;
  keyTakeaways: string[];
  heroImage: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Planning & Visas" | "Treks & Altitude" | "Tours & Private Travel" | "Safety & Permits" | "Payments & Booking";
  lastReviewed: string;
}
