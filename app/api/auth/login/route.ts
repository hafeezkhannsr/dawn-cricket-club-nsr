import { NextResponse } from 'next/server';
export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const adminUser = process.env.ADMIN_USERNAME || 'NSR_ADMIN';
        const adminPass = process.env.ADMIN_PASSWORD || 'NSR_ADMIN_2026';
        if (username === adminUser && password === adminPass) {
            const response = NextResponse.json({ ok: true, message: 'Login successful' });
            response.cookies.set('admin_session', 'true', { httpOnly: true, secure: true, path: '/' });
            return response;
        }
        return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
    }
}
