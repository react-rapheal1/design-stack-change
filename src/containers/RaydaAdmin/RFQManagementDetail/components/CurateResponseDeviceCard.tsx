import type { ComponentType } from "react";
import { AlertTriangle, Container, Headphones01, Keyboard01, Laptop01, Monitor01, Mouse, Phone01, Speaker01, Tablet01, VideoRecorder, XCircle } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";
import { RFQ, VendorResponse, formatCurrency } from "../../shared";
import { CuratePricingControls } from "./CuratePricingControls";
import { ResponseTypeBadge } from "./ResponseTypeBadge";

type IconComponent = ComponentType<{ className?: string }>;

const assetTypeIcons: Record<string, IconComponent> = {
  Accessory: Keyboard01,
  Audio: Headphones01,
  Conference: VideoRecorder,
  Furniture: Container,
  Laptop: Laptop01,
  Monitor: Monitor01,
  Peripheral: Mouse,
  Phone: Phone01,
  Speaker: Speaker01,
  Tablet: Tablet01,
};

function BudgetDelta({ vendorPrice, budget }: { vendorPrice: number; budget: number }) {
  const diff = vendorPrice - budget;
  if (diff <= 0) return null;
  return (
    <Badge size="sm" color="warning" type="pill-color">
      +{formatCurrency(diff)} over budget
    </Badge>
  );
}

function QuoteRow({ label, value, isMuted }: { label: string; value: string; isMuted?: boolean }) {
  return (
    <div className="flex items-center justify-between px-3.5 py-2.5">
      <span className="text-sm text-tertiary">{label}</span>
      <span className={cx("text-sm", isMuted ? "text-tertiary" : "font-semibold text-primary")}>{value}</span>
    </div>
  );
}

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
  const DeviceIcon = assetTypeIcons[device.assetType] ?? Container;

  return (
    <div
      className={cx(
        "overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs transition-opacity",
        response.type === "unavailable" && "opacity-50",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-secondary px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-secondary">
            <DeviceIcon className="size-4 text-quaternary" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold text-primary">{device.name}</span>
            <span className="text-xs font-medium text-quaternary">&times;{device.quantity}</span>
          </div>
        </div>
        <ResponseTypeBadge type={response.type} />
      </div>

      {/* Body */}
      <div className="p-5">
        {response.type === "unavailable" ? (
          <div className="flex items-start gap-2.5 rounded-lg border border-[#fecdca] bg-[#fef3f2] px-3.5 py-3">
            <XCircle className="mt-0.5 size-4 shrink-0 text-[#d92d20]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-[#b42318]">Vendor marked as unavailable</span>
              {response.unavailableReason && <span className="text-sm text-[#d92d20]">{response.unavailableReason}</span>}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Quote breakdown */}
            <div className="divide-y divide-secondary overflow-hidden rounded-lg border border-secondary bg-secondary">
              <QuoteRow label="Vendor Quote" value={`${formatCurrency(vendorPrice)}/unit`} />
              {device.unitBudget != null && (
                <div className="flex items-center justify-between bg-primary px-3.5 py-2.5">
                  <span className="text-sm text-tertiary">Customer Budget</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-tertiary">{formatCurrency(device.unitBudget)}/unit</span>
                    <BudgetDelta vendorPrice={vendorPrice} budget={device.unitBudget} />
                  </div>
                </div>
              )}
            </div>

            {/* Alternative device callout */}
            {response.type === "alternative" && (
              <div className="flex items-start gap-2.5 rounded-lg border border-utility-blue-200 bg-utility-blue-50 px-3.5 py-3">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-utility-blue-500" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs font-medium tracking-wide text-utility-blue-700 uppercase">Alternative Offered</p>
                  <p className="text-sm font-medium text-utility-blue-700">{response.alternativeName}</p>
                  {response.alternativeSpecs && <p className="text-xs text-utility-blue-600">{response.alternativeSpecs}</p>}
                </div>
              </div>
            )}

            {/* Pricing controls */}
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
