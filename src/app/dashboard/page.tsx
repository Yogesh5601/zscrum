"use client";
import DashboardPage from "@/view/Dashboard";
import { useSession } from "next-auth/react";
export default function Dashboard() {
  const { data: session, status } = useSession();

  console.log(session?.user.name)

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Login first to access the dashboard.</p>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-900">
      <DashboardPage />
    </div>
  );
}
