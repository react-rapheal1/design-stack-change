import { Check } from "@untitledui/icons";
import { cx } from "@/utils/cx";

function OptionChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition",
        selected
          ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
          : "border-[#d0d5dd] bg-white text-secondary hover:border-brand-300 hover:bg-brand-25",
      )}
    >
      {selected && <Check className="size-3.5 shrink-0 text-brand-600" />}
      {label}
    </button>
  );
}

export { OptionChip };
