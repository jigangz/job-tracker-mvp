"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// mock stats to show the dashboard feel without auth
const MOCK_STATS = [
  { label: "Total Applied", value: 47, icon: "📋" },
  { label: "Phone Screens", value: 8, icon: "📞" },
  { label: "Interviews", value: 5, icon: "💬" },
  { label: "Offers", value: 2, icon: "🎉" },
];

const FEATURES = [
  {
    title: "Track Every Application",
    desc: "Log company, role, status, and notes for each job you apply to. Never lose track of where you stand.",
    icon: "📝",
    tech: "React state + REST API (FastAPI)",
  },
  {
    title: "Kanban Board View",
    desc: "Drag and drop jobs between stages — Applied → Phone Screen → Interview → Offer. Visual pipeline at a glance.",
    icon: "📌",
    tech: "@dnd-kit + optimistic updates",
  },
  {
    title: "Search & Filter",
    desc: "Debounced full-text search across company and role. Filter by status instantly.",
    icon: "🔍",
    tech: "Server-side query + useRef debounce",
  },
  {
    title: "Dashboard Stats",
    desc: "See your pipeline breakdown at a glance — how many applied, screening, interviewing, offers.",
    icon: "📊",
    tech: "Aggregation endpoint + stat cards",
  },
  {
    title: "CSV Export",
    desc: "One-click download of all your applications as a spreadsheet. Handy for sharing with mentors or career coaches.",
    icon: "📥",
    tech: "Streaming CSV response (FastAPI)",
  },
  {
    title: "JWT Authentication",
    desc: "Secure sign-up and login. Each user sees only their own data. Tokens auto-attach to every request.",
    icon: "🔐",
    tech: "bcrypt + PyJWT + localStorage",
  },
];

const TECH_STACK = [
  { layer: "Frontend", items: "Next.js 16 · TypeScript · Tailwind CSS · @dnd-kit" },
  { layer: "Backend", items: "FastAPI · SQLAlchemy · Alembic · Pydantic" },
  { layer: "Database", items: "PostgreSQL (Supabase)" },
  { layer: "Infra", items: "Vercel (frontend) · Render (API) · GitHub CI" },
];

// animated counter
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count >= target) return;
    const step = Math.max(1, Math.floor(target / 30));
    const timer = setTimeout(() => setCount((c) => Math.min(c + step, target)), 40);
    return () => clearTimeout(timer);
  }, [count, target]);
  return <>{count}</>;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav override — no auth header on landing */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <span className="text-lg font-bold tracking-tight">
            📋 Job Tracker
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-24">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 mb-6">
            Full-Stack MVP · React + FastAPI + PostgreSQL
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Stop losing track of
            <span className="block text-blue-600">job applications</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed">
            A clean, full-stack job application tracker built with Next.js, FastAPI,
            and PostgreSQL. Add jobs, drag them through your pipeline, search,
            filter, and export — all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all"
            >
              Try the Live Demo →
            </Link>
            <a
              href="https://github.com/jigangz/job-tracker-mvp"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 shadow-sm hover:border-gray-400 hover:shadow transition-all"
            >
              View Source Code
            </a>
          </div>
        </div>

        {/* Floating stat cards preview */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 px-4 sm:grid-cols-4">
          {MOCK_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border bg-white p-4 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-2xl">{s.icon}</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">
                <Counter target={s.value} />
              </div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Kanban Preview */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Your pipeline, visualized
            </h2>
            <p className="mt-3 text-gray-600">
              Drag jobs between columns. See where every application stands at a glance.
            </p>
          </div>

          {/* Mock kanban */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              { title: "Applied", color: "bg-blue-500", count: 12, items: ["Stripe — SWE Intern", "Google — SDE New Grad", "Shopify — Backend Dev"] },
              { title: "Phone Screen", color: "bg-yellow-500", count: 4, items: ["Amazon — SDE I", "Meta — Production Eng"] },
              { title: "Interview", color: "bg-orange-500", count: 3, items: ["Microsoft — SWE", "Netflix — UI Eng"] },
              { title: "Offer", color: "bg-green-500", count: 1, items: ["Datadog — SWE"] },
              { title: "Rejected", color: "bg-red-400", count: 5, items: ["Apple — iOS Dev", "Coinbase — Backend"] },
            ].map((col) => (
              <div key={col.title} className="rounded-xl bg-white border shadow-sm overflow-hidden">
                <div className={`${col.color} px-3 py-2 text-sm font-semibold text-white flex justify-between`}>
                  <span>{col.title}</span>
                  <span className="rounded-full bg-white/20 px-2 text-xs leading-5">{col.count}</span>
                </div>
                <div className="p-2 space-y-2">
                  {col.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-700 shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">
              What&apos;s inside
            </h2>
            <p className="mt-3 text-gray-600">
              Every feature built end-to-end — from UI component to API endpoint to database query.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                <div className="mt-4 inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-mono text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  {f.tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-gray-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-3xl font-bold mb-12">Tech Stack</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {TECH_STACK.map((t) => (
              <div key={t.layer} className="rounded-xl bg-gray-800 p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                  {t.layer}
                </div>
                <div className="text-base text-gray-300">{t.items}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Architecture</h2>
          <div className="rounded-2xl border bg-gray-50 p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <div className="rounded-xl bg-blue-100 border border-blue-200 px-6 py-4 text-center">
                <div className="font-bold text-blue-800">Next.js Frontend</div>
                <div className="text-blue-600 text-xs mt-1">Vercel</div>
              </div>
              <div className="text-gray-400 text-xl">→</div>
              <div className="rounded-xl bg-green-100 border border-green-200 px-6 py-4 text-center">
                <div className="font-bold text-green-800">FastAPI Backend</div>
                <div className="text-green-600 text-xs mt-1">Render</div>
              </div>
              <div className="text-gray-400 text-xl">→</div>
              <div className="rounded-xl bg-purple-100 border border-purple-200 px-6 py-4 text-center">
                <div className="font-bold text-purple-800">PostgreSQL</div>
                <div className="text-purple-600 text-xs mt-1">Supabase</div>
              </div>
            </div>
            <div className="mt-6 text-xs text-gray-500 space-y-1">
              <p>JWT auth · CORS configured · Alembic migrations · Session pooler connection</p>
              <p>Monorepo structure: <code className="bg-gray-200 px-1 rounded">apps/web</code> + <code className="bg-gray-200 px-1 rounded">apps/api</code></p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            See it in action
          </h2>
          <p className="text-blue-100 mb-8">
            Create an account, add a few jobs, drag them around the kanban board, export to CSV.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-white px-8 py-3 text-base font-semibold text-blue-600 shadow-lg hover:shadow-xl transition-all"
            >
              Try Live Demo
            </Link>
            <a
              href="https://github.com/jigangz/job-tracker-mvp"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-blue-400 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-all"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500">
          <p>
            Built by{" "}
            <a
              href="https://github.com/jigangz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Harry Zhou
            </a>{" "}
            — a full-stack project for my SWE job search.
          </p>
          <p className="mt-1 text-gray-400">
            Next.js · FastAPI · PostgreSQL · 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
