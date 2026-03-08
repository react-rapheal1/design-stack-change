/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import { RFQ } from "../RFQ";
import { rfqChartMonths } from "../rfqChartMonths";
import { rfqInitiated } from "../rfqInitiated";
import { rfqPending } from "../rfqPending";
import { PeriodTabs } from "./PeriodTabs";

function RFQChartSection() {
  const [activeTab, setActiveTab] = useState("12 months");
  const maxVal = Math.max(...rfqInitiated);
  return (
    <div className="min-w-0 rounded-xl border border-[#e9eaeb] bg-white">
      {" "}
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {" "}
        {}{" "}
        <div className="flex flex-col gap-4">
          {" "}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            {" "}
            <div>
              {" "}
              <h3 className="text-lg font-semibold text-[#181d27]">Request For Quote</h3>{" "}
              <p className="text-sm text-[#535862]">These are requests that don&apos;t come from the catalog provided</p>{" "}
            </div>{" "}
            <PeriodTabs activeTab={activeTab} onTabChange={setActiveTab} />{" "}
          </div>{" "}
          <div className="h-px bg-[#e9eaeb]" />{" "}
        </div>{" "}
        {}{" "}
        <div className="flex items-center gap-4">
          {" "}
          <div className="flex items-center gap-1.5">
            {" "}
            <div className="size-2.5 rounded-full bg-[#2e5fe8]" /> <span className="text-sm text-[#535862]">RFQ Initiated</span>{" "}
          </div>{" "}
          <div className="flex items-center gap-1.5">
            {" "}
            <div className="size-2.5 rounded-full bg-[#a3bffa]" /> <span className="text-sm text-[#535862]">RFQ Pending</span>{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="overflow-x-auto">
          {" "}
          <div className="flex min-w-[500px] items-end gap-1">
            {" "}
            {}{" "}
            <div className="flex flex-col justify-between pr-2 text-xs text-[#98a2b3]" style={{ height: 200 }}>
              {" "}
              {[25, 20, 15, 10, 5, 0].map((val) => (
                <span key={val}>{val}</span>
              ))}{" "}
            </div>{" "}
            {}{" "}
            <div className="flex flex-1 items-end justify-between gap-1">
              {" "}
              {rfqChartMonths.map((month, i) => (
                <div key={month} className="flex flex-1 flex-col items-center gap-1">
                  {" "}
                  <div className="flex w-full items-end justify-center gap-0.5" style={{ height: 200 }}>
                    {" "}
                    <div className="w-full max-w-[16px] rounded-t bg-[#a3bffa]" style={{ height: `${(rfqPending[i] / maxVal) * 100}%` }} />{" "}
                    <div className="w-full max-w-[16px] rounded-t bg-[#2e5fe8]" style={{ height: `${(rfqInitiated[i] / maxVal) * 100}%` }} />{" "}
                  </div>{" "}
                  <span className="text-xs text-[#98a2b3]">{month}</span>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </div>{" "}
          <p className="text-center text-xs text-[#98a2b3]">Month</p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export { RFQChartSection };
