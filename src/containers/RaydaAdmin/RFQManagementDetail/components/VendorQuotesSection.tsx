"use client";

import { useState } from "react";
import { Select } from "@/components/base/select/select";
import { RFQ, VendorResponse } from "../../shared";
import { useExchangeRates } from "../hooks/useExchangeRates";
import { AdminCurationSummary } from "./AdminCurationSummary";
import { VendorComparisonSection } from "./VendorComparisonSection";
import { VendorSelectionCards } from "./VendorSelectionCards";

type SortOption = "fastest" | "latest" | "highest" | "lowest";

const sortItems = [
  { id: "fastest" as const, label: "Fastest response" },
  { id: "latest" as const, label: "Latest response" },
  { id: "highest" as const, label: "Highest quote" },
  { id: "lowest" as const, label: "Lowest quote" },
];

function sortVendors(vendors: VendorResponse[], sort: SortOption): VendorResponse[] {
  const sorted = [...vendors];
  switch (sort) {
    case "fastest":
      return sorted.sort((a, b) => new Date(a.respondedAt).getTime() - new Date(b.respondedAt).getTime());
    case "latest":
      return sorted.sort((a, b) => new Date(b.respondedAt).getTime() - new Date(a.respondedAt).getTime());
    case "highest":
      return sorted.sort((a, b) => b.totalPrice - a.totalPrice);
    case "lowest":
      return sorted.sort((a, b) => a.totalPrice - b.totalPrice);
  }
}

function VendorQuotesSection({ onSelectVendor, rfq, selectedVendorId }: { onSelectVendor: (vendorId: string) => void; rfq: RFQ; selectedVendorId: string }) {
  const [sort, setSort] = useState<SortOption>("fastest");
  const isReadOnly = ["fully_accepted", "partially_accepted", "customer_rejected", "expired"].includes(rfq.status);
  const isSent = rfq.status === "response_sent";
  const hasCuration = isReadOnly || isSent;
  const selectedVendor = rfq.vendorResponses.find((vendor) => vendor.vendorId === selectedVendorId);
  const vendors = sortVendors(rfq.vendorResponses, sort);
  const vendorCurrency = vendors[0]?.currency ?? "USD";
  const { rates } = useExchangeRates(vendorCurrency);
  const exchangeRate = rfq.curation?.exchangeRate ?? (rates?.[rfq.customerCurrency] ?? 1);
  const count = rfq.vendorResponses.length;

  if (rfq.status === "pending_vendors" || count === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-secondary bg-primary shadow-xs">
        <div className="flex flex-col gap-3 border-b border-secondary px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-secondary">Vendor Quotes</span>
            <span className="ml-1.5 text-sm text-tertiary">
              {count} {count === 1 ? "response" : "responses"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-sm text-tertiary">Sort by</span>
            <Select
              size="sm"
              items={sortItems}
              selectedKey={sort}
              onSelectionChange={(key) => setSort(key as SortOption)}
              aria-label="Sort vendors"
            >
              {(item) => <Select.Item id={item.id} label={item.label}>{item.label}</Select.Item>}
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto p-5">
          <div className="min-w-max">
            <VendorSelectionCards
              customerCurrency={rfq.customerCurrency}
              exchangeRate={exchangeRate}
              onSelect={onSelectVendor}
              readOnly={hasCuration}
              selectedVendorId={selectedVendorId}
              vendors={vendors}
            />
            <p className="mb-4 text-xs font-medium tracking-wide text-tertiary uppercase">Per-device breakdown</p>
            <VendorComparisonSection exchangeRate={exchangeRate} rfq={rfq} selectedVendorId={selectedVendorId} vendors={vendors} />
          </div>
        </div>
      </div>
      {hasCuration && selectedVendor && rfq.curation && <AdminCurationSummary rfq={rfq} vendor={selectedVendor} />}
    </div>
  );
}

export { VendorQuotesSection };
