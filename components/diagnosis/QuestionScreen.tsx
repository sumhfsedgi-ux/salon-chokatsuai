"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import OptionButton from "./OptionButton";
import type { Question } from "@/lib/types";

type QuestionScreenProps = {
  question: Question;
  questionNumber: number;
  onAnswer: (value: string) => void;
};

const SELECT_DELAY_MS = 220;

export default function QuestionScreen({
  question,
  questionNumber,
  onAnswer,
}: QuestionScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleSelect(option: string) {
    if (selected) return;
    setSelected(option);
    timeoutRef.current = setTimeout(() => onAnswer(option), SELECT_DELAY_MS);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-1 flex-col gap-3 px-5 pb-10 pt-4"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-rose-400">
        Q{questionNumber}
      </p>
      <h2 className="mb-4 text-xl font-bold leading-relaxed text-neutral-900">
        {question.text}
      </h2>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={selected === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </motion.div>
  );
}
