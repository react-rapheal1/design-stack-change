import { ArrowUp, FileCheck02 } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { RFQ, VendorResponse, formatCurrency } from "../../shared";
import { computeCurationTotals, getAdminUnitPrice } from "../utils/curationPricing";

function PricingRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-tertiary">{label}</span>
      <span className={`text-sm font-medium ${muted ? "text-tertiary" : "text-primary"}`}>{value}</span>
    </div>
  );
}

function AdminCurationSummary({ rfq, vendor }: { rfq: RFQ; vendor: VendorResponse }) {
  const curation = rfq.curation;
  if (!curation) return null;

  const { vendorTotal, adminTotal, totalMarkup, markupPercent } = computeCurationTotals(rfq, curation, vendor);

  return (
    <div className="rounded-xl border border-secondary bg-primary shadow-xs">
      <div className="flex items-center gap-2 border-b border-secondary px-5 py-3.5">
        <FeaturedIcon color="brand" theme="modern" size="sm">
          <FileCheck02 />
        </FeaturedIcon>
        <span className="text-sm font-semibold text-secondary">Admin Quoted Pricing</span>
      </div>
      <div className="p-5">
        <div className="flex flex-col gap-3">
          {rfq.devices.map((device, index) => {
            const pricing = curation.devicePricing[index];
            if (!pricing || pricing.isUnavailable) {
              return (
                <PricingRow key={`${device.name}-${index}`} label={`${device.name} × ${device.quantity}`} value="Unavailable" muted />
              );
            }
            const adminUnit = getAdminUnitPrice(curation, vendor, index);
            const lineTotal = adminUnit * device.quantity;
            return (
              <PricingRow
                key={`${device.name}-${index}`}
                label={`${device.name} × ${device.quantity}`}
                value={`${formatCurrency(adminUnit)}/unit · ${formatCurrency(lineTotal)}`}
              />
            );
          })}
        </div>
        <div className="mt-4 flex flex-col gap-2 border-t border-secondary pt-4">
          <PricingRow label="Vendor Total" value={formatCurrency(vendorTotal)} muted />
          <div className="flex items-center justify-between">
            <span className="text-sm text-tertiary">Admin Total</span>
            <span className="text-base font-semibold text-primary">{formatCurrency(adminTotal)}</span>
          </div>
          {totalMarkup > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-tertiary">Markup</span>
              <span className="flex items-center gap-1 text-sm font-medium text-success-primary">
                <ArrowUp className="size-3.5" />
                {formatCurrency(totalMarkup)} ({markupPercent}%)
              </span>
            </div>
          )}
        </div>
        {curation.notes && (
          <div className="mt-4 border-t border-secondary pt-4">
            <span className="text-xs font-medium tracking-wide text-tertiary uppercase">Notes</span>
            <p className="mt-1 text-sm text-secondary">{curation.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { AdminCurationSummary };
