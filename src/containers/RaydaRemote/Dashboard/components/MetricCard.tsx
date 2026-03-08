import type { IconComponent } from "../types";

interface MetricCardProps {
  label: string;
  value: string;
  icon: IconComponent;
}

export function MetricCard({ label, value, icon: Icon }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#eaecf0] bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f2f4f7]">
        <Icon className="size-5 text-[#667085]" />
      </div>
      <div>
        <p className="text-xs font-medium text-tertiary">{label}</p>
        <p className="mt-1 text-2xl font-bold text-primary">{value}</p>
      </div>
    </div>
  );
}
