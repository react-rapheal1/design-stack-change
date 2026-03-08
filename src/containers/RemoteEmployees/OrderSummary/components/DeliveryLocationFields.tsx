import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { countries, countryStates } from "../data";

function DeliveryLocationFields({
  address,
  country,
  landmark,
  state,
  updateProfile,
  onAddressChange,
  onCountryChange,
  onLandmarkChange,
  onStateChange,
  onUpdateProfileChange,
}: {
  address: string;
  country: string | null;
  landmark: string;
  state: string | null;
  updateProfile: boolean;
  onAddressChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onLandmarkChange: (value: string) => void;
  onStateChange: (value: string | null) => void;
  onUpdateProfileChange: (value: boolean) => void;
}) {
  const stateOptions = country ? (countryStates[country] ?? []) : [];

  return (
    <>
      <Select
        items={countries}
        label="Country"
        placeholder="Select country"
        size="md"
        selectedKey={country}
        onSelectionChange={(key) => onCountryChange(key as string)}
      >
        {(item) => (
          <Select.Item key={item.id} {...item}>
            {item.label}
          </Select.Item>
        )}
      </Select>
      <Select
        items={stateOptions}
        label="State / Region"
        placeholder={country ? "Select state / region" : "Select a country first"}
        size="md"
        selectedKey={state}
        onSelectionChange={(key) => onStateChange(key as string)}
        isDisabled={!country || !stateOptions.length}
      >
        {(item) => (
          <Select.Item key={item.id} {...item}>
            {item.label}
          </Select.Item>
        )}
      </Select>
      <Input label="Address" placeholder="e.g. 8/101 Nicholson St, Camp Hill" size="md" value={address} onChange={onAddressChange} />
      <TextArea
        label="Nearest landmark"
        placeholder="e.g. Opposite the main post office on King Street"
        rows={3}
        value={landmark}
        onChange={onLandmarkChange}
      />
      <div className="rounded-xl border border-[#e9eaeb] bg-[#f9fafb] p-4">
        <Checkbox
          isSelected={updateProfile}
          onChange={onUpdateProfileChange}
          label="Also update my personal profile"
          hint="Checking this will update your delivery address in your personal profile as well."
        />
      </div>
    </>
  );
}

export { DeliveryLocationFields };
