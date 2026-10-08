import { getById, remove } from "./registration-store";
import { deleteFile } from "./file-store";
/**
 * Deep delete a registration:
 *  - Removes from local SQLite
 *  - Removes attached files (CNIC, B-Form, portrait, etc.)
 *  - Sends a "delete" event to Google Sheets (via Apps Script) if configured
 *    so the sheet row is also removed.
 */
export async function deepDeleteRegistration(id: string): Promise<{
  ok: boolean;
  removedFiles: number;
  sheetsNotified: boolean;
  errors: string[];
}> {
  const errors: string[] = [];
  let removedFiles = 0;
  let sheetsNotified = false;
  const reg = getById(id);
  if (!reg) return { ok: false, removedFiles: 0, sheetsNotified: false, errors: ["Registration not found"] };
  const d = (reg.data || {}) as Record<string, unknown>;
  // Collect any uploaded file ids (dataUrls / {id} references)
  const fileRefs: string[] = [];
  for (const key of ["cnicFront", "cnicBack", "bFormFile", "smartFront", "smartBack", "portrait", "paymentProof"]) {
    const v = d[key] as { id?: string } | null | undefined;
    if (v && typeof v === "object" && typeof v.id === "string") fileRefs.push(v.id);
  }
  for (const fid of fileRefs) {
    try { if (deleteFile(fid)) removedFiles++; }
    catch (e) { errors.push(`file ${fid}: ${(e as Error).message}`); }
  }
  // Delete from SQLite
  const removed = remove(id);
  if (!removed) errors.push("Failed to remove from database");
  // Notify Google Sheets (best-effort, silent if not configured)
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET || "";
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
          action: "delete",
          registrationNumber: reg.registrationNumber,
        }),
      });
      sheetsNotified = res.ok;
      if (!res.ok) errors.push(`Sheets responded ${res.status}`);
    } catch (e) {
      errors.push(`Sheets: ${(e as Error).message}`);
    }
  }
  return { ok: removed, removedFiles, sheetsNotified, errors };
}