import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  const paste = await prisma.paste.findUnique({ where: { id } });

  if (!paste) return res.status(404).json({ error: "Not found" });

  if (paste.expiresAt && new Date() > paste.expiresAt) {
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    return res.status(404).json({ error: "View limit exceeded" });
  }

  await prisma.paste.update({
    where: { id },
    data: { views: { increment: 1 } },
  });

  res.status(200).json({
    content: paste.content,
    remaining_views:
      paste.maxViews !== null ? paste.maxViews - paste.views - 1 : null,
    expires_at: paste.expiresAt,
  });
}
