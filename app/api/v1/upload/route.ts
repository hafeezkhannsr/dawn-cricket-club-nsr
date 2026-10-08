import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { saveFile } from "@/lib/server/file-store";
export const dynamic = "force-dynamic";
const MAX_SIZE_MB = 3;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body?.name || "file");
    const type = String(body?.type || "");
    const size = Number(body?.size || 0);
    const dataUrl = String(body?.dataUrl || "");
    if (!dataUrl.startsWith("data:")) {
      return NextResponse.json({ ok: false, error: "Invalid data URL" }, { status: 400 });
    }
    if (!ALLOWED.includes(type)) {
      return NextResponse.json({ ok: false, error: "File type not allowed" }, { status: 400 });
    }
    if (size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: `File too large (max ${MAX_SIZE_MB} MB)` }, { status: 400 });
    }
    const id = nanoid(16);
    const file = saveFile({
      id,
      name,
      size,
      type,
      dataUrl,
      uploadedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, id, url: `/api/v1/file/${id}` });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Upload failed" },
      { status: 500 }
    );
  }
}