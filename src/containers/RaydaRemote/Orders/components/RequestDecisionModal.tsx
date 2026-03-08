import { CheckCircle } from "@untitledui/icons";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { CustomDeviceRequest } from "../CustomDeviceRequest";
import { formatCurrency } from "../formatCurrency";

function RequestDecisionModal({
  isOpen,
  onClose,
  onConfirm,
  request,
  selectedDevices,
  setSelectedDevices,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  request: CustomDeviceRequest;
  selectedDevices: Set<number>;
  setSelectedDevices: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
  if (!isOpen) return null;
  const selectedTotal = request.devices.reduce((sum, device, index) => {
    if (!selectedDevices.has(index)) return sum;
    if (device.vendorResponse?.type === "quoted" && device.vendorResponse.quotedPrice) return sum + device.vendorResponse.quotedPrice * device.quantity;
    if (device.vendorResponse?.type === "alternative" && device.vendorResponse.alternative)
      return sum + device.vendorResponse.alternative.price * device.quantity;
    return sum;
  }, 0);

  return (
    <ModalOverlay isOpen onOpenChange={onClose} isDismissable>
      <Modal className="max-w-lg">
        <Dialog>
          <div className="flex flex-col gap-5 rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <FeaturedIcon icon={CheckCircle} color="success" theme="light" size="lg" />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-primary">Confirm your order</h3>
                <p className="text-sm text-tertiary">Select the items you want to proceed with. Uncheck any items you don&apos;t want to include.</p>
              </div>
            </div>
            <div className="flex max-h-[300px] flex-col divide-y divide-border-secondary overflow-y-auto rounded-lg border border-secondary">
              {request.devices.map((device, index) => {
                const response = device.vendorResponse;
                const unavailable = response?.type === "unavailable";
                const selected = selectedDevices.has(index);
                const price =
                  response?.type === "quoted" && response.quotedPrice
                    ? response.quotedPrice * device.quantity
                    : response?.type === "alternative" && response.alternative
                      ? response.alternative.price * device.quantity
                      : 0;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-3 px-4 py-3 ${unavailable ? "bg-bg-disabled_subtle opacity-60" : selected ? "bg-bg-brand-primary_alt" : "bg-bg-primary hover:bg-bg-primary_hover"}`}
                  >
                    <Checkbox
                      size="sm"
                      isSelected={selected}
                      isDisabled={unavailable}
                      onChange={() => {
                        if (unavailable) return;
                        setSelectedDevices((prev) => {
                          const next = new Set(prev);
                          if (next.has(index)) {
                            next.delete(index);
                          } else {
                            next.add(index);
                          }
                          return next;
                        });
                      }}
                      className="mt-0.5"
                    />
                    <div className="flex flex-1 flex-col gap-0.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`text-sm font-medium ${unavailable ? "text-disabled" : "text-primary"}`}>{device.name}</span>
                        {response?.type === "alternative" && (
                          <Badge size="sm" color="blue">
                            Alternative
                          </Badge>
                        )}
                        {unavailable && (
                          <Badge size="sm" color="error">
                            Unavailable
                          </Badge>
                        )}
                      </div>
                      {response?.type === "alternative" && response.alternative && (
                        <span className="text-xs text-tertiary">
                          {response.alternative.name}
                          {response.alternative.specs && ` · ${response.alternative.specs}`}
                        </span>
                      )}
                      {unavailable && response?.unavailableReason && <span className="text-xs text-error-primary">{response.unavailableReason}</span>}
                    </div>
                    {!unavailable && (
                      <div className="flex shrink-0 flex-col items-end">
                        <span className="text-sm font-semibold text-primary">{formatCurrency(price)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-secondary pt-4">
              <span className="text-sm font-medium text-tertiary">
                Order Total ({selectedDevices.size} item{selectedDevices.size !== 1 ? "s" : ""})
              </span>
              <span className="text-lg font-bold text-primary">{formatCurrency(selectedTotal)}</span>
            </div>
            <div className="flex w-full gap-3">
              <Button size="lg" color="secondary" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button size="lg" color="primary" className="flex-1" isDisabled={selectedDevices.size === 0} onClick={onConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export { RequestDecisionModal };
