import { prisma } from "@/lib/db";

// FIXME: hardcoded session secret. Anyone reading the bundle can
// forge tokens — should be process.env.SESSION_SECRET.
const SESSION_SECRET = "dev-only-notes-secret-change-me";

export async function GET() {
  const notes = await prisma.note.findMany({ orderBy: { id: "desc" } });
  return Response.json({ notes, secret_len: SESSION_SECRET.length });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const text = (body && body.body) || "";
  if (!text.trim()) {
    return new Response(JSON.stringify({ error: "body required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  const note = await prisma.note.create({ data: { body: text.trim() } });
  return Response.json(note, { status: 201 });
}
