"use client";

import { useState } from "react";
import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { modalQuestions } from "../constants";
import { ModalBody } from "./ModalBody";
import { ModalHeader } from "./ModalHeader";
import { ProgressBar } from "./ProgressBar";

interface OnboardingModalProps {
  onComplete: (method: string) => void;
  onSkip: () => void;
}

export function OnboardingModal({ onComplete, onSkip }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [importMethod, setImportMethod] = useState("");
  const isImportStep = step === modalQuestions.length;
  const currentQuestion = isImportStep ? null : modalQuestions[step];
  const currentAnswer = currentQuestion ? (answers[currentQuestion.key] ?? "") : "";
  const canContinue = isImportStep ? importMethod !== "" : currentAnswer !== "";

  function handleContinue() {
    if (!canContinue) return;
    if (isImportStep) {
      onComplete(importMethod);
      return;
    }
    setStep((value) => value + 1);
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
          <ModalHeader
            currentQuestion={currentQuestion?.question}
            hint={currentQuestion?.hint}
            onSkip={onSkip}
            step={step}
          />
          <ProgressBar step={step} />
          <ModalBody
            currentAnswer={currentAnswer}
            currentQuestion={currentQuestion}
            importMethod={importMethod}
            isImportStep={isImportStep}
            onAnswerChange={(value) => setAnswers((items) => ({ ...items, [currentQuestion!.key]: value }))}
            onImportMethodChange={setImportMethod}
          />
          <div className="flex items-center justify-between border-t border-[#eaecf0] px-6 py-4">
            <button className="text-sm font-medium text-tertiary transition duration-100 hover:text-secondary" onClick={onSkip}>
              Skip for now
            </button>
            <Button size="md" iconTrailing={ArrowRight} isDisabled={!canContinue} onClick={handleContinue}>
              {isImportStep ? "Get started" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
