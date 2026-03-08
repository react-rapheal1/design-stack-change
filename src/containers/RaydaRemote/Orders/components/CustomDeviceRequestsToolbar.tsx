import React from "react";
import { FilterLines, SearchLg } from "@untitledui/icons";
import { Tabs } from "@/components/application/tabs/tabs";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import { FilterTab } from "../FilterTab";
import { RequestFilters } from "../RequestFilters";
import { filterTabs } from "../filterTabs";
import { FilterDropdown } from "./FilterDropdown";

function CustomDeviceRequestsToolbar({
  activeFilter,
  activeFilterCount,
  filters,
  onFilterChange,
  onSearchChange,
  onToggleFilters,
  resultCount,
  searchQuery,
  setFilters,
  showFilterModal,
}: {
  activeFilter: FilterTab;
  activeFilterCount: number;
  filters: RequestFilters;
  onFilterChange: (key: React.Key) => void;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
  resultCount: number;
  searchQuery: string;
  setFilters: (filters: RequestFilters) => void;
  showFilterModal: boolean;
}) {
  const isMd = useBreakpoint("md");

  return (
    <div className="flex flex-col gap-4 border-b border-secondary px-5 py-4">
      <h2 className="text-md font-semibold text-primary">
        Custom Device Requests <span className="text-tertiary">({resultCount})</span>
      </h2>
      <div className="flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
        {isMd ? (
          <Tabs selectedKey={activeFilter} onSelectionChange={onFilterChange} className="w-max">
            <Tabs.List type="button-minimal" items={filterTabs}>
              {(tab) => <Tabs.Item {...tab} />}
            </Tabs.List>
          </Tabs>
        ) : (
          <div className="w-full">
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
        )}
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <div className="w-full md:w-56">
            <Input size="sm" icon={SearchLg} placeholder="Search..." value={searchQuery} onChange={onSearchChange} />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={onToggleFilters}
              className={cx(
                "flex h-10 w-full items-center justify-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition-colors md:w-auto",
                showFilterModal ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]" : "border-[#e9eaeb] bg-white text-[#414651] hover:bg-[#fafafa]",
              )}
            >
              <FilterLines className="size-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-[#0948b5] text-xs font-medium text-white">{activeFilterCount}</span>
              )}
            </button>
            {showFilterModal && <FilterDropdown isOpen onClose={onToggleFilters} filters={filters} onApply={setFilters} resultCount={resultCount} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export { CustomDeviceRequestsToolbar };
