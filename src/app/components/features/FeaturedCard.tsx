"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export default function FeaturesCard({
  icon,
  title,
  description,
  index,
}: FeatureCardProps) {
  return (
   <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-card text-card-foreground shadow-md rounded-xl p-6 text-center border border-border"
    >
      <div className="text-4xl mb-4 text-primary">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
