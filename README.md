# next-prisma-notes

Tiny Next.js + Prisma + Postgres notes app. Phase 2 fixture for the
[Deviax](https://github.com/deviax-ai/aura_deploy) e2e matrix —
exercises the Next.js + managed-DB + migrations path.

## Run locally

```sh
npm install
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/notes \
  npx prisma migrate deploy
npm run dev   # http://localhost:3000
```

## Routes

- `/` → server-rendered notes list
- `/api/notes` GET → `{notes: [...]}`
- `/api/notes` POST `{body}` → 201 with new note
- `/api/health` → 200 ok

## Seeded vibe-problems

| File | Line | What's wrong |
|---|---|---|
| `app/api/notes/route.ts` | 5 | Hardcoded `SESSION_SECRET` |
| `next.config.js` | — | No `output: 'standalone'` — bigger runtime image. AI should patch. |
| no `Dockerfile` | — | Needs multi-stage build with `prisma generate` + `prisma migrate deploy` before the app starts |

`DATABASE_URL` is correctly read from env via `schema.prisma`'s
`env("DATABASE_URL")` — the fixture is already 12-factor aware on
the DB side, so the platform's managed Postgres just works.

## License

MIT.
