"use client";

import { useEffect, useReducer } from "react";
import { AnimatePresence } from "motion/react";
import ErrorScreen from "./ErrorScreen";
import LoadingAnalyzer from "./LoadingAnalyzer";
import ProgressBar from "./ProgressBar";
import QuestionScreen from "./QuestionScreen";
import ResultScreen from "./ResultScreen";
import { QUESTIONS } from "@/lib/questions";
import type { Answers, DiagnosisResult } from "@/lib/types";

type FlowState =
  | { step: "question"; index: number; answers: Answers }
  | { step: "loading"; answers: Answers }
  | { step: "result"; result: DiagnosisResult }
  | { step: "error"; message: string; answers: Answers };

type FlowAction =
  | { type: "ANSWER_QUESTION"; questionId: string; value: string }
  | { type: "SUBMIT_SUCCESS"; result: DiagnosisResult }
  | { type: "SUBMIT_ERROR"; message: string }
  | { type: "RETRY" };

const initialState: FlowState = { step: "question", index: 0, answers: {} };

function reducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case "ANSWER_QUESTION": {
      if (state.step !== "question") return state;
      const answers = { ...state.answers, [action.questionId]: action.value };
      const isLastQuestion = state.index === QUESTIONS.length - 1;
      return isLastQuestion
        ? { step: "loading", answers }
        : { step: "question", index: state.index + 1, answers };
    }
    case "SUBMIT_SUCCESS":
      return { step: "result", result: action.result };
    case "SUBMIT_ERROR":
      return state.step === "loading"
        ? { step: "error", message: action.message, answers: state.answers }
        : state;
    case "RETRY":
      return state.step === "error"
        ? { step: "loading", answers: state.answers }
        : state;
    default:
      return state;
  }
}

export default function DiagnosisFlow() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.step !== "loading") return;
    const { answers } = state;

    const controller = new AbortController();

    async function submit() {
      try {
        const response = await fetch("/api/diagnose", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
          signal: controller.signal,
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error ?? "診断結果の取得に失敗しました。");
        }

        dispatch({ type: "SUBMIT_SUCCESS", result: data as DiagnosisResult });
      } catch (error) {
        if (controller.signal.aborted) return;
        const message =
          error instanceof Error
            ? error.message
            : "診断結果の取得に失敗しました。";
        dispatch({ type: "SUBMIT_ERROR", message });
      }
    }

    submit();

    return () => controller.abort();
  }, [state]);

  return (
    <div className="flex flex-1 flex-col">
      {state.step === "question" && (
        <div className="px-5 pt-6">
          <ProgressBar current={state.index + 1} total={QUESTIONS.length} />
        </div>
      )}
      <AnimatePresence mode="wait">
        {state.step === "question" && (
          <QuestionScreen
            key={QUESTIONS[state.index].id}
            question={QUESTIONS[state.index]}
            onAnswer={(value) =>
              dispatch({
                type: "ANSWER_QUESTION",
                questionId: QUESTIONS[state.index].id,
                value,
              })
            }
          />
        )}
        {state.step === "loading" && <LoadingAnalyzer key="loading" />}
        {state.step === "result" && (
          <ResultScreen key="result" result={state.result} />
        )}
        {state.step === "error" && (
          <ErrorScreen
            key="error"
            message={state.message}
            onRetry={() => dispatch({ type: "RETRY" })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
