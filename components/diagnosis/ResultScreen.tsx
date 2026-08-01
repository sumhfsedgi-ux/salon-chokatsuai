"use client";

import { motion } from "motion/react";
import ResultCard from "./ResultCard";
import StickyCTA from "./StickyCTA";
import type { DiagnosisResult } from "@/lib/types";

type ResultScreenProps = {
  result: DiagnosisResult;
};

export default function ResultScreen({ result }: ResultScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 flex-col"
    >
      <div className="flex flex-col gap-4 px-5 pb-8 pt-8">
        <div className="mb-2 text-center">
          <p className="text-xs font-semibold tracking-wide text-rose-500">
            AI腸内タイプ診断 結果
          </p>
          <h1 className="mt-1 text-2xl font-bold text-neutral-900">
            あなたの診断結果
          </h1>
        </div>
        <ResultCard
          eyebrow="AI診断結果"
          body={result.current_state}
          tone="empathy"
        />
        <ResultCard
          eyebrow="なぜ今までうまくいかなかったのか"
          body={result.past_failure_reason}
          tone="insight"
        />
        <ResultCard
          eyebrow="腸もみが必要な理由"
          body={result.why_chomomi}
          tone="education"
        />
        <ResultCard
          eyebrow="あなたへのご提案"
          body={result.closing_offer}
          tone="offer"
        />
      </div>
      <StickyCTA />
    </motion.div>
  );
}
