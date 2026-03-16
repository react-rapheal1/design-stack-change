import { Check } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { importOptions, modalQuestions } from "../constants";

interface ModalBodyProps {
  currentAnswer: string;
  currentQuestion: (typeof modalQuestions)[number] | null;
  importMethod: string;
  isImportStep: boolean;
  onAnswerChange: (value: string) => void;
  onImportMethodChange: (value: string) => void;
}

export function ModalBody({
  currentAnswer,
  currentQuestion,
  importMethod,
  isImportStep,
  onAnswerChange,
  onImportMethodChange,
}: ModalBodyProps) {
  return (
    <div className="px-6 py-5">
      {currentQuestion && (
        <div className="flex flex-wrap gap-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onAnswerChange(option)}
              className={cx(
                "flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition duration-100",
                currentAnswer === option
                  ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
                  : "border-[#d0d5dd] bg-white text-secondary hover:border-brand-300 hover:bg-brand-25",
              )}
            >
              {currentAnswer === option && <Check className="size-3.5 shrink-0 text-brand-600" />}
              {option}
            </button>
          ))}
        </div>
      )}
      {isImportStep && (
        <div className="flex flex-col gap-2">
          {importOptions.map(({ description, icon: Icon, key, recommended, title }) => {
            const isSelected = importMethod === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onImportMethodChange(key)}
                className={cx(
                  "flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3 text-left transition duration-100",
                  isSelected ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600" : "border-[#eaecf0] bg-white hover:border-brand-300 hover:bg-brand-25",
                )}
              >
                <div className={cx("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", isSelected ? "bg-brand-100" : "bg-[#f2f4f7]")}>
                  <Icon className={cx("size-[18px]", isSelected ? "text-brand-600" : "text-[#667085]")} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cx("text-sm font-semibold", isSelected ? "text-brand-700" : "text-secondary")}>{title}</span>
                    {recommended && <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Recommended</span>}
                  </div>
                  <p className="mt-0.5 text-xs text-tertiary">{description}</p>
                </div>
                {isSelected && <Check className="size-4 shrink-0 text-brand-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
