import { ChevronDown } from "@untitledui/icons";
import Image from "next/image";
import { cx } from "@/utils/cx";
import { OrderRequest } from "../OrderRequest";

function OrderItemsCard({
  expandedDevice,
  onToggleDevice,
  order,
}: {
  expandedDevice: number | null;
  onToggleDevice: (index: number) => void;
  order: OrderRequest;
}) {
  const totalQuantity = order.devices.reduce((sum, device) => sum + (device.quantity || 1), 0);

  return (
    <div className="rounded-xl border border-[#e9eaeb] bg-white">
      <div className="flex items-center justify-between border-b border-[#e9eaeb] px-3 py-3">
        <span className="text-sm font-semibold text-[#414651]">Device(s)</span>
        <span className="rounded-full border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 text-xs font-medium text-[#414651]">{totalQuantity}</span>
      </div>
      <div className="flex flex-col">
        {[...order.devices]
          .sort((first, second) => first.name.localeCompare(second.name))
          .map((device, index) => (
            <div key={`${device.name}-${index}`} className={cx("flex flex-col transition-colors duration-200", expandedDevice === index && "bg-[#fafafa]")}>
              <button
                type="button"
                onClick={() => onToggleDevice(index)}
                className="flex w-full items-center gap-2 p-3 text-left transition-colors hover:bg-[#fafafa]"
              >
                <div className="relative size-10 shrink-0 rounded-full bg-[#f5f5f5]">
                  {device.image && (
                    <div className="absolute inset-[15%]">
                      <Image src={device.image} alt={device.name} fill sizes="28px" className="object-contain" />
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full border border-black/[0.08]" />
                  {device.quantity && (
                    <div className="absolute -right-0.5 -bottom-0.5 rounded-full border border-[#b4d0ff] bg-[#fafafa] px-1 py-0.5 text-[10px] font-medium text-[#414651]">
                      {device.quantity}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-semibold text-[#181d27]">{device.name}</span>
                  <span className="text-sm text-[#535862]">{device.price}</span>
                </div>
                <div className="rounded-md p-2">
                  <ChevronDown className={cx("size-5 text-[#535862] transition-transform duration-200", expandedDevice === index && "rotate-180")} />
                </div>
              </button>
              {expandedDevice === index && device.specs && (
                <div className="flex flex-col gap-3 pr-3 pb-3 pl-[60px] duration-200 animate-in fade-in slide-in-from-top-2">
                  <div className="h-px bg-[#e9eaeb]" />
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[#717680]">Device Specification</span>
                    <div className="flex flex-col gap-2">
                      {device.specs.display && (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium text-[#181d27]">Display</span>
                          <span className="text-xs text-[#535862]">{device.specs.display}</span>
                        </div>
                      )}
                      <div className="flex gap-6">
                        {device.specs.processor && (
                          <div className="flex flex-1 flex-col gap-1">
                            <span className="text-xs font-medium text-[#181d27]">Processor</span>
                            <span className="text-xs text-[#535862]">{device.specs.processor}</span>
                          </div>
                        )}
                        {device.specs.ram && (
                          <div className="flex flex-1 flex-col gap-1">
                            <span className="text-xs font-medium text-[#181d27]">RAM</span>
                            <span className="text-xs text-[#535862]">{device.specs.ram}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-6">
                        {device.specs.color && (
                          <div className="flex flex-1 flex-col gap-1">
                            <span className="text-xs font-medium text-[#181d27]">Color</span>
                            <span className="text-xs text-[#535862]">{device.specs.color}</span>
                          </div>
                        )}
                        {device.specs.storage && (
                          <div className="flex flex-1 flex-col gap-1">
                            <span className="text-xs font-medium text-[#181d27]">Storage</span>
                            <span className="text-xs text-[#535862]">{device.specs.storage}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {device.addOns?.length ? (
                    <>
                      <div className="h-px bg-[#e9eaeb]" />
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-[#717680]">Add-ons</span>
                        {device.addOns.map((addOn, addOnIndex) => (
                          <div key={`${addOn.name}-${addOnIndex}`} className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-[#181d27]">{addOn.name}</span>
                            <span className="text-xs text-[#535862]">{addOn.price}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="flex items-center justify-between border-t border-[#e9eaeb] px-3 py-3">
        <span className="text-sm text-[#414651]">Total</span>
        <span className="text-sm font-semibold text-[#181d27]">{order.total}</span>
      </div>
    </div>
  );
}

export { OrderItemsCard };
