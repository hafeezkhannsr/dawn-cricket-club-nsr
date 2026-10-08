import { kvPut, kvGet, kvList, kvDelete } from "./db";
type RegStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "NEEDS_CORRECTION"
  | "APPROVED"
  | "REJECTED";
type PayStatus =
  | "UNPAID"
  | "PROOF_SUBMITTED"
  | "PENDING_VERIFICATION"
  | "VERIFIED"
  | "REJECTED"
  | "REFUNDED";
export type StoredRegistration = {
  id: string;
  registrationNumber: string;
  program: "DAWN" | "DSL";
  registrationType: "PLAYER" | "MEMBERSHIP";
  edition?: number;
  status: RegStatus;
  paymentStatus: PayStatus;
  feeAmount: number;
  currency: "PKR";
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  statusHistory: { at: string; from: RegStatus | null; to: RegStatus; note?: string }[];
};
const KIND = "registration";
/* ============================================================
   Read operations
   ============================================================ */
export function listAll(): StoredRegistration[] {
  return kvList<StoredRegistration>(KIND).sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
}
export function getById(id: string): StoredRegistration | undefined {
  return kvGet<StoredRegistration>(KIND, id) ?? undefined;
}
export function getByRegistrationNumber(num: string): StoredRegistration | undefined {
  return listAll().find((r) => r.registrationNumber === num);
}
/* ============================================================
   Write operations
   ============================================================ */
export function create(reg: StoredRegistration): StoredRegistration {
  kvPut(KIND, reg.id, reg);
  return reg;
}
export function updateStatus(
  id: string,
  status: RegStatus,
  note?: string
): StoredRegistration | undefined {
  const r = getById(id);
  if (!r) return undefined;
  const from = r.status;
  r.status = status;
  r.updatedAt = new Date().toISOString();
  r.statusHistory.push({ at: r.updatedAt, from, to: status, note });
  kvPut(KIND, r.id, r);
  return r;
}
export function updatePaymentStatus(
  id: string,
  paymentStatus: PayStatus
): StoredRegistration | undefined {
  const r = getById(id);
  if (!r) return undefined;
  r.paymentStatus = paymentStatus;
  r.updatedAt = new Date().toISOString();
  kvPut(KIND, r.id, r);
  return r;
}
export function updateData(
  id: string,
  patch: Record<string, unknown>
): StoredRegistration | undefined {
  const r = getById(id);
  if (!r) return undefined;
  r.data = { ...r.data, ...patch };
  r.updatedAt = new Date().toISOString();
  kvPut(KIND, r.id, r);
  return r;
}
export function remove(id: string): boolean {
  const r = getById(id);
  if (!r) return false;
  kvDelete(KIND, id);
  return true;
}
/* ============================================================
   Player self-service lookups
   ============================================================ */
export function findByMobile(mobile: string): StoredRegistration[] {
  const m = String(mobile || "").replace(/\D+/g, "");
  if (m.length < 10) return [];
  return listAll().filter((r) => {
    const d = r.data as Record<string, unknown>;
    const rm = String(d.primaryMobile || "").replace(/\D+/g, "");
    const gm = String(d.guardianMobile || "").replace(/\D+/g, "");
    return rm === m || gm === m;
  });
}
export function findByEmail(email: string): StoredRegistration[] {
  const e = String(email || "").toLowerCase().trim();
  if (!e.includes("@")) return [];
  return listAll().filter((r) => {
    const d = r.data as Record<string, unknown>;
    return String(d.email || "").toLowerCase().trim() === e;
  });
}
/* ============================================================
   Aggregate stats
   ============================================================ */
export function stats() {
  const all = listAll();
  return {
    total: all.length,
    submitted: all.filter((r) => r.status === "SUBMITTED").length,
    underReview: all.filter((r) => r.status === "UNDER_REVIEW").length,
    needsCorrection: all.filter((r) => r.status === "NEEDS_CORRECTION").length,
    approved: all.filter((r) => r.status === "APPROVED").length,
    rejected: all.filter((r) => r.status === "REJECTED").length,
    paymentVerified: all.filter((r) => r.paymentStatus === "VERIFIED").length,
    paymentPending: all.filter(
      (r) =>
        r.paymentStatus === "PENDING_VERIFICATION" ||
        r.paymentStatus === "PROOF_SUBMITTED"
    ).length,
  };
}