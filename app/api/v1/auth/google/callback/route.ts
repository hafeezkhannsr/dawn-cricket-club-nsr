import { NextResponse } from "next/server";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_URL || "https://dawn-cricket-club-nsr.vercel.app";
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
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
        // Determine role
        const adminEmail = process.env.ADMIN_USERNAME || "hafeezkhannsr@gmail.com";
        const isAdminUser = googleUser.email === adminEmail;
        const userRole = isAdminUser ? "admin" : "user";
        const userId = "USR-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();
        // Save to Google Sheet via Webhook
        if (SCRIPT_URL) {
            try {
                await fetch(SCRIPT_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        sheet: "Users",
                        ID: userId,
                        Email: googleUser.email,
                        Name: googleUser.name || "",
                        Picture: googleUser.picture || "",
                        Phone: "",
                        Role: userRole,
                        Status: "active",
                        ClubID: "",
                        CreatedAt: new Date().toISOString(),
                        LastLogin: new Date().toISOString(),
                    }),
                });
            } catch (webhookErr) {
                console.error("Webhook error:", webhookErr);
            }
        }
        // Set cookies
        const response = NextResponse.redirect(`${APP_URL}/dashboard`);
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "lax" as const,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        };
        response.cookies.set("user_email", googleUser.email, cookieOptions);
        response.cookies.set("user_name", googleUser.name || "", cookieOptions);
        response.cookies.set("user_role", userRole, cookieOptions);
        response.cookies.set("user_id", userId, cookieOptions);
        response.cookies.set("user_picture", googleUser.picture || "", {
            ...cookieOptions,
            httpOnly: false,
        });
        return response;
    } catch (err) {
        console.error("Google callback error:", err);
        return NextResponse.redirect(`${APP_URL}/login?error=callback_failed`);
    }
}
