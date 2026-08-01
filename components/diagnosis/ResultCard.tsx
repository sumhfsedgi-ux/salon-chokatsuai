type ResultCardTone = "empathy" | "insight" | "education" | "offer";

type ResultCardProps = {
  eyebrow: string;
  body: string;
  tone?: ResultCardTone;
};

const TONE_STYLES: Record<ResultCardTone, string> = {
  empathy: "border-rose-200 bg-rose-50/60",
  insight: "border-amber-200 bg-amber-50/60",
  education: "border-sky-200 bg-sky-50/60",
  offer: "border-rose-300 bg-rose-50",
};

const TONE_EYEBROW_STYLES: Record<ResultCardTone, string> = {
  empathy: "text-rose-600",
  insight: "text-amber-600",
  education: "text-sky-600",
  offer: "text-rose-700",
};

export default function ResultCard({
  eyebrow,
  body,
  tone = "empathy",
}: ResultCardProps) {
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${TONE_STYLES[tone]}`}>
      <p
        className={`mb-2 text-xs font-bold tracking-wide ${TONE_EYEBROW_STYLES[tone]}`}
      >
        {eyebrow}
      </p>
      <p className="whitespace-pre-line text-[15px] leading-relaxed text-neutral-800">
        {body}
      </p>
    </div>
  );
}
