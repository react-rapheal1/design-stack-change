import { ChevronDown } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { CustomDeviceRequest } from "../CustomDeviceRequest";
import { DeviceVendorResponse } from "../DeviceVendorResponse";
import { formatCurrency } from "../formatCurrency";

function ResponseBadge({ response }: { response?: DeviceVendorResponse }) {
  if (!response) return null;
  const styles = { alternative: "bg-[#eff8ff] text-[#0948b5]", quoted: "bg-[#dcfae6] text-[#067647]", unavailable: "bg-[#fef3f2] text-[#b42318]" } as const;
  const labels = { alternative: "Alternative", quoted: "Quoted", unavailable: "Unavailable" } as const;
  return <span className={cx("rounded-full px-2 py-0.5 text-xs font-medium", styles[response.type])}>{labels[response.type]}</span>;
}

function RequestedDevicesCard({
  expandedDevice,
  onToggleDevice,
  request,
  vendorTotal,
}: {
  expandedDevice: number | null;
  onToggleDevice: (index: number) => void;
  request: CustomDeviceRequest;
  vendorTotal: number;
}) {
  const totalQuantity = request.devices.reduce((sum, device) => sum + device.quantity, 0);

  return (
    <div className="rounded-xl border border-[#e9eaeb] bg-white">
      <div className="flex items-center justify-between border-b border-[#e9eaeb] px-3 py-3">
        <span className="text-sm font-semibold text-[#414651]">Requested Device(s)</span>
        <span className="rounded-full border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 text-xs font-medium text-[#414651]">{totalQuantity}</span>
      </div>
      <div className="flex flex-col divide-y divide-[#e9eaeb]">
        {request.devices.map((device, index) => {
          const budgetTotal = device.unitPrice !== undefined ? device.unitPrice * device.quantity : null;
          const isExpanded = expandedDevice === index;
          const response = device.vendorResponse;
          return (
            <div key={`${device.name}-${index}`} className={cx("flex flex-col transition-colors duration-200", isExpanded && "bg-[#fafafa]")}>
              <button
                type="button"
                onClick={() => onToggleDevice(index)}
                className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-[#fafafa]"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="line-clamp-1 text-sm font-semibold text-[#181d27]">{device.name}</span>
                    <ResponseBadge response={response} />
                  </div>
                  <span className="text-sm text-[#535862]">
                    ×{device.quantity}
                    {budgetTotal !== null && ` | Budget: ${formatCurrency(budgetTotal)}`}
                  </span>
                </div>
                <ChevronDown className={cx("size-5 shrink-0 text-[#535862] transition-transform duration-200", isExpanded && "rotate-180")} />
              </button>
              {isExpanded && (
                <div className="flex flex-col gap-4 px-3 pb-4 duration-200 animate-in fade-in slide-in-from-top-2">
                  <div className="h-px bg-[#e9eaeb]" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-[#717680]">Your Budget</span>
                      <span className="text-sm font-medium text-[#181d27]">
                        {device.unitPrice !== undefined ? formatCurrency(device.unitPrice) : "Not specified"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-[#717680]">Quantity</span>
                      <span className="text-sm font-medium text-[#181d27]">{device.quantity}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-[#717680]">Asset Type</span>
                      <span className="text-sm font-medium text-[#181d27]">{device.assetType}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-[#717680]">Budget Subtotal</span>
                      <span className="text-sm font-medium text-[#181d27]">{budgetTotal !== null ? formatCurrency(budgetTotal) : "—"}</span>
                    </div>
                  </div>
                  {response && (
                    <div className="flex flex-col gap-3">
                      <div className="h-px bg-[#e9eaeb]" />
                      <span className="text-xs font-semibold tracking-wide text-[#717680] uppercase">Vendor Response</span>
                      {response.type === "quoted" && response.quotedPrice && (
                        <div className="rounded-lg border border-[#abefc6] bg-[#ecfdf3] p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#067647]">Quoted Price</span>
                            <span className="text-sm font-semibold text-[#067647]">{formatCurrency(response.quotedPrice)} /unit</span>
                          </div>
                          <div className="mt-2 flex items-center justify-between border-t border-[#abefc6] pt-2">
                            <span className="text-sm font-medium text-[#067647]">Total ({device.quantity} units)</span>
                            <span className="text-sm font-bold text-[#067647]">{formatCurrency(response.quotedPrice * device.quantity)}</span>
                          </div>
                        </div>
                      )}
                      {response.type === "alternative" && response.alternative && (
                        <div className="rounded-lg border border-[#b2ddff] bg-[#eff8ff] p-3">
                          <span className="text-xs font-medium text-[#0948b5]">Suggested Alternative</span>
                          <p className="text-sm font-semibold text-[#0948b5]">{response.alternative.name}</p>
                          {response.alternative.specs && <p className="text-xs text-[#0948b5]">{response.alternative.specs}</p>}
                          <div className="mt-2 flex items-center justify-between border-t border-[#b2ddff] pt-2">
                            <span className="text-sm font-medium text-[#0948b5]">Price ({device.quantity} units)</span>
                            <span className="text-sm font-bold text-[#0948b5]">{formatCurrency(response.alternative.price * device.quantity)}</span>
                          </div>
                        </div>
                      )}
                      {response.type === "unavailable" && (
                        <div className="rounded-lg border border-[#fecdca] bg-[#fef3f2] p-3">
                          <span className="text-sm font-medium text-[#b42318]">Unable to Fulfill</span>
                          {response.unavailableReason && <p className="text-sm text-[#b42318]">{response.unavailableReason}</p>}
                        </div>
                      )}
                    </div>
                  )}
                  {device.description && (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-[#717680]">Description</span>
                      <p className="text-sm leading-relaxed text-[#535862]">{device.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {vendorTotal > 0 && (
        <div className="border-t border-[#e9eaeb] bg-[#fafafa] px-3 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#181d27]">Vendor Quote Total</span>
            <span className="text-sm font-bold text-[#181d27]">{formatCurrency(vendorTotal)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export { RequestedDevicesCard };
