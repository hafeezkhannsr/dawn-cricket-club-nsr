import { NextResponse } from "next/server";
import { readSheet } from "@/lib/sheets";
export async function GET() {
    try { const teams = await readSheet("Teams"); return NextResponse.json({ ok: true, teams: teams }); }
    catch { return NextResponse.json({ ok: false, message: "Failed" }, { status: 500 }); }
}
