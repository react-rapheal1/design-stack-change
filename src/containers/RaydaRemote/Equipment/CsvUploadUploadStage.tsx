import { ArrowRight, Upload01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

function CsvUploadUploadStage({
  dragging,
  fileName,
  onClose,
  onContinue,
  onDragStateChange,
  onFileChange,
}: {
  dragging: boolean;
  fileName: string;
  onClose: () => void;
  onContinue: () => void;
  onDragStateChange: (value: boolean) => void;
  onFileChange: (value: string) => void;
}) {
  return (
    <>
      <div className="p-6">
        <div
          onDragOver={(event) => {
            event.preventDefault();
            onDragStateChange(true);
          }}
          onDragLeave={() => onDragStateChange(false)}
          onDrop={(event) => {
            event.preventDefault();
            onDragStateChange(false);
            const file = event.dataTransfer.files[0];
            if (file) onFileChange(file.name);
          }}
          className={cx(
            "flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 text-center transition duration-100",
            dragging ? "border-brand-400 bg-brand-50" : "border-[#d0d5dd] bg-[#f9fafb]",
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
            <Upload01 className="size-6 text-brand-600" />
          </div>
          <p className="mt-3 text-sm font-semibold text-secondary">{fileName || "Drop your CSV here"}</p>
          <p className="mt-1 text-xs text-tertiary">{fileName ? "Ready to upload" : "or click to browse · CSV files only"}</p>
        </div>
        <p className="mt-4 text-xs text-tertiary">
          Need a template?{" "}
          <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
            Download sample CSV
          </a>
        </p>
      </div>
      <div className="flex justify-end gap-2 border-t border-[#eaecf0] px-6 py-4">
        <Button color="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" iconTrailing={ArrowRight} isDisabled={!fileName} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </>
  );
}

export { CsvUploadUploadStage };
