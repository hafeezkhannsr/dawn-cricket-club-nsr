import { NextResponse } from 'next/server';
export async function GET() {
    try {
        return NextResponse.json({ ok: true, matches: [], message: 'Matches API ready' });
    } catch (error) {
        return NextResponse.json({ ok: false, message: 'Failed' }, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const body = await request.json();
        return NextResponse.json({ ok: true, message: 'Match created', data: body });
    } catch (error) {
        return NextResponse.json({ ok: false, message: 'Failed' }, { status: 500 });
    }
}
