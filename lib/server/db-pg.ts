/* ============================================================
   Neon PostgreSQL — KV abstraction (type-safe)
   ============================================================ */
import { neon } from "@neondatabase/serverless";
type Row = { data: unknown };
let sql: any = null;
function getSql(): any {
  if (sql) return sql;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  sql = neon(url);
  return sql;
}
let initialized = false;
async function ensureTable(): Promise<void> {
  if (initialized) return;
  const s = getSql();
  if (!s) return;
  try {
    await s`
      CREATE TABLE IF NOT EXISTS kv (
        kind TEXT NOT NULL,
        id TEXT NOT NULL,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (kind, id)
      );
    `;
    await s`CREATE INDEX IF NOT EXISTS idx_kv_kind ON kv(kind);`;
    initialized = true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[DAWN PG] ensureTable failed:", (e as Error).message);
  }
}
export function isPostgresAvailable(): boolean {
  return !!process.env.DATABASE_URL;
}
export async function pgPut(kind: string, id: string, data: unknown): Promise<void> {
  const s = getSql();
  if (!s) return;
  await ensureTable();
  try {
    await s`
      INSERT INTO kv (kind, id, data, updated_at)
      VALUES (${kind}, ${id}, ${JSON.stringify(data)}, NOW())
      ON CONFLICT (kind, id)
      DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
    `;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[DAWN PG] pgPut failed:", (e as Error).message);
  }
}
export async function pgGet<T = unknown>(kind: string, id: string): Promise<T | null> {
  const s = getSql();
  if (!s) return null;
  await ensureTable();
  try {
    const rows = (await s`SELECT data FROM kv WHERE kind = ${kind} AND id = ${id} LIMIT 1`) as Row[];
    if (!rows || !Array.isArray(rows) || rows.length === 0) return null;
    return (rows[0] as { data: T }).data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[DAWN PG] pgGet failed:", (e as Error).message);
    return null;
  }
}
export async function pgList<T = unknown>(kind: string): Promise<T[]> {
  const s = getSql();
  if (!s) return [];
  await ensureTable();
  try {
    const rows = (await s`SELECT data FROM kv WHERE kind = ${kind} ORDER BY updated_at DESC`) as Row[];
    if (!rows || !Array.isArray(rows)) return [];
    return rows.map((r) => (r as { data: T }).data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[DAWN PG] pgList failed:", (e as Error).message);
    return [];
  }
}
export async function pgDelete(kind: string, id: string): Promise<void> {
  const s = getSql();
  if (!s) return;
  await ensureTable();
  try {
    await s`DELETE FROM kv WHERE kind = ${kind} AND id = ${id}`;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[DAWN PG] pgDelete failed:", (e as Error).message);
  }
}
export async function pgCount(kind: string): Promise<number> {
  const s = getSql();
  if (!s) return 0;
  await ensureTable();
  try {
    const rows = (await s`SELECT COUNT(*)::int as c FROM kv WHERE kind = ${kind}`) as Array<{ c: number }>;
    if (!rows || !Array.isArray(rows) || rows.length === 0) return 0;
    return rows[0].c;
  } catch {
    return 0;
  }
}