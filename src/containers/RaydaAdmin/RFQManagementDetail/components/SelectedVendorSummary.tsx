import { Star01 } from "@untitledui/icons";
import { VendorResponse, formatCurrency } from "../../shared";

function SelectedVendorSummary({ vendor }: { vendor: VendorResponse }) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-xl border border-brand bg-[#eff8ff] p-4">
      <div className="flex items-center gap-2">
        <Star01 className="size-4 text-brand-secondary" />
        <span className="text-sm font-semibold text-primary">{vendor.vendorName}</span>
        <span className="text-xs text-tertiary">Selected Vendor</span>
      </div>
      <span className="text-sm font-semibold text-primary">{formatCurrency(vendor.totalPrice)}</span>
    </div>
  );
}

export { SelectedVendorSummary };
