"use client";

import { useState } from "react";
import { STATUS_OPTIONS } from "@/lib/constants";
import type { JobCreateInput, Job, JobStatus } from "@/lib/api";

interface Props {
  initial?: Job;
  onSubmit: (data: JobCreateInput) => Promise<void>;
  submitLabel: string;
}

export default function JobForm({ initial, onSubmit, submitLabel }: Props) {
  const [company, setCompany] = useState(initial?.company ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [link, setLink] = useState(initial?.link ?? "");
  const [status, setStatus] = useState<JobStatus>(initial?.status ?? "applied");
  const [appliedDate, setAppliedDate] = useState(
    initial?.applied_date ?? new Date().toISOString().slice(0, 10),
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!company.trim() || !role.trim()) {
      setError("Company and role are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onSubmit({
        company: company.trim(),
        role: role.trim(),
        link: link.trim() || undefined,
        status: status as JobCreateInput["status"],
        applied_date: appliedDate,
        notes: notes.trim() || undefined,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded bg-red-50 p-2 text-sm text-red-600">{error}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Company *</label>
          <input
            className={inputClass}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Google"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Role *</label>
          <input
            className={inputClass}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Job Link</label>
        <input
          className={inputClass}
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <select
            className={inputClass}
            value={status}
            onChange={(e) => setStatus(e.target.value as JobStatus)}
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Applied Date *
          </label>
          <input
            type="date"
            className={inputClass}
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Notes</label>
        <textarea
          className={inputClass}
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Referral from a friend, etc."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
