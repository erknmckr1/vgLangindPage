"use client";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroSection() {
return (
    <motion.div
      id="hero"
      className="relative bg-background text-foreground py-20 px-4 text-center overflow-hidden"
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          width={100}
          height={100}
          src="/herobg.png"
          alt="Hero background"
          className="w-full h-full object-center opacity-20 blur-sm"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Satış Süreçlerinizi Akıllı Hale Getirin
        </motion.h1>

        <motion.p
          className="mt-4 text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Siparişten kargoya, ödemeden rapora kadar her şey bir arada.
        </motion.p>

        <motion.a
          href="#features"
          className="mt-8 inline-block btn-primary px-6 py-3 rounded-xl text-lg font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          Ücretsiz Başla
        </motion.a>
      </div>
    </motion.div>
  );
}
