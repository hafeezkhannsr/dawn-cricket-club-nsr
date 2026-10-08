import { z } from "zod";
/* ---------------- Fee amounts ---------------- */
export const FEE_AMOUNTS = {
  DAWN_REGISTRATION: 3000,
  DAWN_MEMBERSHIP: 5000,
  DSL_REGISTRATION: 100,
} as const;
/* ---------------- Top-level enums ---------------- */
export const PROGRAM_TYPES = ["DAWN", "DSL"] as const;
export const REGISTRATION_TYPES = ["PLAYER", "MEMBERSHIP"] as const;
/* ---------------- Age categories (order matters) ---------------- */
export const AGE_CATEGORIES = [
  "U13",
  "U15",
  "U17",
  "U19",
  "Emerging",
  "Senior",
  "Veteran",
] as const;
/* ---------------- Player categories ---------------- */
export const PLAYER_CATEGORIES = [
  "Local Player",
  "Open Player",
  "Guest Player",
  "Rental / Shifting",
] as const;
/* ---------------- Playing roles ---------------- */
export const PLAYING_ROLES = [
  "Batter",
  "Bowler",
  "All-rounder",
  "Wicket-keeper",
] as const;
export const BATTING_STYLES = ["Right-hand", "Left-hand"] as const;
export const BOWLING_STYLES = [
  "Right-arm fast",
  "Right-arm medium",
  "Right-arm off-spin",
  "Right-arm leg-spin",
  "Left-arm fast",
  "Left-arm medium",
  "Left-arm orthodox",
  "Left-arm chinaman",
  "Does not bowl",
] as const;
/* ---------------- Ball type (updated) ---------------- */
export const BALL_TYPES = ["Hard Ball", "Tennis Ball"] as const;
/* ---------------- Identity types (Smart Card added) ---------------- */
export const IDENTITY_TYPES = ["CNIC", "B_FORM", "SMART_CARD"] as const;
export const IDENTITY_LABELS: Record<(typeof IDENTITY_TYPES)[number], string> = {
  CNIC: "CNIC (National ID Card)",
  B_FORM: "B-Form (Child Registration)",
  SMART_CARD: "Smart Card (New CNIC)",
};
/* ---------------- Education levels ---------------- */
export const EDUCATION_LEVELS = [
  "Under Matric",
  "Matric (Class 10)",
  "Intermediate (Class 12 / FSc / FA)",
  "Bachelor's (BA / BSc / BS / BCom)",
  "Master's (MA / MSc / MS / MCom)",
  "MPhil",
  "PhD",
  "Other / Not Applicable",
] as const;
/* ---------------- Editions (7 -> 30, 2027 -> 2050) ---------------- */
export const EDITION_MIN = 7;
export const EDITION_MAX = 30;
export const EDITION_BASE_YEAR = 2020;
/* ---------------- Status enums ---------------- */
export const REGISTRATION_STATUS = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "NEEDS_CORRECTION",
  "APPROVED",
  "REJECTED",
] as const;
export const PAYMENT_STATUS = [
  "UNPAID",
  "PROOF_SUBMITTED",
  "PENDING_VERIFICATION",
  "VERIFIED",
  "REJECTED",
  "REFUNDED",
] as const;
/* ================================================================
   ZOD SCHEMAS  (per step)
   ================================================================ */
