import { z } from "zod";

export const YES_ANSWER = "あてはまる" as const;
export const NO_ANSWER = "あてはまらない" as const;

export const GUT_TYPES = [
  "下がり腸",
  "冷え腸",
  "むくみ腸",
  "たまり腸",
  "ガス腸",
  "ストレス腸",
] as const;

export type GutType = (typeof GUT_TYPES)[number];

export const GUT_TYPE_INFO: Record<
  GutType,
  { bodyTrait: string; state: string }
> = {
  "下がり腸": {
    bodyTrait: "下半身が太りやすい体質",
    state:
      "内臓や腸が下がり、子宮や卵巣を圧迫しやすい。下半身の血流が悪化し、むくみ・冷え・下半身太りにつながります。",
  },
  "冷え腸": {
    bodyTrait: "疲れやすく虚弱体質",
    state:
      "内臓が冷え、消化・代謝・燃焼が低下。だるさや慢性的な疲労につながります。",
  },
  "むくみ腸": {
    bodyTrait: "全身が浮腫みやすい体質",
    state:
      "腸内の水分バランスが乱れ、処理できなかった水分が腸に溜まり、むくみやすくなります。",
  },
  "たまり腸": {
    bodyTrait: "中半身が太りやすい体質",
    state: "便が腸内に滞留。我慢するほど「出にくい腸」になる悪循環に陥ります。",
  },
  "ガス腸": {
    bodyTrait: "上半身が太りやすい体質",
    state:
      "腸の動きが悪く、ガスを排出できずに溜め込む。悪玉菌が多い傾向があります。",
  },
  "ストレス腸": {
    bodyTrait: "自律神経が乱れやすい体質",
    state:
      "自律神経の影響を強く受け、下痢と便秘を繰り返すなど、腸が不安定になります。",
  },
};

export type Question = {
  id: string;
  text: string;
  gutType: GutType;
  options: string[];
};

export type Answers = Record<string, string>;

export const DiagnosisCopySchema = z.object({
  current_state: z
    .string()
    .describe(
      "回答を分析した結果の現状解説。「〇〇タイプ」という専門的で少し危機感を煽るタイプ名を付け、客観的かつ論理的に現状を分析する。過度な共感は不要。60〜100文字程度で簡潔に。"
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

export type DiagnosisCopy = z.infer<typeof DiagnosisCopySchema>;

export type DiagnosisResult = { type_name: GutType } & DiagnosisCopy;
