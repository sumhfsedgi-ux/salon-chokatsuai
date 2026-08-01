import { z } from "zod";

export type Question = {
  id: string;
  text: string;
  options: string[];
};

export type Answers = Record<string, string>;

export const DiagnosisResultSchema = z.object({
  current_state: z
    .string()
    .describe(
      "回答を分析した結果の現状と共感。「あなたの下腹と便秘の原因は〇〇タイプです」のように、タイプ名を含めて共感的に伝える。"
    ),
  past_failure_reason: z
    .string()
    .describe(
      "なぜ今まで自己流（筋トレや食事制限など）で変わらなかったのかの論理的な解説。"
    ),
  why_chomomi: z
    .string()
    .describe(
      "なぜ『腸もみ』が必要なのかのニッチな教育的解説。深部のこわばりを直接ほぐす意味などを説明する。"
    ),
  closing_offer: z
    .string()
    .describe(
      "診断されたタイプの方には根本改善コースが最適である旨を伝え、予約への自然な誘導を行う文章。"
    ),
});

export type DiagnosisResult = z.infer<typeof DiagnosisResultSchema>;
