import { Check } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { OptionChip } from "./OptionChip";

function QuestionBlock({
  question,
  options,
  multiSelect,
  answer,
  onAnswer,
  index,
}: {
  question: string;
  options: readonly string[];
  multiSelect: boolean;
  answer: string | string[];
  onAnswer: (value: string | string[]) => void;
  index: number;
}) {
  const hasAnswer = Array.isArray(answer) ? answer.length > 0 : answer !== "";

  function isSelected(option: string) {
    return Array.isArray(answer) ? answer.includes(option) : answer === option;
  }

  function toggle(option: string) {
    if (!multiSelect) {
      onAnswer(option);
      return;
    }

    const current = Array.isArray(answer) ? answer : [];
    onAnswer(current.includes(option) ? current.filter((value) => value !== option) : [...current, option]);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span
          className={cx(
            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-200",
            hasAnswer ? "bg-brand-600 text-white" : "bg-[#eaecf0] text-[#667085]",
          )}
        >
          {hasAnswer ? <Check className="size-3.5" /> : index + 1}
        </span>
        <div className="flex-1">
          <p className="text-base font-semibold text-primary">{question}</p>
          {multiSelect && <p className="mt-0.5 text-xs text-tertiary">Select all that apply</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pl-10">
        {options.map((option) => (
          <OptionChip key={option} label={option} selected={isSelected(option)} onClick={() => toggle(option)} />
        ))}
      </div>
    </div>
  );
}

export { QuestionBlock };
