import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { uploadsDir } from "@/lib/paths";

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/heic",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { filename } = await params;
  const safeName = path.basename(filename);
  if (safeName !== filename) {
    return NextResponse.json({ error: "INVALID_FILENAME" }, { status: 400 });
  }

  try {
    const data = await readFile(path.join(uploadsDir, safeName));
    const contentType = contentTypes[path.extname(safeName).toLowerCase()] ?? "application/octet-stream";
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
}
