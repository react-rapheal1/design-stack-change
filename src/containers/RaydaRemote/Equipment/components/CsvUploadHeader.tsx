import { X } from "@untitledui/icons";
import type { CsvUploadStage } from "../csvUploadTypes";

const stageTitles = {
  upload: "Upload equipment CSV",
  mapping: "Map your columns",
  done: "Import complete",
} as const;

const stageDescriptions = {
  upload: "Drag & drop your file or click to browse.",
  mapping: "Match your spreadsheet columns to Rayda fields.",
  done: "Your devices have been imported successfully.",
} as const;

function CsvUploadHeader({ onClose, stage }: { onClose: () => void; stage: CsvUploadStage }) {
  return (
    <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
      <div>
        <h2 className="text-base font-bold text-primary">{stageTitles[stage]}</h2>
        <p className="mt-0.5 text-sm text-tertiary">{stageDescriptions[stage]}</p>
      </div>
      <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary transition duration-100 hover:bg-[#f2f4f7]">
        <X className="size-4" />
      </button>
    </div>
  );
}

export { CsvUploadHeader };
