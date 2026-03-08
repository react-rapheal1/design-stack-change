import { XCircle } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { RFQ, VendorResponse, formatCurrency } from "../../shared";
import { CuratePricingControls } from "./CuratePricingControls";
import { ResponseTypeBadge } from "./ResponseTypeBadge";

function CurateResponseDeviceCard({
  getCustomerPrice,
  getEffectiveMarkup,
  getVendorPrice,
  index,
  pricing,
  rfq,
  updatePricing,
  vendor,
}: {
  getCustomerPrice: (index: number) => number;
  getEffectiveMarkup: (index: number) => number;
  getVendorPrice: (index: number) => number;
  index: number;
  pricing: { fixedPrice: number; isUnavailable: boolean; markupPercent: number; mode: "markup" | "fixed" };
  rfq: RFQ;
  updatePricing: (index: number, updates: { fixedPrice?: number; isUnavailable?: boolean; markupPercent?: number; mode?: "markup" | "fixed" }) => void;
  vendor: VendorResponse;
}) {
  const device = rfq.devices[index];
  const response = vendor.deviceResponses[index];
  const vendorPrice = getVendorPrice(index);

  return (
    <div className={cx("rounded-xl border border-secondary bg-primary shadow-xs", response.type === "unavailable" && "opacity-60")}>
      <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-primary">{device.name}</span>
          <span className="text-sm text-quaternary">&times;{device.quantity}</span>
        </div>
        <ResponseTypeBadge type={response.type} />
      </div>
      <div className="p-4">
        {response.type === "unavailable" ? (
          <div className="flex items-center gap-2 text-sm text-error-primary">
            <XCircle className="size-4 shrink-0" />
            <span>Vendor marked as unavailable: {response.unavailableReason}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-0 rounded-lg bg-secondary">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-tertiary">Vendor Quote</span>
                <span className="text-sm font-semibold text-primary">{formatCurrency(vendorPrice)}/unit</span>
              </div>
              {device.unitBudget != null && (
                <div className="flex items-center justify-between border-t border-tertiary px-3 py-2">
                  <span className="text-sm text-tertiary">Customer Budget</span>
                  <span className="text-sm font-medium text-tertiary">{formatCurrency(device.unitBudget)}/unit</span>
                </div>
              )}
            </div>
            {response.type === "alternative" && (
              <div className="rounded-lg border border-utility-blue-200 bg-utility-blue-50 px-3 py-2.5">
                <p className="text-xs font-medium tracking-wide text-utility-blue-700 uppercase">Alternative Offered</p>
                <p className="mt-1 text-sm font-medium text-utility-blue-700">{response.alternativeName}</p>
                {response.alternativeSpecs && <p className="mt-0.5 text-xs text-utility-blue-600">{response.alternativeSpecs}</p>}
              </div>
            )}
            <CuratePricingControls
              getCustomerPrice={getCustomerPrice}
              getEffectiveMarkup={getEffectiveMarkup}
              index={index}
              onUpdate={updatePricing}
              pricing={pricing}
              vendorPrice={vendorPrice}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export { CurateResponseDeviceCard };
