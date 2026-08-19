"use client";

import { motion } from "motion/react";

type StartScreenProps = {
  onStart: () => void;
};

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-stone-100 to-[#FDFBF9] px-6 py-12 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-200/30 blur-3xl"
      />
      <div className="relative flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold leading-snug tracking-tight text-stone-800 sm:text-3xl">
          下腹ぽっこりの原因は「腸」
        </h1>
        <p className="text-sm leading-relaxed text-stone-600">
          あなた専用の改善プランが分かる
        </p>
        <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
          ✓ 登録不要・完全無料
        </span>
        <motion.button
          type="button"
          onClick={onStart}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-full bg-gradient-to-r from-rose-400 to-rose-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-rose-300/50"
        >
          【無料】診断をスタートする
        </motion.button>
      </div>
    </motion.div>
  );
}
