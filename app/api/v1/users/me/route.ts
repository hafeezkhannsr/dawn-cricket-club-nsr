import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserByEmail } from "@/lib/users/manager";
export async function GET() {
    try {
        const cookieStore = await cookies();
        const email = cookieStore.get("user_email")?.value;
        if (!email) {
            return NextResponse.json(
                { ok: false, isLoggedIn: false },
                { status: 401 }
            );
        }
        // Try to get full user data from sheet
        const user = await getUserByEmail(email);
        if (user) {
            return NextResponse.json({
                ok: true,
                isLoggedIn: true,
                user: {
                    email: user.Email,
                    name: user.Name,
                    picture: user.Picture,
                    role: user.Role,
                    status: user.Status,
                },
            });
        }
        // Fallback to cookie data
        return NextResponse.json({
            ok: true,
            isLoggedIn: true,
            user: {
                email,
                name: cookieStore.get("user_name")?.value || "",
                picture: cookieStore.get("user_picture")?.value || "",
                role: cookieStore.get("user_role")?.value || "user",
                status: "active",
            },
        });
    } catch (err) {
        return NextResponse.json(
            { ok: false, isLoggedIn: false },
            { status: 401 }
        );
    }
}
