"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { getJob, updateJob, type Job, type JobCreateInput } from "@/lib/api";
import JobForm from "@/components/job-form";

export default function EditJobPage() {
  const { loading: authLoading } = useAuthGuard();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    getJob(id)
      .then(setJob)
      .catch(() => router.push("/dashboard"))
      .finally(() => setLoading(false));
  }, [id, authLoading, router]);

  async function handleSubmit(data: JobCreateInput) {
    await updateJob(id, data);
    router.push("/dashboard");
  }

  if (loading || authLoading) {
    return <p className="mt-20 text-center text-gray-400">Loading...</p>;
  }

  if (!job) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Application</h1>
      <div className="mt-6">
        <JobForm
          initial={job}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
