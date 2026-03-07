/* eslint-disable */
// @ts-nocheck
import { ArrowDownRight, ArrowUpRight } from "@untitledui/icons";

function MetricCard({ label, value, change, up }: { label: string; value: string; change: string; up: boolean }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[#e9eaeb] bg-white p-5 shadow-xs">
      {" "}
      <p className="text-sm font-medium text-[#535862]">{label}</p>{" "}
      <div className="flex items-end gap-4">
        {" "}
        <p className="flex-1 text-3xl font-semibold text-[#181d27]">{value}</p>{" "}
        <span className="flex items-center gap-1 rounded-md border border-[#d5d7da] bg-white px-2 py-0.5 text-sm font-medium text-[#414651] shadow-xs">
          {" "}
          {up ? <ArrowUpRight className="size-3 text-[#414651]" /> : <ArrowDownRight className="size-3 text-[#414651]" />} {change}{" "}
        </span>{" "}
      </div>{" "}
    </div>
  );
}
export { MetricCard };
