import { Key } from "react";
import { Input } from "@/components/base/input/input";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { AlternativeSource } from "../AlternativeSource";
import { DeviceResponseState } from "../DeviceResponseState";
import { RFQDevice } from "../RFQDevice";
import { catalogDevices } from "../catalogDevices";
import { formatCurrency } from "../formatCurrency";

function AlternativeResponseFields({
  device,
  response,
  onSourceChange,
  onSelectCatalogDevice,
  onUpdate,
}: {
  device: RFQDevice;
  response: DeviceResponseState;
  onSourceChange: (value: AlternativeSource) => void;
  onSelectCatalogDevice: (key: Key | null) => void;
  onUpdate: (updates: Partial<DeviceResponseState>) => void;
}) {
  return (
    <div className="mt-2 flex flex-col gap-3 duration-200 animate-in fade-in slide-in-from-top-2">
      <RadioGroup
        value={response.alternativeSource}
        onChange={(value) => onSourceChange(value as AlternativeSource)}
        className="flex-row gap-6"
        aria-label="Alternative source"
      >
        <RadioButton value="catalog" label="From Catalog" />
        <RadioButton value="manual" label="Manual Entry" />
      </RadioGroup>
      {response.alternativeSource === "catalog" && (
        <div className="duration-200 animate-in fade-in">
          <Select
            label="Select from catalog"
            placeholder="Choose a device"
            size="sm"
            selectedKey={response.selectedCatalogDevice?.id || null}
            onSelectionChange={onSelectCatalogDevice}
            items={catalogDevices.map((item) => ({
              id: item.id,
              label: item.name,
              supportingText: formatCurrency(item.price),
              avatarUrl: item.image,
            }))}
          >
            {(item) => <Select.Item key={item.id} id={item.id} label={item.label} supportingText={item.supportingText} avatarUrl={item.avatarUrl} />}
          </Select>
          {response.selectedCatalogDevice && (
            <div className="mt-2 rounded-lg bg-[#fafafa] p-2">
              <p className="text-xs text-[#535862]">{response.selectedCatalogDevice.specs}</p>
              <p className="mt-1 text-xs font-medium text-[#181d27]">Subtotal: {formatCurrency(response.selectedCatalogDevice.price * device.quantity)}</p>
            </div>
          )}
        </div>
      )}
      {response.alternativeSource === "manual" && (
        <div className="flex flex-col gap-3 duration-200 animate-in fade-in">
          <Input
            label="Device name"
            placeholder="e.g., Dell XPS 15"
            value={response.manualDeviceName}
            onChange={(value) => onUpdate({ manualDeviceName: value })}
            isRequired
          />
          <Input
            label="Price per unit"
            placeholder="0.00"
            value={response.manualDevicePrice}
            onChange={(value) => onUpdate({ manualDevicePrice: value })}
            type="number"
            isRequired
          />
          <TextArea
            label="Description"
            placeholder="e.g., Intel i7, 32GB RAM, 1TB SSD"
            value={response.manualDeviceSpecs}
            onChange={(value) => onUpdate({ manualDeviceSpecs: value })}
            rows={2}
            isRequired
          />
          {response.manualDevicePrice && (
            <p className="text-xs text-[#535862]">Subtotal: {formatCurrency(parseFloat(response.manualDevicePrice) * device.quantity)}</p>
          )}
        </div>
      )}
    </div>
  );
}

export { AlternativeResponseFields };
