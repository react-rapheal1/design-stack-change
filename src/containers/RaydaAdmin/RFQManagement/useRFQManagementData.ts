"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { FilterTab, RFQ, RequestFilters, SortDirection, SortField, defaultFilters, mockRFQs } from "../shared";
import { PersistedState } from "./PersistedState";
import { RFQ_STATE_KEY } from "./RFQ_STATE_KEY";
import { readPersistedState } from "./readPersistedState";

const ITEMS_PER_PAGE = 10;

function computeMetrics(period: string, rfqs: RFQ[]) {
  const now = new Date(2026, 1, 20, 21, 0);
  const periodMs: Record<string, number> = {
    "24 hours": 24 * 3600000,
    "7 days": 7 * 24 * 3600000,
    "30 days": 30 * 24 * 3600000,
    "12 months": 365 * 24 * 3600000,
  };
  const cutoff = new Date(now.getTime() - (periodMs[period] || periodMs["12 months"]));
  const previousCutoff = new Date(cutoff.getTime() - (periodMs[period] || periodMs["12 months"]));
  const inPeriod = rfqs.filter((rfq) => new Date(rfq.createdAt) >= cutoff);
  const inPreviousPeriod = rfqs.filter((rfq) => {
    const createdAt = new Date(rfq.createdAt);
    return createdAt >= previousCutoff && createdAt < cutoff;
  });

  const calculate = (test: (rfq: RFQ) => boolean) => {
    const current = inPeriod.filter(test).length;
    const previous = inPreviousPeriod.filter(test).length;
    const percent = previous === 0 ? (current > 0 ? 100 : 0) : Math.round(((current - previous) / previous) * 1000) / 10;
    return { value: current, change: `${Math.abs(percent)}%`, up: percent >= 0 };
  };

  return {
    sent: calculate((rfq) => rfq.status === "response_sent"),
    accepted: calculate((rfq) => rfq.status === "fully_accepted" || rfq.status === "partially_accepted"),
    rejected: calculate((rfq) => rfq.status === "customer_rejected"),
  };
}

function useRFQManagementData() {
  const saved = typeof window === "undefined" ? null : readPersistedState();
  const [metricPeriod, setMetricPeriod] = useState("24 hours");
  const [searchQuery, setSearchQuery] = useState(saved?.q ?? "");
  const [activeFilter, setActiveFilter] = useState<FilterTab>(saved?.tab ?? "all");
  const [sortField, setSortField] = useState<SortField | null>(saved?.sort ?? null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(saved?.dir ?? "asc");
  const [currentPage, setCurrentPage] = useState(saved?.page ?? 1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<RequestFilters>(saved?.filters ?? defaultFilters);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const state: PersistedState = { q: searchQuery, tab: activeFilter, sort: sortField, dir: sortDirection, page: currentPage, filters };
    sessionStorage.setItem(RFQ_STATE_KEY, JSON.stringify(state));
  }, [activeFilter, currentPage, filters, searchQuery, sortDirection, sortField]);

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
        rfq.devices.some((device) => device.name.toLowerCase().includes(query)) ||
        rfq.vendorResponses.some((vendor) => vendor.vendorName.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }
    if (activeFilter !== "all" && (activeFilter === "accepted" ? !["fully_accepted", "partially_accepted"].includes(rfq.status) : rfq.status !== activeFilter))
      return false;
    if (filters.countries.length > 0 && !filters.countries.includes(rfq.country)) return false;
    if (filters.statuses.length > 0 && !filters.statuses.includes(rfq.status)) return false;
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

  const totalPages = Math.ceil(sortedRfqs.length / ITEMS_PER_PAGE);

  return {
    activeFilter,
    currentMetrics: computeMetrics(metricPeriod, mockRFQs),
    currentPage,
    filterButtonRef,
    filteredRfqs,
    filters,
    itemsPerPage: ITEMS_PER_PAGE,
    metricPeriod,
    mounted,
    paginatedRfqs: sortedRfqs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
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
    activeFilterCount: filters.countries.length + filters.statuses.length + (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 100000 ? 1 : 0),
    handleColumnSort,
  };
}

export { useRFQManagementData };
