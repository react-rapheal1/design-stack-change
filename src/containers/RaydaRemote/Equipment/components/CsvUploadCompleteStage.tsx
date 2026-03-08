import { Check } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

function CsvUploadCompleteStage({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-25">
        <Check className="size-7 text-green-600" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-primary">Import complete!</h3>
      <p className="mt-2 text-sm text-tertiary">Your devices have been added. Review them below and confirm any that need attention.</p>
      <Button size="md" className="mt-6" onClick={onClose}>
        View inventory
      </Button>
    </div>
  );
}

export { CsvUploadCompleteStage };
