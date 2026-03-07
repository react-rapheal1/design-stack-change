/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Check, FilterLines } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Slider } from "@/components/base/slider/slider";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import { CountryFlag } from "./CountryFlag";
import { RequestFilters } from "./RequestFilters";
import { assetTypes } from "./assetTypes";
import { countries } from "./countries";
import { defaultRequestFilters } from "./defaultRequestFilters";

function FilterDropdown({
  isOpen,
  onClose,
  filters,
  onApply,
  resultCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: RequestFilters;
  onApply: (filters: RequestFilters) => void;
  resultCount: number;
}) {
  const [localFilters, setLocalFilters] = useState<RequestFilters>(filters);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const isMd = useBreakpoint("md");
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
    setLocalFilters(defaultRequestFilters);
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
  const toggleAssetType = (assetType: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      assetTypes: prev.assetTypes.includes(assetType) ? prev.assetTypes.filter((a) => a !== assetType) : [...prev.assetTypes, assetType],
    }));
  };
  const hasActiveFilters =
    localFilters.countries.length > 0 || localFilters.assetTypes.length > 0 || localFilters.budgetRange[0] > 0 || localFilters.budgetRange[1] < 50000;
  if (!isOpen) return null;
  return (
    <>
      {" "}
      {} {!isMd && <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />}{" "}
      <div
        ref={dropdownRef}
        className={cx(
          "z-50 rounded-xl border border-[#e9eaeb] bg-white shadow-lg",
          isMd ? "absolute top-full right-0 mt-2 w-[340px]" : "fixed inset-x-4 bottom-4 max-h-[80vh] overflow-y-auto",
        )}
      >
        {" "}
        {}{" "}
        <div className="flex items-center justify-between border-b border-[#e9eaeb] px-5 py-3">
          {" "}
          <h3 className="text-base font-semibold text-[#181d27]">Filter Requests</h3>{" "}
          <button type="button" onClick={handleReset} className="text-sm font-semibold text-[#0948b5] hover:text-[#073d8a]">
            {" "}
            Reset{" "}
          </button>{" "}
        </div>{" "}
        {}{" "}
        <div className="flex flex-col gap-5 p-5">
          {" "}
          {}{" "}
          <div className="flex flex-col gap-2.5">
            {" "}
            <span className="text-sm font-semibold text-[#414651]">Country</span>{" "}
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
            <span className="text-sm font-semibold text-[#414651]">Asset Type</span>{" "}
            <div className="flex flex-wrap gap-2">
              {" "}
              {assetTypes.map((assetType) => (
                <button
                  key={assetType}
                  type="button"
                  onClick={() => toggleAssetType(assetType)}
                  className={cx(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                    localFilters.assetTypes.includes(assetType)
                      ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                      : "border-[#e9eaeb] bg-white text-[#535862] hover:bg-[#fafafa]",
                  )}
                >
                  {" "}
                  {localFilters.assetTypes.includes(assetType) && <Check className="size-3.5" />} {assetType}{" "}
                </button>
              ))}{" "}
            </div>{" "}
          </div>{" "}
          {}{" "}
          <div className="flex flex-col gap-2.5">
            {" "}
            <div className="flex items-center justify-between">
              {" "}
              <span className="text-sm font-semibold text-[#414651]">Budget Range</span>{" "}
            </div>{" "}
            <Slider
              value={localFilters.budgetRange}
              onChange={(value) => setLocalFilters((prev) => ({ ...prev, budgetRange: value as [number, number] }))}
              minValue={0}
              maxValue={50000}
              step={500}
            />{" "}
            <div className="flex items-center justify-between text-sm text-[#535862]">
              {" "}
              <span>${localFilters.budgetRange[0].toLocaleString()}</span> <span>${localFilters.budgetRange[1].toLocaleString()}</span>{" "}
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
export { FilterDropdown };
