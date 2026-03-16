import { ArrowUp, Star01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import type { CurrencyCode, CustomerCurrencyCode } from "../../shared";
import { VendorDeviceResponse, VendorResponse, formatCurrency } from "../../shared";
import { ResponseTypeBadge } from "./ResponseTypeBadge";

function VendorDeviceResponseCard({
  adminUnitPrice,
  customerCurrency,
  exchangeRate,
  response,
  selected,
  vendor,
}: {
  adminUnitPrice?: number;
  customerCurrency?: CustomerCurrencyCode;
  exchangeRate?: number;
  response: VendorDeviceResponse;
  selected: boolean;
  vendor: VendorResponse;
}) {
  const vendorPrice = response.type === "quoted" ? response.quotedPrice : response.type === "alternative" ? response.alternativePrice : undefined;
  const showAdminPrice = selected && adminUnitPrice != null && adminUnitPrice > 0;
  const canConvert = customerCurrency != null && vendor.currency !== customerCurrency && exchangeRate != null;
  const vendorConverted = vendorPrice && exchangeRate ? Math.round(vendorPrice * exchangeRate) : undefined;

  return (
    <div
      className={cx(
        "max-w-[260px] min-w-[260px] shrink-0 overflow-hidden rounded-xl border shadow-xs transition-all",
        selected ? "border-brand bg-gradient-to-b from-[#eff8ff] to-[#f5faff] shadow-md ring-1 ring-brand/20" : "border-secondary bg-primary",
      )}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <span className={cx("text-xs font-medium", selected ? "text-secondary" : "text-tertiary")}>{vendor.vendorName}</span>
        {selected && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#0948b5]/10 px-2 py-0.5 text-[11px] font-bold tracking-wider text-brand-secondary uppercase">
            <Star01 className="size-3" />
            Chosen
          </span>
        )}
      </div>
      <div className={cx("border-t px-4 pt-3 pb-4", selected ? "border-brand/15" : "border-secondary")}>
        <ResponseTypeBadge type={response.type} />
        {response.type === "quoted" && (
          <PriceDisplay canConvert={canConvert} customerCurrency={customerCurrency} exchangeRate={exchangeRate} price={response.quotedPrice!} small={showAdminPrice} vendorCurrency={vendor.currency} />
        )}
        {response.type === "alternative" && (
          <div className="mt-3 flex min-w-0 flex-col gap-1">
            <span className="truncate text-sm font-medium text-primary" title={response.alternativeName}>{response.alternativeName}</span>
            {response.alternativeSpecs && <span className="truncate text-xs text-tertiary" title={response.alternativeSpecs}>{response.alternativeSpecs}</span>}
            <PriceDisplay canConvert={canConvert} customerCurrency={customerCurrency} exchangeRate={exchangeRate} price={response.alternativePrice!} small={showAdminPrice} vendorCurrency={vendor.currency} />
          </div>
        )}
        {response.type === "unavailable" && <p className="mt-3 text-xs text-error-primary">{response.unavailableReason}</p>}
        {showAdminPrice && (
          <div className="mt-3 rounded-lg border border-brand/15 bg-[#eff8ff]/60 p-3">
            <span className="text-[11px] font-semibold tracking-wider text-brand-tertiary uppercase">Admin Price</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-semibold tracking-tight text-brand-secondary">{formatCurrency(adminUnitPrice, customerCurrency)}</span>
              <span className="text-xs text-brand-tertiary">/unit</span>
            </div>
            {canConvert && <p className="mt-0.5 text-xs text-quaternary">≈ {formatCurrency(Math.round(adminUnitPrice / exchangeRate!), vendor.currency)}/unit</p>}
            {vendorConverted && adminUnitPrice > vendorConverted && (
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#ecfdf3] px-2 py-0.5 text-xs font-medium text-[#067647]">
                <ArrowUp className="size-3" />+{formatCurrency(adminUnitPrice - vendorConverted, customerCurrency)} markup
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PriceDisplay({ canConvert, customerCurrency, exchangeRate, price, small, vendorCurrency }: { canConvert: boolean; customerCurrency?: CustomerCurrencyCode; exchangeRate?: number; price: number; small: boolean; vendorCurrency: CurrencyCode }) {
  return (
    <div className="mt-3">
      <div className="flex items-baseline gap-1">
        <span className={cx("font-semibold tracking-tight text-primary", small ? "text-lg" : "text-2xl")}>{formatCurrency(price, vendorCurrency)}</span>
        <span className="text-sm text-tertiary">/unit</span>
      </div>
      {canConvert && <p className="mt-0.5 text-xs text-quaternary">≈ {formatCurrency(Math.round(price * exchangeRate!), customerCurrency!)}/unit</p>}
    </div>
  );
}

export { VendorDeviceResponseCard };
