export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  const paste = await prisma.paste.findUnique({
    where: { id: params.id },
  });

  if (!paste) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(
    JSON.stringify({
      content: paste.content,
      remaining_views:
        paste.maxViews !== null ? paste.maxViews - paste.views : null,
      expires_at: paste.expiresAt,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
