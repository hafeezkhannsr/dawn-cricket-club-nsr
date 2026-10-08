import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQ = false;
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { cur.push(field); field = ""; }
      else if (c === "\n") { cur.push(field); rows.push(cur); cur = []; field = ""; }
      else if (c === "\r") { /* skip */ }
      else field += c;
    }
  }
  if (field.length > 0 || cur.length > 0) { cur.push(field); rows.push(cur); }
  return rows.filter((r) => r.some((v) => v.trim() !== ""));
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const csv = String(body.csv || "");
    if (!csv) return NextResponse.json({ ok: false, error: "Empty CSV" }, { status: 400 });
    const rows = parseCSV(csv.replace(/^\uFEFF/, ""));
    if (rows.length < 2) return NextResponse.json({ ok: false, error: "CSV must have header + at least 1 row" }, { status: 400 });
    const headers = rows[0];
    const data = rows.slice(1);
    // Preview only — real import requires DB
    const preview = data.slice(0, 20).map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h.trim()] = (row[i] || "").trim(); });
      return obj;
    });
    return NextResponse.json({
      ok: true,
      headers: headers.map((h) => h.trim()),
      rowCount: data.length,
      preview,
      note: "Preview only. Full import requires database connection (Neon PostgreSQL). Contact support to enable.",
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}