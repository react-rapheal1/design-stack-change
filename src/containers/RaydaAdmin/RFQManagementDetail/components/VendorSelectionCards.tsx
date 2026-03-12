import { useState } from "react";
import { Star01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { VendorResponse, formatCurrency, formatDateTime } from "../../shared";
import { VendorNoteDropdown } from "./VendorNoteDropdown";

function VendorSelectionCards({
  onSelect,
  readOnly,
  selectedVendorId,
  vendors,
}: {
  onSelect: (vendorId: string) => void;
  readOnly?: boolean;
  selectedVendorId: string;
  vendors: VendorResponse[];
}) {
  const [notesOpen, setNotesOpen] = useState(false);
  const isSelected = (id: string) => id === selectedVendorId;
  const label = readOnly ? "Selected Vendor" : "Select a vendor for this RFQ";

  return (
    <div className="mb-6">
      <p className="mb-3 text-xs font-medium tracking-wide text-tertiary uppercase">{label}</p>
      <div className="flex gap-3">
        {vendors.map((vendor) => (
          <div
            key={vendor.vendorId}
            role={readOnly ? undefined : "button"}
            tabIndex={readOnly ? undefined : 0}
            onClick={readOnly ? undefined : () => onSelect(vendor.vendorId)}
            onKeyDown={readOnly ? undefined : (e) => (e.key === "Enter" || e.key === " ") && onSelect(vendor.vendorId)}
            className={cx(
              "flex max-w-[240px] min-w-[240px] shrink-0 flex-col rounded-xl border-2 text-left transition",
              isSelected(vendor.vendorId) ? "border-brand-solid bg-[#eff8ff] ring-1 ring-brand" : "border-secondary",
              !readOnly && !isSelected(vendor.vendorId) && "cursor-pointer hover:border-tertiary",
            )}
          >
            <div className="flex items-center justify-between px-4 pt-4 pb-3">
              <span className="text-sm font-semibold text-primary">{vendor.vendorName}</span>
              {readOnly && isSelected(vendor.vendorId) ? (
                <Star01 className="size-4 text-brand-secondary" />
              ) : (
                <div
                  className={cx(
                    "flex size-5 items-center justify-center rounded-full border-2 transition",
                    isSelected(vendor.vendorId) ? "border-brand-solid bg-brand-solid" : "border-[#d0d5dd]",
                  )}
                >
                  {isSelected(vendor.vendorId) && <div className="size-2 rounded-full bg-white" />}
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col border-t border-secondary px-4 pt-3 pb-1">
              <span className="text-2xl font-semibold text-primary">{formatCurrency(vendor.totalPrice)}</span>
              <p className="mt-0.5 text-xs text-tertiary">Total quote</p>
              <p className="mt-auto pt-2 text-xs text-quaternary">{formatDateTime(vendor.respondedAt)}</p>
            </div>
            <VendorNoteDropdown isOpen={notesOpen} note={vendor.vendorNote || "—"} onToggle={() => setNotesOpen((prev) => !prev)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export { VendorSelectionCards };
