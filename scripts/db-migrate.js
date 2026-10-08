/* ============================================================
   DB Migration Script
   Usage: node scripts/db-migrate.js
   ============================================================ */
const path = require("path");
const fs = require("fs");
async function main() {
  const hasPg = !!process.env.DATABASE_URL;
  console.log("[DAWN DB] Mode:", hasPg ? "PostgreSQL (Neon)" : "SQLite (local)");
  if (hasPg) {
    const { neon } = require("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL);
    console.log("[DAWN DB] Creating KV table...");
    await sql`
      CREATE TABLE IF NOT EXISTS kv (
        kind TEXT NOT NULL,
        id TEXT NOT NULL,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (kind, id)
      );
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_kv_kind ON kv(kind);`;
    console.log("[DAWN DB] ✓ PostgreSQL ready");
  } else {
    const Database = require("better-sqlite3");
    const DATA_DIR = path.join(process.cwd(), "data");
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const DB_PATH = path.join(DATA_DIR, "dawn.db");
    const db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS kv (
        kind TEXT NOT NULL,
        id TEXT NOT NULL,
        data TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        PRIMARY KEY (kind, id)
      );
      CREATE INDEX IF NOT EXISTS idx_kv_kind ON kv(kind);
    `);
    db.close();
    console.log("[DAWN DB] ✓ SQLite ready:", DB_PATH);
  }
}
main().catch((e) => {
  console.error("[DAWN DB] Migration failed:", e.message);
  process.exit(1);
});