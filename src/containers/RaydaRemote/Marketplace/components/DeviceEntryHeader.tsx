import type { ComponentType } from "react";
import { ChevronDown, Trash03 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import type { DeviceEntry } from "../data";

function getDeviceLabel(device: DeviceEntry, index: number, truncateAt: number) {
  const name = device.deviceName.trim();
  const suffix = name ? ` - ${name.length > truncateAt ? `${name.slice(0, truncateAt)}...` : name}` : "";
  return `Device ${index + 1}${suffix}`;
}

function DeviceEntryHeader({
  assetIcon: AssetIcon,
  device,
  index,
  isOpen,
  onDelete,
  onToggle,
  totalDevices,
}: {
  assetIcon: ComponentType<{ className?: string }> | null;
  device: DeviceEntry;
  index: number;
  isOpen: boolean;
  onDelete: () => void;
  onToggle: () => void;
  totalDevices: number;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#eaecf0] px-4 py-3">
      <button type="button" className="flex flex-1 items-center gap-2" onClick={onToggle}>
        {AssetIcon && (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#f2f4f7]">
            <AssetIcon className="size-4 text-[#667085]" />
          </div>
        )}
        <span className="text-sm font-semibold text-[#101828]">
          <span className="sm:hidden">{getDeviceLabel(device, index, 16)}</span>
          <span className="hidden sm:inline">{getDeviceLabel(device, index, 24)}</span>
        </span>
        <ChevronDown className={cx("size-4 text-[#667085] transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      <button
        type="button"
        disabled={totalDevices <= 1}
        onClick={onDelete}
        className={cx(
          "rounded-md p-1.5 transition",
          totalDevices <= 1 ? "cursor-not-allowed text-[#d0d5dd]" : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#475467]",
        )}
        aria-label={`Delete device ${index + 1}`}
      >
        <Trash03 className="size-4" />
      </button>
    </div>
  );
}

export { DeviceEntryHeader };
