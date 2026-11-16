import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatAltitude(
  meters: number,
  unit: "metric" | "imperial" = "metric"
): string {
  if (unit === "imperial") {
    const feet = Math.round(meters * 3.28084);
    return `${feet.toLocaleString("en-US")} ft`;
  }
  return `${meters.toLocaleString("en-US")} m`;
}

export function formatDistance(
  kilometers: number,
  unit: "metric" | "imperial" = "metric"
): string {
  if (unit === "imperial") {
    const miles = Math.round(kilometers * 0.621371);
    return `${miles.toLocaleString("en-US")} mi`;
  }
  return `${kilometers.toLocaleString("en-US")} km`;
}
