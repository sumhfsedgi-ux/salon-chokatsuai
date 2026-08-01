"use client";

import { motion } from "motion/react";

export default function LoadingAnalyzer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-8 text-center"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-rose-200 border-t-rose-500" />
      <p className="text-base font-medium leading-relaxed text-neutral-700">
        AIがあなたの腸内データを分析中...
      </p>
    </motion.div>
  );
}
