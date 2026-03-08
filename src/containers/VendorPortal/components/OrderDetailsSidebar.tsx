import { useState } from "react";
import { Check, ShoppingBag01, XClose } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { OrderRequest } from "../OrderRequest";
import { AcceptOrderModal } from "./AcceptOrderModal";
import { DeclineOrderModal } from "./DeclineOrderModal";
import { OrderItemsCard } from "./OrderItemsCard";
import { OrderMetadataCard } from "./OrderMetadataCard";
import { ServiceBadge } from "./ServiceBadge";

function OrderDetailsSidebar({
  isOpen,
  onAccept,
  onClose,
  onDecline,
  order,
}: {
  isOpen: boolean;
  onAccept: (orderId: string) => void;
  onClose: () => void;
  onDecline: (orderId: string) => void;
  order: OrderRequest | null;
}) {
  const [expandedDevice, setExpandedDevice] = useState<number | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  if (!order) return null;

  return (
    <>
      <SlideoutMenu isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
        <SlideoutMenu.Header onClose={onClose}>
          <div className="flex items-start gap-4">
            <div className="flex size-10 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
              <ShoppingBag01 className="size-5 text-fg-quaternary" />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <h2 className="text-xl font-semibold text-primary">Incoming Order #{order.id}</h2>
              <ServiceBadge service={order.service} />
            </div>
          </div>
        </SlideoutMenu.Header>
        <SlideoutMenu.Content>
          <div className="flex flex-col gap-4">
            <OrderItemsCard
              expandedDevice={expandedDevice}
              onToggleDevice={(index) => setExpandedDevice(expandedDevice === index ? null : index)}
              order={order}
            />
            <OrderMetadataCard order={order} />
          </div>
        </SlideoutMenu.Content>
        <SlideoutMenu.Footer>
          <div className="flex gap-3">
            <Button size="lg" color="secondary" className="flex-1" iconLeading={XClose} onClick={() => setShowDeclineModal(true)}>
              Decline order
            </Button>
            <Button size="lg" color="primary" className="flex-1" iconLeading={Check} onClick={() => setShowAcceptModal(true)}>
              Accept order
            </Button>
          </div>
        </SlideoutMenu.Footer>
      </SlideoutMenu>
      <AcceptOrderModal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        onConfirm={() => {
          setShowAcceptModal(false);
          onAccept(order.id);
          onClose();
        }}
      />
      <DeclineOrderModal
        isOpen={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        onConfirm={() => {
          setShowDeclineModal(false);
          onDecline(order.id);
          onClose();
        }}
        orderId={order.id}
      />
    </>
  );
}

export { OrderDetailsSidebar };
