import { NextResponse } from 'next/server';
export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        const adminUser = process.env.ADMIN_USERNAME || 'NSR_ADMIN';
        if (email === adminUser) {
            return NextResponse.json({ ok: true, message: 'Password reset link sent to your email (Simulated). Please check Vercel to reset.' });
        }
        return NextResponse.json({ ok: false, message: 'Email not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
    }
}
