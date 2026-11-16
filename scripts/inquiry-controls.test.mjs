import assert from "node:assert/strict";
import test from "node:test";
import { validateInquiryValues } from "../lib/inquiry-validation.ts";
import { createInquiryEmail, INQUIRY_EMAIL } from "../lib/inquiry-email.ts";
import { findSelectableMatch, nextSelectableIndex } from "../lib/select-navigation.ts";

const validInquiry = {
  experience: "trek", region: "open", timing: "flexible", dates: "", travelers: "2",
  name: "Ali Khan", email: "ali@example.com", phone: "", notes: "",
};

test("journey step allows contact details to remain empty until step two", () => {
  const values = { ...validInquiry, name: "", email: "" };
  assert.deepEqual(validateInquiryValues(values, "journey"), {});
  const errors = validateInquiryValues(values);
  assert.ok(errors.name);
  assert.ok(errors.email);
});

test("final validation rejects whitespace contacts, malformed email, and invalid traveler counts", () => {
  assert.ok(validateInquiryValues({ ...validInquiry, name: "   " }).name);
  for (const email of ["name", "name@", "name@example", "a b@example.com", "a@@example.com"]) {
    assert.ok(validateInquiryValues({ ...validInquiry, email }).email, email);
  }
  for (const travelers of ["", "0", "-1", "1.5", "65", "word"]) {
    assert.ok(validateInquiryValues({ ...validInquiry, travelers }).travelers, travelers);
  }
  assert.deepEqual(validateInquiryValues({ ...validInquiry, name: "  Ali Khan  ", email: " ali@example.com ", travelers: "64" }), {});
});

test("specific dates are required only for that preference and length limits are enforced", () => {
  assert.ok(validateInquiryValues({ ...validInquiry, timing: "specific", dates: " " }).dates);
  assert.deepEqual(validateInquiryValues({ ...validInquiry, timing: "specific", dates: "June 2027" }), {});
  assert.ok(validateInquiryValues({ ...validInquiry, dates: "x".repeat(101) }).dates);
  assert.ok(validateInquiryValues({ ...validInquiry, notes: "x".repeat(3001) }).notes);
  assert.ok(validateInquiryValues({ ...validInquiry, experience: "unsupported" }).experience);
});

test("email draft preserves notes and encodes reserved characters without injecting subject headers", () => {
  const draft = createInquiryEmail({
    name: " Ali Khan ", email: " ali@example.com ", experience: "Mountain trek",
    dates: "June 2027", travelers: "2", phone: "+92 300 1234567",
    notes: "Hunza & Skardu?\nPlease include a free day.", route: "K2\r\nBcc: other@example.com",
  });
  const url = new URL(draft.href);
  assert.equal(url.pathname, INQUIRY_EMAIL);
  assert.equal(url.searchParams.get("subject"), draft.subject);
  assert.equal(url.searchParams.get("body"), draft.body);
  assert.ok(!/[\r\n]/.test(draft.subject));
  assert.ok(draft.body.includes("Name: Ali Khan"));
  assert.ok(draft.body.includes("Phone: +92 300 1234567"));
  assert.ok(draft.body.includes("Hunza & Skardu?\nPlease include a free day."));
});

const options = [
  { value: "spring", label: "Spring" },
  { value: "unavailable", label: "Summer special", disabled: true },
  { value: "summer", label: "Summer" },
  { value: "autumn", label: "Autumn" },
];

test("keyboard navigation wraps and skips disabled options in both directions", () => {
  assert.equal(nextSelectableIndex(options, 0, 1), 2);
  assert.equal(nextSelectableIndex(options, 2, -1), 0);
  assert.equal(nextSelectableIndex(options, 3, 1), 0);
  assert.equal(nextSelectableIndex(options, 0, -1), 3);
  assert.equal(nextSelectableIndex([], -1, 1), -1);
  assert.equal(nextSelectableIndex([{ value: "x", label: "X", disabled: true }], 0, 1), -1);
});

test("typeahead cycles through matching enabled options and ignores unavailable matches", () => {
  assert.equal(findSelectableMatch(options, "s", 0), 2);
  assert.equal(findSelectableMatch(options, "s", 2), 0);
  assert.equal(findSelectableMatch(options, "SUM", 0), 2);
  assert.equal(findSelectableMatch(options, "unknown", 0), -1);
  assert.equal(findSelectableMatch(options, " ", 0), -1);
});
