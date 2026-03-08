import { TextArea } from "@/components/base/textarea/textarea";

function CurateResponseNotesCard({ notes, onChange }: { notes: string; onChange: (value: string) => void }) {
  return (
    <div className="rounded-xl border border-secondary bg-primary shadow-xs">
      <div className="border-b border-secondary px-4 py-3">
        <span className="text-sm font-semibold text-primary">Note to Customer</span>
      </div>
      <div className="p-4">
        <TextArea
          value={notes}
          onChange={onChange}
          placeholder="Add any relevant details e.g warranty terms, SLA, etc."
          rows={3}
          textAreaClassName="resize-none"
        />
      </div>
    </div>
  );
}

export { CurateResponseNotesCard };
