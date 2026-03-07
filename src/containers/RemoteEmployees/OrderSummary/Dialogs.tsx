import { AlertTriangle, CheckCircle } from "@untitledui/icons";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { countries, countryPhoneCodes } from "./data";
import type { DeliveryInfo } from "./data";

function RemoveSignatureModal({ isOpen, onOpenChange, onRemove }: { isOpen: boolean; onOpenChange: (open: boolean) => void; onRemove: () => void }) {
  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
      <Modal className="max-w-[400px]">
        <Dialog className="relative w-full flex-col items-stretch overflow-hidden rounded-xl bg-white shadow-xl">
          {({ close }) => (
            <>
              <div className="flex flex-col gap-4 px-6 pt-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#fee4e2]">
                  <AlertTriangle className="size-6 text-[#d92d20]" />
                </div>
                <CloseButton size="md" className="absolute top-4 right-4" onClick={close} />
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold text-[#181d27]">Remove Signature Requirement?</h2>
                  <p className="text-sm leading-5 text-[#535862]">
                    {" "}
                    Just a heads up: without signature requirement, your package could be left at the doorstep if no one&apos;s around to receive it. This means
                    less security for your delivery.{" "}
                  </p>
                </div>
              </div>
              <div className="mt-8 h-px w-full bg-[#eaecf0]" />
              <div className="flex gap-3 px-6 py-6">
                <Button color="secondary" size="lg" className="flex-1" onClick={close}>
                  {" "}
                  Cancel{" "}
                </Button>
                <Button
                  color="primary-destructive"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    onRemove();
                    close();
                  }}
                >
                  {" "}
                  Remove{" "}
                </Button>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
function ConfirmDetailsModal({
  isOpen,
  onOpenChange,
  deliveryInfo,
  signatureRequired,
  specialInstructions,
  onConfirm,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  deliveryInfo: DeliveryInfo;
  signatureRequired: boolean;
  specialInstructions: string;
  onConfirm: () => void;
}) {
  const countryData = countries.find((c) => c.id === deliveryInfo.country);
  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
      <Modal className="max-w-[400px]">
        <Dialog className="relative w-full flex-col items-stretch overflow-hidden rounded-xl bg-white shadow-xl">
          {({ close }) => (
            <>
              <div className="flex flex-col gap-4 px-6 pt-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#dcfae6]">
                  <CheckCircle className="size-6 text-[#17b26a]" />
                </div>
                <CloseButton size="md" className="absolute top-4 right-4" onClick={close} />
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold text-[#181d27]">Confirm delivery information</h2>
                  <div className="text-sm leading-5 text-[#535862]">
                    <p className="mb-3.5">This is to confirm all these details are correct before we proceed:</p>
                    <p className="mb-3.5">
                      {" "}
                      Phone:{" "}
                      <span className="font-medium">
                        {countryPhoneCodes[deliveryInfo.phoneCountry]}
                        {deliveryInfo.phone}
                      </span>
                    </p>
                    <p className="mb-3.5">
                      {" "}
                      Address:{" "}
                      <span className="font-medium">
                        {deliveryInfo.address}
                        {countryData ? `, ${countryData.label}` : ""}
                      </span>
                    </p>
                    {specialInstructions && (
                      <p className="mb-3.5">
                        {" "}
                        Delivery Notes: <span className="font-medium">&ldquo;{specialInstructions}&rdquo;</span>
                      </p>
                    )}
                    {deliveryInfo.landmark && (
                      <p className="mb-3.5">
                        {" "}
                        Nearest Landmark: <span className="font-medium">{deliveryInfo.landmark}</span>
                      </p>
                    )}
                    <p className="mb-3.5">{signatureRequired ? "✍️ Signature Required." : "No signature required."}</p>
                    <p>A confirmation email has been sent to you.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 h-px w-full bg-[#eaecf0]" />
              <div className="flex gap-3 px-6 py-6">
                <Button color="secondary" size="lg" className="flex-1" onClick={close}>
                  {" "}
                  Cancel{" "}
                </Button>
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    close();
                    onConfirm();
                  }}
                >
                  {" "}
                  Confirm{" "}
                </Button>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
export { RemoveSignatureModal, ConfirmDetailsModal };
