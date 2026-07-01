import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  checkAdminCredentials,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  if (!checkAdminCredentials(username, password)) {
    return NextResponse.json({ error: "INVALID_CREDENTIALS" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, await createSessionToken(), sessionCookieOptions);
  return response;
}
