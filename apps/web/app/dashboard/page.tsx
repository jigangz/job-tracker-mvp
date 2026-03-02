"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useAuthGuard } from "@/lib/use-auth-guard";
import {
  listJobs,
  getJobStats,
  deleteJob,
  updateJob,
  exportCsv,
  type Job,
  type JobStats,
  type JobStatus,
} from "@/lib/api";
import StatCard from "@/components/stat-card";
import StatusBadge from "@/components/status-badge";
import ConfirmDialog from "@/components/confirm-dialog";
import KanbanBoard from "@/components/kanban-board";
import { STATUS_OPTIONS } from "@/lib/constants";

type ViewMode = "list" | "kanban";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuthGuard();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<JobStats | null>(null);
  const [statusFilter, setStatusFilter] = useState<JobStatus | "">("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [view, setView] = useState<ViewMode>("list");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fetchData = useCallback(
    async (status?: JobStatus | "", q?: string) => {
      setLoading(true);
      try {
        const [jobList, jobStats] = await Promise.all([
          listJobs({
            status: status || undefined,
            q: q || undefined,
          }),
          getJobStats(),
        ]);
        setJobs(jobList);
        setStats(jobStats);
      } catch {
        // auth guard handles redirect
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (user) fetchData(statusFilter, query);
  }, [user, statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchData(statusFilter, value);
    }, 300);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteJob(deleteTarget.id);
      setDeleteTarget(null);
      fetchData(statusFilter, query);
    } catch {
      // ignore
    } finally {
      setDeleting(false);
    }
  }

  async function handleKanbanStatusChange(jobId: string, newStatus: JobStatus) {
    await updateJob(jobId, { status: newStatus });
    fetchData(statusFilter, query);
  }

  if (authLoading) {
    return <p className="mt-20 text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      {/* header row */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportCsv()}
            className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
          >
            ↓ Export CSV
          </button>
          <Link
            href="/jobs/new"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Application
          </Link>
        </div>
      </div>

      {/* stat cards */}
      {stats && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <StatCard label="Applied" value={stats.applied} color="text-blue-600" />
          <StatCard label="Phone Screen" value={stats.phone_screen} color="text-yellow-600" />
          <StatCard label="Interview" value={stats.interview} color="text-orange-600" />
          <StatCard label="Offer" value={stats.offer} color="text-green-600" />
          <StatCard label="Rejected" value={stats.rejected} color="text-red-600" />
        </div>
      )}

      {/* filters + view toggle */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as JobStatus | "")}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search company or role..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <div className="flex rounded-md border text-sm">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-2 ${view === "list" ? "bg-gray-100 font-medium" : ""}`}
          >
            List
          </button>
          <button
            onClick={() => setView("kanban")}
            className={`px-3 py-2 ${view === "kanban" ? "bg-gray-100 font-medium" : ""}`}
          >
            Kanban
          </button>
        </div>
      </div>

      {/* content */}
      {loading ? (
        <p className="mt-8 text-center text-gray-400">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-gray-400">No applications yet.</p>
          <Link
            href="/jobs/new"
            className="mt-2 inline-block text-sm text-blue-600 hover:underline"
          >
            Add your first one →
          </Link>
        </div>
      ) : view === "kanban" ? (
        <div className="mt-4">
          <KanbanBoard jobs={jobs} onStatusChange={handleKanbanStatusChange} />
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="pb-2 pr-4 font-medium">Company</th>
                <th className="pb-2 pr-4 font-medium">Role</th>
                <th className="pb-2 pr-4 font-medium">Status</th>
                <th className="pb-2 pr-4 font-medium">Applied</th>
                <th className="pb-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-medium">{job.company}</td>
                  <td className="py-3 pr-4">{job.role}</td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="py-3 pr-4 text-gray-500">
                    {job.applied_date}
                  </td>
                  <td className="py-3 space-x-2">
                    <Link
                      href={`/jobs/${job.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(job)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete application"
        message={`Remove ${deleteTarget?.company} — ${deleteTarget?.role}? This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
