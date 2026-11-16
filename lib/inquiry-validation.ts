export interface InquiryValues {
  experience: string;
  region: string;
  timing: string;
  dates: string;
  travelers: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export type InquiryField = keyof InquiryValues;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export function validateInquiryValues(values: InquiryValues, stage: "journey" | "all" = "all"): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!["tour", "trek", "expedition"].includes(values.experience)) {
    errors.experience = "Choose the kind of journey you’re interested in.";
  }
  if (!values.region.trim()) errors.region = "Choose a region, or select ‘Open to suggestions’.";
  if (!["flexible", "spring", "summer", "autumn", "specific"].includes(values.timing)) {
    errors.timing = "Choose your preferred travel season.";
  }
  if (values.timing === "specific" && !values.dates.trim()) {
    errors.dates = "Tell us your preferred month or dates.";
  } else if (values.dates.length > 100) {
    errors.dates = "Keep your travel dates within 100 characters.";
  }
  const travelerCount = Number(values.travelers);
  if (!values.travelers.trim() || !Number.isInteger(travelerCount) || travelerCount < 1 || travelerCount > 64) {
    errors.travelers = "Enter a whole number from 1 to 64.";
  }
  if (stage === "journey") return errors;
  if (!values.name.trim()) errors.name = "Enter your name.";
  else if (values.name.trim().length > 100) errors.name = "Keep your name within 100 characters.";
  const email = values.email.trim();
  if (!email) errors.email = "Enter your email address.";
  else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address, such as name@example.com.";
  }
  if (values.phone.length > 40) errors.phone = "Keep your phone number within 40 characters.";
  if (values.notes.length > 3000) errors.notes = "Keep your message within 3,000 characters.";
  return errors;
}
