import { QUESTIONS } from "./questions";
import { GUT_TYPES, YES_ANSWER, type Answers, type GutType } from "./types";

export function determineGutTypes(answers: Answers): GutType[] {
  const matched = new Map<GutType, number>(GUT_TYPES.map((type) => [type, 0]));
  const total = new Map<GutType, number>(GUT_TYPES.map((type) => [type, 0]));

  for (const question of QUESTIONS) {
    total.set(question.gutType, (total.get(question.gutType) ?? 0) + 1);
    if (answers[question.id] === YES_ANSWER) {
      matched.set(question.gutType, (matched.get(question.gutType) ?? 0) + 1);
    }
  }

  const ratios = new Map<GutType, number>();
  let bestRatio = 0;

  for (const type of GUT_TYPES) {
    const typeTotal = total.get(type) ?? 0;
    const typeMatched = matched.get(type) ?? 0;
    const ratio = typeTotal === 0 ? 0 : typeMatched / typeTotal;
    ratios.set(type, ratio);
    if (ratio > bestRatio) bestRatio = ratio;
  }

  if (bestRatio === 0) {
    return [GUT_TYPES[0]];
  }

  return GUT_TYPES.filter((type) => ratios.get(type) === bestRatio);
}
