import { Plus, XClose } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { DeviceEntrySection } from "./DeviceEntrySection";
import type { DeviceEntry } from "./data";

function CustomRequestForm({
  devices,
  isFormValid,
  onAddDevice,
  onClose,
  onDeleteDevice,
  onSubmit,
  onUpdateDevice,
  totalBudget,
}: {
  devices: DeviceEntry[];
  isFormValid: boolean;
  onAddDevice: () => void;
  onClose: () => void;
  onDeleteDevice: (id: string) => void;
  onSubmit: () => void;
  onUpdateDevice: (id: string, updated: DeviceEntry) => void;
  totalBudget: number;
}) {
  return (
    <div className="flex w-full flex-col rounded-xl bg-white shadow-xl">
      <div className="flex items-start justify-between px-6 pt-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-[#101828]">Custom Device Request</h2>
          <p className="text-sm text-[#475467]">Add custom device requests with specifications and requirements.</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-md p-1 text-[#667085] transition hover:text-[#101828]">
          <XClose className="size-5" />
        </button>
      </div>
      <div className="flex max-h-[60vh] flex-col gap-5 overflow-y-auto px-6 pt-5 pb-6">
        <div className="flex flex-col gap-4">
          {devices.map((device, index) => (
            <DeviceEntrySection
              key={device.id}
              device={device}
              index={index}
              totalDevices={devices.length}
              onChange={(updated) => onUpdateDevice(device.id, updated)}
              onDelete={() => onDeleteDevice(device.id)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onAddDevice}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#d0d5dd] px-4 py-3 text-sm font-semibold text-[#344054] transition hover:bg-[#f9fafb]"
        >
          <Plus className="size-4" /> Add Another Device
        </button>
      </div>
      <div className="flex flex-col gap-4 border-t border-[#eaecf0] px-6 py-4">
        {totalBudget > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#344054]">Total Budget</span>
            <span className="text-lg font-semibold text-[#101828]">{totalBudget.toLocaleString()}</span>
          </div>
        )}
        <div className="flex items-center justify-end gap-3">
          <Button color="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button size="md" isDisabled={!isFormValid} onClick={onSubmit}>
            Submit Request
          </Button>
        </div>
      </div>
    </div>
  );
}

export { CustomRequestForm };
