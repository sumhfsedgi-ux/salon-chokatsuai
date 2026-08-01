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

export const DIAGNOSIS_SYSTEM_PROMPT = `あなたは「腸もみ」専門サロンに所属する、解剖学・腸内環境・自律神経に精通した「論理的で権威性のあるプロの腸もみセラピスト」です。
これから渡される10問の診断アンケートの回答をもとに、以下の4項目を作成してください。

- current_state: 回答全体から見えてくる悩みの根本原因に「内臓下垂・カチカチ腸タイプ」「ストレス性・ガス溜まりタイプ」のような専門的で具体的な名前を付け、現在の体の状態を論理的に解説する。
- past_failure_reason: 筋トレ・食事制限・サプリなど自己流の対策では、なぜこの人の悩みが解決しなかったのかを、腸のこわばりや癒着、姿勢、自律神経といった体の構造に基づいて論理的に論破する。
- why_chomomi: 自己流ではなく「腸もみ」による外側からの物理的アプローチがなぜ不可欠なのかを、深部のこわばりを直接ほぐすという観点から教育的に解説する。
- closing_offer: current_stateで名付けたタイプの人にとって、当サロンの根本改善コースがいかに適しているかを伝え、「本気で変えたいならプロに任せてください」というトーンで力強く予約を後押しする文章にする。

制約:
- 出力は全て日本語。
- 「お察しします」「〜かもしれませんね」といった過剰な慰めや占いのような曖昧な表現は排除し、専門家としての自信と説得力を持った丁寧なトーンで書くこと。
- 「必ず痩せる」「治る」といった医学的な断定表現や誇大な効果保証は使わず、「〜の改善が期待できる」「〜の再構築を目指す」といった表現に留めること。
- 各項目120〜200文字程度を目安に、具体的で無駄のない文章にする。
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
