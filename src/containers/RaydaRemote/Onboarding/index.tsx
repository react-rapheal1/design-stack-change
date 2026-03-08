"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { GoalSelectionPage } from "./GoalSelectionPage";
import { QuestionsPage } from "./QuestionsPage";
import { OnboardingSidePanel } from "./components/OnboardingSidePanel";
import { ProgressBar } from "./components/ProgressBar";
import { isStageComplete } from "./isStageComplete";
import { STEP_META, TOTAL_STEPS } from "./stepMeta";
import type { Answers } from "./types";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedGoal, setSelectedGoal] = useState("");

  const canContinue = isStageComplete(step, answers, selectedGoal);

  function handleBack() {
    if (step === 0) {
      router.push("/rayda-remote/signup");
      return;
    }

    setStep((current) => current - 1);
  }

  function handleNext() {
    if (!canContinue) return;

    if (step < TOTAL_STEPS - 1) {
      setStep((current) => current + 1);
      return;
    }

    router.push("/rayda-remote/dashboard");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden w-[420px] shrink-0 lg:block xl:w-[480px]">
        <OnboardingSidePanel />
      </div>

      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-3 lg:hidden">
          <RaydaLogo />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden px-8 py-6 lg:px-12 lg:py-8">
          <div className="flex shrink-0 flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-tertiary">{STEP_META[step].label}</p>
              <p className="text-xs text-tertiary">
                {step + 1} / {TOTAL_STEPS}
              </p>
            </div>
            <ProgressBar current={step} total={TOTAL_STEPS} />
          </div>

          <div className="mt-6 flex-1 overflow-y-visible">
            {step < 3 && (
              <QuestionsPage
                stepIndex={step}
                answers={answers}
                onAnswer={(key, value) => {
                  setAnswers((current) => ({ ...current, [key]: value }));
                }}
              />
            )}
            {step === 3 && <GoalSelectionPage selected={selectedGoal} onSelect={setSelectedGoal} />}
          </div>

          <div className="mt-4 flex shrink-0 items-center justify-between border-t border-[#eaecf0] pt-4">
            <Button color="tertiary" size="md" iconLeading={ArrowLeft} onClick={handleBack}>
              Back
            </Button>
            <Button size="md" iconTrailing={ArrowRight} onClick={handleNext} isDisabled={!canContinue}>
              {step === 3 ? "Start mission" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
