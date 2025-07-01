import SidebarDashboard from "./SidebarDashboard";
import { getCurrentUser } from "src/lib/helper/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser(); //SSR
 
  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="flex bg-muted min-h-screen">
      <SidebarDashboard />
      <main className="flex-1 ml-[72px] lg:ml-[240px] p-6">{children}</main>
    </div>
  );
}
