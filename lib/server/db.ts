/* ============================================================
   DAWN — Data layer
   - LOCAL dev:     better-sqlite3 (data/dawn.db)
   - VERCEL/prod:   in-memory fallback (or Postgres if DATABASE_URL set)
   The KV interface never changes — only the backend.
   ============================================================ */
type KVRow = { id: string; data: string; updatedAt: string };
/* ---------- In-memory store (production fallback) ---------- */
declare global {
  // eslint-disable-next-line no-var
  var __dawn_mem__: Map<string, Map<string, KVRow>> | undefined;
}
function mem(): Map<string, Map<string, KVRow>> {
  if (!globalThis.__dawn_mem__) globalThis.__dawn_mem__ = new Map();
  return globalThis.__dawn_mem__;
}
function memGet(kind: string): Map<string, KVRow> {
  const m = mem();
  if (!m.has(kind)) m.set(kind, new Map());
  return m.get(kind)!;
}
/* ---------- Detect environment ---------- */
const isServerless =
  !!process.env.VERCEL ||
  !!process.env.AWS_LAMBDA_FUNCTION_NAME ||
  !!process.env.NETLIFY;
let sqliteDb: any = null;
/* ---------- Try to load SQLite only in local dev ---------- */
if (!isServerless) {
  try {
    // Dynamic require so Vercel build does not try to bundle it
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Database = require("better-sqlite3");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    const DATA_DIR = path.join(process.cwd(), "data");
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const DB_PATH = path.join(DATA_DIR, "dawn.db");
    sqliteDb = new Database(DB_PATH);
    sqliteDb.pragma("journal_mode = WAL");
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS kv (
        kind TEXT NOT NULL,
        id   TEXT NOT NULL,
        data TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        PRIMARY KEY (kind, id)
      );
      CREATE INDEX IF NOT EXISTS idx_kv_kind ON kv(kind);
    `);
    // eslint-disable-next-line no-console
    console.log("[DAWN DB] SQLite ready:", DB_PATH);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("[DAWN DB] SQLite unavailable, using in-memory:", (e as Error).message);
    sqliteDb = null;
  }
} else {
  // eslint-disable-next-line no-console
  console.log("[DAWN DB] Serverless env — using in-memory store");
}
/* ---------- Public KV interface ---------- */
export function kvPut(kind: string, id: string, data: unknown): void {
  const now = new Date().toISOString();
  const json = JSON.stringify(data);
  if (sqliteDb) {
    sqliteDb
      .prepare(
        `INSERT INTO kv (kind, id, data, updatedAt) VALUES (?, ?, ?, ?)
         ON CONFLICT(kind, id) DO UPDATE SET data = excluded.data, updatedAt = excluded.updatedAt`
      )
      .run(kind, id, json, now);
    return;
  }
  memGet(kind).set(id, { id, data: json, updatedAt: now });
}
export function kvGet<T = unknown>(kind: string, id: string): T | null {
  if (sqliteDb) {
    const row = sqliteDb
      .prepare(`SELECT data FROM kv WHERE kind = ? AND id = ?`)
      .get(kind, id) as { data: string } | undefined;
    if (!row) return null;
    try {
      return JSON.parse(row.data) as T;
    } catch {
      return null;
    }
  }
  const row = memGet(kind).get(id);
  if (!row) return null;
  try {
    return JSON.parse(row.data) as T;
  } catch {
    return null;
  }
}
export function kvList<T = unknown>(kind: string): T[] {
  if (sqliteDb) {
    const rows = sqliteDb
      .prepare(`SELECT data FROM kv WHERE kind = ? ORDER BY updatedAt DESC`)
      .all(kind) as { data: string }[];
    const out: T[] = [];
    for (const r of rows) {
      try {
        out.push(JSON.parse(r.data) as T);
      } catch {}
    }
    return out;
  }
  const rows = Array.from(memGet(kind).values()).sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : -1
  );
  const out: T[] = [];
  for (const r of rows) {
    try {
      out.push(JSON.parse(r.data) as T);
    } catch {}
  }
  return out;
}
export function kvDelete(kind: string, id: string): void {
  if (sqliteDb) {
    sqliteDb.prepare(`DELETE FROM kv WHERE kind = ? AND id = ?`).run(kind, id);
    return;
  }
  memGet(kind).delete(id);
}
export function kvCount(kind: string): number {
  if (sqliteDb) {
    const row = sqliteDb
      .prepare(`SELECT COUNT(*) as c FROM kv WHERE kind = ?`)
      .get(kind) as { c: number };
    return row?.c ?? 0;
  }
  return memGet(kind).size;
}