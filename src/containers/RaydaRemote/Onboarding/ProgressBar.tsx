import { cx } from "@/utils/cx";

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cx(
            "h-1 flex-1 rounded-full transition-all duration-300",
            index < current ? "bg-brand-600" : index === current ? "bg-brand-300" : "bg-[#eaecf0]",
          )}
        />
      ))}
    </div>
  );
}

export { ProgressBar };
