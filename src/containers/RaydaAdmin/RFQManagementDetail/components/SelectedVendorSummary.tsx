import { useState } from "react";
import { Star01 } from "@untitledui/icons";
import type { RFQ } from "../../shared";
import { VendorResponse, formatCurrency } from "../../shared";
import { computeCurationTotals } from "../utils/curationPricing";
import { VendorNoteDropdown } from "./VendorNoteDropdown";

function SelectedVendorSummary({ vendor, rfq }: { vendor: VendorResponse; rfq?: RFQ }) {
  const [noteOpen, setNoteOpen] = useState(false);
  const curation = rfq?.curation;
  const totals = curation ? computeCurationTotals(rfq, curation, vendor) : null;

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-brand bg-[#eff8ff]">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Star01 className="size-4 text-brand-secondary" />
          <span className="text-sm font-semibold text-primary">{vendor.vendorName}</span>
          <span className="text-xs text-tertiary">Selected Vendor</span>
        </div>
        <div className="flex items-center gap-4">
          {totals && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-tertiary">Admin Price</span>
              <span className="text-sm font-semibold text-brand-secondary">{formatCurrency(totals.adminTotal, totals.customerCurrency)}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-tertiary">Vendor Price</span>
            <span className="text-sm font-semibold text-primary">{formatCurrency(vendor.totalPrice, vendor.currency)}</span>
          </div>
        </div>
      </div>
      {vendor.vendorNote && <VendorNoteDropdown isOpen={noteOpen} note={vendor.vendorNote} onToggle={() => setNoteOpen((p) => !p)} />}
    </div>
  );
}

export { SelectedVendorSummary };
