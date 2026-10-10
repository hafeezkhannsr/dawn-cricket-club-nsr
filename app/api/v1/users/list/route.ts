import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/users/manager";
export async function GET() {
    try {
        const users = await getAllUsers();
        return NextResponse.json({
            ok: true,
            users,
            count: users.length,
        });
    } catch (error) {
        return NextResponse.json(
            { ok: false, message: "Failed to fetch users" },
            { status: 500 }
        );
    }
}
