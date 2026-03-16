import { CheckCircle, XCircle } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { RFQ, formatCurrency, formatDateTime } from "../../shared";
import { CountryFlag } from "./CountryFlag";

function CustomerRequestCard({ rfq }: { rfq: RFQ }) {
  const showAcceptance = rfq.customerDecision === "partially_accepted" || rfq.customerDecision === "fully_accepted";
  const totalQuantity = rfq.devices.reduce((sum, device) => sum + device.quantity, 0);

  return (
    <div className="rounded-xl border border-secondary bg-primary shadow-xs lg:col-span-2">
      <div className="border-b border-secondary px-5 py-3.5">
        <span className="text-sm font-semibold text-secondary">Customer Request</span>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-tertiary">Company</span>
            <span className="text-sm font-medium text-primary">{rfq.company}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-tertiary">Country</span>
            <div className="flex items-center gap-1.5">
              <CountryFlag country={rfq.country} />
              <span className="text-sm font-medium text-primary">{rfq.country}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-tertiary">Submitted</span>
            <span className="text-sm font-medium text-primary">{formatDateTime(rfq.createdAt)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-tertiary">Budget</span>
            <span className="text-sm font-medium text-primary">
              {rfq.budget > 0 ? (
                <>
                  {formatCurrency(rfq.budget, rfq.customerCurrency)}
                  {rfq.devices.some((device) => device.unitBudget == null) && <span className="text-tertiary"> (partial)</span>}
                </>
              ) : (
                <span className="text-tertiary">Not specified</span>
              )}
            </span>
          </div>
        </div>
        <div className="mt-5 border-t border-secondary pt-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-primary">Devices ({totalQuantity})</span>
          </div>
          <div className="flex flex-col gap-2">
            {rfq.devices.map((device, index) => (
              <div
                key={`${device.name}-${index}`}
                className={cx("flex items-center justify-between text-sm", showAcceptance && rfq.acceptedDevices?.[index] === false && "opacity-50")}
              >
                <span className="flex items-center gap-2 text-tertiary">
                  {showAcceptance &&
                    (rfq.acceptedDevices?.[index] ? (
                      <CheckCircle className="size-4 shrink-0 text-[#067647]" />
                    ) : (
                      <XCircle className="size-4 shrink-0 text-[#d92d20]" />
                    ))}
                  {device.name} × {device.quantity}
                </span>
                <span className={cx("font-medium", device.unitBudget != null ? "text-primary" : "text-tertiary")}>
                  {device.unitBudget != null ? formatCurrency(device.unitBudget * device.quantity, rfq.customerCurrency) : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { CustomerRequestCard };
