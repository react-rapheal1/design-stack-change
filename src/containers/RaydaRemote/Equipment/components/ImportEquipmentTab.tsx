"use client";

import { useState } from "react";
import { RefreshCw03, Upload01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { cx } from "@/utils/cx";

const PREVIEW_ROWS = [
  { name: "HP EliteDisplay", serial: "Z6A7B8C9D0", make: "HP", model: "EliteDisplay...", type: "Computer", year: "2021", assignee: "Kerry Gorczany", condition: "Brand New" },
  { name: "Dell XPS 13", serial: "P6Q7R8S9T0", make: "Dell", model: "XPS 13 9310", type: "Computer", year: "2021", assignee: "Martin Kling", condition: "Brand New" },
  { name: "iPhone 12", serial: "U1V2W3X4Y5", make: "Apple", model: "iPhone 12", type: "Phone", year: "2021", assignee: "Jimmy Schumm", condition: "Brand New" },
  { name: "iPad Pro", serial: "A1B2C3D4E5", make: "Apple", model: "iPad Pro 12...", type: "Tablet", year: "2021", assignee: "Michele Lakin", condition: "Brand New" },
  { name: "Standing Desk", serial: "K1L2M3N4O5", make: "Vari", model: "Electric Sta...", type: "Table", year: "2021", assignee: "", condition: "Brand New" },
  { name: "Logitech MX", serial: "F6G7H8I9J0", make: "Logitech", model: "CustomMX...", type: "Accessories", year: "2021", assignee: "", condition: "Brand New" },
];

export function ImportEquipmentTab({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);

  const unassignedCount = PREVIEW_ROWS.filter((r) => !r.assignee).length;

  if (file) {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          {unassignedCount > 0 && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700">
              <span className="font-semibold">{unassignedCount} items have no assignee</span>
              <span className="text-orange-600">— you can assign them from the Equipment page after import.</span>
            </div>
          )}
          <div className="overflow-hidden rounded-xl border border-[#eaecf0] shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eaecf0] bg-[#f9fafb]">
                  {["Asset", "Make & model", "Asset Type", "Assign to"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-[#475467]">{h}</th>
                  ))}
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {PREVIEW_ROWS.map((row) => (
                  <tr key={row.serial} className={cx("border-b border-[#eaecf0] last:border-0", !row.assignee && "bg-orange-50/60")}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7]" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#101828]">{row.name}</p>
                          <p className="truncate text-sm text-[#475467]">{row.serial}</p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-[140px] px-6 py-4">
                      <p className="truncate text-sm text-[#101828]">{row.make}</p>
                      <p className="truncate text-sm text-[#475467]">{row.model}</p>
                    </td>
                    <td className="max-w-[120px] px-6 py-4">
                      <p className="truncate text-sm text-[#101828]">{row.type}</p>
                      <p className="truncate text-sm text-[#475467]">{row.year}</p>
                    </td>
                    <td className="max-w-[140px] px-6 py-4">
                      {row.assignee
                        ? <p className="truncate text-sm text-[#101828]">{row.assignee}</p>
                        : <span className="rounded-full border border-orange-200 bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">Unassigned</span>
                      }
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3 whitespace-nowrap">
                        <button type="button" className="text-sm font-semibold text-[#475467] hover:text-[#101828]">Delete</button>
                        <button type="button" className="text-sm font-semibold text-[#003999] hover:text-[#004ccc]">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[#eaecf0] px-6 py-4">
          <button type="button" onClick={() => setFile(null)} className="flex items-center gap-2 text-sm font-semibold text-[#475467] hover:text-[#101828]">
            <RefreshCw03 className="size-4" /> Re-upload
          </button>
          <div className="flex items-center gap-3">
            <Button color="secondary" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Continue</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">
        <FileTrigger acceptedFileTypes={[".csv", ".xlsx"]} onSelect={(files) => files?.[0] && setFile(files[0])}>
          <button
            type="button"
            className={cx(
              "flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-12 transition duration-100",
              "border-[#d0d5dd] hover:border-brand-300 hover:bg-[#f9fafb]",
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f4f7]">
              <Upload01 className="size-5 text-[#667085]" />
            </div>
            <p className="text-sm font-medium text-secondary">
              <span className="font-semibold text-brand-700">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-tertiary">CSV or XLSX files only</p>
          </button>
        </FileTrigger>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#eaecf0] bg-[#f9fafb] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-primary">Download template</p>
            <p className="mt-0.5 text-xs text-tertiary">Use this template to format your equipment data correctly</p>
          </div>
          <Button color="secondary" size="sm">Download</Button>
        </div>
      </div>
      <div className="flex items-center justify-end border-t border-[#eaecf0] px-6 py-4">
        <div className="flex items-center gap-3">
          <Button color="secondary" onClick={onClose}>Cancel</Button>
          <Button isDisabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
