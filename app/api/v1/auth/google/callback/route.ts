import { NextResponse } from "next/server";
import { readSheet } from "@/lib/sheets";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_URL || "https://dawn-cricket-club-nsr.vercel.app";
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get("code");
        if (!code) {
            return NextResponse.redirect(`${APP_URL}/login?error=no_code`);
        }
        const redirectUri = `${APP_URL}/api/v1/auth/google/callback`;
        // Exchange code for tokens
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID || "",
                client_secret: GOOGLE_CLIENT_SECRET || "",
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });
        const tokens = await tokenRes.json();
        if (!tokens.access_token) {
            return NextResponse.redirect(`${APP_URL}/login?error=token_failed`);
        }
        // Get user info from Google
        const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        const googleUser = await userRes.json();
        if (!googleUser.email) {
            return NextResponse.redirect(`${APP_URL}/login?error=no_email`);
        }
        // Check if user is admin
        const adminEmail = process.env.ADMIN_USERNAME || "hafeezkhannsr@gmail.com";
        const isAdminUser = googleUser.email === adminEmail;
        // Save user to Google Sheet (optional - we will add later)
        // For now, just set session cookie
        const response = NextResponse.redirect(`${APP_URL}/dashboard`);
        response.cookies.set("user_email", googleUser.email, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        response.cookies.set("user_name", googleUser.name || "", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        response.cookies.set("user_picture", googleUser.picture || "", {
            httpOnly: false,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        response.cookies.set("user_role", isAdminUser ? "admin" : "user", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        return response;
    } catch (err) {
        console.error("Google callback error:", err);
        return NextResponse.redirect(`${APP_URL}/login?error=callback_failed`);
    }
}
