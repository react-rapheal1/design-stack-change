"use client";

import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { AddEquipmentFields } from "./AddEquipmentFields";
import type { EquipmentFormData } from "./AddEquipmentFields";

const EMPTY: EquipmentFormData = {
  assetTitle: "",
  serialNumber: "",
  make: "",
  model: "",
  year: "",
  purchaseDate: "",
  equipmentState: "",
  equipmentType: "",
  assignTo: "",
  country: "",
  saleAmount: "",
  spec1Type: "RAM",
  spec1Value: "",
  spec2Type: "Storage",
  spec2Value: "",
  specification: "",
};

export function AddEquipmentTab({ onClose }: { onClose: () => void }) {
  const [data, setData] = useState<EquipmentFormData>({ ...EMPTY });

  function handleChange(field: keyof EquipmentFormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <AddEquipmentFields data={data} onChange={handleChange} />
      </div>
      <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
        <Button color="secondary" onClick={onClose}>Cancel</Button>
        <Button isDisabled={!data.assetTitle.trim()}>Save equipment</Button>
      </div>
    </div>
  );
}
