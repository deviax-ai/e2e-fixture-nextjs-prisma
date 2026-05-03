import { prisma } from "@/lib/db";

async function getNotes() {
  try {
    return await prisma.note.findMany({
      orderBy: { id: "desc" },
      take: 20,
    });
  } catch {
    // Render the empty state on cold-start before migrations land.
    return [] as { id: number; body: string; createdAt: Date }[];
  }
}

export default async function Home() {
  const notes = await getNotes();
  return (
    <main>
      <h1>Notes</h1>
      {notes.length === 0 ? (
        <p>
          No notes yet. POST to <code>/api/notes</code> with{" "}
          <code>{`{ body: "..." }`}</code>.
        </p>
      ) : (
        <ul>
          {notes.map((n) => (
            <li key={n.id}>{n.body}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
