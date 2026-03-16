"use client";

import { useState } from "react";
import { ArrowLeft } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { AddEmployeeForm } from "./AddEmployeeForm";
import type { EmployeeFormData } from "./AddEmployeeForm";

function findCol(headers: string[], ...terms: string[]): number {
  return headers.findIndex((h) => terms.some((t) => h.toLowerCase().includes(t.toLowerCase())));
}

function buildInitialData(headers: string[], row: string[]): EmployeeFormData {
  const get = (idx: number) => (idx >= 0 ? (row[idx] ?? "") : "");
  return {
    name: get(findCol(headers, "name", "full name", "employee name")),
    taxId: get(findCol(headers, "tax", "identification")),
    personalEmail: get(findCol(headers, "personal email", "email")),
    workEmail: get(findCol(headers, "work email")),
    phone: get(findCol(headers, "phone", "mobile", "telephone")),
    jobTitle: get(findCol(headers, "job title", "title", "role", "position")),
    employmentType: get(findCol(headers, "employment type", "contract type")),
    level: get(findCol(headers, "level")),
    department: get(findCol(headers, "department", "dept")),
    country: get(findCol(headers, "country")),
    address: get(findCol(headers, "address")),
    landmark: get(findCol(headers, "landmark")),
  };
}

interface ImportEditRowProps {
  headers: string[];
  row: string[];
  onBack: () => void;
  onSave: (data: EmployeeFormData) => void;
  onRemove: () => void;
}

export function ImportEditRow({ headers, row, onBack, onSave, onRemove }: ImportEditRowProps) {
  const [data, setData] = useState<EmployeeFormData>(() => buildInitialData(headers, row));

  function handleChange(field: keyof EmployeeFormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 pt-5">
          <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-[#003999] hover:text-[#004ccc]">
            <ArrowLeft className="size-4" />
            Go back
          </button>

          <div className="mt-5 flex items-center justify-between border-b border-[#eaecf0] pb-4">
            <div>
              <p className="text-sm font-semibold text-[#344054]">{data.name || "—"}</p>
              <p className="mt-0.5 text-sm text-[#475467]">{data.level || data.jobTitle || "—"}</p>
            </div>
            <Button color="secondary" size="sm" onClick={onRemove}>
              Remove
            </Button>
          </div>
        </div>

        <AddEmployeeForm data={data} onChange={handleChange} />
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
        <Button color="secondary" iconLeading={ArrowLeft} onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => onSave(data)}>Save</Button>
      </div>
    </div>
  );
}
