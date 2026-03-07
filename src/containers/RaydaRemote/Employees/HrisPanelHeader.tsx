import { X } from "@untitledui/icons";

function HrisPanelHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-start justify-between px-6 py-5">
      <div>
        <h2 className="text-lg font-bold text-primary">Add employees</h2>
        <p className="mt-0.5 text-sm text-tertiary">Download template to add employees or invite team members to add their details</p>
      </div>
      <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary transition duration-100 hover:bg-[#f2f4f7]">
        <X className="size-4" />
      </button>
    </div>
  );
}

export { HrisPanelHeader };
