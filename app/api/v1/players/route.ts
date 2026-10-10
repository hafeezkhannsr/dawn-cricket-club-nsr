import { NextResponse } from "next/server";
import { readSheet } from "@/lib/sheets";
export async function GET() {
    try {
        const players = await readSheet("Players");
        return NextResponse.json({ ok: true, players, count: players.length });
    } catch (error) {
        return NextResponse.json({ ok: false, message: "Failed" }, { status: 500 });
    }
}
