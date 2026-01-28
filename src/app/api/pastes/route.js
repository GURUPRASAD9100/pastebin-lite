export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.content) {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 });
    }

    const paste = await prisma.paste.create({
      data: {
        id: nanoid(8),
        content: body.content,
        maxViews: body.max_views ?? null,
        expiresAt: body.ttl_seconds
          ? new Date(Date.now() + body.ttl_seconds * 1000)
          : null,
      },
    });

    return NextResponse.json({ id: paste.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
