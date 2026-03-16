import type { CustomerCurrencyCode } from "../../shared";
import { formatCurrency } from "../../shared";

function ConfirmSendDescription({
  adminTotal,
  customerCurrency,
  quotedDeviceCount,
  rfqId,
  vendorName,
}: {
  adminTotal: number;
  customerCurrency: CustomerCurrencyCode;
  quotedDeviceCount: number;
  rfqId: string;
  vendorName: string;
}) {
  return (
    <>
      <p>You&apos;re about to send a curated response for {rfqId}.</p>
      <div className="mt-3 rounded-lg bg-secondary p-3 text-left text-sm">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <span className="text-tertiary">Devices quoted</span>
            <span className="font-medium text-primary">{quotedDeviceCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-tertiary">Vendor</span>
            <span className="font-medium text-primary">{vendorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-tertiary">Admin total</span>
            <span className="font-semibold text-primary">{formatCurrency(adminTotal, customerCurrency)}</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-tertiary">The customer will be notified and can accept or reject.</p>
    </>
  );
}

export { ConfirmSendDescription };
