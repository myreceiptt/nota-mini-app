// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    // Untuk sekarang, cukup log dulu.
    console.log("Base Mini App webhook event:", body);

    // Nanti bisa kita kembangkan:
    // - simpan ke DB
    // - filter event.type === 'experience.saved' dsb
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Error handling webhook:", e);
    // Tetap balas 200 supaya Base tidak menganggap save gagal parah.
    return NextResponse.json({ success: false }, { status: 200 });
  }
}

// (Opsional) kalau Base ping GET, kita bisa tambahkan:
export async function GET() {
  return NextResponse.json({ ok: true });
}
