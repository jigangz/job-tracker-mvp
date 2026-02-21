"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/dashboard" className="text-lg font-bold">
          Job Tracker
        </Link>

        {user && (
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <span className="text-gray-400">{user.email}</span>
            <button
              onClick={logout}
              className="text-gray-500 hover:text-red-600"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
