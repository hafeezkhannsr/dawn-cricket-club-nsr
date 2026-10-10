import { NextResponse } from 'next/server';
export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const adminUser = process.env.ADMIN_USERNAME;
        const adminPass = process.env.ADMIN_PASSWORD;
        if (email === adminUser && password === adminPass) {
            const response = NextResponse.json({ ok: true, message: 'Login successful' });
            response.cookies.set('admin_session', 'true', { httpOnly: true, secure: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
            return response;
        }
        return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
    }
}
