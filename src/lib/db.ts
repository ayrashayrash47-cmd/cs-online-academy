import path from "path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

// Reuse a single PrismaClient across hot reloads in dev so we don't
// exhaust SQLite connections every time a file is edited.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// DATABASE_URL is "file:./dev.db", resolved relative to the project root
// (process.cwd()) — same convention the Prisma CLI uses for this project.
const dbFile = (process.env.DATABASE_URL ?? "file:./dev.db").replace(/^file:/, "");
const adapter = new PrismaBetterSqlite3({
  url: path.isAbsolute(dbFile)
    ? dbFile
    : path.join(/* turbopackIgnore: true */ process.cwd(), dbFile),
});

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
