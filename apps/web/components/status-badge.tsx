import type { JobStatus } from "@/lib/api";
import { statusLabel, statusColor } from "@/lib/constants";

export default function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(status)}`}
    >
      {statusLabel(status)}
    </span>
  );
}
