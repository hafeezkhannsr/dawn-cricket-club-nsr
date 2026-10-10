import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET() {
    try {
        const cookieStore = await cookies();
        const email = cookieStore.get("user_email")?.value;
        const name = cookieStore.get("user_name")?.value;
        const role = cookieStore.get("user_role")?.value || "user";
        if (email) {
            return NextResponse.json({
                ok: true,
                isLoggedIn: true,
                user: { email, name, role },
            });
        }
        return NextResponse.json({ ok: false, isLoggedIn: false }, { status: 401 });
    } catch (err) {
        return NextResponse.json({ ok: false, isLoggedIn: false }, { status: 401 });
    }
}
