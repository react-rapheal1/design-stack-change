"use client";

import type { ReactNode } from "react";

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

const inputCls = "w-full rounded-lg border border-[#d0d5dd] px-3 py-2.5 text-sm text-primary placeholder:text-placeholder focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none";
const selectCls = "w-full rounded-lg border border-[#d0d5dd] bg-white px-3 py-2.5 text-sm text-primary focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none";
const SPEC_OPTIONS = ["RAM", "Storage", "CPU", "GPU", "Screen"];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-secondary">{label}</label>
      {children}
    </div>
  );
}

export function AddEquipmentFields({ data, onChange }: { data: EquipmentFormData; onChange: (field: keyof EquipmentFormData, value: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-6">
      <Field label="Asset title">
        <input className={inputCls} placeholder="e.g., MacBook Pro 16" value={data.assetTitle} onChange={(e) => onChange("assetTitle", e.target.value)} />
      </Field>
      <Field label="Serial number">
        <input className={inputCls} placeholder="e.g., C02XABC1234" value={data.serialNumber} onChange={(e) => onChange("serialNumber", e.target.value)} />
      </Field>
      <Field label="Make">
        <input className={inputCls} placeholder="Add make" value={data.make} onChange={(e) => onChange("make", e.target.value)} />
      </Field>
      <Field label="Model">
        <input className={inputCls} placeholder="e.g., MacBook Pro, Latitude 5530" value={data.model} onChange={(e) => onChange("model", e.target.value)} />
      </Field>
      <Field label="Year">
        <input className={inputCls} placeholder="Enter year" value={data.year} onChange={(e) => onChange("year", e.target.value)} />
      </Field>
      <Field label="Purchase date">
        <input type="date" className={inputCls} value={data.purchaseDate} onChange={(e) => onChange("purchaseDate", e.target.value)} />
      </Field>
      <Field label="Equipment state">
        <select className={selectCls} value={data.equipmentState} onChange={(e) => onChange("equipmentState", e.target.value)}>
          <option value="">Select state</option>
          {["Brand New", "Used", "Refurbished", "Damaged"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </Field>
      <Field label="Equipment type">
        <select className={selectCls} value={data.equipmentType} onChange={(e) => onChange("equipmentType", e.target.value)}>
          <option value="">Select type</option>
          {["Computer", "Phone", "Tablet", "Monitor", "Accessories", "Table"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </Field>
      <div className="col-span-2">
        <Field label="Assign to">
          <select className={selectCls} value={data.assignTo} onChange={(e) => onChange("assignTo", e.target.value)}>
            <option value="">Select Employee</option>
            {["Kerry Gorczany", "Martin Kling", "Jimmy Schumm", "Michele Lakin", "Shane Price"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <p className="mt-1.5 text-xs text-tertiary">
          If the employee you&apos;re looking for isn&apos;t in the list, you can add them to the system{" "}
          <a href="#" className="text-brand-600 hover:underline">here</a>.
        </p>
      </div>
      <Field label="Select country">
        <select className={selectCls} value={data.country} onChange={(e) => onChange("country", e.target.value)}>
          <option value="">Select country</option>
          {["United States", "United Kingdom", "Nigeria", "Germany", "Australia", "Canada"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </Field>
      <Field label="Sale amount">
        <div className="flex">
          <span className="flex items-center rounded-l-lg border border-r-0 border-[#d0d5dd] bg-[#f9fafb] px-3 text-sm text-tertiary">$</span>
          <input className="flex-1 rounded-r-lg border border-[#d0d5dd] px-3 py-2.5 text-sm placeholder:text-placeholder focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none" placeholder="Add purchase price" value={data.saleAmount} onChange={(e) => onChange("saleAmount", e.target.value)} />
        </div>
      </Field>
      <Field label="Specialization 1">
        <div className="flex gap-2">
          <select className="w-28 rounded-lg border border-[#d0d5dd] bg-white px-2 py-2.5 text-sm focus:outline-none" value={data.spec1Type} onChange={(e) => onChange("spec1Type", e.target.value)}>
            {SPEC_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
          <input className={inputCls} placeholder="e.g 16 GB" value={data.spec1Value} onChange={(e) => onChange("spec1Value", e.target.value)} />
        </div>
      </Field>
      <Field label="Specialization 2">
        <div className="flex gap-2">
          <select className="w-28 rounded-lg border border-[#d0d5dd] bg-white px-2 py-2.5 text-sm focus:outline-none" value={data.spec2Type} onChange={(e) => onChange("spec2Type", e.target.value)}>
            {SPEC_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
          <input className={inputCls} placeholder="e.g SSD, 512 GB" value={data.spec2Value} onChange={(e) => onChange("spec2Value", e.target.value)} />
        </div>
      </Field>
      <div className="col-span-2">
        <Field label="Specification (Optional)">
          <textarea className="w-full rounded-lg border border-[#d0d5dd] px-3 py-2.5 text-sm placeholder:text-placeholder focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none" rows={3} placeholder="Describe what's included and who it's for" value={data.specification} onChange={(e) => onChange("specification", e.target.value)} />
        </Field>
      </div>
    </div>
  );
}
