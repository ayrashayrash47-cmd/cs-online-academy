"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid username or password.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-4">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-charcoal-2 p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold">
            <GraduationCap className="h-6 w-6 text-gold" />
          </span>
          <h1 className="mt-4 text-lg font-bold text-white">{siteConfig.name} Admin</h1>
          <p className="mt-1 text-sm text-white/50">Sign in to manage enrollments</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-2.5 text-sm text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-2.5 text-sm text-white focus:border-gold focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-500/15 px-4 py-2.5 text-sm text-red-300">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-orange px-6 py-3 text-sm font-bold text-charcoal disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
