import { NextResponse } from "next/server";
import { readSheet } from "@/lib/sheets";
export async function GET() {
    try {
        const matches = await readSheet("MatchCreations");
        return NextResponse.json({
            ok: true,
            matches: matches.reverse(), // Latest first
            count: matches.length,
        });
    } catch (error) {
        return NextResponse.json({ ok: false, message: "Failed to fetch matches" }, { status: 500 });
    }
}
