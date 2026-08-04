import { z } from "zod";

export type Question = {
  id: string;
  text: string;
  options: string[];
};

export type Answers = Record<string, string>;

export const DiagnosisResultSchema = z.object({
  type_name: z
    .string()
    .describe(
      "診断されたタイプ名のみを短く（例：内臓下垂・カチカチ腸タイプ）。10〜20文字程度。他の項目内で使うタイプ名と完全に一致させる。"
    ),
  current_state: z
    .string()
    .describe(
      "回答を分析した結果の現状解説。「〇〇タイプ」という専門的で少し危機感を煽るタイプ名（例：内臓下垂・カチカチ腸タイプ 等）を付け、客観的かつ論理的に現状を分析する。過度な共感は不要。60〜100文字程度で簡潔に。"
    ),
  past_failure_reason: z
    .string()
    .describe(
      "なぜ今まで自己流（筋トレや食事制限など）で変わらなかったのかの論理的な解説。腸のこわばりや姿勢などの構造的な問題を指摘する。60〜100文字程度で簡潔に。"
    ),
  why_chomomi: z
    .string()
    .describe(
      "なぜ『腸もみ』が必要なのかのニッチな教育的解説。セルフケアでは届かない深部のこわばりを直接ほぐす意味に加え、実際に受けることで起こる体の変化を専門用語を交えて説明する。100〜140文字程度で簡潔に。"
    ),
  closing_offer: z
    .string()
    .describe(
      "診断されたタイプの方には根本改善コースが最適である旨を伝え、専門家として力強く背中を押し、予約という行動を促す文章。60〜100文字程度で簡潔に。"
    ),
});

export type DiagnosisResult = z.infer<typeof DiagnosisResultSchema>;
