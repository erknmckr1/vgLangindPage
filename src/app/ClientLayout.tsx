"use client";
import { ReactNode } from "react";
import Navbar from "@/app/components/landing/Navbar";
import ReduxProvider from "@/lib/redux/Provider";
import { usePathname } from "next/navigation";
export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
 
  return (
    <>
      <ReduxProvider>
        {!isDashboard && <Navbar />}
        {children}
      </ReduxProvider>
    </>
  );
}
