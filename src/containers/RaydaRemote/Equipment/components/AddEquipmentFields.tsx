"use client";

import { Input } from "@/components/base/input/input";
import { NativeSelect } from "@/components/base/select/select-native";
import { TextArea } from "@/components/base/textarea/textarea";

export interface EquipmentFormData {
  assetTitle: string;
  serialNumber: string;
  make: string;
  model: string;
  year: string;
  purchaseDate: string;
  equipmentState: string;
  equipmentType: string;
  assignTo: string;
  country: string;
  saleAmount: string;
  spec1Type: string;
  spec1Value: string;
  spec2Type: string;
  spec2Value: string;
  specification: string;
}

const SPEC_OPTIONS = [
  { label: "RAM", value: "RAM" },
  { label: "Storage", value: "Storage" },
  { label: "CPU", value: "CPU" },
  { label: "GPU", value: "GPU" },
  { label: "Screen", value: "Screen" },
];

export function AddEquipmentFields({ data, onChange }: { data: EquipmentFormData; onChange: (field: keyof EquipmentFormData, value: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-6">
      <Input label="Asset title" placeholder="e.g., MacBook Pro 16" value={data.assetTitle} onChange={(v) => onChange("assetTitle", v)} />
      <Input label="Serial number" placeholder="e.g., C02XABC1234" value={data.serialNumber} onChange={(v) => onChange("serialNumber", v)} />
      <Input label="Make" placeholder="Add make" value={data.make} onChange={(v) => onChange("make", v)} />
      <Input label="Model" placeholder="e.g., MacBook Pro, Latitude 5530" value={data.model} onChange={(v) => onChange("model", v)} />
      <Input label="Year" placeholder="Enter year" value={data.year} onChange={(v) => onChange("year", v)} />
      <Input label="Purchase date" type="date" value={data.purchaseDate} onChange={(v) => onChange("purchaseDate", v)} />
      <NativeSelect
        label="Equipment state"
        value={data.equipmentState}
        onChange={(e) => onChange("equipmentState", e.target.value)}
        options={[{ label: "Select state", value: "" }, ...["Brand New", "Used", "Refurbished", "Damaged"].map((o) => ({ label: o, value: o }))]}
      />
      <NativeSelect
        label="Equipment type"
        value={data.equipmentType}
        onChange={(e) => onChange("equipmentType", e.target.value)}
        options={[{ label: "Select type", value: "" }, ...["Computer", "Phone", "Tablet", "Monitor", "Accessories", "Table"].map((o) => ({ label: o, value: o }))]}
      />
      <div className="col-span-2">
        <NativeSelect
          label="Assign to"
          value={data.assignTo}
          onChange={(e) => onChange("assignTo", e.target.value)}
          options={[{ label: "Select Employee", value: "" }, ...["Kerry Gorczany", "Martin Kling", "Jimmy Schumm", "Michele Lakin", "Shane Price"].map((o) => ({ label: o, value: o }))]}
        />
        <p className="mt-1.5 text-xs text-tertiary">
          If the employee you&apos;re looking for isn&apos;t in the list, you can add them to the system{" "}
          <a href="#" className="text-brand-600 hover:underline">here</a>.
        </p>
      </div>
      <NativeSelect
        label="Select country"
        value={data.country}
        onChange={(e) => onChange("country", e.target.value)}
        options={[{ label: "Select country", value: "" }, ...["United States", "United Kingdom", "Nigeria", "Germany", "Australia", "Canada"].map((o) => ({ label: o, value: o }))]}
      />
      <div>
        <label className="mb-1.5 block text-sm font-medium text-secondary">Sale amount</label>
        <div className="flex">
          <span className="flex items-center rounded-l-lg border border-r-0 border-[#d0d5dd] bg-[#f9fafb] px-3 text-sm text-tertiary">$</span>
          <input
            className="flex-1 rounded-r-lg border border-[#d0d5dd] px-3 py-2.5 text-sm placeholder:text-placeholder focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
            placeholder="Add purchase price"
            value={data.saleAmount}
            onChange={(e) => onChange("saleAmount", e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-secondary">Specialization 1</label>
        <div className="flex gap-2">
          <NativeSelect className="w-28" value={data.spec1Type} onChange={(e) => onChange("spec1Type", e.target.value)} options={SPEC_OPTIONS} />
          <Input placeholder="e.g 16 GB" value={data.spec1Value} onChange={(v) => onChange("spec1Value", v)} />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-secondary">Specialization 2</label>
        <div className="flex gap-2">
          <NativeSelect className="w-28" value={data.spec2Type} onChange={(e) => onChange("spec2Type", e.target.value)} options={SPEC_OPTIONS} />
          <Input placeholder="e.g SSD, 512 GB" value={data.spec2Value} onChange={(v) => onChange("spec2Value", v)} />
        </div>
      </div>
      <div className="col-span-2">
        <TextArea label="Specification (Optional)" rows={3} placeholder="Describe what's included and who it's for" value={data.specification} onChange={(v) => onChange("specification", v)} />
      </div>
    </div>
  );
}
