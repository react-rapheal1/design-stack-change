import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";

function DeleteConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  skipConfirm,
  onSkipConfirmChange,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  skipConfirm: boolean;
  onSkipConfirmChange: (value: boolean) => void;
}) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <Modal className="max-w-[400px]">
        <Dialog>
          <div className="flex w-full flex-col rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-[#101828]">Delete device?</h3>
            <p className="mt-2 text-sm text-[#475467]">Are you sure you want to remove this device entry? This action cannot be undone.</p>
            <div className="mt-4">
              <Checkbox size="sm" label="Don't ask again" isSelected={skipConfirm} onChange={(val) => onSkipConfirmChange(val)} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button color="secondary" size="md" onClick={onCancel}>
                Cancel
              </Button>
              <Button color="primary-destructive" size="md" onClick={onConfirm}>
                Delete
              </Button>
            </div>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
export { DeleteConfirmDialog };
