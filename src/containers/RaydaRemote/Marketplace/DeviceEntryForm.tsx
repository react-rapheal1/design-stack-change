import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { assetTypes } from "./data";
import type { DeviceEntry } from "./data";

function DeviceEntryForm({ device, onChange }: { device: DeviceEntry; onChange: (updated: DeviceEntry) => void }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Device Name"
          placeholder="e.g., MacBook Pro M3"
          size="sm"
          isRequired
          value={device.deviceName}
          onChange={(value) => onChange({ ...device, deviceName: value })}
        />
        <Select
          items={assetTypes}
          label="Asset Type"
          placeholder="Select asset type"
          size="sm"
          isRequired
          selectedKey={device.assetType}
          onSelectionChange={(key) => onChange({ ...device, assetType: key as string })}
        >
          {(item) => (
            <Select.Item key={item.id} {...item}>
              {item.label}
            </Select.Item>
          )}
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Quantity"
          placeholder="e.g., 5"
          size="sm"
          isRequired
          inputMode="numeric"
          value={device.quantity}
          onChange={(value) => onChange({ ...device, quantity: value.replace(/\D/g, "") })}
        />
        <Input
          label="Budget"
          placeholder="e.g., 2500"
          size="sm"
          inputMode="numeric"
          value={device.budgetPrice}
          onChange={(value) => onChange({ ...device, budgetPrice: value.replace(/\D/g, "") })}
        />
      </div>
      <TextArea
        label="Description"
        placeholder="Describe the device specifications and requirements..."
        rows={3}
        isRequired
        value={device.description}
        onChange={(value) => onChange({ ...device, description: value })}
      />
    </>
  );
}

export { DeviceEntryForm };
