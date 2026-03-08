import { Slider } from "@/components/base/slider/slider";
import { RequestFilters } from "../RequestFilters";

function BudgetRangeSection({
  budgetRange,
  onChange,
}: {
  budgetRange: RequestFilters["budgetRange"];
  onChange: (value: RequestFilters["budgetRange"]) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-semibold text-[#414651]">Budget Range</span>
      <Slider value={budgetRange} onChange={(value) => onChange(value as [number, number])} minValue={0} maxValue={50000} step={500} />
      <div className="flex items-center justify-between text-sm text-[#535862]">
        <span>${budgetRange[0].toLocaleString()}</span>
        <span>${budgetRange[1].toLocaleString()}</span>
      </div>
    </div>
  );
}

export { BudgetRangeSection };
