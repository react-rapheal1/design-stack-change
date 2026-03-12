import { RFQ } from "../../shared";
import { AdminCurationSummary } from "./AdminCurationSummary";
import { VendorComparisonSection } from "./VendorComparisonSection";
import { VendorSelectionCards } from "./VendorSelectionCards";

function VendorQuotesSection({ onSelectVendor, rfq, selectedVendorId }: { onSelectVendor: (vendorId: string) => void; rfq: RFQ; selectedVendorId: string }) {
  const isReadOnly = ["fully_accepted", "partially_accepted", "customer_rejected", "expired"].includes(rfq.status);
  const isSent = rfq.status === "response_sent";
  const hasCuration = isReadOnly || isSent;
  const selectedVendor = rfq.vendorResponses.find((vendor) => vendor.vendorId === selectedVendorId);
  const vendors = [...rfq.vendorResponses].sort((first, second) => new Date(first.respondedAt).getTime() - new Date(second.respondedAt).getTime());

  if (rfq.status === "pending_vendors" || rfq.vendorResponses.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-secondary bg-primary shadow-xs">
        <div className="border-b border-secondary px-5 py-3.5">
          <span className="text-sm font-semibold text-secondary">
            Vendor Quotes ({rfq.vendorResponses.length} vendor{rfq.vendorResponses.length !== 1 ? "s" : ""} responded)
          </span>
        </div>
        <div className="overflow-x-auto p-5">
          <div className="min-w-max">
            <VendorSelectionCards onSelect={onSelectVendor} readOnly={hasCuration} selectedVendorId={selectedVendorId} vendors={vendors} />
            <p className="mb-4 text-xs font-medium tracking-wide text-tertiary uppercase">Per-Device Comparison</p>
            <VendorComparisonSection rfq={rfq} selectedVendorId={selectedVendorId} vendors={vendors} />
          </div>
        </div>
      </div>
      {hasCuration && selectedVendor && rfq.curation && <AdminCurationSummary rfq={rfq} vendor={selectedVendor} />}
    </div>
  );
}

export { VendorQuotesSection };
