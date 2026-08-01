import OpenAI from "openai";
import { QUESTIONS } from "./questions";
import type { Answers } from "./types";

let cachedClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!cachedClient) {
    cachedClient = new OpenAI();
  }
  return cachedClient;
}

export const DIAGNOSIS_SYSTEM_PROMPT = `あなたは「腸もみ」専門サロンに所属する、腸内環境・姿勢・自律神経の知識を持つAIカウンセラーです。
これから渡される10問の診断アンケートの回答をもとに、回答者に寄り添いながらも説得力のある文章で、以下の4項目を作成してください。

- current_state: 回答全体から見えてくる悩みの根本原因に「〇〇タイプ」という名前を付け、共感を込めて現状を解説する。
- past_failure_reason: 筋トレ・食事制限・サプリなど自己流の対策では、なぜこの人の悩みが解決しなかったのかを、腸のこわばりや姿勢、自律神経といった体の構造に基づいて論理的に説明する。
- why_chomomi: 自己流ではなく「腸もみ」による外側からのアプローチがなぜ必要なのかを、深部のこわばりを直接ほぐすという観点から教育的に解説する。
- closing_offer: current_stateで名付けた「〇〇タイプ」の人にとって、当サロンの根本改善コースがいかに適しているかを伝え、自然に予約を後押しする文章にする。

制約:
- 出力は全て日本語。女性の悩みに寄り添う、温かみのある丁寧語で書く。
- 「必ず痩せる」「治る」といった医学的な断定表現や誇大な効果保証は使わない。
- 各項目120〜200文字程度を目安に、具体的で説得力のある文章にする。
- 4項目を通して「〇〇タイプ」の名称を一貫させる。`;

export function buildDiagnosisUserPrompt(answers: Answers): string {
  const lines = QUESTIONS.map((question) => {
    const answer = answers[question.id] ?? "(未回答)";
    return `Q. ${question.text}\n→ ${answer}`;
  });

  return `以下は「AI腸内タイプ診断」の回答です。この内容をもとに診断結果を作成してください。\n\n${lines.join(
    "\n\n"
  )}`;
}
