"use client";

import SidebarDashboard from "./SidebarDashboard";
import React, { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-muted min-h-screen">
      {/* sidebar */}
      <SidebarDashboard />
      {/* main content */}
      <main className="flex-1 ml-[72px] lg:ml-[240px] p-6">{children}</main>
    </div>
  );
}
