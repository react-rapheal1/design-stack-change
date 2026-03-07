import { Check } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { IMPORT_OPTIONS } from "./data";

function ImportMethodStep({ selected, onSelect }: { selected: string; onSelect: (key: string) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-primary">Import / Connect your devices</h2>
        <p className="mt-2 text-base text-tertiary">
          Choose how you&apos;d like to build your asset inventory. We recommend connecting your HRIS for the fastest setup.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {IMPORT_OPTIONS.map((option) => (
          <ImportOptionButton
            key={option.key}
            description={option.description}
            icon={option.icon}
            isSelected={selected === option.key}
            onClick={() => onSelect(option.key)}
            recommended={option.recommended}
            title={option.title}
          />
        ))}
      </div>
    </div>
  );
}

function ImportOptionButton({
  description,
  icon: Icon,
  isSelected,
  onClick,
  recommended,
  title,
}: {
  description: string;
  icon: (typeof IMPORT_OPTIONS)[number]["icon"];
  isSelected: boolean;
  onClick: () => void;
  recommended: boolean;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition duration-100",
        isSelected ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600" : "border-[#eaecf0] bg-white hover:border-brand-300 hover:bg-brand-25",
      )}
    >
      <div className={cx("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", isSelected ? "bg-brand-100" : "bg-[#f2f4f7]")}>
        <Icon className={cx("size-5", isSelected ? "text-brand-600" : "text-[#667085]")} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={cx("text-sm font-semibold", isSelected ? "text-brand-700" : "text-secondary")}>{title}</span>
          {recommended && <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Recommended</span>}
        </div>
        <p className="mt-0.5 text-xs text-tertiary">{description}</p>
      </div>
      {isSelected && <Check className="size-5 shrink-0 text-brand-600" />}
    </button>
  );
}

export { ImportMethodStep };
