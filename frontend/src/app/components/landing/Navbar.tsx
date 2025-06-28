"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import UseTheme from "../ui/UseTheme";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, handleChangeTheme } = UseTheme();

  return (
    <motion.header
      className="w-full bg-background text-foreground border-b border-border sticky top-0 z-50 shadow-sm backdrop-blur-md transition-shadow"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-primary  tracking-tight"
        >
          Vega
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 text-muted-foreground font-medium">
          {[
            { label: "Özellikler", href: "#features" },
            { label: "Fiyatlandırma", href: "#pricing" },
            { label: "SSS", href: "#faq" },
            { label: "İletisim", href: "#contact" },
          ].map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="hover:text-primary transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Dark Mode */}
        <div className="flex items-center gap-4">
          <a
            href="/signin"
            className="hidden md:inline-block px-4 py-2 rounded-xl btn-primary bg-primary text-primary-foreground"
          >
            Giriş Yap
          </a>
          <a
            href="/signup"
            className="hidden md:inline-block px-4 py-2 rounded-xl btn-primary bg-primary text-primary-foreground"
          >
            Ücretsiz Başla
          </a>

          <button
            onClick={handleChangeTheme}
            className="p-2 rounded-md border border-border hover:bg-muted transition-colors"
            aria-label="Tema Değiştir"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
