export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    const body = await req.json();
    const { content, ttl_seconds, max_views } = body;

    // Validation
    if (!content || typeof content !== "string" || content.trim() === "") {
      return Response.json({ error: "Invalid content" }, { status: 400 });
    }

    if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
      return Response.json({ error: "Invalid ttl_seconds" }, { status: 400 });
    }

    if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1)) {
      return Response.json({ error: "Invalid max_views" }, { status: 400 });
    }

    const id = nanoid(8);
    const expiresAt = ttl_seconds
      ? new Date(Date.now() + ttl_seconds * 1000)
      : null;

    const paste = await prisma.paste.create({
      data: {
        id,
        content,
        expiresAt,
        maxViews: max_views ?? null,
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    return Response.json({
      id: paste.id,
      url: `${baseUrl}/p/${paste.id}`,
    });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
