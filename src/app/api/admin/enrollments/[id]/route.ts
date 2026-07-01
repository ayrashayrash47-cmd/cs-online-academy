import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await request.json();

  if (!(siteConfig.enrollmentStatuses as readonly string[]).includes(status)) {
    return NextResponse.json({ error: "INVALID_STATUS" }, { status: 400 });
  }

  const enrollment = await db.enrollment.update({
    where: { id: Number(id) },
    data: { status },
  });

  return NextResponse.json(enrollment);
}
