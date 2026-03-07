import { Check, Eye } from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";
import { GOAL1_QUESTIONS, MISSION_STEPS } from "./data";

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cx("h-1 flex-1 rounded-full transition-all duration-300", i < current ? "bg-brand-600" : i === current ? "bg-brand-300" : "bg-[#eaecf0]")}
        />
      ))}
    </div>
  );
}
function OptionChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm font-medium transition duration-100",
        selected
          ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
          : "border-[#d0d5dd] bg-white text-secondary hover:border-brand-300 hover:bg-brand-25",
      )}
    >
      {selected && <Check className="size-4 shrink-0 text-brand-600" />}
      {label}
    </button>
  );
}
function Goal1SidePanel({ missionStep }: { missionStep: number }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#101828]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[400px] w-[400px] rounded-full bg-brand-600/15 blur-[100px]" />
        <div className="absolute -right-16 -bottom-24 h-[300px] w-[300px] rounded-full bg-brand-900/30 blur-[80px]" />
      </div>

      <div className="relative flex h-full flex-col px-8 py-8">
        <RaydaLogo variant="white" />

        <div className="mt-12 flex-1">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <Eye className="size-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-brand-300">Goal 1</span>
          </div>
          <h2 className="mt-3 text-xl leading-7 font-bold text-white">Get visibility into what you actually have</h2>
          <p className="mt-3 text-sm leading-6 text-[#98a2b3]">
            The universal starting point. Nearly every IT manager signing up has some version of this problem.
          </p>

          {}
          <div className="mt-8 flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-widest text-[#667085] uppercase">Mission steps</p>
            {MISSION_STEPS.map((ms, idx) => {
              const isDone = missionStep > idx + GOAL1_QUESTIONS.length;
              const isActive = missionStep === idx + GOAL1_QUESTIONS.length;
              return (
                <div key={ms.id} className={cx("flex items-start gap-3 rounded-xl p-3 transition", isActive ? "bg-white/10" : "bg-transparent")}>
                  <div
                    className={cx(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      isDone ? "bg-brand-600 text-white" : isActive ? "bg-brand-400 text-white" : "bg-white/10 text-[#667085]",
                    )}
                  >
                    {isDone ? <Check className="size-3.5" /> : ms.id}
                  </div>
                  <div>
                    <p className={cx("text-sm font-semibold", isActive || isDone ? "text-white" : "text-[#667085]")}>{ms.title}</p>
                    {isActive && <p className="mt-0.5 text-xs text-[#98a2b3]">{ms.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs font-semibold text-brand-400">Mission completion state</p>
          <p className="mt-1 text-xs text-[#667085] italic">&quot;You&apos;ve imported 47 devices and 3 need employee confirmation.&quot;</p>
        </div>
      </div>
    </div>
  );
}
export { ProgressBar, OptionChip, Goal1SidePanel };
