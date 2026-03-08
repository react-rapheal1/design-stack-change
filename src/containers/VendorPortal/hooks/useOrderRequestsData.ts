import { useState } from "react";
import { OrderFilters } from "../OrderFilters";
import { OrderSortField } from "../OrderSortField";
import { SortDirection } from "../SortDirection";
import { defaultOrderFilters } from "../defaultOrderFilters";
import { orderRequests } from "../orderRequests";

function useOrderRequestsData({ activeTab, excludeOrderIds, searchQuery }: { activeTab: string; excludeOrderIds: string[]; searchQuery: string }) {
  const [sortField, setSortField] = useState<OrderSortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<OrderFilters>(defaultOrderFilters);
  const itemsPerPage = 10;

  const filteredOrders = orderRequests
    .filter((order) => {
      if (excludeOrderIds.includes(order.id) || (activeTab !== "All" && order.service !== activeTab)) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = order.id.toLowerCase().includes(query) || order.devices.some((device) => device.name.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }
      if (filters.serviceTypes.length > 0 && !filters.serviceTypes.includes(order.service)) return false;
      if (filters.countries.length > 0 && !filters.countries.includes(order.country)) return false;
      const orderAmount = parseFloat(order.total.replace(/[^0-9.-]+/g, ""));
      if (orderAmount < filters.amountRange[0] || orderAmount > filters.amountRange[1]) return false;
      if (filters.dueDateFrom) {
        const fromDate = new Date(`${filters.dueDateFrom}T00:00:00`);
        if (new Date(order.dueDate) < fromDate) return false;
      }
      if (filters.dueDateTo) {
        const toDate = new Date(`${filters.dueDateTo}T23:59:59`);
        if (new Date(order.dueDate) > toDate) return false;
      }
      return true;
    })
    .sort((left, right) => {
      if (!sortField) return 0;
      const leftValue =
        sortField === "total" ? parseFloat(left.total.replace(/[^0-9.-]+/g, "")) : sortField === "dueDate" ? new Date(left.dueDate).getTime() : left[sortField];
      const rightValue =
        sortField === "total"
          ? parseFloat(right.total.replace(/[^0-9.-]+/g, ""))
          : sortField === "dueDate"
            ? new Date(right.dueDate).getTime()
            : right[sortField];
      if (leftValue < rightValue) return sortDirection === "asc" ? -1 : 1;
      if (leftValue > rightValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  function handleSort(field: OrderSortField) {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      return;
    }
    setSortField(field);
    setSortDirection("asc");
  }

  return {
    activeFilterCount:
      filters.serviceTypes.length +
      filters.countries.length +
      (filters.amountRange[0] > 0 || filters.amountRange[1] < 10000 ? 1 : 0) +
      (filters.dueDateFrom || filters.dueDateTo ? 1 : 0),
    currentPage,
    filteredOrders,
    filters,
    handleSort,
    paginatedOrders: filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    setCurrentPage,
    setFilters,
    setShowFilterModal,
    showFilterModal,
    sortDirection,
    sortField,
    totalPages,
  };
}

export { useOrderRequestsData };
