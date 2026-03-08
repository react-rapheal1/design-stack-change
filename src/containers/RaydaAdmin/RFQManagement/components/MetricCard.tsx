/* eslint-disable */
// @ts-nocheck
import { ArrowDownRight, ArrowUpRight } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { TrendDirection } from "../TrendDirection";
import { getTrend } from "../getTrend";
import { periodComparisonLabel } from "../periodComparisonLabel";
import { sparklineDataByPeriod } from "../sparklineDataByPeriod";
import { Sparkline } from "./Sparkline";

function MetricCard({ label, value, change, up, period }: { label: string; value: number | string; change: string; up: boolean; period: string }) {
  const periodData = sparklineDataByPeriod[period] || sparklineDataByPeriod["24 hours"];
  const points = periodData[label] || [3, 5, 4, 6, 8, 7, 5, 6, 4, 5];
  const sparkId = `${label.replace(/\s+/g, "-").toLowerCase()}-${period.replace(/\s+/g, "-")}`;
  const trend = getTrend(change, up);
  const trendTextColor: Record<TrendDirection, string> = { up: "text-success-primary", down: "text-error-primary", neutral: "text-tertiary" };
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs">
      {" "}
      {}{" "}
      <div className="px-5 py-3.5">
        {" "}
        <p className="text-sm font-medium text-secondary">{label}</p>{" "}
      </div>{" "}
      {}{" "}
      <div className="flex flex-col gap-5 overflow-hidden rounded-xl border-t border-secondary p-5">
        {" "}
        {}{" "}
        <div className="flex flex-wrap content-center items-center gap-3">
          {" "}
          <p className="text-[30px] leading-[38px] font-semibold text-primary">{value}</p>{" "}
          <div className="flex items-center gap-2">
            {" "}
            <span className={cx("flex items-center gap-1 text-sm font-medium", trendTextColor[trend])}>
              {" "}
              {trend === "up" && <ArrowUpRight className="size-5" />} {trend === "down" && <ArrowDownRight className="size-5" />} {change}{" "}
            </span>{" "}
            <span className="text-sm text-tertiary">{periodComparisonLabel[period] || "vs last year"}</span>{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="h-[56px] w-full">
          {" "}
          <Sparkline points={points} id={sparkId} trend={trend} />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export { MetricCard };
