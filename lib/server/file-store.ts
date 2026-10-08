export type StoredFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl: string;
  uploadedAt: string;
};
declare global {
  var __dawn_files__: Map<string, StoredFile> | undefined;
}
const files: Map<string, StoredFile> =
  globalThis.__dawn_files__ ?? new Map<string, StoredFile>();
globalThis.__dawn_files__ = files;
export function saveFile(f: StoredFile): StoredFile {
  files.set(f.id, f);
  return f;
}
export function getFile(id: string): StoredFile | undefined {
  return files.get(id);
}
export function deleteFile(id: string): boolean {
  return files.delete(id);
}
export function count(): number {
  return files.size;
}