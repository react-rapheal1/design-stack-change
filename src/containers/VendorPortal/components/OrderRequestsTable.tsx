import { useState } from "react";
import { OrderRequest } from "../OrderRequest";
import { useOrderRequestsData } from "../hooks/useOrderRequestsData";
import { OrderRequestsTableView } from "./OrderRequestsTableView";
import { OrderRequestsToolbar } from "./OrderRequestsToolbar";

function OrderRequestsTable({ excludeOrderIds = [], onViewOrder }: { excludeOrderIds?: string[]; onViewOrder: (order: OrderRequest) => void }) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const data = useOrderRequestsData({ activeTab, excludeOrderIds, searchQuery });

  return (
    <div className="min-w-0 rounded-xl border border-[#e9eaeb] bg-white">
      <div className="flex items-center justify-between border-b border-[#e9eaeb] px-4 py-4 md:px-6">
        <h3 className="text-lg font-semibold text-[#181d27]">Order requests ({data.filteredOrders.length})</h3>
      </div>
      <OrderRequestsToolbar
        activeFilterCount={data.activeFilterCount}
        activeTab={activeTab}
        filters={data.filters}
        onApplyFilters={data.setFilters}
        onSearchChange={setSearchQuery}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        setCurrentPage={data.setCurrentPage}
        setShowFilterModal={data.setShowFilterModal}
        showFilterModal={data.showFilterModal}
        totalCount={data.filteredOrders.length}
      />
      <OrderRequestsTableView
        currentPage={data.currentPage}
        onPageChange={data.setCurrentPage}
        onSort={data.handleSort}
        onViewOrder={onViewOrder}
        orders={data.paginatedOrders}
        sortField={data.sortField}
        totalPages={data.totalPages}
      />
    </div>
  );
}

export { OrderRequestsTable };
