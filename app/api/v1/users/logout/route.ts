import { NextResponse } from "next/server";
export async function POST() {
    const res = NextResponse.json({ ok: true, message: "Logged out" });
    res.cookies.delete("user_email");
    res.cookies.delete("user_name");
    res.cookies.delete("user_picture");
    res.cookies.delete("user_role");
    return res;
}
