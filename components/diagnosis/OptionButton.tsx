"use client";

import { motion } from "motion/react";

type OptionButtonProps = {
  label: string;
  selected?: boolean;
  onClick: () => void;
};

export default function OptionButton({
  label,
  selected,
  onClick,
}: OptionButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`flex min-h-14 w-full items-center gap-3 rounded-3xl px-5 py-4 text-left text-base font-medium leading-snug transition-colors ${
        selected
          ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-200"
          : "bg-white text-neutral-800 shadow-sm shadow-neutral-200/70"
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          selected ? "border-white/80 bg-white/20" : "border-rose-200"
        }`}
      >
        {selected && (
          <motion.svg
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            viewBox="0 0 20 20"
            fill="none"
            className="h-3.5 w-3.5"
          >
            <path
              d="M4 10.5l3.5 3.5L16 6"
              stroke="white"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </span>
      <span>{label}</span>
    </motion.button>
  );
}
