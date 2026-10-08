import { kvPut, kvGet, kvDelete } from "./db";
export type StoredFile = { id: string; name: string; size: number; type: string; dataUrl: string; uploadedAt: string };
const KIND = "file";
export async function saveFile(f: StoredFile): Promise<StoredFile> { await kvPut(KIND, f.id, f); return f; }
export async function getFile(id: string): Promise<StoredFile | undefined> { return (await kvGet<StoredFile>(KIND, id)) ?? undefined; }
export async function deleteFile(id: string): Promise<boolean> { const f = await getFile(id); if (!f) return false; await kvDelete(KIND, id); return true; }