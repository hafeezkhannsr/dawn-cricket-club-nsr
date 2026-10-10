import { NextResponse } from "next/server";
export async function POST(request) {
    try {
        const body = await request.json();
        const email = body.email || body.username || "";
        const password = body.password || "";
        const ADMIN_EMAIL = process.env.ADMIN_USERNAME || "hafeezkhannsr@gmail.com";
        const ADMIN_PASS = process.env.ADMIN_PASSWORD || "DawnClub_2026!";
        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
            const res = NextResponse.json({ ok: true, message: "Login successful" });
            res.cookies.set("admin_session", "true", {
                httpOnly: true, secure: true, sameSite: "lax",
                path: "/", maxAge: 60 * 60 * 24 * 7
            });
            return res;
        }
        return NextResponse.json({ ok: false, message: "Invalid email or password" }, { status: 401 });
    } catch (err) {
        return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
    }
}
