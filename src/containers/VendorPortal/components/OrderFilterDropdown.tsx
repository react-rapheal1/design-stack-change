/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { FilterLines } from "@untitledui/icons";
import { FilterDropdownActions } from "@/components/application/filter-dropdown-actions";
import { Button } from "@/components/base/buttons/button";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cx } from "@/utils/cx";
import { toggleSelectedValue } from "@/utils/toggle-selected-value";
import { OrderFilters } from "../OrderFilters";
import { countries } from "../countries";
import { defaultOrderFilters } from "../defaultOrderFilters";
import { orderServiceTypes } from "../orderServiceTypes";
import { AmountRangeField } from "./AmountRangeField";
import { CountryFlag } from "./CountryFlag";
import { DateRangeFields } from "./DateRangeFields";
import { FilterChip } from "./FilterChip";

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
  useClickOutside({ isEnabled: isOpen, onOutsideClick: onClose, ref: dropdownRef });
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
      serviceTypes: toggleSelectedValue(prev.serviceTypes, service),
    }));
  };
  const toggleCountry = (country: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      countries: toggleSelectedValue(prev.countries, country),
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
              {orderServiceTypes.map((service) => (
                <FilterChip key={service} label={service} isSelected={localFilters.serviceTypes.includes(service)} onClick={() => toggleServiceType(service)} />
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
                <FilterChip
                  key={country}
                  label={country}
                  leading={<CountryFlag country={country} />}
                  isSelected={localFilters.countries.includes(country)}
                  onClick={() => toggleCountry(country)}
                />
              ))}{" "}
            </div>{" "}
          </div>{" "}
          {} <AmountRangeField value={localFilters.amountRange} onChange={(value) => setLocalFilters((prev) => ({ ...prev, amountRange: value }))} /> {}{" "}
          <div className="flex flex-col gap-2.5">
            {" "}
            <span className="text-sm font-semibold text-[#181d27]">Due Date</span>{" "}
            <DateRangeFields
              dueDateFrom={localFilters.dueDateFrom}
              dueDateTo={localFilters.dueDateTo}
              onChange={(key, value) => setLocalFilters((prev) => ({ ...prev, [key]: value }))}
            />{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="px-5 py-3">
          <FilterDropdownActions
            applyLabel={`Apply Filter${hasActiveFilters ? ` (${resultCount})` : ""}`}
            applyLeadingIcon={FilterLines}
            onApply={handleApply}
            onReset={handleReset}
          />
        </div>{" "}
      </div>{" "}
    </>
  );
}
export { OrderFilterDropdown };
