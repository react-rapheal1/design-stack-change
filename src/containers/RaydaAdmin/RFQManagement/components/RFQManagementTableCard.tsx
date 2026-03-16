import { TableCard } from "@/components/application/table/table";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { defaultFilters } from "../../shared";
import { RFQManagementTable } from "./RFQManagementTable";
import { RFQManagementToolbar } from "./RFQManagementToolbar";
import { TablePaginationFooter } from "./TablePaginationFooter";

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
}: {
  activeFilter: string;
  activeFilterCount: number;
  currentPage: number;
  filterButtonRef: React.RefObject<HTMLButtonElement | null>;
  filteredCount: number;
  filters: import("../../shared").RequestFilters;
  itemsPerPage: number;
  mounted: boolean;
  onApplyFilters: (filters: import("../../shared").RequestFilters) => void;
  onFilterChange: (key: React.Key) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (descriptor: { column: React.Key; direction: "ascending" | "descending" }) => void;
  paginatedRfqs: import("../../shared").RFQ[];
  searchQuery: string;
  setActiveFilter: (value: import("../../shared").FilterTab) => void;
  setFilters: (value: import("../../shared").RequestFilters) => void;
  setShowFilterModal: (open: boolean) => void;
  showFilterModal: boolean;
  sortDescriptor?: { column: import("../../shared").SortField; direction: "ascending" | "descending" };
  totalPages: number;
}) {
  const isMd = useBreakpoint("md");

  return (
    <div className="w-full page-px">
      <TableCard.Root size="sm">
        <div className="flex flex-col gap-4 border-b border-secondary px-5 py-4">
          <h2 className="text-md font-semibold text-primary">
            All Requests <span className="text-tertiary">({filteredCount})</span>
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
            <div className="size-6 animate-spin rounded-full border-2 border-border-secondary border-t-border-brand" />
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
      </TableCard.Root>
    </div>
  );
}

export { RFQManagementTableCard };
