"use client";
import { ReactNode } from "react";
import Navbar from "@/app/components/landing/Navbar";
import ReduxProvider from "@/lib/redux/Provider";
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ReduxProvider>
        <Navbar />
        {children}
      </ReduxProvider>
    </>
  );
}
