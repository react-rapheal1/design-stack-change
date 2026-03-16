import { Check } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { GOALS, goalColorMap } from "./goals";
import { STEP_META, TOTAL_STEPS } from "./stepMeta";

function GoalSelectionPage({ selected, onSelect }: { selected: string; onSelect: (key: string) => void }) {
  const meta = STEP_META[4];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-semibold tracking-widest text-brand-600 uppercase">Step 5 of {TOTAL_STEPS} · Goal selection</p>
        <h2 className="mt-2 text-2xl font-bold text-primary">{meta.heading}</h2>
        <p className="mt-1.5 text-base text-tertiary">{meta.sub}</p>
      </div>

      <div className="-m-1 flex flex-col gap-6 p-1">
        {GOALS.map((goal) => {
          const isSelected = selected === goal.key;
          const colors = goalColorMap[goal.color];
          const Icon = goal.icon;

          return (
            <button
              key={goal.key}
              type="button"
              onClick={() => onSelect(goal.key)}
              className={cx(
                "relative flex flex-col gap-2 rounded-2xl border p-4 text-left transition duration-100",
                isSelected ? `${colors.border} ${colors.bg} ring-1` : "border-[#eaecf0] bg-white hover:border-brand-200 hover:bg-[#f9fafb]",
              )}
            >
              {isSelected && (
                <div className={cx("absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full", colors.check)}>
                  <Check className="size-3 text-white" />
                </div>
              )}
              <div className={cx("flex h-10 w-10 items-center justify-center rounded-xl", isSelected ? colors.iconBg : "bg-[#f2f4f7]")}>
                <Icon className={cx("size-5", isSelected ? colors.icon : "text-[#667085]")} />
              </div>
              <div>
                <p className={cx("text-sm leading-5 font-semibold", isSelected ? "text-primary" : "text-secondary")}>{goal.title}</p>
                <p className="mt-1 text-xs leading-4 text-tertiary">{goal.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { GoalSelectionPage };
