import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export default async function PastePage({ params }) {
  // ✅ Defensive check (prevents undefined crash)
  if (!params || !params.id) {
    notFound();
  }

  const id = params.id;

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) notFound();

  // Expiry checks
  if (paste.expiresAt && new Date() > paste.expiresAt) notFound();
  if (paste.maxViews !== null && paste.views >= paste.maxViews) notFound();

  return (
    <main style={{ padding: 20 }}>
      <h1>Paste</h1>
      <pre>{escapeHtml(paste.content)}</pre>
    </main>
  );
}
