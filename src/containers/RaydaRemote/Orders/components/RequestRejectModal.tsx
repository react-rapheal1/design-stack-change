import { XCircle } from "@untitledui/icons";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { TextArea } from "@/components/base/textarea/textarea";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

function RequestRejectModal({
  isOpen,
  onClose,
  onConfirm,
  otherReason,
  requestId,
  setOtherReason,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  otherReason: string;
  requestId: string;
  setOtherReason: (value: string) => void;
}) {
  if (!isOpen) return null;
  return (
    <ModalOverlay isOpen onOpenChange={onClose} isDismissable>
      <Modal className="max-w-md">
        <Dialog>
          <div className="flex flex-col gap-5 rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <FeaturedIcon icon={XCircle} color="error" theme="light" size="lg" />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-primary">Reject quote?</h3>
                <p className="text-sm text-tertiary">You’re about to reject quote {requestId}. Add an optional note for your records.</p>
              </div>
            </div>
            <TextArea value={otherReason} onChange={setOtherReason} rows={3} placeholder="Optional rejection note" />
            <div className="flex gap-3">
              <Button size="lg" color="secondary" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button size="lg" color="primary-destructive" className="flex-1" onClick={onConfirm}>
                Reject Quote
              </Button>
            </div>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export { RequestRejectModal };
