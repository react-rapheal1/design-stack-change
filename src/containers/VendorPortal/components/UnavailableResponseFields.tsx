import { XCircle } from "@untitledui/icons";
import { TextArea } from "@/components/base/textarea/textarea";

function UnavailableResponseFields({ reason, onChange }: { reason: string; onChange: (value: string) => void }) {
  return (
    <div className="mt-2 duration-200 animate-in fade-in slide-in-from-top-2">
      <div className="rounded-lg border border-[#fecdca] bg-[#fef3f2] p-3">
        <div className="flex gap-2">
          <XCircle className="size-4 shrink-0 text-[#d92d20]" />
          <p className="text-sm font-medium text-[#b42318]">This device will be marked as unavailable</p>
        </div>
      </div>
      <div className="mt-3">
        <TextArea
          label="Reason (optional)"
          placeholder="e.g., Out of stock, Discontinued, Not available in this region..."
          value={reason}
          onChange={onChange}
          rows={2}
        />
      </div>
    </div>
  );
}

export { UnavailableResponseFields };
