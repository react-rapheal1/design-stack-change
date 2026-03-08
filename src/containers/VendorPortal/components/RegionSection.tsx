/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import { cx } from "@/utils/cx";
import { stateRegions } from "../stateRegions";
import { PeriodTabs } from "./PeriodTabs";

function RegionSection() {
  const [activeTab, setActiveTab] = useState("12 months");
  return (
    <div className="min-w-0 rounded-xl border border-[#e9eaeb] bg-white">
      {" "}
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {" "}
        {}{" "}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {" "}
          <h3 className="text-lg font-semibold text-[#181d27]">Region</h3> <PeriodTabs activeTab={activeTab} onTabChange={setActiveTab} />{" "}
        </div>{" "}
        {}{" "}
        <div className="flex flex-col gap-6 lg:flex-row">
          {" "}
          {}{" "}
          <div className="flex flex-1 items-center justify-center rounded-lg bg-[#f9fafb] p-4 md:p-8">
            {" "}
            <div className="relative w-full max-w-[500px]">
              {" "}
              {}{" "}
              <svg viewBox="0 0 800 400" className="w-full text-[#e5e7eb]" fill="currentColor">
                {" "}
                <ellipse cx="400" cy="200" rx="380" ry="180" fill="#f0f0f0" />{" "}
                <text x="400" y="210" textAnchor="middle" className="text-sm" fill="#98a2b3">
                  World Map
                </text>{" "}
              </svg>{" "}
              {}{" "}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#101828] px-3 py-2 text-xs text-white shadow-lg">
                {" "}
                <p className="font-medium">United State of America</p> <p className="text-[#98a2b3]">43</p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="h-px w-full bg-[#e9eaeb] lg:hidden" /> <div className="hidden w-px self-stretch bg-[#e9eaeb] lg:block" /> {}{" "}
          <div className="flex w-full flex-col gap-6 lg:w-[340px]">
            {" "}
            <h4 className="text-lg font-semibold text-[#181d27]">State Regioned</h4> {}{" "}
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
              {" "}
              <div className="relative size-40 shrink-0">
                {" "}
                <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                  {" "}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#2e5fe8" strokeWidth="20" strokeDasharray="75 251.2" />{" "}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#6a93f0" strokeWidth="20" strokeDasharray="50 251.2" strokeDashoffset="-75" />{" "}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f5a623" strokeWidth="20" strokeDasharray="45 251.2" strokeDashoffset="-125" />{" "}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f7c66e" strokeWidth="20" strokeDasharray="40 251.2" strokeDashoffset="-170" />{" "}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e74c3c" strokeWidth="20" strokeDasharray="41.2 251.2" strokeDashoffset="-210" />{" "}
                </svg>{" "}
              </div>{" "}
              {}{" "}
              <div className="flex flex-col gap-2">
                {" "}
                {stateRegions.map((region) => (
                  <div key={region.name} className="flex items-center gap-2">
                    {" "}
                    <div className={cx("size-2.5 rounded-full", region.color)} /> <span className="text-sm text-[#535862]">{region.name}</span>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export { RegionSection };
