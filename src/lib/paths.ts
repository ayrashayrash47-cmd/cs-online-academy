import path from "path";

/**
 * Resolve DATABASE_URL ("file:./dev.db" or an absolute "file:/app/data/dev.db")
 * to a real filesystem path, and derive the uploads directory as a sibling
 * of the database file. Keeping both under one directory means a single
 * mounted volume (e.g. Railway's /app/data) persists both across deploys.
 */
function resolveDbPath(): string {
  const dbFile = (process.env.DATABASE_URL ?? "file:./dev.db").replace(/^file:/, "");
  return path.isAbsolute(dbFile)
    ? dbFile
    : path.join(/* turbopackIgnore: true */ process.cwd(), dbFile);
}

export const dbPath = resolveDbPath();
export const dataDir = path.dirname(dbPath);
export const uploadsDir = path.join(dataDir, "uploads");
