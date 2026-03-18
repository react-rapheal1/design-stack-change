"use client";

import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { RequestFilters } from "../../shared";
import { filterTabs } from "../../shared";
import { FilterDropdown } from "./FilterDropdown";

interface RFQManagementToolbarProps {
  activeFilter: string;
  activeFilterCount: number;
  filterButtonRef: React.RefObject<HTMLButtonElement | null>;
  filters: RequestFilters;
  onApplyFilters: (filters: RequestFilters) => void;
  onFilterChange: (key: React.Key) => void;
  onSearchChange: (value: string) => void;
  resultCount: number;
  searchQuery: string;
  setCurrentPage: (page: number) => void;
  setShowFilterModal: (open: boolean) => void;
  showFilterModal: boolean;
}

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
}: RFQManagementToolbarProps) {
  return (
    <div className="flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
      <Tabs
        value={activeFilter}
        onValueChange={(value) => onFilterChange(value)}
        className="hidden w-max md:block"
      >
        <TabsList>
          {filterTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="w-full md:hidden">
        <Select
          value={activeFilter}
          onValueChange={(value) => onFilterChange(value)}
        >
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {filterTabs.map((tab) => (
              <SelectItem key={tab.id} value={tab.id}>
                {tab.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="h-10 pl-10"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div>
          <Button
            ref={filterButtonRef}
            variant="secondary"
            onClick={() => setShowFilterModal(!showFilterModal)}
            className={cn(
              "h-10 w-full gap-2 md:w-auto",
              showFilterModal && "border-brand-500 bg-brand-50 text-brand-600"
            )}
          >
            <Filter className="size-5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-brand-600 text-xs font-medium text-white">
                {activeFilterCount}
              </span>
            )}
          </Button>
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
