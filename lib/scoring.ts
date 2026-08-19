import { QUESTIONS } from "./questions";
import { GUT_TYPES, YES_ANSWER, type Answers, type GutType } from "./types";

export function determineGutType(answers: Answers): GutType {
  const matched = new Map<GutType, number>(GUT_TYPES.map((type) => [type, 0]));
  const total = new Map<GutType, number>(GUT_TYPES.map((type) => [type, 0]));

  for (const question of QUESTIONS) {
    total.set(question.gutType, (total.get(question.gutType) ?? 0) + 1);
    if (answers[question.id] === YES_ANSWER) {
      matched.set(question.gutType, (matched.get(question.gutType) ?? 0) + 1);
    }
  }

  let best: GutType = GUT_TYPES[0];
  let bestRatio = -1;
  let bestMatched = -1;

  for (const type of GUT_TYPES) {
    const typeTotal = total.get(type) ?? 0;
    const typeMatched = matched.get(type) ?? 0;
    const ratio = typeTotal === 0 ? 0 : typeMatched / typeTotal;

    if (
      ratio > bestRatio ||
      (ratio === bestRatio && typeMatched > bestMatched)
    ) {
      best = type;
      bestRatio = ratio;
      bestMatched = typeMatched;
    }
  }

  return best;
}
