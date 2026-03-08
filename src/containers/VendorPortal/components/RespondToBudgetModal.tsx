import { Edit05, XClose } from "@untitledui/icons";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { TextArea } from "@/components/base/textarea/textarea";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { RFQDevice } from "../RFQDevice";
import { formatCurrency } from "../formatCurrency";
import { useVendorResponseForm } from "../hooks/useVendorResponseForm";
import { VendorResponseConfirmModal } from "./VendorResponseConfirmModal";
import { VendorResponseDeviceCard } from "./VendorResponseDeviceCard";

function RespondToBudgetModal({
  devices,
  isOpen,
  onClose,
  onSubmit,
  rfqId,
}: {
  devices: RFQDevice[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  rfqId: string;
}) {
  const state = useVendorResponseForm({ devices, onClose });
  if (!isOpen) return null;
  const total = state.calculateTotal();

  return (
    <ModalOverlay isOpen onOpenChange={(open) => !open && state.handleClose()}>
      <Modal className="mx-3 w-full max-w-[640px] sm:mx-auto">
        <Dialog>
          <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
            <button
              type="button"
              onClick={state.handleClose}
              className="absolute top-3 right-3 z-10 rounded-lg p-1.5 transition-colors hover:bg-[#fafafa] sm:top-6 sm:right-6 sm:p-2"
            >
              <XClose className="size-5 text-[#535862]" />
            </button>
            <div className="border-b border-[#e9eaeb] px-3 pt-3 pb-3 sm:px-6 sm:pt-6 sm:pb-5">
              <div className="flex items-start gap-3 pr-8 sm:gap-4 sm:pr-10">
                <FeaturedIcon icon={Edit05} size="lg" color="gray" theme="modern" className="hidden duration-300 animate-in zoom-in-50 sm:flex" />
                <FeaturedIcon icon={Edit05} size="md" color="gray" theme="modern" className="duration-300 animate-in zoom-in-50 sm:hidden" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-[#181d27] sm:text-lg">Respond to RFQ #{rfqId}</h3>
                  <p className="text-sm text-[#535862]">Review each device and provide your pricing response.</p>
                </div>
              </div>
            </div>
            <div className="max-h-[50vh] overflow-y-auto px-3 py-3 sm:max-h-[400px] sm:px-6 sm:py-6">
              <div className="flex flex-col gap-4">
                {devices.map((device, index) => (
                  <VendorResponseDeviceCard
                    key={`${device.name}-${index}`}
                    device={device}
                    index={index}
                    isExpanded={state.expandedDevice === index}
                    onToggle={() => state.setExpandedDevice(state.expandedDevice === index ? null : index)}
                    response={state.responses[index]}
                    updateResponse={state.updateResponse}
                  />
                ))}
                <div className="mt-2">
                  <TextArea
                    label="Additional notes (optional)"
                    placeholder="Add any relevant details e.g warranty terms, SLA, etc."
                    value={state.vendorNote}
                    onChange={state.setVendorNote}
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-[#e9eaeb] px-3 py-3 sm:px-6 sm:py-6">
              <div className="mb-4 flex items-center justify-between rounded-lg bg-[#eff8ff] px-4 py-3 sm:mb-5">
                <span className="text-sm font-medium text-[#0b4a6f]">Your quoted total</span>
                <span className="text-lg font-semibold text-[#0b4a6f]">{formatCurrency(total)}</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" color="secondary" className="flex-1" onClick={state.handleClose}>
                  Cancel
                </Button>
                <Button size="lg" color="primary" className="flex-1" onClick={() => state.setShowConfirmModal(true)} isDisabled={!state.isFormValid()}>
                  Submit Response
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      </Modal>
      <VendorResponseConfirmModal
        devices={devices}
        isOpen={state.showConfirmModal}
        onClose={() => state.setShowConfirmModal(false)}
        onSubmit={() => {
          state.setShowConfirmModal(false);
          onSubmit();
          state.handleClose();
        }}
        responses={state.responses}
        total={total}
      />
    </ModalOverlay>
  );
}

export { RespondToBudgetModal };
