import { kvPut, kvGet, kvList, kvDelete } from "./db";
type RegStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "NEEDS_CORRECTION" | "APPROVED" | "REJECTED";
type PayStatus = "UNPAID" | "PROOF_SUBMITTED" | "PENDING_VERIFICATION" | "VERIFIED" | "REJECTED" | "REFUNDED";
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
export async function listAll(): Promise<StoredRegistration[]> {
  const items = await kvList<StoredRegistration>(KIND);
  return items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
export async function getById(id: string): Promise<StoredRegistration | undefined> {
  return (await kvGet<StoredRegistration>(KIND, id)) ?? undefined;
}
export async function getByRegistrationNumber(num: string): Promise<StoredRegistration | undefined> {
  const all = await listAll();
  return all.find((r) => r.registrationNumber === num);
}
export async function create(reg: StoredRegistration): Promise<StoredRegistration> {
  await kvPut(KIND, reg.id, reg);
  return reg;
}
export async function updateStatus(id: string, status: RegStatus, note?: string): Promise<StoredRegistration | undefined> {
  const r = await getById(id);
  if (!r) return undefined;
  const from = r.status;
  r.status = status;
  r.updatedAt = new Date().toISOString();
  r.statusHistory.push({ at: r.updatedAt, from, to: status, note });
  await kvPut(KIND, r.id, r);
  return r;
}
export async function updatePaymentStatus(id: string, paymentStatus: PayStatus): Promise<StoredRegistration | undefined> {
  const r = await getById(id);
  if (!r) return undefined;
  r.paymentStatus = paymentStatus;
  r.updatedAt = new Date().toISOString();
  await kvPut(KIND, r.id, r);
  return r;
}
export async function updateData(id: string, patch: Record<string, unknown>): Promise<StoredRegistration | undefined> {
  const r = await getById(id);
  if (!r) return undefined;
  r.data = { ...r.data, ...patch };
  r.updatedAt = new Date().toISOString();
  await kvPut(KIND, r.id, r);
  return r;
}
export async function remove(id: string): Promise<boolean> {
  const r = await getById(id);
  if (!r) return false;
  await kvDelete(KIND, id);
  return true;
}
export async function findByMobile(mobile: string): Promise<StoredRegistration[]> {
  const m = String(mobile || "").replace(/\D+/g, "");
  if (m.length < 10) return [];
  const all = await listAll();
  return all.filter((r) => {
    const d = r.data as Record<string, unknown>;
    const rm = String(d.primaryMobile || "").replace(/\D+/g, "");
    const gm = String(d.guardianMobile || "").replace(/\D+/g, "");
    return rm === m || gm === m;
  });
}
export async function findByEmail(email: string): Promise<StoredRegistration[]> {
  const e = String(email || "").toLowerCase().trim();
  if (!e.includes("@")) return [];
  const all = await listAll();
  return all.filter((r) => {
    const d = r.data as Record<string, unknown>;
    return String(d.email || "").toLowerCase().trim() === e;
  });
}
export async function stats() {
  const all = await listAll();
  return {
    total: all.length,
    submitted: all.filter((r) => r.status === "SUBMITTED").length,
    underReview: all.filter((r) => r.status === "UNDER_REVIEW").length,
    needsCorrection: all.filter((r) => r.status === "NEEDS_CORRECTION").length,
    approved: all.filter((r) => r.status === "APPROVED").length,
    rejected: all.filter((r) => r.status === "REJECTED").length,
    paymentVerified: all.filter((r) => r.paymentStatus === "VERIFIED").length,
    paymentPending: all.filter((r) => r.paymentStatus === "PENDING_VERIFICATION" || r.paymentStatus === "PROOF_SUBMITTED").length,
  };
}