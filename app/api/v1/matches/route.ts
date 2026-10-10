import { NextResponse } from "next/server";
import { readSheet } from "@/lib/sheets";
export async function GET() {
    try {
        const matches = await readSheet("Matches");
        return NextResponse.json({ ok: true, matches });
    } catch {
        return NextResponse.json({ ok: false, message: "Failed" }, { status: 500 });
    }
}
