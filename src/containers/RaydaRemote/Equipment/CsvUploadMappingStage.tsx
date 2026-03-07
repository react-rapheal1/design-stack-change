import { ArrowRight, Check } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { mappingRows } from "./csvUploadTypes";

function CsvUploadMappingStage({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  return (
    <>
      <div className="divide-y divide-[#eaecf0] px-6 py-4">
        {mappingRows.map((row) => (
          <div key={row.csv} className="flex items-center justify-between py-3">
            <span className="rounded-md bg-[#f2f4f7] px-2 py-1 font-mono text-xs text-secondary">{row.csv}</span>
            <ArrowRight className="size-4 shrink-0 text-tertiary" />
            <span className="text-sm font-medium text-secondary">{row.rayda}</span>
            <Check className="size-4 text-green-500" />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 border-t border-[#eaecf0] px-6 py-4">
        <Button color="secondary" size="sm" onClick={onBack}>
          Back
        </Button>
        <Button size="sm" onClick={onDone}>
          Import devices
        </Button>
      </div>
    </>
  );
}

export { CsvUploadMappingStage };
