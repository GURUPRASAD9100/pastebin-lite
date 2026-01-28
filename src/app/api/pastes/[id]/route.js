export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const paste = await prisma.paste.findUnique({
    where: { id: params.id },
  });

  if (!paste) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(JSON.stringify(paste), {
    headers: { "Content-Type": "application/json" },
  });
}
