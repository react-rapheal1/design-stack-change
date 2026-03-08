import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { FilterTab } from "../FilterTab";
import { SortField } from "../SortField";
import { useCustomDeviceRequestsTable } from "../hooks/useCustomDeviceRequestsTable";
import { CustomDeviceRequestRow } from "./CustomDeviceRequestRow";
import { CustomDeviceRequestsEmptyState } from "./CustomDeviceRequestsEmptyState";
import { CustomDeviceRequestsToolbar } from "./CustomDeviceRequestsToolbar";
import { ErrorToast } from "./ErrorToast";
import { RFQDetailsSidebar } from "./RFQDetailsSidebar";
import { SuccessToast } from "./SuccessToast";

const columns = [
  { id: "id", name: "Request ID", allowsSorting: true },
  { id: "devices", name: "Device(s)", allowsSorting: false },
  { id: "budget", name: "Budget", allowsSorting: true },
  { id: "country", name: "Country", allowsSorting: true },
  { id: "status", name: "Status", allowsSorting: false },
  { id: "quote", name: "Quote", allowsSorting: false },
  { id: "actions", name: "", allowsSorting: false },
];

function CustomDeviceRequestsTable() {
  const state = useCustomDeviceRequestsTable();
  if (!state.mounted)
    return (
      <TableCard.Root size="sm">
        <div className="flex items-center justify-center py-24">
          <div className="size-6 animate-spin rounded-full border-2 border-border-secondary border-t-border-brand" />
        </div>
      </TableCard.Root>
    );

  return (
    <TableCard.Root size="sm">
      <CustomDeviceRequestsToolbar
        activeFilter={state.activeFilter}
        activeFilterCount={state.activeFilterCount}
        filters={state.filters}
        onFilterChange={(key) => state.setActiveFilter(key as FilterTab)}
        onSearchChange={state.setSearchQuery}
        onToggleFilters={() => state.setShowFilterModal(!state.showFilterModal)}
        resultCount={state.totalResults}
        searchQuery={state.searchQuery}
        setFilters={state.setFilters}
        showFilterModal={state.showFilterModal}
      />
      <div className="overflow-x-auto">
        <Table
          aria-label="Custom device requests table"
          sortDescriptor={state.sortField ? { column: state.sortField, direction: state.sortDirection === "asc" ? "ascending" : "descending" } : undefined}
          onSortChange={({ column, direction }) => {
            state.setSortField(column as SortField);
            state.setSortDirection(direction === "ascending" ? "asc" : "desc");
          }}
          className="min-w-[800px]"
        >
          <Table.Header columns={columns}>
            {(column) => <Table.Head id={column.id} label={column.name} allowsSorting={column.allowsSorting} isRowHeader={column.id === "id"} />}
          </Table.Header>
          <Table.Body
            items={state.paginatedRequests}
            renderEmptyState={() => <CustomDeviceRequestsEmptyState onClear={state.resetFilters} searchQuery={state.searchQuery} />}
          >
            {(request) => <CustomDeviceRequestRow onView={state.setSelectedRequest} request={request} />}
          </Table.Body>
        </Table>
      </div>
      {state.totalPages > 1 && <PaginationCardDefault page={state.currentPage} total={state.totalPages} onPageChange={state.setCurrentPage} />}
      {state.selectedRequest && (
        <RFQDetailsSidebar
          key={state.selectedRequest.id}
          request={state.selectedRequest}
          isOpen
          onClose={() => state.setSelectedRequest(null)}
          onAccept={state.handleAcceptQuote}
          onDecline={state.handleDeclineQuote}
        />
      )}
      <SuccessToast isVisible={state.showSuccessToast} onDismiss={() => state.setShowSuccessToast(false)} message={state.successMessage} />
      <ErrorToast isVisible={state.showErrorToast} onDismiss={() => state.setShowErrorToast(false)} />
    </TableCard.Root>
  );
}

export { CustomDeviceRequestsTable };
