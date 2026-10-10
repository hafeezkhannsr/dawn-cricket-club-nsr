import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const userEmail = cookieStore.get("user_email")?.value;
        if (!userEmail) {
            return NextResponse.json({ ok: false, message: "Not logged in" }, { status: 401 });
        }
        const body = await request.json();
        const { matchId, teamName, players } = body;
        if (!matchId || !teamName || !players || players.length === 0) {
            return NextResponse.json({ ok: false, message: "Missing data" }, { status: 400 });
        }
        if (players.length !== 11) {
            return NextResponse.json({ ok: false, message: "Playing XI must have exactly 11 players" }, { status: 400 });
        }
        // Save each player as a row in Squads sheet
        let savedCount = 0;
        for (const player of players) {
            const squadRow = {
                sheet: "Squads",
                ID: "SQD-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
                MatchID: matchId,
                TeamName: teamName,
                PlayerID: player.id || "",
                PlayerName: player.name || "",
                Role: player.role || "Player",
                IsCaptain: player.isCaptain ? "yes" : "no",
                IsWicketKeeper: player.isWicketKeeper ? "yes" : "no",
                CreatedAt: new Date().toISOString(),
            };
            if (SCRIPT_URL) {
                await fetch(SCRIPT_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(squadRow),
                });
                savedCount++;
            }
        }
        return NextResponse.json({
            ok: true,
            message: "Squad saved successfully",
            playersSaved: savedCount,
        });
    } catch (err) {
        console.error("Squad save error:", err);
        return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
    }
}
