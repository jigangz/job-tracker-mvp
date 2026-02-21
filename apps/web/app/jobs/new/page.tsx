"use client";

import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { createJob, type JobCreateInput } from "@/lib/api";
import JobForm from "@/components/job-form";

export default function NewJobPage() {
  const { loading } = useAuthGuard();
  const router = useRouter();

  async function handleSubmit(data: JobCreateInput) {
    await createJob(data);
    router.push("/dashboard");
  }

  if (loading) {
    return <p className="mt-20 text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Add Application</h1>
      <div className="mt-6">
        <JobForm onSubmit={handleSubmit} submitLabel="Add Application" />
      </div>
    </div>
  );
}
