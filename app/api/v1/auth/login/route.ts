import { NextResponse } from "next/server";
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = (body.email || body.username || "").trim().toLowerCase();
        const password = (body.password || "").trim();
        const ADMIN_EMAIL = (process.env.ADMIN_USERNAME || "hafeezkhannsr@gmail.com").trim().toLowerCase();
        const ADMIN_PASS = (process.env.ADMIN_PASSWORD || "DawnClub_2026!").trim();
        console.log("Login attempt:", email);
        console.log("Expected email:", ADMIN_EMAIL);
        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
            const res = NextResponse.json({ 
                ok: true, 
                message: "Login successful",
                user: {
                    id: "admin-1",
                    email: ADMIN_EMAIL,
                    name: "Administrator",
                    role: "super_admin",
                    permissions: ["*"]
                }
            });
            res.cookies.set("admin_session", "true", {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            });
            return res;
        }
        return NextResponse.json({ 
            ok: false, 
            message: "Invalid email or password" 
        }, { status: 401 });
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json({ 
            ok: false, 
            message: "Server error" 
        }, { status: 500 });
    }
}
