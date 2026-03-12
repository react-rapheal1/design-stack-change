"use client";

import { useState } from "react";
import { Check } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { AddEmployeeForm } from "./AddEmployeeForm";
import type { EmployeeFormData } from "./AddEmployeeForm";

const EMPTY_FORM: EmployeeFormData = {
  name: "",
  taxId: "",
  personalEmail: "",
  workEmail: "",
  phone: "",
  jobTitle: "",
  employmentType: "",
  level: "",
  department: "",
  country: "",
  address: "",
  landmark: "",
};

export function AddEmployeeTab({ onSuccess }: { onSuccess: () => void }) {
  const [data, setData] = useState<EmployeeFormData>({ ...EMPTY_FORM });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof EmployeeFormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(onSuccess, 2000);
  }

  const canSubmit = data.name.trim() !== "" && data.workEmail.trim() !== "";

  if (submitted) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500">
            <Check className="size-3 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-800">Employee added successfully</p>
            <p className="mt-0.5 text-xs text-green-700">A new employee has been added to the company roster.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <AddEmployeeForm data={data} onChange={handleChange} />
      </div>
      <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
        <Button color="secondary" onClick={() => setData({ ...EMPTY_FORM })}>
          Clear
        </Button>
        <Button isDisabled={!canSubmit} onClick={handleSubmit}>
          Add employee
        </Button>
      </div>
    </div>
  );
}
