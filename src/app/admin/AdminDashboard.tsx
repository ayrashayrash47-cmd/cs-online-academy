"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  LogOut,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  GraduationCap,
  Users,
  Wallet,
  BadgeCheck,
} from "lucide-react";
import { siteConfig, type EnrollmentStatus } from "@/config/site";

type Enrollment = {
  id: number;
  fullName: string;
  grade: string;
  whatsapp: string;
  email: string | null;
  plan: string;
  paymentMethod: string;
  transactionId: string | null;
  screenshotPath: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-300",
  verified: "bg-emerald-100 text-emerald-800 border-emerald-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
};

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  verified: CheckCircle2,
  rejected: XCircle,
};

function planLabel(planId: string) {
  return siteConfig.pricing.find((p) => p.id === planId)?.id === planId
    ? planId === "math"
      ? "Math Only"
      : planId === "all"
      ? "All Subjects Bundle"
      : planId
    : planId;
}

function planPrice(planId: string) {
  return siteConfig.pricing.find((p) => p.id === planId)?.priceRs ?? 0;
}

export function AdminDashboard({
  initialEnrollments,
}: {
  initialEnrollments: Enrollment[];
}) {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const stats = useMemo(() => {
    const total = enrollments.length;
    const pending = enrollments.filter((e) => e.status === "pending").length;
    const verified = enrollments.filter((e) => e.status === "verified").length;
    const revenue = enrollments
      .filter((e) => e.status === "verified")
      .reduce((sum, e) => sum + planPrice(e.plan), 0);
    return { total, pending, verified, revenue };
  }, [enrollments]);

  const filtered = useMemo(() => {
    return enrollments.filter((e) => {
      if (planFilter !== "all" && e.plan !== planFilter) return false;
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (gradeFilter !== "all" && e.grade !== gradeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = `${e.fullName} ${e.whatsapp} ${e.email ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [enrollments, planFilter, statusFilter, gradeFilter, search]);

  async function updateStatus(id: number, status: EnrollmentStatus) {
    setUpdatingId(id);
    const res = await fetch(`/api/admin/enrollments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setEnrollments((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: updated.status } : e))
      );
    }
    setUpdatingId(null);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-charcoal/10 bg-charcoal px-4 py-4 text-white sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold">
            <GraduationCap className="h-4 w-4 text-gold" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold">{siteConfig.name}</div>
            <div className="text-[11px] text-white/50">Admin Dashboard</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 hover:border-gold hover:text-gold"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard icon={Users} label="Total Students" value={stats.total} />
          <StatCard icon={Clock} label="Pending Payments" value={stats.pending} tone="amber" />
          <StatCard icon={BadgeCheck} label="Verified Payments" value={stats.verified} tone="emerald" />
          <StatCard
            icon={Wallet}
            label="Est. Monthly Revenue"
            value={`Rs. ${stats.revenue.toLocaleString()}`}
            tone="gold"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-charcoal/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-charcoal/15 px-3 py-2">
            <Search className="h-4 w-4 text-charcoal/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, WhatsApp, or email"
              className="w-full text-sm outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="rounded-xl border border-charcoal/15 px-3 py-2 text-sm"
            >
              <option value="all">All Grades</option>
              {siteConfig.grades.map((g) => (
                <option key={g} value={g}>
                  Grade {g}
                </option>
              ))}
            </select>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="rounded-xl border border-charcoal/15 px-3 py-2 text-sm"
            >
              <option value="all">All Plans</option>
              {siteConfig.pricing.map((p) => (
                <option key={p.id} value={p.id}>
                  {planLabel(p.id)}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-charcoal/15 px-3 py-2 text-sm"
            >
              <option value="all">All Statuses</option>
              {siteConfig.enrollmentStatuses.map((s) => (
                <option key={s} value={s}>
                  {s[0].toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
            <a
              href="/api/admin/enrollments/export"
              className="flex items-center gap-1.5 rounded-xl bg-charcoal px-3 py-2 text-sm font-semibold text-white hover:bg-charcoal-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </a>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-charcoal/10 bg-white">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-charcoal/10 bg-charcoal/5 text-left text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Screenshot</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const StatusIcon = statusIcons[e.status] ?? Clock;
                return (
                  <tr key={e.id} className="border-b border-charcoal/5 last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-charcoal">{e.fullName}</div>
                      {e.email && <div className="text-xs text-charcoal/50">{e.email}</div>}
                    </td>
                    <td className="px-4 py-3 text-charcoal/70">{e.grade}</td>
                    <td className="px-4 py-3 text-charcoal/70">{e.whatsapp}</td>
                    <td className="px-4 py-3 text-charcoal/70">{planLabel(e.plan)}</td>
                    <td className="px-4 py-3 text-charcoal/70">
                      <div className="capitalize">{e.paymentMethod}</div>
                      {e.transactionId && (
                        <div className="text-xs text-charcoal/40">{e.transactionId}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`/api/uploads/${e.screenshotPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-12 w-12 overflow-hidden rounded-lg border border-charcoal/10"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/api/uploads/${e.screenshotPath}`}
                          alt="Payment screenshot"
                          className="h-full w-full object-cover"
                        />
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-charcoal/60">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
                          statusStyles[e.status] ?? statusStyles.pending
                        }`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => updateStatus(e.id, "verified")}
                          disabled={updatingId === e.id || e.status === "verified"}
                          className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => updateStatus(e.id, "rejected")}
                          disabled={updatingId === e.id || e.status === "rejected"}
                          className="rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-charcoal/40">
                    No enrollments match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone = "charcoal",
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  tone?: "charcoal" | "amber" | "emerald" | "gold";
}) {
  const toneStyles: Record<string, string> = {
    charcoal: "bg-charcoal text-gold",
    amber: "bg-amber-500 text-white",
    emerald: "bg-emerald-600 text-white",
    gold: "bg-gradient-to-br from-gold to-orange text-charcoal",
  };
  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-4">
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${toneStyles[tone]}`}>
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="mt-3 text-xl font-extrabold text-charcoal">{value}</div>
      <div className="text-xs text-charcoal/50">{label}</div>
    </div>
  );
}
