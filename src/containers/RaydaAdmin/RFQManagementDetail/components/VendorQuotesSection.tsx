import { RFQ } from "../../shared";
import { SelectedVendorSummary } from "./SelectedVendorSummary";
import { VendorComparisonSection } from "./VendorComparisonSection";
import { VendorSelectionCards } from "./VendorSelectionCards";

function VendorQuotesSection({ onSelectVendor, rfq, selectedVendorId }: { onSelectVendor: (vendorId: string) => void; rfq: RFQ; selectedVendorId: string }) {
  const isReadOnly = ["fully_accepted", "partially_accepted", "customer_rejected", "expired"].includes(rfq.status);
  const isSent = rfq.status === "response_sent";
  const selectedVendor = rfq.vendorResponses.find((vendor) => vendor.vendorId === selectedVendorId);
  const vendors = [...rfq.vendorResponses].sort((first, second) => new Date(first.respondedAt).getTime() - new Date(second.respondedAt).getTime());

  if (rfq.status === "pending_vendors" || rfq.vendorResponses.length === 0) return null;

  return (
    <div className="rounded-xl border border-secondary bg-primary shadow-xs">
      <div className="border-b border-secondary px-5 py-3.5">
        <span className="text-sm font-semibold text-secondary">
          Vendor Quotes ({rfq.vendorResponses.length} vendor{rfq.vendorResponses.length !== 1 ? "s" : ""} responded)
        </span>
      </div>
      <div className="overflow-x-auto p-5">
        <div className="min-w-max">
          {!isReadOnly && !isSent && <VendorSelectionCards onSelect={onSelectVendor} selectedVendorId={selectedVendorId} vendors={vendors} />}
          {(isReadOnly || isSent) && selectedVendor && <SelectedVendorSummary vendor={selectedVendor} />}
          <p className="mb-4 text-xs font-medium tracking-wide text-tertiary uppercase">Per-Device Comparison</p>
          <VendorComparisonSection rfq={rfq} selectedVendorId={selectedVendorId} vendors={vendors} />
        </div>
      </div>
    </div>
  );
}

export { VendorQuotesSection };
