import { ALL_QUESTION_STEPS } from "./questionSteps";
import type { Answers } from "./types";

function isStageComplete(step: number, answers: Answers, selectedGoal: string) {
  if (step < 3) {
    return ALL_QUESTION_STEPS[step].every((question) => {
      const answer = answers[question.key];
      return Array.isArray(answer) ? answer.length > 0 : answer !== undefined && answer !== "";
    });
  }

  return selectedGoal !== "";
}

export { isStageComplete };
