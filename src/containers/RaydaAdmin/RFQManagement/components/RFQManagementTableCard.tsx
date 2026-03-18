"use client";

import { Card } from "@/components/ui/card";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import type { FilterTab, RFQ, RequestFilters, SortField } from "../../shared";
import { defaultFilters } from "../../shared";
import { RFQManagementTable } from "./RFQManagementTable";
import { RFQManagementToolbar } from "./RFQManagementToolbar";
import { TablePaginationFooter } from "./TablePaginationFooter";

interface RFQManagementTableCardProps {
  activeFilter: string;
  activeFilterCount: number;
  currentPage: number;
  filterButtonRef: React.RefObject<HTMLButtonElement | null>;
  filteredCount: number;
  filters: RequestFilters;
  itemsPerPage: number;
  mounted: boolean;
  onApplyFilters: (filters: RequestFilters) => void;
  onFilterChange: (key: React.Key) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (descriptor: { column: React.Key; direction: "ascending" | "descending" }) => void;
  paginatedRfqs: RFQ[];
  searchQuery: string;
  setActiveFilter: (value: FilterTab) => void;
  setFilters: (value: RequestFilters) => void;
  setShowFilterModal: (open: boolean) => void;
  showFilterModal: boolean;
  sortDescriptor?: { column: SortField; direction: "ascending" | "descending" };
  totalPages: number;
}

function RFQManagementTableCard({
  activeFilter,
  activeFilterCount,
  currentPage,
  filterButtonRef,
  filteredCount,
  filters,
  itemsPerPage,
  mounted,
  onFilterChange,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  onSortChange,
  onApplyFilters,
  paginatedRfqs,
  searchQuery,
  setActiveFilter,
  setFilters,
  setShowFilterModal,
  showFilterModal,
  sortDescriptor,
  totalPages,
}: RFQManagementTableCardProps) {
  const isMd = useBreakpoint("md");

  return (
    <div className="w-full page-px">
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            All Requests{" "}
            <span className="text-gray-500">({filteredCount})</span>
          </h2>
          <RFQManagementToolbar
            activeFilter={activeFilter}
            activeFilterCount={activeFilterCount}
            filterButtonRef={filterButtonRef}
            filters={filters}
            onApplyFilters={onApplyFilters}
            onFilterChange={onFilterChange}
            onSearchChange={onSearchChange}
            resultCount={filteredCount}
            searchQuery={searchQuery}
            setCurrentPage={onPageChange}
            setShowFilterModal={setShowFilterModal}
            showFilterModal={showFilterModal}
          />
          {!isMd && <span className="hidden" />}
        </div>

        {!mounted ? (
          <div className="flex items-center justify-center py-24">
            <div className="size-6 animate-spin rounded-full border-2 border-gray-200 border-t-brand-600" />
          </div>
        ) : (
          <RFQManagementTable
            onClearFilters={() => {
              onSearchChange("");
              setFilters(defaultFilters);
              setActiveFilter("all");
            }}
            onSortChange={onSortChange}
            rfqs={paginatedRfqs}
            searchQuery={searchQuery}
            sortDescriptor={sortDescriptor}
          />
        )}

        <TablePaginationFooter
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          totalItems={filteredCount}
          totalPages={totalPages}
        />
      </Card>
    </div>
  );
}

export { RFQManagementTableCard };
