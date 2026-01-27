import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Simple DB check
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ ok: true });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
