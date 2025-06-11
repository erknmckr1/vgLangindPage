import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import { cookies } from "next/headers";
import Head from "next/head";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore =  await cookies(); 
  const theme = cookieStore.get("theme")?.value === "dark" ? "dark" : "light";

  return (
    <html className={theme } lang="tr">
        <Head>
        <title>Satıcıya Özel İş Sistemi</title>
        <meta name="description" content="Siparişten ödemeye, stoktan rapora kadar her şey tek panelde. Satıcılara özel dijital iş sistemi!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={theme === "dark" ? "#18181b" : "#ffffff"} />
      </Head>
      <body className="bg-white dark:bg-zinc-900 text-black dark:text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
