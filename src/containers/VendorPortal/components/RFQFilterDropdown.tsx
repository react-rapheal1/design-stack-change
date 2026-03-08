/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Check, FilterLines } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import { RFQFilters } from "../RFQFilters";
import { countries } from "../countries";
import { defaultRFQFilters } from "../defaultRFQFilters";
import { CountryFlag } from "./CountryFlag";

function RFQFilterDropdown({
  isOpen,
  onClose,
  filters,
  onApply,
  resultCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: RFQFilters;
  onApply: (filters: RFQFilters) => void;
  resultCount: number;
}) {
  const isMd = useBreakpoint("md");
  const [localFilters, setLocalFilters] = useState<RFQFilters>(filters);
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
    setLocalFilters(defaultRFQFilters);
  };
  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };
  const toggleCountry = (country: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      countries: prev.countries.includes(country) ? prev.countries.filter((c) => c !== country) : [...prev.countries, country],
    }));
  };
  const hasActiveFilters = localFilters.countries.length > 0;
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
          <h3 className="text-base font-semibold text-[#181d27]">Filter RFQs</h3>{" "}
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
export { RFQFilterDropdown };
