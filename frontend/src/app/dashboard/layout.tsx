import SidebarDashboard from "./SidebarDashboard";
import { getCurrentUser } from "src/lib/helper/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { getSettingsInfo } from "src/lib/data/getSettingInfo";
import { UserInfoProvider } from "./providers/UserInfoProvider";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  if (!user.isOnboardingCompleted) {
    redirect("/onBoarding");
  }

  const settingInfo = await getSettingsInfo();

  if (!settingInfo) return null;

  return (
    <UserInfoProvider settingInfo={settingInfo}>
      <div className="flex bg-muted min-h-screen">
        <SidebarDashboard />
        <main className="flex-1 ml-[72px] lg:ml-[240px] p-6">{children}</main>
      </div>
    </UserInfoProvider>
  );
}
