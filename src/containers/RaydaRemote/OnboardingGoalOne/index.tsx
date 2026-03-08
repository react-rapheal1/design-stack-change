"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";
import { MissionCompleteStep } from "./components/MissionCompleteStep";
import { AIProcessingStep, ImportMethodStep, ReviewInventoryStep } from "./components/MissionSteps";
import { Goal1SidePanel, ProgressBar } from "./components/OnboardingPieces";
import { GOAL1_QUESTIONS, TOTAL_STEPS } from "./data";
import type { Answers } from "./data";

function Goal1Page() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [importMethod, setImportMethod] = useState("");
  const isQuestionStep = step < 4;
  const isMissionA = step === 4;
  const isMissionB = step === 5;
  const isMissionC = step === 6;
  const isMissionD = step === 7;
  const currentQ = isQuestionStep ? GOAL1_QUESTIONS[step] : null;
  const currentAnswer = currentQ ? (answers[currentQ.key] ?? "") : "";
  const canContinue = isMissionD ? true : isMissionC ? true : isMissionB ? true : isMissionA ? importMethod !== "" : currentQ ? currentAnswer !== "" : false;
  function handleNext() {
    if (!canContinue) return;
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    }
  }
  function handleBack() {
    if (step === 0) {
      router.push("/rayda-remote/onboarding");
    } else {
      setStep((s) => s - 1);
    }
  }
  return (
    <div className="flex min-h-screen">
      {}
      <div className="hidden w-[420px] shrink-0 lg:block xl:w-[480px]">
        <div className="sticky top-0 h-screen">
          <Goal1SidePanel missionStep={step} />
        </div>
      </div>

      {}
      <div className="flex flex-1 flex-col">
        {}
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4 lg:hidden">
          <RaydaLogo />
        </div>

        <div className="flex flex-1 flex-col px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
          {}
          {!isMissionD && (
            <div className="flex flex-col gap-3">
              <ProgressBar current={step} total={TOTAL_STEPS - 1} />
              <p className="text-sm font-medium text-tertiary">
                {isQuestionStep
                  ? `Follow-up questions · ${step + 1} of 4`
                  : isMissionA
                    ? "Mission Step A — Import"
                    : isMissionB
                      ? "Mission Step B — Processing"
                      : "Mission Step C — Review"}
              </p>
            </div>
          )}

          {}
          <div className={cx("flex-1", !isMissionD && "mt-10")}>
            {isQuestionStep && currentQ && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary">{currentQ.question}</h2>
                  <p className="mt-2 text-base text-tertiary">{currentQ.hint}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAnswers((p) => ({ ...p, [currentQ.key]: opt }))}
                      className={cx(
                        "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition duration-100",
                        currentAnswer === opt
                          ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
                          : "border-[#d0d5dd] bg-white text-secondary hover:border-brand-300 hover:bg-brand-25",
                      )}
                    >
                      {currentAnswer === opt && <Check className="size-4 shrink-0 text-brand-600" />}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isMissionA && <ImportMethodStep selected={importMethod} onSelect={setImportMethod} />}

            {isMissionB && <AIProcessingStep />}

            {isMissionC && <ReviewInventoryStep />}

            {isMissionD && <MissionCompleteStep />}
          </div>

          {}
          {!isMissionD && (
            <div className="mt-10 flex items-center justify-between">
              <Button color="tertiary" size="md" iconLeading={ArrowLeft} onClick={handleBack}>
                Back
              </Button>

              <Button size="md" iconTrailing={ArrowRight} onClick={handleNext} isDisabled={!canContinue}>
                {isMissionC ? "Confirm inventory" : isMissionB ? "Continue" : "Continue"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Goal1Page;
