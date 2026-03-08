import { ChevronDown } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { RFQ } from "../RFQ";
import { formatCurrency } from "../formatCurrency";

function RFQDevicesCard({ expandedDevice, onToggleDevice, rfq }: { expandedDevice: number | null; onToggleDevice: (index: number) => void; rfq: RFQ }) {
  const totalQuantity = rfq.devices.reduce((sum, device) => sum + device.quantity, 0);

  return (
    <div className="rounded-xl border border-[#e9eaeb] bg-white">
      <div className="flex items-center justify-between border-b border-[#e9eaeb] px-3 py-3">
        <span className="text-sm font-semibold text-[#414651]">Device(s)</span>
        <span className="rounded-full border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 text-xs font-medium text-[#414651]">{totalQuantity}</span>
      </div>
      <div className="flex flex-col divide-y divide-[#e9eaeb]">
        {rfq.devices.map((device, index) => {
          const isExpanded = expandedDevice === index;
          const total = device.unitPrice !== undefined ? device.unitPrice * device.quantity : null;
          return (
            <div key={`${device.name}-${index}`} className={cx("flex flex-col transition-colors duration-200", isExpanded && "bg-[#fafafa]")}>
              <button
                type="button"
                onClick={() => onToggleDevice(index)}
                className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-[#fafafa]"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <span className="line-clamp-1 text-sm font-semibold text-[#181d27]">{device.name}</span>
                  <span className="text-sm text-[#535862]">
                    ×{device.quantity}
                    {total !== null && ` | ${formatCurrency(total)}`}
                  </span>
                </div>
                <ChevronDown className={cx("size-5 shrink-0 text-[#535862] transition-transform duration-200", isExpanded && "rotate-180")} />
              </button>
              {isExpanded && (
                <div className="flex flex-col gap-4 px-3 pb-4 duration-200 animate-in fade-in slide-in-from-top-2">
                  <div className="h-px bg-[#e9eaeb]" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-[#717680]">Quantity</span>
                      <span className="text-sm font-medium text-[#181d27]">{device.quantity}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-[#717680]">Asset Type</span>
                      <span className="text-sm font-medium text-[#181d27]">{device.assetType}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-[#717680]">Description</span>
                    <p className="text-sm leading-relaxed text-[#535862]">{device.description}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { RFQDevicesCard };
