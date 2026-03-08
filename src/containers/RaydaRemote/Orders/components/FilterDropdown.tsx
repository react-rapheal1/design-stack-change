import { useRef, useState } from "react";
import { FilterLines } from "@untitledui/icons";
import { FilterDropdownActions } from "@/components/application/filter-dropdown-actions";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cx } from "@/utils/cx";
import { toggleSelectedValue } from "@/utils/toggle-selected-value";
import { RequestFilters } from "../RequestFilters";
import { assetTypes } from "../assetTypes";
import { countries } from "../countries";
import { defaultRequestFilters } from "../defaultRequestFilters";
import { BudgetRangeSection } from "./BudgetRangeSection";
import { CountryFlag } from "./CountryFlag";
import { FilterChip } from "./FilterChip";

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMd = useBreakpoint("md");

  useClickOutside({ isEnabled: isOpen, onOutsideClick: onClose, ref: dropdownRef });

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
      countries: toggleSelectedValue(prev.countries, country),
    }));
  };

  const toggleAssetType = (assetType: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      assetTypes: toggleSelectedValue(prev.assetTypes, assetType),
    }));
  };

  const hasActiveFilters =
    localFilters.countries.length > 0 || localFilters.assetTypes.length > 0 || localFilters.budgetRange[0] > 0 || localFilters.budgetRange[1] < 50000;

  if (!isOpen) return null;

  return (
    <>
      {!isMd && <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />}
      <div
        ref={dropdownRef}
        className={cx(
          "z-50 rounded-xl border border-[#e9eaeb] bg-white shadow-lg",
          isMd ? "absolute top-full right-0 mt-2 w-[340px]" : "fixed inset-x-4 bottom-4 max-h-[80vh] overflow-y-auto",
        )}
      >
        <div className="flex items-center justify-between border-b border-[#e9eaeb] px-5 py-3">
          <h3 className="text-base font-semibold text-[#181d27]">Filter Requests</h3>
          <button type="button" onClick={handleReset} className="text-sm font-semibold text-[#0948b5] hover:text-[#073d8a]">
            Reset
          </button>
        </div>
        <div className="flex flex-col gap-5 p-5">
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-[#414651]">Country</span>
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <FilterChip
                  key={country}
                  label={country}
                  leading={<CountryFlag country={country} />}
                  isSelected={localFilters.countries.includes(country)}
                  onClick={() => toggleCountry(country)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-[#414651]">Asset Type</span>
            <div className="flex flex-wrap gap-2">
              {assetTypes.map((assetType) => (
                <FilterChip
                  key={assetType}
                  label={assetType}
                  isSelected={localFilters.assetTypes.includes(assetType)}
                  onClick={() => toggleAssetType(assetType)}
                />
              ))}
            </div>
          </div>
          <BudgetRangeSection budgetRange={localFilters.budgetRange} onChange={(budgetRange) => setLocalFilters((prev) => ({ ...prev, budgetRange }))} />
        </div>
        <div className="px-5 py-3">
          <FilterDropdownActions
            applyLabel={`Apply Filter${hasActiveFilters ? ` (${resultCount})` : ""}`}
            applyLeadingIcon={FilterLines}
            onApply={handleApply}
            onReset={handleReset}
          />
        </div>
      </div>
    </>
  );
}

export { FilterDropdown };
