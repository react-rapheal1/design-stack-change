import { X } from "@untitledui/icons";
import { modalQuestions } from "../constants";

interface ModalHeaderProps {
  currentQuestion?: string;
  hint?: string;
  isBusinessNameStep: boolean;
  onSkip: () => void;
  step: number;
}

export function ModalHeader({ currentQuestion, hint, isBusinessNameStep, onSkip, step }: ModalHeaderProps) {
  const totalSteps = modalQuestions.length + 2;
  const isImportStep = step === modalQuestions.length + 1;

  function getHeading() {
    if (isBusinessNameStep) return "What's your business name?";
    if (isImportStep) return "Add your employees to get started";
    return currentQuestion;
  }

  function getHint() {
    if (isBusinessNameStep) return "This helps us personalize your workspace.";
    if (isImportStep) return "Choose how you'd like to bring your team into Rayda.";
    return hint;
  }

  function getHeading() {
    if (isImportStep) return "Add your employees to get started";
    return currentQuestion;
  }

  function getHint() {
    if (isImportStep) return "Choose how you'd like to bring your team into Rayda.";
    return hint;
  }

  return (
    <div className="flex items-start justify-between border-b border-[#eaecf0] px-6 py-5">
      <div>
        <p className="text-xs font-semibold tracking-widest text-brand-600 uppercase">
          Step {step + 1} of {totalSteps}
        </p>
        <h2 className="mt-1 text-lg font-bold text-primary">{getHeading()}</h2>
        <p className="mt-1 text-sm text-tertiary">{getHint()}</p>
      </div>
      <button
        onClick={onSkip}
        className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tertiary transition duration-100 hover:bg-[#f2f4f7]"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
