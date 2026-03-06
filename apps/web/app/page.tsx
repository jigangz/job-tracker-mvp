"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/api";
import LandingPage from "./landing/page";

// if logged in → dashboard, otherwise → landing page
export default function Home() {
  const router = useRouter();
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    if (getToken()) {
      router.replace("/dashboard");
    } else {
      setShowLanding(true);
    }
  }, [router]);

  if (!showLanding) return null;
  return <LandingPage />;
}
