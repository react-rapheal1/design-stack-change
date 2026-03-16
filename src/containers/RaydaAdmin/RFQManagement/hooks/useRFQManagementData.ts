"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { FilterTab, RequestFilters, SortDirection, SortField, defaultFilters, mockRFQs } from "../../shared";
import { PersistedState } from "../PersistedState";
import { RFQ_STATE_KEY } from "../RFQ_STATE_KEY";
import { readPersistedState } from "../readPersistedState";
import { computeMetrics } from "./computeMetrics";

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;
type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

function useRFQManagementData() {
  const saved = typeof window === "undefined" ? null : readPersistedState();
  const [metricPeriod, setMetricPeriod] = useState("24 hours");
  const [searchQuery, setSearchQuery] = useState(saved?.q ?? "");
  const [activeFilter, setActiveFilter] = useState<FilterTab>(saved?.tab ?? "all");
  const [sortField, setSortField] = useState<SortField | null>(saved?.sort ?? null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(saved?.dir ?? "asc");
  const [currentPage, setCurrentPage] = useState(saved?.page ?? 1);
  const [itemsPerPage, setItemsPerPage] = useState<PageSize>((saved?.pageSize as PageSize) ?? 10);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<RequestFilters>(saved?.filters ?? defaultFilters);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const state: PersistedState = { q: searchQuery, tab: activeFilter, sort: sortField, dir: sortDirection, page: currentPage, filters, pageSize: itemsPerPage };
    sessionStorage.setItem(RFQ_STATE_KEY, JSON.stringify(state));
  }, [activeFilter, currentPage, filters, itemsPerPage, searchQuery, sortDirection, sortField]);

  useEffect(() => {
    const handleBeforeUnload = () => sessionStorage.removeItem(RFQ_STATE_KEY);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleColumnSort = useCallback((descriptor: { column: React.Key; direction: "ascending" | "descending" }) => {
    setSortField(descriptor.column as SortField);
    setSortDirection(descriptor.direction === "ascending" ? "asc" : "desc");
  }, []);

  const filteredRfqs = mockRFQs.filter((rfq) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        rfq.id.toLowerCase().includes(query) ||
        rfq.company.toLowerCase().includes(query) ||
        rfq.country.toLowerCase().includes(query) ||
        rfq.devices.some((device) => device.name.toLowerCase().includes(query)) ||
        rfq.vendorResponses.some((vendor) => vendor.vendorName.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }
    if (activeFilter !== "all" && (activeFilter === "accepted" ? !["fully_accepted", "partially_accepted"].includes(rfq.status) : rfq.status !== activeFilter))
      return false;
    if (filters.countries.length > 0 && !filters.countries.includes(rfq.country)) return false;
    if (filters.statuses.length > 0 && !filters.statuses.includes(rfq.status)) return false;
    if (filters.vendors?.length > 0 && !rfq.vendorResponses.some((v) => filters.vendors.includes(v.vendorName))) return false;
    return rfq.budget <= 0 || (rfq.budget >= filters.budgetRange[0] && rfq.budget <= filters.budgetRange[1]);
  });

  const sortedRfqs = [...filteredRfqs].sort((left, right) => {
    if (!sortField) return 0;
    const leftValue = sortField === "budget" ? left.budget : left[sortField];
    const rightValue = sortField === "budget" ? right.budget : right[sortField];
    if (leftValue < rightValue) return sortDirection === "asc" ? -1 : 1;
    if (leftValue > rightValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredCount = sortedRfqs.length;

  useEffect(() => {
    if (filteredCount > 0 && filteredCount < itemsPerPage) {
      const best = PAGE_SIZE_OPTIONS.find((s) => s >= filteredCount) ?? PAGE_SIZE_OPTIONS[0];
      if (best !== itemsPerPage) {
        setItemsPerPage(best);
        setCurrentPage(1);
      }
    }
  }, [filteredCount, itemsPerPage]);

  const totalPages = Math.ceil(filteredCount / itemsPerPage);

  const handlePageSizeChange = useCallback(
    (size: number) => {
      setItemsPerPage(size as PageSize);
      setCurrentPage(1);
    },
    [],
  );

  return {
    activeFilter,
    currentMetrics: computeMetrics(metricPeriod, mockRFQs),
    currentPage,
    filterButtonRef,
    filteredRfqs,
    filters,
    itemsPerPage,
    metricPeriod,
    mounted,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    paginatedRfqs: sortedRfqs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    searchQuery,
    setActiveFilter,
    setCurrentPage,
    setFilters,
    setMetricPeriod,
    setSearchQuery,
    setShowFilterModal,
    showFilterModal,
    sortDescriptor: sortField ? ({ column: sortField, direction: sortDirection === "asc" ? "ascending" : "descending" } as const) : undefined,
    totalPages,
    activeFilterCount:
      filters.countries.length + filters.statuses.length + (filters.vendors?.length ?? 0) + (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 100000 ? 1 : 0),
    handleColumnSort,
    handlePageSizeChange,
  };
}

export { useRFQManagementData };
