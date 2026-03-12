"use client";

import { useState } from "react";
import { Upload01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { cx } from "@/utils/cx";

export function ImportEmployeesTab({ onSuccess }: { onSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null);

  function handleSelect(files: FileList | null) {
    if (files && files[0]) setFile(files[0]);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <FileTrigger acceptedFileTypes={[".csv", ".xlsx"]} onSelect={handleSelect}>
          <button
            type="button"
            className={cx(
              "flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-12 transition duration-100",
              file ? "border-brand-300 bg-brand-25" : "border-[#d0d5dd] hover:border-brand-300 hover:bg-[#f9fafb]",
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f4f7]">
              <Upload01 className="size-5 text-[#667085]" />
            </div>
            {file ? (
              <p className="text-sm font-medium text-brand-700">{file.name}</p>
            ) : (
              <>
                <p className="text-sm font-medium text-secondary">
                  <span className="font-semibold text-brand-700">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-tertiary">CSV or XLSX files only</p>
              </>
            )}
          </button>
        </FileTrigger>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#eaecf0] bg-[#f9fafb] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-primary">Download template</p>
            <p className="mt-0.5 text-xs text-tertiary">Use this template to format your employee data correctly</p>
          </div>
          <Button color="secondary" size="sm">
            Download
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
        <Button color="secondary" isDisabled={!file} onClick={() => setFile(null)}>
          Clear
        </Button>
        <Button isDisabled={!file} onClick={onSuccess}>
          Import employees
        </Button>
      </div>
    </div>
  );
}
