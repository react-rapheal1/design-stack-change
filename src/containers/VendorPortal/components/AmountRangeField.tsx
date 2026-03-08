import { Slider } from "@/components/base/slider/slider";

function AmountRangeField({ value, onChange }: { value: [number, number]; onChange: (value: [number, number]) => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#181d27]">Amount Range</span>
        <span className="text-sm text-[#535862]">USD</span>
      </div>
      <Slider value={value} onChange={(nextValue) => onChange(nextValue as [number, number])} minValue={0} maxValue={10000} step={100} />
      <div className="flex items-center justify-between text-sm text-[#535862]">
        <span>${value[0].toLocaleString()}</span>
        <span>${value[1].toLocaleString()}</span>
      </div>
    </div>
  );
}

export { AmountRangeField };
