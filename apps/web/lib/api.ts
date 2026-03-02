const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

// simple fetch wrapper that attaches the JWT automatically
async function request<T>(
  path: string,
  opts: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, { ...opts, headers });

  if (res.status === 204) return undefined as unknown as T;

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.detail ?? "Something went wrong");
  }

  return res.json();
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// ---- Auth ----

interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserMe {
  id: string;
  email: string;
  created_at: string;
}

export async function register(email: string, password: string) {
  const data = await request<TokenResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("token", data.access_token);
  return data;
}

export async function login(email: string, password: string) {
  const data = await request<TokenResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("token", data.access_token);
  return data;
}

export async function getMe() {
  return request<UserMe>("/api/auth/me");
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

// ---- Jobs ----

export type JobStatus =
  | "applied"
  | "phone_screen"
  | "interview"
  | "offer"
  | "rejected";

export interface Job {
  id: string;
  company: string;
  role: string;
  link: string | null;
  status: JobStatus;
  applied_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobStats {
  applied: number;
  phone_screen: number;
  interview: number;
  offer: number;
  rejected: number;
  total: number;
}

export interface JobCreateInput {
  company: string;
  role: string;
  link?: string;
  status?: JobStatus;
  applied_date: string;
  notes?: string;
}

export type JobUpdateInput = Partial<JobCreateInput>;

export async function listJobs(params?: {
  status?: JobStatus;
  q?: string;
}) {
  const sp = new URLSearchParams();
  if (params?.status) sp.set("status", params.status);
  if (params?.q) sp.set("q", params.q);
  const qs = sp.toString();
  return request<Job[]>(`/api/jobs${qs ? `?${qs}` : ""}`);
}

export async function getJob(id: string) {
  return request<Job>(`/api/jobs/${id}`);
}

export async function createJob(data: JobCreateInput) {
  return request<Job>("/api/jobs", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateJob(id: string, data: JobUpdateInput) {
  return request<Job>(`/api/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteJob(id: string) {
  return request<void>(`/api/jobs/${id}`, { method: "DELETE" });
}

export async function getJobStats() {
  return request<JobStats>("/api/jobs/stats");
}

export async function exportCsv() {
  const token = getToken();
  const res = await fetch(
    `${BASE}/api/export/csv`,
    token ? { headers: { Authorization: `Bearer ${token}` } } : {},
  );
  if (!res.ok) throw new ApiError(res.status, "Export failed");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "job_applications.csv";
  a.click();
  URL.revokeObjectURL(url);
}
