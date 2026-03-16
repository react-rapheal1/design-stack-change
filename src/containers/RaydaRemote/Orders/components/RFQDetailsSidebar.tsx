import { useState } from "react";
import { ShoppingBag01 } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { CustomDeviceRequest } from "../CustomDeviceRequest";
import { RequestDecisionModal } from "./RequestDecisionModal";
import { RequestDetailsCard } from "./RequestDetailsCard";
import { RequestRejectModal } from "./RequestRejectModal";
import { RequestStatusBanner } from "./RequestStatusBanner";
import { RequestedDevicesCard } from "./RequestedDevicesCard";
import { StatusBadge } from "./StatusBadge";
import { VendorNoteCard } from "./VendorNoteCard";

function getAvailableSelection(request: CustomDeviceRequest) {
  return request.devices.reduce((selected, device, index) => {
    if (device.vendorResponse?.type !== "unavailable") {
      selected.add(index);
    }
    return selected;
  }, new Set<number>());
}

function RFQDetailsSidebar({
  isOpen,
  onAccept,
  onClose,
  onDecline,
  request,
}: {
  isOpen: boolean;
  onAccept: (id: string, itemCount: number) => void;
  onClose: () => void;
  onDecline: (id: string) => void;
  request: CustomDeviceRequest;
}) {
  const [expandedDevice, setExpandedDevice] = useState<number | null>(null);
  const [otherReason, setOtherReason] = useState("");
  const [selectedDevices, setSelectedDevices] = useState<Set<number>>(() => getAvailableSelection(request));
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const vendorTotal = request.devices.reduce(
    (sum, device) =>
      device.vendorResponse?.type === "quoted" && device.vendorResponse.quotedPrice
        ? sum + device.vendorResponse.quotedPrice * device.quantity
        : device.vendorResponse?.type === "alternative" && device.vendorResponse.alternative
          ? sum + device.vendorResponse.alternative.price * device.quantity
          : sum,
    0,
  );
  const hasUnavailableItems = request.devices.some((device) => device.vendorResponse?.type === "unavailable");

  return (
    <>
      <SlideoutMenu isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
        <SlideoutMenu.Header onClose={onClose}>
          <div className="flex items-start gap-4 pr-8">
            <div className="flex size-10 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
              <ShoppingBag01 className="size-5 text-fg-quaternary" />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <h2 className="text-xl font-semibold text-primary">Request #{request.id}</h2>
              <StatusBadge status={request.status} />
            </div>
          </div>
        </SlideoutMenu.Header>
        <SlideoutMenu.Content>
          <div className="flex flex-col gap-4 duration-300 ease-out animate-in fade-in slide-in-from-bottom-2">
            <RequestStatusBanner hasUnavailableItems={hasUnavailableItems} request={request} />
            <RequestedDevicesCard
              expandedDevice={expandedDevice}
              onToggleDevice={(index) => setExpandedDevice(expandedDevice === index ? null : index)}
              request={request}
              vendorTotal={vendorTotal}
            />
            {request.status !== "pending" && request.vendorNote && <VendorNoteCard note={request.vendorNote} />}
            <RequestDetailsCard request={request} />
          </div>
        </SlideoutMenu.Content>
        <SlideoutMenu.Footer>
          {request.status === "waiting_for_action" ? (
            <div className="flex gap-3">
              <Button size="lg" color="secondary" className="flex-1" onClick={() => setShowRejectModal(true)}>
                Reject Quote
              </Button>
              <Button size="lg" color="primary" className="flex-1" onClick={() => setShowConfirmModal(true)}>
                Confirm Order
              </Button>
            </div>
          ) : (
            <Button size="lg" color="secondary" className="w-full" onClick={onClose}>
              Close
            </Button>
          )}
        </SlideoutMenu.Footer>
      </SlideoutMenu>
      <RequestDecisionModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          onAccept(request.id, selectedDevices.size);
          onClose();
        }}
        request={request}
        selectedDevices={selectedDevices}
        setSelectedDevices={setSelectedDevices}
      />
      <RequestRejectModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={() => {
          setShowRejectModal(false);
          onDecline(request.id);
          onClose();
        }}
        otherReason={otherReason}
        requestId={request.id}
        setOtherReason={setOtherReason}
      />
    </>
  );
}

export { RFQDetailsSidebar };
