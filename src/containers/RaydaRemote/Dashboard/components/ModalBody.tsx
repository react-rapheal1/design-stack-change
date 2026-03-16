import { Check } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { employeeImportOptions, modalQuestions } from "../constants";
import { EmployeeOptionCard } from "./EmployeeOptionCard";

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
        <div className="flex flex-col gap-3">
          {employeeImportOptions.map(({ description, icon, key, recommended, title }) => (
            <EmployeeOptionCard
              key={key}
              icon={icon}
              title={title}
              description={description}
              recommended={recommended}
              isSelected={importMethod === key}
              onClick={() => onImportMethodChange(key)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
