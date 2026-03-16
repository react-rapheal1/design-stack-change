"use client";

import { useState } from "react";
import { Check } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";

const deviceFields = [
  { label: "Device name", placeholder: 'e.g. MacBook Pro 14"' },
  { label: "Serial number", placeholder: "e.g. C02X1234ABC" },
  { label: "Assigned employee", placeholder: "e.g. Olivia Rhye" },
  { label: "Condition", placeholder: "New / Used / Refurbished" },
];

export function AddDeviceModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-primary">Add device</h2>
              <p className="mt-0.5 text-sm text-tertiary">Enter the details of the device you want to add.</p>
            </div>
            <CloseButton size="sm" onPress={onClose} />
          </div>
          {saved ? <SuccessState onClose={onClose} /> : <FormState onClose={onClose} onSave={() => setSaved(true)} />}
        </div>
      </div>
    </>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-25">
        <Check className="size-7 text-green-600" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-primary">Device added!</h3>
      <p className="mt-2 text-sm text-tertiary">Your device has been added to the inventory.</p>
      <Button size="md" className="mt-6" onClick={onClose}>
        View inventory
      </Button>
    </div>
  );
}

function FormState({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return (
    <>
      <div className="flex flex-col gap-4 p-6">
        {deviceFields.map((field) => (
          <div key={field.label}>
            <label className="mb-1.5 block text-sm font-medium text-secondary">{field.label}</label>
            <input
              type="text"
              placeholder={field.placeholder}
              className="w-full rounded-lg border border-[#d0d5dd] px-3 py-2.5 text-sm text-primary placeholder:text-placeholder focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 border-t border-[#eaecf0] px-6 py-4">
        <Button color="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" iconLeading={Check} onClick={onSave}>
          Save device
        </Button>
      </div>
    </>
  );
}
