"use client";

import { useState } from "react";
import { RefreshCw03, Upload01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { cx } from "@/utils/cx";
import type { EmployeeFormData } from "./AddEmployeeForm";
import { ImportEditRow } from "./ImportEditRow";
import { ImportPreviewTable } from "./ImportPreviewTable";

function parseCSV(text: string): { headers: string[]; rows: string[][] } {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return { headers: [], rows: [] };
  function parseLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes; }
      else if (char === "," && !inQuotes) { result.push(current.trim()); current = ""; }
      else { current += char; }
    }
    result.push(current.trim());
    return result;
  }
  return { headers: parseLine(lines[0]), rows: lines.slice(1).map(parseLine) };
}

export function ImportEmployeesTab({ onSuccess }: { onSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function handleSelect(files: FileList | null) {
    const selected = files?.[0];
    if (!selected) return;
    setFile(selected);
    const reader = new FileReader();
    reader.onload = (e) => {
      const parsed = parseCSV(e.target?.result as string);
      setHeaders(parsed.headers);
      setRows(parsed.rows);
    };
    reader.readAsText(selected);
  }

  function handleReupload() { setFile(null); setHeaders([]); setRows([]); setEditingIndex(null); }
  function handleDelete(index: number) { setRows((prev) => prev.filter((_, i) => i !== index)); }

  function handleSaveEdit(data: EmployeeFormData) {
    if (editingIndex === null) return;
    const FIELD_MAP: Record<keyof EmployeeFormData, string[]> = {
      name: ["name", "full name", "employee name"], taxId: ["tax", "identification"],
      personalEmail: ["personal email", "email"], workEmail: ["work email"],
      phone: ["phone", "mobile"], jobTitle: ["job title", "title", "role", "position"],
      employmentType: ["employment type", "contract type"], level: ["level"],
      department: ["department", "dept"], country: ["country"],
      address: ["address"], landmark: ["landmark"],
    };
    const newRow = headers.map((h) => {
      const entry = (Object.entries(FIELD_MAP) as [keyof EmployeeFormData, string[]][])
        .find(([, terms]) => terms.some((t) => h.toLowerCase().includes(t)));
      return entry ? (data[entry[0]] ?? "") : "";
    });
    setRows((prev) => prev.map((r, i) => (i === editingIndex ? newRow : r)));
    setEditingIndex(null);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {editingIndex !== null ? (
        <ImportEditRow
          headers={headers}
          row={rows[editingIndex] ?? []}
          onBack={() => setEditingIndex(null)}
          onSave={handleSaveEdit}
          onRemove={() => { handleDelete(editingIndex); setEditingIndex(null); }}
        />
      ) : file ? (
        <>
          <div className="flex-1 overflow-y-auto p-6">
            <ImportPreviewTable headers={headers} rows={rows} onDelete={handleDelete} onEdit={(i) => setEditingIndex(i)} />
          </div>
          <div className="flex items-center justify-between border-t border-[#eaecf0] px-6 py-4">
            <button type="button" onClick={handleReupload} className="flex items-center gap-2 text-sm font-semibold text-[#475467] hover:text-[#101828]">
              <RefreshCw03 className="size-4" /> Re-upload
            </button>
            <div className="flex items-center gap-3">
              <Button color="secondary" onClick={handleReupload}>Cancel</Button>
              <Button isDisabled={rows.length === 0} onClick={onSuccess}>Continue</Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto p-6">
          <FileTrigger acceptedFileTypes={[".csv", ".xlsx"]} onSelect={handleSelect}>
            <button type="button" className={cx("flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-12 transition duration-100", "border-[#d0d5dd] hover:border-brand-300 hover:bg-[#f9fafb]")}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f4f7]">
                <Upload01 className="size-5 text-[#667085]" />
              </div>
              <p className="text-sm font-medium text-secondary"><span className="font-semibold text-brand-700">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-tertiary">CSV or XLSX files only</p>
            </button>
          </FileTrigger>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#eaecf0] bg-[#f9fafb] px-4 py-3">
            <div>
              <p className="text-sm font-medium text-primary">Download template</p>
              <p className="mt-0.5 text-xs text-tertiary">Use this template to format your employee data correctly</p>
            </div>
            <Button color="secondary" size="sm">Download</Button>
          </div>
        </div>
      )}
    </div>
  );
}
