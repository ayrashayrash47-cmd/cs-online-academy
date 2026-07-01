import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const enrollments = await db.enrollment.findMany({ orderBy: { createdAt: "desc" } });

  const header = [
    "ID",
    "Full Name",
    "Grade",
    "WhatsApp",
    "Email",
    "Plan",
    "Payment Method",
    "Transaction ID",
    "Status",
    "Submitted At",
  ];

  const rows = enrollments.map((e) =>
    [
      String(e.id),
      e.fullName,
      e.grade,
      e.whatsapp,
      e.email ?? "",
      e.plan,
      e.paymentMethod,
      e.transactionId ?? "",
      e.status,
      e.createdAt.toISOString(),
    ]
      .map(csvEscape)
      .join(",")
  );

  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="enrollments-${Date.now()}.csv"`,
    },
  });
}
