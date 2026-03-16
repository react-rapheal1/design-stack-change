import { ArrowUp, FileCheck02, MessageTextSquare01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { RFQ, VendorResponse, formatCurrency } from "../../shared";
import { computeCurationTotals, getAdminUnitPrice, getVendorUnitPrice } from "../utils/curationPricing";

function AdminCurationSummary({ rfq, vendor }: { rfq: RFQ; vendor: VendorResponse }) {
  const curation = rfq.curation;
  if (!curation) return null;

  const totals = computeCurationTotals(rfq, curation, vendor);
  const { vendorTotal, vendorTotalConverted, adminTotal, totalMarkup, markupPercent, vendorCurrency, customerCurrency } = totals;
  const showConversion = vendorCurrency !== customerCurrency;

  return (
    <div className="overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs">
      <div className="flex items-center gap-3 border-b border-secondary px-5 py-3.5">
        <FeaturedIcon color="brand" icon={FileCheck02} theme="modern-neue" size="md" />
        <div>
          <span className="text-sm font-semibold text-secondary">Admin Quoted Pricing</span>
          {showConversion && <p className="text-xs text-tertiary">Customer pays in {customerCurrency} · Vendor quoted in {vendorCurrency}</p>}
        </div>
      </div>

      <div className="divide-y divide-secondary">
        {rfq.devices.map((device, index) => {
          const pricing = curation.devicePricing[index];
          const unavailable = !pricing || pricing.isUnavailable;
          const adminUnit = unavailable ? 0 : getAdminUnitPrice(curation, vendor, index);
          const vendorUnit = unavailable ? 0 : getVendorUnitPrice(vendor, index);
          const lineTotal = adminUnit * device.quantity;
          const vendorConverted = Math.round(vendorUnit * curation.exchangeRate);

          return (
            <div key={`${device.name}-${index}`} className={cx("px-5 py-4", unavailable && "opacity-50")}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  {device.name} <span className="font-normal text-tertiary">× {device.quantity}</span>
                </span>
                {unavailable ? (
                  <span className="rounded-full bg-[#fef3f2] px-2 py-0.5 text-xs font-medium text-[#b42318]">Unavailable</span>
                ) : (
                  <span className="text-sm font-semibold text-primary">{formatCurrency(lineTotal, customerCurrency)}</span>
                )}
              </div>
              {!unavailable && (
                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="rounded-lg bg-[#f9fafb] px-3 py-2">
                    <span className="text-[11px] font-medium tracking-wider text-quaternary uppercase">Vendor Cost</span>
                    <p className="mt-0.5 text-sm font-medium text-secondary">
                      {formatCurrency(vendorUnit, vendorCurrency)}<span className="text-tertiary">/unit</span>
                    </p>
                    {showConversion && <p className="text-xs text-quaternary">≈ {formatCurrency(vendorConverted, customerCurrency)}/unit</p>}
                  </div>
                  <div className="rounded-lg bg-[#eff8ff] px-3 py-2">
                    <span className="text-[11px] font-medium tracking-wider text-brand-tertiary uppercase">Admin Price</span>
                    <p className="mt-0.5 text-sm font-semibold text-brand-secondary">
                      {formatCurrency(adminUnit, customerCurrency)}<span className="font-medium text-brand-tertiary">/unit</span>
                    </p>
                    {showConversion && (
                      <p className="text-xs text-quaternary">≈ {formatCurrency(Math.round(adminUnit / curation.exchangeRate), vendorCurrency)}/unit</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-secondary bg-[#f9fafb] px-5 py-4">
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-tertiary">Vendor Total</span>
            <span className="text-sm text-tertiary">
              {formatCurrency(vendorTotal, vendorCurrency)}
              {showConversion && ` (≈ ${formatCurrency(vendorTotalConverted, customerCurrency)})`}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-medium text-secondary">Admin Total</span>
            <span className="text-lg font-semibold tracking-tight text-primary">{formatCurrency(adminTotal, customerCurrency)}</span>
          </div>
          {totalMarkup > 0 && (
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-tertiary">Margin</span>
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#ecfdf3] px-2.5 py-0.5 text-xs font-medium text-[#067647]">
                <ArrowUp className="size-3" />
                {formatCurrency(totalMarkup, customerCurrency)} ({markupPercent}%)
              </span>
            </div>
          )}
        </div>
      </div>

      {curation.notes && (
        <div className="border-t border-secondary px-5 py-4">
          <div className="flex items-start gap-2.5">
            <MessageTextSquare01 className="mt-0.5 size-4 shrink-0 text-quaternary" />
            <div>
              <span className="text-xs font-medium tracking-wide text-tertiary uppercase">Notes</span>
              <p className="mt-0.5 text-sm leading-relaxed text-secondary">{curation.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { AdminCurationSummary };
