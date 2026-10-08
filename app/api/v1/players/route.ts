import { NextRequest, NextResponse } from "next/server";
import { listAll } from "@/lib/server/registration-store";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const role = (searchParams.get("role") || "").trim();
  const category = (searchParams.get("category") || "").trim();
  const approved = (await listAll()).filter((r) => r.status === "APPROVED" && r.program === "DAWN");
  const items = approved.filter((r) => {
    const d = r.data as Record<string, unknown>;
    if (d.publicPhotoConsent !== true) return false;
    if (role && String(d.playingRole || "") !== role) return false;
    if (category && String(d.ageCategory || "") !== category) return false;
    if (q) { const hay = [d.fullNameEn, d.fatherName, d.playingRole, d.playingStyle, d.team, d.residenceCity, d.village, r.registrationNumber].map((v) => String(v ?? "").toLowerCase()).join(" "); return hay.includes(q); }
    return true;
  });
  return NextResponse.json({ ok: true, items: items.map((r) => { const d = r.data as Record<string, unknown>; return { id: r.id, registrationNumber: r.registrationNumber, name: String(d.fullNameEn || "Player"), fatherName: String(d.fatherName || ""), ageCategory: String(d.ageCategory || ""), playingRole: String(d.playingRole || ""), battingStyle: String(d.battingStyle || ""), bowlingStyle: String(d.bowlingStyle || ""), ballType: String(d.ballType || ""), playerCategory: String(d.playerCategory || ""), city: String(d.residenceCity || ""), village: String(d.village || ""), province: String(d.province || ""), registeredAt: r.createdAt }; }) });
}