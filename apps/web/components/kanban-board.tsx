"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";
import type { Job, JobStatus } from "@/lib/api";
import { STATUS_OPTIONS, statusColor } from "@/lib/constants";

interface Props {
  jobs: Job[];
  onStatusChange: (jobId: string, newStatus: JobStatus) => Promise<void>;
}

function KanbanCard({ job, overlay }: { job: Job; overlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: job.id });

  const style = overlay
    ? {}
    : {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
      };

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      {...(overlay ? {} : { ...listeners, ...attributes })}
      className="cursor-grab rounded-md border bg-white p-3 shadow-sm hover:shadow"
    >
      <p className="text-sm font-medium">{job.company}</p>
      <p className="text-xs text-gray-500">{job.role}</p>
      <p className="mt-1 text-xs text-gray-400">{job.applied_date}</p>
    </div>
  );
}

function KanbanColumn({
  status,
  label,
  color,
  jobs,
}: {
  status: string;
  label: string;
  color: string;
  jobs: Job[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[200px] w-56 flex-shrink-0 flex-col rounded-lg border p-2 ${
        isOver ? "bg-blue-50" : "bg-gray-50"
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
        >
          {label}
        </span>
        <span className="text-xs text-gray-400">{jobs.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {jobs.map((job) => (
          <KanbanCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default function KanbanBoard({ jobs, onStatusChange }: Props) {
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleDragStart(event: DragStartEvent) {
    const job = jobs.find((j) => j.id === event.active.id);
    setActiveJob(job ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveJob(null);
    const { active, over } = event;
    if (!over) return;

    const jobId = active.id as string;
    const newStatus = over.id as JobStatus;
    const job = jobs.find((j) => j.id === jobId);
    if (!job || job.status === newStatus) return;

    await onStatusChange(jobId, newStatus);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 overflow-x-auto pb-4">
        {STATUS_OPTIONS.map((opt) => (
          <KanbanColumn
            key={opt.value}
            status={opt.value}
            label={opt.label}
            color={opt.color}
            jobs={jobs.filter((j) => j.status === opt.value)}
          />
        ))}
      </div>
      <DragOverlay>
        {activeJob ? <KanbanCard job={activeJob} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
