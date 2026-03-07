/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Check, FilterLines } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Slider } from "@/components/base/slider/slider";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import { CountryFlag } from "./CountryFlag";
import { OrderFilters } from "./OrderFilters";
import { countries } from "./countries";
import { defaultOrderFilters } from "./defaultOrderFilters";

function OrderFilterDropdown({
  isOpen,
  onClose,
  filters,
  onApply,
  resultCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: OrderFilters;
  onApply: (filters: OrderFilters) => void;
  resultCount: number;
}) {
  const isMd = useBreakpoint("md");
  const [localFilters, setLocalFilters] = useState<OrderFilters>(filters);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
  }, [isOpen, filters]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);
  const handleReset = () => {
    setLocalFilters(defaultOrderFilters);
  };
  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };
  const toggleServiceType = (service: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(service) ? prev.serviceTypes.filter((s) => s !== service) : [...prev.serviceTypes, service],
    }));
  };
  const toggleCountry = (country: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      countries: prev.countries.includes(country) ? prev.countries.filter((c) => c !== country) : [...prev.countries, country],
    }));
  };
  const hasActiveFilters =
    localFilters.serviceTypes.length > 0 ||
    localFilters.countries.length > 0 ||
    localFilters.amountRange[0] > 0 ||
    localFilters.amountRange[1] < 10000 ||
    localFilters.dueDateFrom !== "" ||
    localFilters.dueDateTo !== "";
  if (!isOpen) return null;
  return (
    <>
      {" "}
      {!isMd && <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />}{" "}
      <div
        ref={dropdownRef}
        className={cx(
          "z-50 overflow-hidden rounded-xl border border-[#e9eaeb] bg-white shadow-2xl duration-200 animate-in fade-in slide-in-from-top-2",
          isMd ? "absolute top-full right-0 mt-2 w-[380px]" : "fixed inset-x-4 bottom-4 max-h-[80vh]",
        )}
      >
        {" "}
        {}{" "}
        <div className="flex items-center justify-between border-b border-[#e9eaeb] px-5 py-3">
          {" "}
          <h3 className="text-base font-semibold text-[#181d27]">Filter Orders</h3>{" "}
          <button type="button" onClick={handleReset} className="text-sm font-semibold text-[#0948b5] hover:text-[#073d8a]">
            {" "}
            Reset{" "}
          </button>{" "}
        </div>{" "}
        {}{" "}
        <div className="flex max-h-[400px] flex-col gap-5 overflow-y-auto px-5 py-4">
          {" "}
          {}{" "}
          <div className="flex flex-col gap-2.5">
            {" "}
            <span className="text-sm font-semibold text-[#181d27]">Service Type</span>{" "}
            <div className="flex flex-wrap gap-2">
              {" "}
              {["Onboarding", "Offboarding", "Storage"].map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleServiceType(service)}
                  className={cx(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                    localFilters.serviceTypes.includes(service)
                      ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                      : "border-[#e9eaeb] bg-white text-[#535862] hover:bg-[#fafafa]",
                  )}
                >
                  {" "}
                  {localFilters.serviceTypes.includes(service) && <Check className="size-3.5" />} {service}{" "}
                </button>
              ))}{" "}
            </div>{" "}
          </div>{" "}
          {}{" "}
          <div className="flex flex-col gap-2.5">
            {" "}
            <span className="text-sm font-semibold text-[#181d27]">Country</span>{" "}
            <div className="flex flex-wrap gap-2">
              {" "}
              {countries.map((country) => (
                <button
                  key={country}
                  type="button"
                  onClick={() => toggleCountry(country)}
                  className={cx(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                    localFilters.countries.includes(country)
                      ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                      : "border-[#e9eaeb] bg-white text-[#535862] hover:bg-[#fafafa]",
                  )}
                >
                  {" "}
                  {localFilters.countries.includes(country) && <Check className="size-3.5" />} <CountryFlag country={country} /> {country}{" "}
                </button>
              ))}{" "}
            </div>{" "}
          </div>{" "}
          {}{" "}
          <div className="flex flex-col gap-2.5">
            {" "}
            <div className="flex items-center justify-between">
              {" "}
              <span className="text-sm font-semibold text-[#181d27]">Amount Range</span> <span className="text-sm text-[#535862]">USD</span>{" "}
            </div>{" "}
            <Slider
              value={localFilters.amountRange}
              onChange={(value) => setLocalFilters((prev) => ({ ...prev, amountRange: value as [number, number] }))}
              minValue={0}
              maxValue={10000}
              step={100}
            />{" "}
            <div className="flex items-center justify-between text-sm text-[#535862]">
              {" "}
              <span>${localFilters.amountRange[0].toLocaleString()}</span> <span>${localFilters.amountRange[1].toLocaleString()}</span>{" "}
            </div>{" "}
          </div>{" "}
          {}{" "}
          <div className="flex flex-col gap-2.5">
            {" "}
            <span className="text-sm font-semibold text-[#181d27]">Due Date</span>{" "}
            <div className="grid grid-cols-2 gap-3">
              {" "}
              <div className="flex flex-col gap-1.5">
                {" "}
                <label className="text-xs font-medium text-[#535862]">From</label>{" "}
                <input
                  type="date"
                  value={localFilters.dueDateFrom}
                  onChange={(e) => setLocalFilters((prev) => ({ ...prev, dueDateFrom: e.target.value }))}
                  className="rounded-lg border border-[#e9eaeb] px-3 py-2 text-sm text-[#181d27] outline-none focus:border-[#0948b5] focus:ring-2 focus:ring-[#0948b5]/20"
                />{" "}
              </div>{" "}
              <div className="flex flex-col gap-1.5">
                {" "}
                <label className="text-xs font-medium text-[#535862]">To</label>{" "}
                <input
                  type="date"
                  value={localFilters.dueDateTo}
                  onChange={(e) => setLocalFilters((prev) => ({ ...prev, dueDateTo: e.target.value }))}
                  className="rounded-lg border border-[#e9eaeb] px-3 py-2 text-sm text-[#181d27] outline-none focus:border-[#0948b5] focus:ring-2 focus:ring-[#0948b5]/20"
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="border-t border-[#e9eaeb] px-5 py-3">
          {" "}
          <Button size="md" color="primary" className="w-full" iconLeading={FilterLines} onClick={handleApply}>
            {" "}
            Apply Filter{hasActiveFilters ? ` (${resultCount})` : ""}{" "}
          </Button>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
export { OrderFilterDropdown };
