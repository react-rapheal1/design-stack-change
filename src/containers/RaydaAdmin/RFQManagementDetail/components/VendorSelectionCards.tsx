import { cx } from "@/utils/cx";
import { VendorResponse, formatCurrency, formatDateTime } from "../../shared";
import { VendorNoteDropdown } from "./VendorNoteDropdown";

function VendorSelectionCards({
  onSelect,
  selectedVendorId,
  vendors,
}: {
  onSelect: (vendorId: string) => void;
  selectedVendorId: string;
  vendors: VendorResponse[];
}) {
  return (
    <div className="mb-6">
      <p className="mb-3 text-xs font-medium tracking-wide text-tertiary uppercase">Select a vendor for this RFQ</p>
      <div className="flex gap-3">
        {vendors.map((vendor) => (
          <button
            key={vendor.vendorId}
            type="button"
            onClick={() => onSelect(vendor.vendorId)}
            className={cx(
              "flex max-w-[240px] min-w-[240px] shrink-0 flex-col rounded-xl border-2 text-left transition",
              selectedVendorId === vendor.vendorId ? "border-brand-solid bg-[#eff8ff] ring-1 ring-brand" : "border-secondary hover:border-tertiary",
            )}
          >
            <div className="flex items-center justify-between px-4 pt-4 pb-3">
              <span className="text-sm font-semibold text-primary">{vendor.vendorName}</span>
              <div
                className={cx(
                  "flex size-5 items-center justify-center rounded-full border-2 transition",
                  selectedVendorId === vendor.vendorId ? "border-brand-solid bg-brand-solid" : "border-[#d0d5dd]",
                )}
              >
                {selectedVendorId === vendor.vendorId && <div className="size-2 rounded-full bg-white" />}
              </div>
            </div>
            <div className="border-t border-secondary px-4 pt-3 pb-1">
              <span className="text-2xl font-semibold text-primary">{formatCurrency(vendor.totalPrice)}</span>
              <p className="mt-0.5 text-xs text-tertiary">Total quote</p>
            </div>
            <div className="px-4 pt-1 pb-3 text-xs text-quaternary">{formatDateTime(vendor.respondedAt)}</div>
            {vendor.vendorNote && <VendorNoteDropdown note={vendor.vendorNote} />}
          </button>
        ))}
      </div>
    </div>
  );
}

export { VendorSelectionCards };
