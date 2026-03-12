"use client";

import { HeaderNavigation } from "./components/HeaderNavigation";
import { RFQManagementMetrics } from "./components/RFQManagementMetrics";
import { RFQManagementTableCard } from "./components/RFQManagementTableCard";
import { useRFQManagementData } from "./hooks/useRFQManagementData";

export default function RFQManagementPage() {
  const data = useRFQManagementData();

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
      <HeaderNavigation />
      <main className="flex flex-1 flex-col gap-6 pt-8 pb-12 sm:gap-8 sm:pt-12 sm:pb-24">
        <div className="w-full page-px">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl leading-[32px] font-semibold text-primary sm:text-[30px] sm:leading-[38px]">RFQs</h1>
            <p className="text-sm text-tertiary">Review vendor quotes and curate responses for customer requests.</p>
          </div>
        </div>
        <RFQManagementMetrics metricPeriod={data.metricPeriod} metrics={data.currentMetrics} onPeriodChange={data.setMetricPeriod} />
        <RFQManagementTableCard
          activeFilter={data.activeFilter}
          activeFilterCount={data.activeFilterCount}
          currentPage={data.currentPage}
          filterButtonRef={data.filterButtonRef}
          filteredCount={data.filteredRfqs.length}
          filters={data.filters}
          itemsPerPage={data.itemsPerPage}
          mounted={data.mounted}
          onApplyFilters={data.setFilters}
          onFilterChange={(key) => {
            data.setActiveFilter(key as import("../shared").FilterTab);
            data.setCurrentPage(1);
          }}
          onPageChange={data.setCurrentPage}
          onPageSizeChange={data.handlePageSizeChange}
          onSearchChange={data.setSearchQuery}
          onSortChange={data.handleColumnSort}
          paginatedRfqs={data.paginatedRfqs}
          searchQuery={data.searchQuery}
          setActiveFilter={data.setActiveFilter}
          setFilters={data.setFilters}
          setShowFilterModal={data.setShowFilterModal}
          showFilterModal={data.showFilterModal}
          sortDescriptor={data.sortDescriptor}
          totalPages={data.totalPages}
        />
      </main>
    </div>
  );
}
