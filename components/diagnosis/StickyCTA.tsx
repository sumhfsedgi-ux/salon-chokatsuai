import { BOOKING_URL, PRICING } from "@/lib/config";

export default function StickyCTA() {
  return (
    <div className="sticky bottom-0 border-t border-neutral-200 bg-white/95 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
      <p className="mb-2 text-center text-sm font-medium text-neutral-600">
        通常
        <span className="mx-1 line-through decoration-neutral-400">
          {PRICING.original}
        </span>
        <span className="font-bold text-rose-600">
          ➔ 診断者限定 初回{PRICING.discounted}
        </span>
      </p>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-full bg-rose-500 px-4 py-4 text-center text-base font-bold text-white shadow-lg shadow-rose-500/30 transition-transform active:scale-[0.98]"
      >
        【初回{PRICING.discounted}】根本改善コースを予約する
      </a>
    </div>
  );
}
