import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const userEmail = cookieStore.get("user_email")?.value;
        const userName = cookieStore.get("user_name")?.value || "";
        if (!userEmail) {
            return NextResponse.json({ ok: false, message: "Not logged in" }, { status: 401 });
        }
        const body = await request.json();
        const { teamA, teamB, format, overs, venue, date, time } = body;
        if (!teamA || !teamB || !venue || !date) {
            return NextResponse.json({ ok: false, message: "All fields required" }, { status: 400 });
        }
        if (teamA === teamB) {
            return NextResponse.json({ ok: false, message: "Teams must be different" }, { status: 400 });
        }
        const matchId = "MAT-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
        const matchData = {
            sheet: "MatchCreations",
            ID: matchId,
            TeamA: teamA,
            TeamB: teamB,
            Format: format || "T20",
            Overs: String(overs || 20),
            Venue: venue,
            Date: date,
            Time: time || "",
            Status: "upcoming",
            TossWinner: "",
            TossDecision: "",
            CreatedBy: userEmail,
            CreatedByName: userName,
            ClubID: "",
            TournamentID: "",
            Result: "",
            CreatedAt: new Date().toISOString(),
        };
        // Save to Google Sheet via Webhook
        if (SCRIPT_URL) {
            const webhookRes = await fetch(SCRIPT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(matchData),
            });
            const webhookData = await webhookRes.json();
            console.log("Webhook response:", webhookData);
        }
        return NextResponse.json({
            ok: true,
            message: "Match created successfully",
            match: matchData,
        });
    } catch (err) {
        console.error("Create match error:", err);
        return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
    }
}
