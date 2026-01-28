import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string" || content.trim() === "") {
    return res.status(400).json({ error: "Invalid content" });
  }

  const paste = await prisma.paste.create({
    data: {
      id: nanoid(8),
      content,
      maxViews: max_views ?? null,
      expiresAt: ttl_seconds
        ? new Date(Date.now() + ttl_seconds * 1000)
        : null,
    },
  });

  res.status(200).json({
    id: paste.id,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${paste.id}`,
  });
}
