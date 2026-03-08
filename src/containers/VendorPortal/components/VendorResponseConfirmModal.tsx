import { CheckCircle, XClose } from "@untitledui/icons";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { DeviceResponseState } from "../DeviceResponseState";
import { RFQDevice } from "../RFQDevice";
import { formatCurrency } from "../formatCurrency";

function VendorResponseConfirmModal({
  devices,
  isOpen,
  onClose,
  onSubmit,
  responses,
  total,
}: {
  devices: RFQDevice[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  responses: DeviceResponseState[];
  total: number;
}) {
  if (!isOpen) return null;
  const unavailableCount = responses.filter((response) => response.responseType === "unavailable").length;
  const message =
    unavailableCount === devices.length
      ? "You're marking all devices as unable to fulfill. The customer will be notified of your response."
      : unavailableCount > 0
        ? `You're submitting a quote of ${formatCurrency(total)} for ${devices.length - unavailableCount} device${devices.length - unavailableCount > 1 ? "s" : ""}, with ${unavailableCount} marked as unable to fulfill. The customer will be notified.`
        : `You're about to submit a quote of ${formatCurrency(total)} for this RFQ. The client will be notified and can review your response.`;

  return (
    <ModalOverlay isOpen onOpenChange={onClose}>
      <Modal className="max-w-[400px]">
        <Dialog>
          <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
            <button type="button" onClick={onClose} className="absolute top-4 right-4 rounded-lg p-2 transition-colors hover:bg-[#fafafa]">
              <XClose className="size-5 text-[#535862]" />
            </button>
            <div className="flex flex-col gap-4 px-6 pt-6">
              <FeaturedIcon icon={CheckCircle} size="lg" color="success" theme="light" className="duration-300 animate-in zoom-in-50" />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-[#181d27]">Submit your response?</h3>
                <p className="text-sm text-[#535862]">{message}</p>
              </div>
            </div>
            <div className="flex gap-3 px-6 pt-8 pb-6">
              <Button size="lg" color="secondary" className="flex-1" onClick={onClose}>
                Go back
              </Button>
              <Button size="lg" color="primary" className="flex-1" onClick={onSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export { VendorResponseConfirmModal };
