import { useState } from "react";
import { Star01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import type { CustomerCurrencyCode } from "../../shared";
import { VendorResponse, formatCurrency, formatDateTime } from "../../shared";
import { VendorNoteDropdown } from "./VendorNoteDropdown";

function VendorSelectionCards({
  customerCurrency,
  exchangeRate,
  onSelect,
  readOnly,
  selectedVendorId,
  vendors,
}: {
  customerCurrency: CustomerCurrencyCode;
  exchangeRate: number;
  onSelect: (vendorId: string) => void;
  readOnly?: boolean;
  selectedVendorId: string;
  vendors: VendorResponse[];
}) {
  const [notesOpen, setNotesOpen] = useState(false);
  const label = readOnly ? "Selected Vendor" : "Select a vendor for this RFQ";

  return (
    <div className="mb-6">
      <p className="mb-3 text-xs font-medium tracking-wide text-tertiary uppercase">{label}</p>
      <div className="flex gap-3">
        {vendors.map((vendor) => {
          const active = vendor.vendorId === selectedVendorId;
          const showConversion = vendor.currency !== customerCurrency;
          return (
            <div
              key={vendor.vendorId}
              role={readOnly ? undefined : "button"}
              tabIndex={readOnly ? undefined : 0}
              onClick={readOnly ? undefined : () => onSelect(vendor.vendorId)}
              onKeyDown={readOnly ? undefined : (e) => (e.key === "Enter" || e.key === " ") && onSelect(vendor.vendorId)}
              className={cx(
                "flex max-w-[260px] min-w-[260px] shrink-0 flex-col overflow-hidden rounded-xl border-2 text-left shadow-xs transition-all",
                active ? "border-brand-solid bg-[#eff8ff] shadow-md ring-1 ring-brand/30" : "border-secondary bg-primary",
                !readOnly && !active && "cursor-pointer hover:border-tertiary hover:shadow-md",
              )}
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <span className="text-sm font-semibold text-primary">{vendor.vendorName}</span>
                {readOnly ? (
                  active && <Star01 className="size-4 text-brand-secondary" />
                ) : (
                  <div
                    className={cx(
                      "flex size-5 items-center justify-center rounded-full border-2 transition-all",
                      active ? "border-brand-solid bg-brand-solid shadow-[0_0_0_3px_rgba(9,72,181,0.12)]" : "border-[#d0d5dd]",
                    )}
                  >
                    {active && <div className="size-2 rounded-full bg-white" />}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-0.5 border-t border-secondary px-4 pt-3 pb-2">
                <p className="text-xs text-quaternary">Total quote</p>
                <span className="text-2xl font-semibold tracking-tight text-primary">
                  {formatCurrency(vendor.totalPrice, vendor.currency)}
                </span>
                {showConversion && (
                  <span className="inline-flex w-fit items-center rounded-md bg-quaternary/50 px-1.5 py-0.5 text-xs font-medium text-tertiary">
                    ≈ {formatCurrency(Math.round(vendor.totalPrice * exchangeRate), customerCurrency)}
                  </span>
                )}
                <p className="mt-auto pt-2 text-xs text-quaternary">{formatDateTime(vendor.respondedAt)}</p>
              </div>
              <VendorNoteDropdown isOpen={notesOpen} note={vendor.vendorNote || "—"} onToggle={() => setNotesOpen((prev) => !prev)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { VendorSelectionCards };
