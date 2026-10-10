import { NextResponse } from 'next/server';
export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        const adminUser = process.env.ADMIN_USERNAME;
        if (email === adminUser) {
            return NextResponse.json({ ok: true, message: 'Reset link sent to your email.' });
        }
        return NextResponse.json({ ok: false, message: 'Email not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
    }
}
