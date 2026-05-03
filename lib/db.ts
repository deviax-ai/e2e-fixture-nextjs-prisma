import { PrismaClient } from "@prisma/client";

// Cache the Prisma client across hot-reloads in dev (Next.js
// repeatedly re-imports modules in development).
declare global {
  // eslint-disable-next-line no-var
  var _prisma: PrismaClient | undefined;
}

export const prisma =
  global._prisma ??
  new PrismaClient({
    // Prisma defaults to env DATABASE_URL — schema.prisma already
    // wires that. Keeping options minimal.
  });

if (process.env.NODE_ENV !== "production") {
  global._prisma = prisma;
}
