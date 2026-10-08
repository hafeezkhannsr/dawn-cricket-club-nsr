import { NextRequest, NextResponse } from "next/server";
import { listAll } from "@/lib/server/registration-store";
import { buildCsv, buildTsv, buildJson } from "@/lib/server/exports";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const format = (searchParams.get("format") || "csv").toLowerCase();
  const status = searchParams.get("status") || "";
  const program = searchParams.get("program") || "";
  let items = listAll();
  if (status) items = items.filter((r) => r.status === status);
  if (program) items = items.filter((r) => r.program === program);
  const stamp = new Date().toISOString().slice(0, 10);
  if (format === "csv") {
    const csv = buildCsv(items);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="dawn-registrations-${stamp}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }
  if (format === "tsv") {
    const tsv = buildTsv(items);
    return new NextResponse(tsv, {
      headers: {
        "Content-Type": "text/tab-separated-values; charset=utf-8",
        "Content-Disposition": `attachment; filename="dawn-registrations-${stamp}.tsv"`,
        "Cache-Control": "no-store",
      },
    });
  }
  if (format === "json") {
    return NextResponse.json({ ok: true, items: buildJson(items) });
  }
  return NextResponse.json({ ok: false, error: "Unknown format" }, { status: 400 });
}