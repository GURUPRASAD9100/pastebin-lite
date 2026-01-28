export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const paste = await prisma.paste.findUnique({
      where: { id: params.id },
    });

    if (!paste) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      content: paste.content,
      remaining_views:
        paste.maxViews !== null ? paste.maxViews - paste.views : null,
      expires_at: paste.expiresAt,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
