export const STEPS = [
  { id: 1, en: "Program", ur: "پروگرام", short: "Program" },
  { id: 2, en: "Personal", ur: "ذاتی معلومات", short: "Personal" },
  { id: 3, en: "Contact", ur: "رابطہ", short: "Contact" },
  { id: 4, en: "Identity", ur: "شناخت", short: "ID" },
  { id: 5, en: "Address", ur: "پتہ", short: "Address" },
  { id: 6, en: "Cricket", ur: "کرکٹ", short: "Cricket" },
  { id: 7, en: "Education", ur: "تعلیم", short: "Edu" },
  { id: 8, en: "Guardian", ur: "سرپرست", short: "Guardian" },
  { id: 9, en: "Payment", ur: "ادائیگی", short: "Pay" },
] as const;
export function digitsOnly(v: string): string {
  return (v || "").replace(/\D+/g, "");
}
export function formatCnic(v: string): string {
  const d = digitsOnly(v).slice(0, 13);
  if (d.length <= 5) return d;
  if (d.length <= 12) return d.slice(0, 5) + "-" + d.slice(5);
  return d.slice(0, 5) + "-" + d.slice(5, 12) + "-" + d.slice(12);
}
export function formatMobile(v: string): string {
  const d = digitsOnly(v).slice(0, 11);
  if (d.length <= 4) return d;
  return d.slice(0, 4) + "-" + d.slice(4);
}
export function calculateAge(dob: string): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}
export function suggestAgeCategory(age: number | null): string {
  if (age === null) return "";
  if (age < 13) return "U13";
  if (age < 15) return "U15";
  if (age < 17) return "U17";
  if (age < 19) return "U19";
  if (age < 23) return "Emerging";
  if (age < 40) return "Senior";
  return "Veteran";
}
/* -------- Editions (7 -> 30 = 2027 -> 2050) -------- */
export const EDITION_MIN = 7;
export const EDITION_MAX = 30;
export const EDITION_BASE_YEAR = 2020;
export function editionToYear(edition: number): number {
  return EDITION_BASE_YEAR + edition;
}
export function yearToEdition(year: number): number {
  return year - EDITION_BASE_YEAR;
}
export type EditionOption = {
  edition: number;
  year: number;
  label: string;
  status: "OPEN" | "COMING_SOON";
};
export function listEditions(): EditionOption[] {
  const currentYear = new Date().getFullYear();
  const arr: EditionOption[] = [];
  for (let e = EDITION_MIN; e <= EDITION_MAX; e++) {
    const y = editionToYear(e);
    arr.push({
      edition: e,
      year: y,
      label: `Edition ${e} — ${y}${e === 7 ? " (Open)" : ""}`,
      status: y <= currentYear + 1 ? "OPEN" : "COMING_SOON",
    });
  }
  return arr;
}
export const STORAGE_KEY = "dawn.registration.draft.v1";
export function loadDraft<T = Record<string, unknown>>(): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
export function saveDraft(data: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}
export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {}
}