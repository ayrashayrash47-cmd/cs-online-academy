import { db } from "@/lib/db";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const enrollments = await db.enrollment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminDashboard
      initialEnrollments={enrollments.map((e) => ({
        ...e,
        createdAt: e.createdAt.toISOString(),
        updatedAt: e.updatedAt.toISOString(),
      }))}
    />
  );
}
