import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { uploadsDir } from "@/lib/paths";

export async function POST(request: Request) {
  const formData = await request.formData();

  const fullName = String(formData.get("fullName") ?? "").trim();
  const grade = String(formData.get("grade") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const plan = String(formData.get("plan") ?? "").trim();
  const paymentMethod = String(formData.get("paymentMethod") ?? "").trim();
  const transactionId = String(formData.get("transactionId") ?? "").trim();
  const screenshot = formData.get("screenshot");

  if (
    !fullName ||
    !grade ||
    !whatsapp ||
    !plan ||
    !paymentMethod ||
    !(screenshot instanceof File) ||
    screenshot.size === 0
  ) {
    return NextResponse.json(
      { error: "MISSING_FIELDS", message: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  if (!(siteConfig.grades as readonly string[]).includes(grade)) {
    return NextResponse.json({ error: "INVALID_GRADE" }, { status: 400 });
  }
  if (!siteConfig.pricing.some((p) => p.id === plan)) {
    return NextResponse.json({ error: "INVALID_PLAN" }, { status: 400 });
  }
  if (!(siteConfig.paymentMethods as readonly string[]).includes(paymentMethod)) {
    return NextResponse.json({ error: "INVALID_PAYMENT_METHOD" }, { status: 400 });
  }
  if (!(siteConfig.upload.allowedTypes as readonly string[]).includes(screenshot.type)) {
    return NextResponse.json({ error: "INVALID_FILE_TYPE" }, { status: 400 });
  }
  if (screenshot.size > siteConfig.upload.maxSizeBytes) {
    return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
  }

  await mkdir(uploadsDir, { recursive: true });

  const ext = path.extname(screenshot.name) || ".jpg";
  const filename = `${Date.now()}-${randomUUID()}${ext}`;
  const bytes = Buffer.from(await screenshot.arrayBuffer());
  await writeFile(path.join(uploadsDir, filename), bytes);

  const enrollment = await db.enrollment.create({
    data: {
      fullName,
      grade,
      whatsapp,
      email: email || null,
      plan,
      paymentMethod,
      transactionId: transactionId || null,
      screenshotPath: filename,
      status: "pending",
    },
  });

  return NextResponse.json({ id: enrollment.id }, { status: 201 });
}
