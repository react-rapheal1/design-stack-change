import { FilterLines, SearchLg } from "@untitledui/icons";
import { Tabs } from "@/components/application/tabs/tabs";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { cx } from "@/utils/cx";
import { filterTabs } from "../shared";
import { FilterDropdown } from "./FilterDropdown";

function RFQManagementToolbar({
  activeFilter,
  activeFilterCount,
  filterButtonRef,
  filters,
  onApplyFilters,
  onFilterChange,
  onSearchChange,
  resultCount,
  searchQuery,
  setCurrentPage,
  setShowFilterModal,
  showFilterModal,
}: {
  activeFilter: string;
  activeFilterCount: number;
  filterButtonRef: React.RefObject<HTMLButtonElement | null>;
  filters: import("../shared").RequestFilters;
  onApplyFilters: (filters: import("../shared").RequestFilters) => void;
  onFilterChange: (key: React.Key) => void;
  onSearchChange: (value: string) => void;
  resultCount: number;
  searchQuery: string;
  setCurrentPage: (page: number) => void;
  setShowFilterModal: (open: boolean) => void;
  showFilterModal: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
      <Tabs selectedKey={activeFilter} onSelectionChange={onFilterChange} className="hidden w-max md:block">
        <Tabs.List type="button-minimal" items={filterTabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
      <div className="w-full md:hidden">
        <Select
          size="sm"
          placeholder="Filter by status"
          selectedKey={activeFilter}
          onSelectionChange={(key) => onFilterChange(key as React.Key)}
          items={filterTabs}
        >
          {(tab) => <Select.Item id={tab.id}>{tab.label}</Select.Item>}
        </Select>
      </div>
      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
        <div className="w-full md:w-56">
          <Input
            size="sm"
            icon={SearchLg}
            placeholder="Search..."
            value={searchQuery}
            onChange={(value) => {
              onSearchChange(value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div>
          <button
            ref={filterButtonRef}
            type="button"
            onClick={() => setShowFilterModal(!showFilterModal)}
            className={cx(
              "flex h-10 w-full items-center justify-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition-colors md:w-auto",
              showFilterModal ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]" : "border-[#e9eaeb] bg-white text-[#414651] hover:bg-[#fafafa]",
            )}
          >
            <FilterLines className="size-5" /> Filters
            {activeFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-[#0948b5] text-xs font-medium text-white">{activeFilterCount}</span>
            )}
          </button>
          <FilterDropdown
            isOpen={showFilterModal}
            onClose={() => setShowFilterModal(false)}
            filters={filters}
            onApply={(nextFilters) => {
              onApplyFilters(nextFilters);
              setCurrentPage(1);
            }}
            resultCount={resultCount}
            anchorRef={filterButtonRef}
          />
        </div>
      </div>
    </div>
  );
}

export { RFQManagementToolbar };
