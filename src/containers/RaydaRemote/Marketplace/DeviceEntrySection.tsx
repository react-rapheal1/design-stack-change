import { useState } from "react";
import { DeviceEntryForm } from "./DeviceEntryForm";
import { DeviceEntryHeader } from "./DeviceEntryHeader";
import { DeviceEntrySubtotal } from "./DeviceEntrySubtotal";
import { assetTypeIcons } from "./data";
import type { DeviceEntry } from "./data";

function DeviceEntrySection({
  device,
  index,
  totalDevices,
  onChange,
  onDelete,
}: {
  device: DeviceEntry;
  index: number;
  totalDevices: number;
  onChange: (updated: DeviceEntry) => void;
  onDelete: () => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const AssetIcon = device.assetType ? assetTypeIcons[device.assetType] : null;

  return (
    <div className="rounded-lg border border-[#eaecf0]">
      <DeviceEntryHeader
        assetIcon={AssetIcon}
        device={device}
        index={index}
        isOpen={isOpen}
        totalDevices={totalDevices}
        onDelete={onDelete}
        onToggle={() => setIsOpen(!isOpen)}
      />
      {!isOpen && <DeviceEntrySubtotal className="px-4 py-2 text-sm text-[#475467]" device={device} emptyLabel="No budget added" />}
      {isOpen && (
        <div className="flex flex-col gap-4 p-4">
          <DeviceEntryForm device={device} onChange={onChange} />
          {device.budgetPrice && device.quantity && <DeviceEntrySubtotal className="rounded-lg bg-[#f9fafb] px-3 py-2 text-sm" device={device} />}
        </div>
      )}
    </div>
  );
}

export { DeviceEntrySection };
