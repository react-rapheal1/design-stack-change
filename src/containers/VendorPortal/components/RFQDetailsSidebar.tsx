import { useState } from "react";
import { ShoppingBag01 } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { RFQ } from "../RFQ";
import { DeclineRFQModal } from "./DeclineRFQModal";
import { RFQDevicesCard } from "./RFQDevicesCard";
import { RFQMetadataCard } from "./RFQMetadataCard";
import { RespondToBudgetModal } from "./RespondToBudgetModal";

function RFQDetailsSidebar({
  isOpen,
  onClose,
  onDecline,
  onRespond,
  rfq,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDecline: (rfqId: string) => void;
  onRespond: (rfqId: string) => void;
  rfq: RFQ | null;
}) {
  const [expandedDevice, setExpandedDevice] = useState<number | null>(null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showRespondModal, setShowRespondModal] = useState(false);
  if (!rfq) return null;

  return (
    <>
      <SlideoutMenu isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
        <SlideoutMenu.Header onClose={onClose}>
          <div className="flex items-start gap-4">
            <div className="flex size-10 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
              <ShoppingBag01 className="size-5 text-fg-quaternary" />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <h2 className="text-xl font-semibold text-primary">RFQ #{rfq.id}</h2>
            </div>
          </div>
        </SlideoutMenu.Header>
        <SlideoutMenu.Content>
          <div className="flex flex-col gap-4">
            <RFQDevicesCard expandedDevice={expandedDevice} onToggleDevice={(index) => setExpandedDevice(expandedDevice === index ? null : index)} rfq={rfq} />
            <RFQMetadataCard rfq={rfq} />
          </div>
        </SlideoutMenu.Content>
        <SlideoutMenu.Footer>
          <div className="flex gap-3">
            <Button size="lg" color="secondary" className="flex-1" onClick={() => setShowDeclineModal(true)}>
              Decline RFQ
            </Button>
            <Button size="lg" color="primary" className="flex-1" onClick={() => setShowRespondModal(true)}>
              Respond
            </Button>
          </div>
        </SlideoutMenu.Footer>
      </SlideoutMenu>
      {showRespondModal && (
        <RespondToBudgetModal
          key={rfq.id}
          isOpen
          onClose={() => setShowRespondModal(false)}
          onSubmit={() => {
            onRespond(rfq.id);
            onClose();
          }}
          devices={rfq.devices}
          rfqId={rfq.id}
        />
      )}
      <DeclineRFQModal
        isOpen={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        onConfirm={() => {
          setShowDeclineModal(false);
          onDecline(rfq.id);
          onClose();
        }}
        rfqId={rfq.id}
      />
    </>
  );
}

export { RFQDetailsSidebar };