/* --------- Step 1: Program --------- */
export const step1Schema = z.object({
  program: z.enum(PROGRAM_TYPES),
  registrationType: z.enum(REGISTRATION_TYPES),
  playerCategory: z.enum(PLAYER_CATEGORIES, { message: "Select a player category" }),
  edition: z.number().int().min(EDITION_MIN).max(EDITION_MAX).optional(),
  ageCategory: z.enum(AGE_CATEGORIES, { message: "Select an age category" }),
});
/* --------- Step 2: Personal (Urdu name removed) --------- */
export const step2Schema = z.object({
  fullNameEn: z.string().min(3, "Name must be at least 3 characters").max(120),
  fatherName: z.string().min(3, "Father's name must be at least 3 characters").max(120),
  dateOfBirth: z
    .string()
    .refine((v) => !isNaN(Date.parse(v)) && new Date(v) < new Date(), {
      message: "Date of birth must be a valid past date",
    }),
  gender: z.enum(["Male", "Female", "Other"], { message: "Select a gender" }),
  nationality: z.string().default("Pakistani"),
  religion: z.string().optional(),
  maritalStatus: z.enum(["Single", "Married"]).optional(),
  bloodGroup: z.string().optional(),
});
/* --------- Step 3: Contact --------- */
export const step3Schema = z.object({
  primaryMobile: z.string().regex(/^03\d{2}-\d{7}$/, "Format: 03XX-XXXXXXX"),
  email: z.string().email().optional().or(z.literal("")),
  residenceCity: z.string().min(2, "City required"),
});
/* --------- Step 4: Identity --------- */
export const step4Schema = z.object({
  identityType: z.enum(IDENTITY_TYPES, { message: "Select an identity type" }),
  identityNumber: z.string().transform((v) => v.replace(/\D+/g, "")).refine((v) => v.length === 13, "13-digit number required"),
});
/* --------- Step 5: Address --------- */
export const step5Schema = z.object({
  country: z.string().min(2),
  province: z.string().min(2, "Select a province"),
  division: z.string().min(1).optional(),
  district: z.string().min(2, "Select a district"),
  tehsil: z.string().min(2, "Select a tehsil"),
  unionCouncil: z.string().min(1).optional(),
  villageCouncil: z.string().min(1).optional(),
  village: z.string().min(1, "Select a village / locality"),
  postalAddress: z.string().min(5, "Full address required").max(300),
});
/* --------- Step 6: Cricket --------- */
export const step6Schema = z.object({
  playingRole: z.enum(PLAYING_ROLES, { message: "Select a playing role" }),
  battingStyle: z.enum(BATTING_STYLES, { message: "Select a batting style" }),
  bowlingStyle: z.enum(BOWLING_STYLES, { message: "Select a bowling style" }),
  ballType: z.enum(BALL_TYPES, { message: "Select a ball type" }),
  experienceYears: z.number().int().min(0).max(50),
  previousClub: z.string().optional(),
});
/* --------- Step 7: Education --------- */
export const step7Schema = z.object({
  isStudent: z.boolean(),
  educationLevel: z.enum(EDUCATION_LEVELS, { message: "Select an education level" }),
  schoolName: z.string().optional(),
  availability: z.string().min(2, "Availability required"),
});
/* --------- Step 8: Guardian --------- */
export const step8Schema = z.object({
  guardianName: z.string().min(3, "Guardian name required"),
  guardianRelation: z.string().min(2, "Select a relation"),
  guardianMobile: z.string().regex(/^03\d{2}-\d{7}$/, "Format: 03XX-XXXXXXX"),
  publicPhotoConsent: z.boolean(),
  rulesConsent: z.boolean().refine((v) => v === true, {
    message: "You must accept the club rules",
  }),
});
/* --------- Step 9: Payment --------- */
export const step9Schema = z.object({
  paymentMethod: z.string().min(2, "Select a payment method"),
  paymentDate: z.string().min(4, "Payment date required"),
  transactionReference: z.string().min(4, "Transaction reference required"),
  signatureName: z.string().min(3, "Signature name required"),
});
/* --------- Merged (full) --------- */
export const fullRegistrationSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema)
  .merge(step8Schema)
  .merge(step9Schema);
export type Registration = z.infer<typeof fullRegistrationSchema>;
export const STEP_SCHEMAS = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  step8Schema,
  step9Schema,
] as const;
export const STEP_TITLES = [
  "Program",
  "Personal",
  "Contact",
  "Identity",
  "Address",
  "Cricket",
  "Education",
  "Guardian",
  "Payment",
] as const;
export function feeFor(program: "DAWN" | "DSL", type: "PLAYER" | "MEMBERSHIP"): number {
  if (program === "DSL") return FEE_AMOUNTS.DSL_REGISTRATION;
  return type === "MEMBERSHIP"
    ? FEE_AMOUNTS.DAWN_MEMBERSHIP
    : FEE_AMOUNTS.DAWN_REGISTRATION;
}