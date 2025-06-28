"use client";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import FadeInSection from "../../ui/FadeInSection";
interface FaqItemProps {
  question: string;
  answer: string;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

export default function FaqItem({
  question,
  answer,
  index,
  activeIndex,
  setActiveIndex,
}: FaqItemProps) {
  const isOpen = activeIndex === index;

  return (
    <FadeInSection>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        className="bg-card text-card-foreground rounded-xl p-6 mb-4 cursor-pointer shadow-sm"
        onClick={() => setActiveIndex(isOpen ? null : index)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground">{question}</h3>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-4 text-muted-foreground"
            >
              <p>{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeInSection>
  );
}
