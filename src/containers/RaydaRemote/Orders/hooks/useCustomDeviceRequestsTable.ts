import { useMemo, useState } from "react";
import { useIsSSR } from "react-aria";
import { CustomDeviceRequest } from "../CustomDeviceRequest";
import { RequestFilters } from "../RequestFilters";
import { RequestStatus } from "../RequestStatus";
import { SortDirection } from "../SortDirection";
import { SortField } from "../SortField";
import { calculateBudgetTotal } from "../calculateBudgetTotal";
import { customDeviceRequests } from "../customDeviceRequests";
import { defaultRequestFilters } from "../defaultRequestFilters";

function useCustomDeviceRequestsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | RequestStatus>("all");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<CustomDeviceRequest | null>(null);
  const [requests, setRequests] = useState(customDeviceRequests);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [filters, setFilters] = useState<RequestFilters>(defaultRequestFilters);
  const mounted = !useIsSSR();

  const filteredRequests = useMemo(
    () =>
      requests.filter((request) => {
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matches = request.id.toLowerCase().includes(query) || request.devices.some((device) => device.name.toLowerCase().includes(query));
          if (!matches) return false;
        }
        if (activeFilter !== "all" && request.status !== activeFilter) return false;
        if (filters.countries.length > 0 && !filters.countries.includes(request.country)) return false;
        if (filters.assetTypes.length > 0 && !filters.assetTypes.some((assetType) => request.devices.some((device) => device.assetType === assetType)))
          return false;
        const budgetResult = calculateBudgetTotal(request);
        return !budgetResult || (budgetResult.total >= filters.budgetRange[0] && budgetResult.total <= filters.budgetRange[1]);
      }),
    [activeFilter, filters, requests, searchQuery],
  );

  const sortedRequests = useMemo(
    () =>
      [...filteredRequests].sort((first, second) => {
        if (!sortField) return 0;
        const getValue = (request: CustomDeviceRequest) => (sortField === "budget" ? (calculateBudgetTotal(request)?.total ?? 0) : request[sortField]);
        const [firstValue, secondValue] = [getValue(first), getValue(second)];
        return firstValue < secondValue ? (sortDirection === "asc" ? -1 : 1) : firstValue > secondValue ? (sortDirection === "asc" ? 1 : -1) : 0;
      }),
    [filteredRequests, sortDirection, sortField],
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedRequests.length / itemsPerPage);
  const paginatedRequests = sortedRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const activeFilterCount = filters.countries.length + filters.assetTypes.length + (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 50000 ? 1 : 0);

  return {
    activeFilter,
    activeFilterCount,
    currentPage,
    filters,
    mounted,
    paginatedRequests,
    searchQuery,
    selectedRequest,
    setActiveFilter: (value: "all" | RequestStatus) => {
      setActiveFilter(value);
      setCurrentPage(1);
    },
    setCurrentPage,
    setFilters: (value: RequestFilters) => {
      setFilters(value);
      setCurrentPage(1);
    },
    setSearchQuery: (value: string) => {
      setSearchQuery(value);
      setCurrentPage(1);
    },
    setSelectedRequest,
    setShowErrorToast,
    setShowFilterModal,
    setShowSuccessToast,
    setSortDirection,
    setSortField,
    showErrorToast,
    showFilterModal,
    showSuccessToast,
    sortDirection,
    sortField,
    successMessage,
    totalPages,
    totalResults: filteredRequests.length,
    handleAcceptQuote: (id: string, itemCount: number) => {
      setRequests((prev) => prev.map((request) => (request.id === id ? { ...request, status: "confirmed" as RequestStatus } : request)));
      setSelectedRequest(null);
      setSuccessMessage(`Your order with ${itemCount} item${itemCount !== 1 ? "s" : ""} is being processed.`);
      setShowSuccessToast(true);
    },
    handleDeclineQuote: (id: string) => {
      setRequests((prev) => prev.map((request) => (request.id === id ? { ...request, status: "rejected" as RequestStatus } : request)));
      setSelectedRequest(null);
      setShowErrorToast(true);
    },
    resetFilters: () => {
      setSearchQuery("");
      setFilters(defaultRequestFilters);
      setCurrentPage(1);
    },
  };
}

export { useCustomDeviceRequestsTable };
