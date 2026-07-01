/**
 * Minimal signed-cookie session for the single admin user.
 *
 * This is intentionally simple (no user table, no password hashing,
 * no rate limiting) — fine for a single-owner v1 site. Before handling
 * real payment data at scale, upgrade to a proper auth provider
 * (e.g. NextAuth) with hashed passwords and login rate limiting.
 *
 * Uses Web Crypto (SubtleCrypto) instead of Node's `crypto` module so
 * this file works in both the Node.js runtime (API routes) and the
 * Edge runtime (middleware).
 */

export const ADMIN_SESSION_COOKIE = "cs_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set. Add it to your .env file.");
  }
  return secret;
}

async function getKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string) {
  const key = await getKey();
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toHex(signature);
}

export async function createSessionToken(): Promise<string> {
  const issuedAt = Date.now().toString();
  const signature = await sign(issuedAt);
  return `${issuedAt}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;

  const expected = await sign(issuedAt);
  if (expected.length !== signature.length || expected !== signature) return false;

  const age = (Date.now() - Number(issuedAt)) / 1000;
  return age >= 0 && age < SESSION_MAX_AGE_SECONDS;
}

export function checkAdminCredentials(username: string, password: string): boolean {
  const expectedUsername = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  return username === expectedUsername && password === expectedPassword && password.length > 0;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
