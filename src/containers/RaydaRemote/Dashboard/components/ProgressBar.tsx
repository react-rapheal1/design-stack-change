import { cx } from "@/utils/cx";
import { modalQuestions } from "../constants";

export function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-1 px-6 pt-4">
      {Array.from({ length: modalQuestions.length + 1 }).map((_, index) => (
        <div
          key={index}
          className={cx(
            "h-1 flex-1 rounded-full transition-all duration-300",
            index < step ? "bg-brand-600" : index === step ? "bg-brand-300" : "bg-[#eaecf0]",
          )}
        />
      ))}
    </div>
  );
}
