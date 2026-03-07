"use client";

import { useState } from "react";
import { CsvUploadCompleteStage } from "./CsvUploadCompleteStage";
import { CsvUploadHeader } from "./CsvUploadHeader";
import { CsvUploadMappingStage } from "./CsvUploadMappingStage";
import { CsvUploadUploadStage } from "./CsvUploadUploadStage";
import type { CsvUploadStage } from "./csvUploadTypes";

export function CsvUploadModal({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<CsvUploadStage>("upload");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
          <CsvUploadHeader onClose={onClose} stage={stage} />
          {stage === "upload" && (
            <CsvUploadUploadStage
              dragging={dragging}
              fileName={fileName}
              onClose={onClose}
              onContinue={() => setStage("mapping")}
              onDragStateChange={setDragging}
              onFileChange={setFileName}
            />
          )}
          {stage === "mapping" && <CsvUploadMappingStage onBack={() => setStage("upload")} onDone={() => setStage("done")} />}
          {stage === "done" && <CsvUploadCompleteStage onClose={onClose} />}
        </div>
      </div>
    </>
  );
}
