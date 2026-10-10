import { NextResponse } from 'next/server';
export async function GET() {
    return NextResponse.json({ ok: true, live: null, message: 'Live score API ready' });
}
export async function POST(request: Request) {
    try {
        const body = await request.json();
        return NextResponse.json({ ok: true, message: 'Score updated', data: body });
    } catch (error) {
        return NextResponse.json({ ok: false, message: 'Failed' }, { status: 500 });
    }
}
