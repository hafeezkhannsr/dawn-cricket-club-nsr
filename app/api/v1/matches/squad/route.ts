import { NextResponse } from "next/server";
import { readSheet } from "@/lib/sheets";
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const matchId = searchParams.get("matchId");
        const teamName = searchParams.get("teamName");
        if (!matchId) {
            return NextResponse.json({ ok: false, message: "Match ID required" }, { status: 400 });
        }
        const allSquads = await readSheet("Squads");
        let filtered = allSquads.filter((s: any) => s.MatchID === matchId);
        if (teamName) {
            filtered = filtered.filter((s: any) => s.TeamName === teamName);
        }
        return NextResponse.json({
            ok: true,
            squad: filtered,
            count: filtered.length,
        });
    } catch (error) {
        return NextResponse.json({ ok: false, message: "Failed" }, { status: 500 });
    }
}
