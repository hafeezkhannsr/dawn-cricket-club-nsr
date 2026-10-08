import geoData from "./data/pakistan-geography.json";
export type UnionCouncil = { id: string; name: string; villages: string[] };
export type Tehsil = { id: string; name: string; unionCouncils: UnionCouncil[] };
export type District = { id: string; name: string; tehsils: Tehsil[] };
export type Division = { id: string; name: string; districts: District[] };
export type Province = { id: string; name: string; divisions: Division[] };
const data = geoData as { provinces: Province[] };
export function getProvinces(): Province[] {
  return data.provinces;
}
export function getDivisions(provinceId: string): Division[] {
  return data.provinces.find((p) => p.id === provinceId)?.divisions ?? [];
}
export function getDistricts(provinceId: string, divisionId: string): District[] {
  return getDivisions(provinceId).find((d) => d.id === divisionId)?.districts ?? [];
}
export function getTehsils(provinceId: string, divisionId: string, districtId: string): Tehsil[] {
  return getDistricts(provinceId, divisionId).find((d) => d.id === districtId)?.tehsils ?? [];
}
export function getUnionCouncils(provinceId: string, divisionId: string, districtId: string, tehsilId: string): UnionCouncil[] {
  return getTehsils(provinceId, divisionId, districtId).find((t) => t.id === tehsilId)?.unionCouncils ?? [];
}
export function getVillages(provinceId: string, divisionId: string, districtId: string, tehsilId: string, ucId: string): string[] {
  return getUnionCouncils(provinceId, divisionId, districtId, tehsilId).find((u) => u.id === ucId)?.villages ?? [];
}
export const COUNTRIES = [
  { code: "PK", name: "Pakistan" },
  { code: "IN", name: "India" },
  { code: "BD", name: "Bangladesh" },
  { code: "AF", name: "Afghanistan" },
  { code: "IR", name: "Iran" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "QA", name: "Qatar" },
  { code: "OM", name: "Oman" },
  { code: "KW", name: "Kuwait" },
  { code: "BH", name: "Bahrain" },
  { code: "MY", name: "Malaysia" },
  { code: "TR", name: "Turkey" },
  { code: "CN", name: "China" },
  { code: "UK", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "ZA", name: "South Africa" },
  { code: "OTHER", name: "Other" },
] as const;