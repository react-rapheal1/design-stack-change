import { FilterLines, SearchLg } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import { RFQFilters } from "../RFQFilters";
import { RFQFilterDropdown } from "./RFQFilterDropdown";

function RFQsToolbar({
  activeFilterCount,
  filters,
  onApplyFilters,
  onSearchChange,
  resultCount,
  searchQuery,
  showFilterModal,
  toggleFilterModal,
}: {
  activeFilterCount: number;
  filters: RFQFilters;
  onApplyFilters: (filters: RFQFilters) => void;
  onSearchChange: (value: string) => void;
  resultCount: number;
  searchQuery: string;
  showFilterModal: boolean;
  toggleFilterModal: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-[#e9eaeb] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
      <h3 className="text-lg font-semibold text-[#181d27]">RFQs ({resultCount})</h3>
      <div className="flex items-center gap-2">
        <div className="flex-1 md:w-56 md:flex-none">
          <Input size="sm" icon={SearchLg} placeholder="Search..." value={searchQuery} onChange={onSearchChange} />
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={toggleFilterModal}
            className={cx(
              "flex h-10 items-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition-colors",
              showFilterModal ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]" : "border-[#e9eaeb] bg-white text-[#414651] hover:bg-[#fafafa]",
            )}
          >
            <FilterLines className="size-5" />
            Filter
            {activeFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-[#0948b5] text-xs font-medium text-white">{activeFilterCount}</span>
            )}
          </button>
          <RFQFilterDropdown isOpen={showFilterModal} onClose={toggleFilterModal} filters={filters} onApply={onApplyFilters} resultCount={resultCount} />
        </div>
      </div>
    </div>
  );
}

export { RFQsToolbar };
