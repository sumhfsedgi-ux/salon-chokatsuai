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
      className={`min-h-14 w-full rounded-2xl border-2 px-5 py-4 text-left text-base font-medium leading-snug transition-colors ${
        selected
          ? "border-rose-400 bg-rose-50 text-rose-700"
          : "border-neutral-200 bg-white text-neutral-800"
      }`}
    >
      {label}
    </motion.button>
  );
}
