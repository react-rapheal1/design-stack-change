import { CheckCircle, Lightning01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";

const processingItems = [
  { label: "Pulling employee directory", done: true },
  { label: "Matching devices to employees", done: true },
  { label: "Flagging unassigned devices", done: false },
];

function AIProcessingStep() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="relative mb-8">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Lightning01 className="size-8 text-brand-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-primary">AI Teammate is working…</h2>
      <p className="mt-3 max-w-sm text-base text-tertiary">
        Discovering devices, mapping them to your employees, and flagging anything that needs your attention.
      </p>
      <div className="mt-8 flex w-full max-w-md flex-col gap-3">
        {processingItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-xl border border-[#eaecf0] bg-white px-4 py-3">
            {item.done ? (
              <CheckCircle className="size-5 shrink-0 text-brand-600" />
            ) : (
              <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-brand-200" />
            )}
            <span className={cx("text-sm font-medium", item.done ? "text-secondary" : "text-tertiary")}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { AIProcessingStep };
