import { PrismaClient } from "@prisma/client";

/** Standard Next.js dev-mode singleton — without caching the client on
 * `globalThis`, every hot-reload in development would open a fresh
 * connection pool against Postgres until it's exhausted. In production
 * each serverless invocation gets its own module scope, so this is a
 * no-op there (still just one client per instance). */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
