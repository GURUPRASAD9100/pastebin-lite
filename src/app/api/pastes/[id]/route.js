import { prisma } from "@/lib/prisma";

function getNow(req) {
  if (process.env.TEST_MODE === "1") {
    const header = req.headers.get("x-test-now-ms");
    if (header) return new Date(Number(header));
  }
  return new Date();
}

export async function GET(req, { params }) {
  const id = params.id;

  const paste = await prisma.paste.findUnique({ where: { id } });

  if (!paste) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const now = getNow(req);

  if (paste.expiresAt && now > paste.expiresAt) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.paste.update({
    where: { id },
    data: { views: { increment: 1 } },
  });

  return Response.json({
    content: updated.content,
    remaining_views:
      updated.maxViews === null
        ? null
        : Math.max(0, updated.maxViews - updated.views),
    expires_at: updated.expiresAt ? updated.expiresAt.toISOString() : null,
  });
}
