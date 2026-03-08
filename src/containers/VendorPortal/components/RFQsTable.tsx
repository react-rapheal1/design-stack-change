import { useState } from "react";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { RFQ } from "../RFQ";
import { RFQSortField } from "../RFQSortField";
import { SortDirection } from "../SortDirection";
import { defaultRFQFilters } from "../defaultRFQFilters";
import { useCurrentTime } from "../hooks/useCurrentTime";
import { isRFQExpired } from "../isRFQExpired";
import { rfqs } from "../rfqs";
import { RFQTableRow } from "./RFQTableRow";
import { RFQsEmptyState } from "./RFQsEmptyState";
import { RFQsTableHead } from "./RFQsTableHead";
import { RFQsToolbar } from "./RFQsToolbar";

function RFQsTable({ excludeRFQIds = [], onViewRFQ }: { excludeRFQIds?: string[]; onViewRFQ: (rfq: RFQ) => void }) {
  const nowMs = useCurrentTime();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<RFQSortField | null>("deadline");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState(defaultRFQFilters);
  const activeFilterCount = filters.countries.length;
  const filteredRFQs = rfqs
    .filter(
      (rfq) =>
        !isRFQExpired(rfq.createdAt, nowMs) &&
        !excludeRFQIds.includes(rfq.id) &&
        (!searchQuery ||
          rfq.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rfq.devices.some((device) => device.name.toLowerCase().includes(searchQuery.toLowerCase()))) &&
        (filters.countries.length === 0 || filters.countries.includes(rfq.country)),
    )
    .sort((first, second) => {
      if (!sortField) return 0;
      const getValue = (rfq: RFQ) => (sortField === "deadline" ? new Date(rfq.createdAt).getTime() : rfq[sortField]);
      const [firstValue, secondValue] = [getValue(first), getValue(second)];
      return firstValue < secondValue ? (sortDirection === "asc" ? -1 : 1) : firstValue > secondValue ? (sortDirection === "asc" ? 1 : -1) : 0;
    });
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredRFQs.length / itemsPerPage);
  const paginatedRFQs = filteredRFQs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-w-0 rounded-xl border border-[#e9eaeb] bg-white">
      <RFQsToolbar
        activeFilterCount={activeFilterCount}
        filters={filters}
        onApplyFilters={(nextFilters) => {
          setFilters(nextFilters);
          setCurrentPage(1);
        }}
        onSearchChange={setSearchQuery}
        resultCount={filteredRFQs.length}
        searchQuery={searchQuery}
        showFilterModal={showFilterModal}
        toggleFilterModal={() => setShowFilterModal(!showFilterModal)}
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
          <RFQsTableHead
            onSort={(field) => {
              if (sortField === field) {
                setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                return;
              }
              setSortField(field);
              setSortDirection("asc");
            }}
            sortField={sortField}
          />
          {paginatedRFQs.length === 0 ? (
            <tbody>
              <RFQsEmptyState />
            </tbody>
          ) : (
            <tbody>
              {paginatedRFQs.map((rfq) => (
                <RFQTableRow key={rfq.id} onViewRFQ={onViewRFQ} rfq={rfq} nowMs={nowMs} />
              ))}
            </tbody>
          )}
        </table>
      </div>
      {totalPages > 1 && <PaginationCardDefault page={currentPage} total={totalPages} onPageChange={setCurrentPage} />}
    </div>
  );
}

export { RFQsTable };
