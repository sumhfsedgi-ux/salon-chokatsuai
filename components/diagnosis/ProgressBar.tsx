type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-500">
          Q{current} / {total}
        </span>
        <span className="text-xs font-semibold text-rose-400">
          {percentage}%
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-rose-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-400 transition-[width] duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
