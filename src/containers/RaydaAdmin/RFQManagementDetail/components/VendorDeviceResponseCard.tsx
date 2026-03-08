import { Star01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { VendorDeviceResponse, VendorResponse, formatCurrency } from "../../shared";
import { ResponseTypeBadge } from "./ResponseTypeBadge";

function VendorDeviceResponseCard({ response, selected, vendor }: { response: VendorDeviceResponse; selected: boolean; vendor: VendorResponse }) {
  return (
    <div
      className={cx("max-w-[240px] min-w-[240px] shrink-0 rounded-xl border transition", selected ? "border-brand bg-[#eff8ff] shadow-sm" : "border-secondary")}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <span className="text-xs font-medium text-tertiary">{vendor.vendorName}</span>
        {selected && (
          <span className="flex items-center gap-1 text-xs font-semibold text-brand-secondary">
            <Star01 className="size-3" />
            CHOSEN
          </span>
        )}
      </div>
      <div className={cx("border-t px-4 pt-3 pb-4", selected ? "border-brand/20" : "border-secondary")}>
        <div className="mb-2">
          <ResponseTypeBadge type={response.type} />
        </div>
        {response.type === "quoted" && (
          <div className="mt-3">
            <span className="text-2xl font-semibold text-primary">{formatCurrency(response.quotedPrice!)}</span>
            <span className="text-sm text-tertiary">/unit</span>
          </div>
        )}
        {response.type === "alternative" && (
          <div className="mt-3 flex min-w-0 flex-col gap-1">
            <span className="truncate text-sm font-medium text-primary" title={response.alternativeName}>
              {response.alternativeName}
            </span>
            {response.alternativeSpecs && (
              <span className="truncate text-xs text-tertiary" title={response.alternativeSpecs}>
                {response.alternativeSpecs}
              </span>
            )}
            <div className="mt-1">
              <span className="text-2xl font-semibold text-primary">{formatCurrency(response.alternativePrice!)}</span>
              <span className="text-sm text-tertiary">/unit</span>
            </div>
          </div>
        )}
        {response.type === "unavailable" && <p className="mt-3 text-xs text-error-primary">{response.unavailableReason}</p>}
      </div>
    </div>
  );
}

export { VendorDeviceResponseCard };
