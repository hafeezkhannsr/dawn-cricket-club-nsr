import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readSheet } from "@/lib/sheets";
export async function GET() {
    try {
        const cookieStore = await cookies();
        const userEmail = cookieStore.get("user_email")?.value;
        if (!userEmail) {
            return NextResponse.json({ ok: false, message: "Not logged in" }, { status: 401 });
        }
        const allMatches = await readSheet("MatchCreations");
        const myMatches = allMatches.filter((m: any) => m.CreatedBy === userEmail);
        return NextResponse.json({
            ok: true,
            matches: myMatches.reverse(),
            count: myMatches.length,
        });
    } catch (error) {
        return NextResponse.json({ ok: false, message: "Failed to fetch" }, { status: 500 });
    }
}
