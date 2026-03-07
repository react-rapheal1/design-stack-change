import { QuestionBlock } from "./QuestionBlock";
import { ALL_QUESTION_STEPS } from "./questionSteps";
import { STEP_META, TOTAL_STEPS } from "./stepMeta";
import type { Answers } from "./types";

function QuestionsPage({ stepIndex, answers, onAnswer }: { stepIndex: number; answers: Answers; onAnswer: (key: string, value: string | string[]) => void }) {
  const meta = STEP_META[stepIndex];
  const questions = ALL_QUESTION_STEPS[stepIndex];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold tracking-widest text-brand-600 uppercase">
          Step {stepIndex + 1} of {TOTAL_STEPS} · {meta.label}
        </p>
        <h2 className="mt-1.5 text-2xl font-bold text-primary">{meta.heading}</h2>
        <p className="mt-1 text-sm text-tertiary">{meta.sub}</p>
      </div>

      <div className="flex flex-col">
        {questions.map((question, index) => (
          <div key={question.key}>
            {index > 0 && <div className="my-6 h-px bg-[#f2f4f7]" />}
            <QuestionBlock
              index={index}
              question={question.question}
              options={question.options}
              multiSelect={question.multiSelect}
              answer={answers[question.key] ?? (question.multiSelect ? [] : "")}
              onAnswer={(value) => onAnswer(question.key, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export { QuestionsPage };
