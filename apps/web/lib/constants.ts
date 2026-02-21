import type { JobStatus } from "./api";

export const STATUS_OPTIONS: { value: JobStatus; label: string; color: string }[] = [
  { value: "applied", label: "Applied", color: "bg-blue-100 text-blue-800" },
  { value: "phone_screen", label: "Phone Screen", color: "bg-yellow-100 text-yellow-800" },
  { value: "interview", label: "Interview", color: "bg-orange-100 text-orange-800" },
  { value: "offer", label: "Offer", color: "bg-green-100 text-green-800" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
];

export function statusLabel(s: JobStatus) {
  return STATUS_OPTIONS.find((o) => o.value === s)?.label ?? s;
}

export function statusColor(s: JobStatus) {
  return STATUS_OPTIONS.find((o) => o.value === s)?.color ?? "bg-gray-100 text-gray-800";
}
