import type { StoredRegistration } from "./registration-store";
function csvEscape(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n") || s.includes("\r")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}
function sanitizeCell(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  if (/^[=+\-@]/.test(s)) return "'" + s;
  return s;
}
/* File object → safe summary (no base64) */
function fileSummary(f: unknown): string {
  if (!f || typeof f !== "object") return "";
  const o = f as { id?: string; name?: string; size?: number; type?: string };
  if (!o.name) return "";
  const sizeKB = o.size ? Math.round(o.size / 1024) : 0;
  return o.name + " (" + sizeKB + " KB, " + (o.type || "file") + ")";
}
export const REGISTRATION_COLUMNS = [
  "RegistrationNumber", "Program", "RegistrationType", "PlayerCategory", "Edition",
  "Status", "PaymentStatus", "FeeAmount", "Currency",
  "FullName", "FatherName", "DateOfBirth", "Gender", "Nationality", "Religion",
  "MaritalStatus", "BloodGroup", "PrimaryMobile", "Email", "ResidenceCity",
  "IdentityType", "IdentityNumber",
  "Country", "Province", "Division", "District", "Tehsil", "UnionCouncil", "Village", "PostalAddress",
  "PlayingRole", "BattingStyle", "BowlingStyle", "BallType", "ExperienceYears", "PreviousClub",
  "IsStudent", "EducationLevel", "SchoolName", "Availability",
  "GuardianName", "GuardianRelation", "GuardianMobile",
  "PublicPhotoConsent", "RulesConsent",
  "PaymentMethod", "PaymentDate", "TransactionReference", "SignatureName",
  "CNICFrontFile", "CNICBackFile", "BFormFile", "SmartCardFrontFile", "SmartCardBackFile", "PortraitFile",
  "CreatedAt", "UpdatedAt"
] as const;
function row(reg: StoredRegistration): string[] {
  const d = reg.data as Record<string, unknown>;
  const get = (k: string) => sanitizeCell(d[k] ?? "");
  const s = (v: unknown) => sanitizeCell(v ?? "");
  return [
    s(reg.registrationNumber),
    s(reg.program),
    s(reg.registrationType),
    get("playerCategory"),
    s(reg.edition ?? ""),
    s(reg.status),
    s(reg.paymentStatus),
    s(reg.feeAmount),
    s(reg.currency),
    get("fullNameEn"),
    get("fatherName"),
    get("dateOfBirth"),
    get("gender"),
    get("nationality"),
    get("religion"),
    get("maritalStatus"),
    get("bloodGroup"),
    get("primaryMobile"),
    get("email"),
    get("residenceCity"),
    get("identityType"),
    get("identityNumber"),
    get("country"),
    get("province"),
    get("division"),
    get("district"),
    get("tehsil"),
    get("unionCouncil"),
    get("village"),
    get("postalAddress"),
    get("playingRole"),
    get("battingStyle"),
    get("bowlingStyle"),
    get("ballType"),
    get("experienceYears"),
    get("previousClub"),
    get("isStudent"),
    get("educationLevel"),
    get("schoolName"),
    get("availability"),
    get("guardianName"),
    get("guardianRelation"),
    get("guardianMobile"),
    get("publicPhotoConsent"),
    get("rulesConsent"),
    get("paymentMethod"),
    get("paymentDate"),
    get("transactionReference"),
    get("signatureName"),
    fileSummary(d.cnicFront),
    fileSummary(d.cnicBack),
    fileSummary(d.bFormFile),
    fileSummary(d.smartFront),
    fileSummary(d.smartBack),
    fileSummary(d.portrait),
    s(reg.createdAt),
    s(reg.updatedAt),
  ];
}
export function buildCsv(items: StoredRegistration[]): string {
  const header = REGISTRATION_COLUMNS.map(csvEscape).join(",");
  const body = items.map((r) => row(r).map(csvEscape).join(",")).join("\r\n");
  return "\uFEFF" + header + "\r\n" + body + "\r\n";
}
export function buildTsv(items: StoredRegistration[]): string {
  const header = REGISTRATION_COLUMNS.join("\t");
  const body = items.map((r) => row(r).join("\t")).join("\n");
  return header + "\n" + body;
}
export function buildJson(items: StoredRegistration[]) {
  return items.map((r) => {
    const d = r.data as Record<string, unknown>;
    const safeData: Record<string, unknown> = { ...d };
    // Remove base64 from files in JSON export
    for (const k of ["cnicFront", "cnicBack", "bFormFile", "smartFront", "smartBack", "portrait"]) {
      if (safeData[k] && typeof safeData[k] === "object") {
        const f = safeData[k] as { id?: string; name?: string; size?: number; type?: string };
        safeData[k] = { id: f.id, name: f.name, size: f.size, type: f.type };
      }
    }
    return {
      registrationNumber: r.registrationNumber,
      program: r.program,
      registrationType: r.registrationType,
      status: r.status,
      paymentStatus: r.paymentStatus,
      feeAmount: r.feeAmount,
      currency: r.currency,
      edition: r.edition ?? null,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      data: safeData,
    };
  });
}