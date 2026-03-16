import { CloseButton } from "@/components/base/buttons/close-button";

function HrisPanelHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-start justify-between px-6 py-5">
      <div>
        <h2 className="text-lg font-bold text-primary">Add employees</h2>
        <p className="mt-0.5 text-sm text-tertiary">Download template to add employees or invite team members to add their details</p>
      </div>
      <CloseButton size="sm" onPress={onClose} />
    </div>
  );
}

export { HrisPanelHeader };
