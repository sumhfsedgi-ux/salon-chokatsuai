"use client";

import { motion } from "motion/react";

type ErrorScreenProps = {
  message: string;
  onRetry: () => void;
};

export default function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 flex-col items-center justify-center gap-5 px-8 py-8 text-center"
    >
      <p className="text-base font-medium leading-relaxed text-neutral-700">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-rose-500 px-6 py-3 text-sm font-bold text-white shadow-md transition-transform active:scale-[0.98]"
      >
        もう一度試す
      </button>
    </motion.div>
  );
}
