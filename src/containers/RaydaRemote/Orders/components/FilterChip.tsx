import { Check } from "@untitledui/icons";
import { cx } from "@/utils/cx";

function FilterChip({ isSelected, label, leading, onClick }: { isSelected: boolean; label: string; leading?: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        isSelected ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]" : "border-[#e9eaeb] bg-white text-[#535862] hover:bg-[#fafafa]",
      )}
    >
      {isSelected && <Check className="size-3.5" />}
      {leading}
      {label}
    </button>
  );
}

export { FilterChip };
