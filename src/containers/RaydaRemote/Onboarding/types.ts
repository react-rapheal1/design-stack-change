import { ALL_QUESTION_STEPS } from "./questionSteps";

export type Answers = Record<string, string | string[]>;

export type QuestionStep = (typeof ALL_QUESTION_STEPS)[number][number];
