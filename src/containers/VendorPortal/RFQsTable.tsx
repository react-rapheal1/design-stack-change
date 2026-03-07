/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import { ChevronSelectorVertical, FilterLines, SearchLg } from "@untitledui/icons";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { Input } from "@/components/base/input/input";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import { CountryFlag } from "./CountryFlag";
import { Device } from "./Device";
import { RFQ } from "./RFQ";
import { RFQDeadlineBadge } from "./RFQDeadlineBadge";
import { RFQDeviceCount } from "./RFQDeviceCount";
import { RFQFilterDropdown } from "./RFQFilterDropdown";
import { RFQFilters } from "./RFQFilters";
import { RFQSortField } from "./RFQSortField";
import { SortDirection } from "./SortDirection";
import { countries } from "./countries";
import { defaultRFQFilters } from "./defaultRFQFilters";
import { isRFQExpired } from "./isRFQExpired";
import { rfqs } from "./rfqs";
import { useCurrentTime } from "./useCurrentTime";

function RFQsTable({ onViewRFQ, excludeRFQIds = [] }: { onViewRFQ: (rfq: RFQ) => void; excludeRFQIds?: string[] }) {
  const isMd = useBreakpoint("md");
  const nowMs = useCurrentTime();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<RFQSortField | null>("deadline");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<RFQFilters>(defaultRFQFilters);
  const itemsPerPage = 10;
  const activeFilterCount = filters.countries.length;
  const handleSort = (field: RFQSortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const filteredRFQs = rfqs
    .filter((rfq) => {
      if (isRFQExpired(rfq.createdAt, nowMs)) return false;
      if (excludeRFQIds.includes(rfq.id)) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesId = rfq.id.toLowerCase().includes(query);
        const matchesDevice = rfq.devices.some((device) => device.name.toLowerCase().includes(query));
        if (!matchesId && !matchesDevice) return false;
      }
      if (filters.countries.length > 0 && !filters.countries.includes(rfq.country)) return false;
      return true;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      let aValue: string | number;
      let bValue: string | number;
      switch (sortField) {
        case "id":
          aValue = a.id;
          bValue = b.id;
          break;
        case "country":
          aValue = a.country;
          bValue = b.country;
          break;
        case "deadline":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  const totalPages = Math.ceil(filteredRFQs.length / itemsPerPage);
  const paginatedRFQs = filteredRFQs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <div className="min-w-0 rounded-xl border border-[#e9eaeb] bg-white">
      {" "}
      {}{" "}
      <div className="flex flex-col gap-3 border-b border-[#e9eaeb] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        {" "}
        <h3 className="text-lg font-semibold text-[#181d27]">RFQs ({filteredRFQs.length})</h3>{" "}
        <div className="flex items-center gap-2">
          {" "}
          <div className="flex-1 md:w-56 md:flex-none">
            {" "}
            <Input size="sm" icon={SearchLg} placeholder="Search..." value={searchQuery} onChange={(value) => setSearchQuery(value)} />{" "}
          </div>{" "}
          <div className="relative">
            {" "}
            <button
              type="button"
              onClick={() => setShowFilterModal(!showFilterModal)}
              className={cx(
                "flex h-10 items-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition-colors",
                showFilterModal ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]" : "border-[#e9eaeb] bg-white text-[#414651] hover:bg-[#fafafa]",
              )}
            >
              {" "}
              <FilterLines className="size-5" /> Filter{" "}
              {activeFilterCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-[#0948b5] text-xs font-medium text-white"> {activeFilterCount} </span>
              )}{" "}
            </button>{" "}
            <RFQFilterDropdown
              isOpen={showFilterModal}
              onClose={() => setShowFilterModal(false)}
              filters={filters}
              onApply={(newFilters: RFQFilters) => {
                setFilters(newFilters);
                setCurrentPage(1);
              }}
              resultCount={filteredRFQs.length}
            />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {}{" "}
      <div className="overflow-x-auto">
        {" "}
        <table className="w-full min-w-[820px] text-left text-sm [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
          {" "}
          <thead>
            {" "}
            <tr className="border-b border-[#e9eaeb] text-xs font-medium text-[#535862]">
              {" "}
              <th className="px-6 py-3 font-medium">
                {" "}
                <button
                  type="button"
                  onClick={() => handleSort("id")}
                  className={cx("flex items-center gap-1 hover:text-[#181d27]", sortField === "id" && "text-[#181d27]")}
                >
                  {" "}
                  Request ID <ChevronSelectorVertical className={cx("size-4", sortField === "id" ? "text-[#181d27]" : "text-[#d0d5dd]")} />{" "}
                </button>{" "}
              </th>{" "}
              <th className="px-6 py-3 font-medium">Device(s)</th>{" "}
              <th className="px-6 py-3 font-medium">
                {" "}
                <button
                  type="button"
                  onClick={() => handleSort("country")}
                  className={cx("flex items-center gap-1 hover:text-[#181d27]", sortField === "country" && "text-[#181d27]")}
                >
                  {" "}
                  Country <ChevronSelectorVertical className={cx("size-4", sortField === "country" ? "text-[#181d27]" : "text-[#d0d5dd]")} />{" "}
                </button>{" "}
              </th>{" "}
              <th className="px-6 py-3 font-medium">
                {" "}
                <Tooltip title="Vendors must respond within 24 hours of RFQ creation or the request expires." placement="top" arrow>
                  {" "}
                  <TooltipTrigger>
                    {" "}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSort("deadline")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSort("deadline");
                        }
                      }}
                      className={cx("flex cursor-pointer items-center gap-1 hover:text-[#181d27]", sortField === "deadline" && "text-[#181d27]")}
                    >
                      {" "}
                      Time Remaining <ChevronSelectorVertical className={cx("size-4", sortField === "deadline" ? "text-[#181d27]" : "text-[#d0d5dd]")} />{" "}
                    </span>{" "}
                  </TooltipTrigger>{" "}
                </Tooltip>{" "}
              </th>{" "}
              <th className="px-6 py-3 font-medium" />{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {paginatedRFQs.length === 0 ? (
              <tr>
                {" "}
                <td colSpan={5} className="px-6 py-24 text-center">
                  {" "}
                  <div className="flex flex-col items-center gap-2">
                    {" "}
                    <SearchLg className="size-8 text-[#d0d5dd]" /> <p className="text-sm font-medium text-[#535862]">No RFQs found</p>{" "}
                    <p className="text-sm text-[#535862]"> Try adjusting your search or filter criteria </p>{" "}
                  </div>{" "}
                </td>{" "}
              </tr>
            ) : (
              paginatedRFQs.map((rfq) => (
                <tr
                  key={rfq.id}
                  className="border-b border-[#e9eaeb] transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2 last:border-b-0"
                >
                  {" "}
                  <td className="px-6 py-4 text-sm text-[#181d27]">{rfq.id}</td>{" "}
                  <td className="px-6 py-4">
                    {" "}
                    <RFQDeviceCount devices={rfq.devices} />{" "}
                  </td>{" "}
                  <td className="px-6 py-4">
                    {" "}
                    <div className="flex items-center gap-1.5">
                      {" "}
                      <CountryFlag country={rfq.country} /> <span className="text-sm text-[#535862]">{rfq.country}</span>{" "}
                    </div>{" "}
                  </td>{" "}
                  <td className="px-6 py-4">
                    {" "}
                    <RFQDeadlineBadge createdAt={rfq.createdAt} nowMs={nowMs} />{" "}
                  </td>{" "}
                  <td className="px-6 py-4">
                    {" "}
                    <button
                      type="button"
                      onClick={() => onViewRFQ(rfq)}
                      className="text-sm font-semibold text-[#0948b5] transition-colors hover:text-[#073d8a] hover:underline"
                    >
                      {" "}
                      View{" "}
                    </button>{" "}
                  </td>{" "}
                </tr>
              ))
            )}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
      {} {totalPages > 1 && <PaginationCardDefault page={currentPage} total={totalPages} onPageChange={setCurrentPage} />}{" "}
    </div>
  );
}
export { RFQsTable };
