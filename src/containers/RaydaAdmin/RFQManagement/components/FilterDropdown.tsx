/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from "react";
import { Check } from "@untitledui/icons";
import { FilterDropdownActions } from "@/components/application/filter-dropdown-actions";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Slider } from "@/components/base/slider/slider";
import { toggleSelectedValue } from "@/utils/toggle-selected-value";
import { RFQStatus, RequestFilters, countries, defaultFilters, formatCurrency, getStatusConfig } from "../../shared";
import { useAnchoredDropdown } from "../hooks/useAnchoredDropdown";
import { rfqStatuses } from "../rfqStatuses";
import { CountryFlag } from "./CountryFlag";

function FilterDropdown({
  isOpen,
  onClose,
  filters,
  onApply,
  resultCount,
  anchorRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: RequestFilters;
  onApply: (f: RequestFilters) => void;
  resultCount: number;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const [localFilters, setLocalFilters] = useState<RequestFilters>(filters);
  const { dropdownRef, position } = useAnchoredDropdown({ anchorRef, isOpen, onClose });

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
  }, [filters, isOpen]);

  if (!isOpen) return null;

  const toggleStatus = (s: RFQStatus) => {
    setLocalFilters((prev) => ({ ...prev, statuses: toggleSelectedValue(prev.statuses, s) }));
  };
  const toggleCountry = (c: string) => {
    setLocalFilters((prev) => ({ ...prev, countries: toggleSelectedValue(prev.countries, c) }));
  };
  return (
    <div
      ref={dropdownRef}
      style={{ top: position.top, right: position.right }}
      className="fixed z-50 w-80 rounded-xl border border-secondary bg-primary p-4 shadow-lg"
    >
      {" "}
      <div className="flex flex-col gap-5">
        {" "}
        {}{" "}
        <div>
          {" "}
          <p className="mb-2 text-sm font-medium text-primary">Status</p>{" "}
          <div className="flex flex-wrap gap-2">
            {" "}
            {rfqStatuses.map((s) => {
              const config = getStatusConfig(s);
              const isSelected = localFilters.statuses.includes(s);
              return (
                <button key={s} type="button" onClick={() => toggleStatus(s)}>
                  {" "}
                  {isSelected ? (
                    <BadgeWithIcon size="md" color={config.color} type="pill-color" iconLeading={Check}>
                      {" "}
                      {config.label}{" "}
                    </BadgeWithIcon>
                  ) : (
                    <Badge size="md" color={config.color} type="pill-color">
                      {" "}
                      {config.label}{" "}
                    </Badge>
                  )}{" "}
                </button>
              );
            })}{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div>
          {" "}
          <p className="mb-2 text-sm font-medium text-primary">Country</p>{" "}
          <div className="flex flex-wrap gap-2">
            {" "}
            {countries.map((c) => {
              const isSelected = localFilters.countries.includes(c);
              return (
                <button key={c} type="button" onClick={() => toggleCountry(c)}>
                  {" "}
                  {isSelected ? (
                    <BadgeWithIcon size="md" color="brand" type="pill-color" iconLeading={Check}>
                      {" "}
                      {c}{" "}
                    </BadgeWithIcon>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-utility-gray-50 px-2.5 py-0.5 text-sm font-medium text-utility-gray-700 ring-1 ring-utility-gray-200 ring-inset">
                      {" "}
                      <CountryFlag country={c} /> {c}{" "}
                    </span>
                  )}{" "}
                </button>
              );
            })}{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div>
          {" "}
          <p className="mb-2 text-sm font-medium text-primary">Budget Range</p>{" "}
          <Slider
            minValue={0}
            maxValue={100000}
            step={1000}
            value={localFilters.budgetRange}
            onChange={(val) => setLocalFilters((prev) => ({ ...prev, budgetRange: val as [number, number] }))}
          />{" "}
          <div className="mt-1 flex justify-between text-xs text-tertiary">
            {" "}
            <span>{formatCurrency(localFilters.budgetRange[0])}</span> <span>{formatCurrency(localFilters.budgetRange[1])}</span>{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <FilterDropdownActions
          applyLabel={`Show ${resultCount} results`}
          onApply={() => {
            onApply(localFilters);
            onClose();
          }}
          onReset={() => {
            setLocalFilters(defaultFilters);
            onApply(defaultFilters);
            onClose();
          }}
        />{" "}
      </div>{" "}
    </div>
  );
}
export { FilterDropdown };
