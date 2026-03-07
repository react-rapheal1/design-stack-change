/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import { XClose } from "@untitledui/icons";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { declineReasons } from "./declineReasons";

function DeclineOrderModal({ isOpen, onClose, onConfirm, orderId }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; orderId: string }) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");
  const isOthersSelected = selectedReason === "others";
  const isDeclineDisabled = !selectedReason || (isOthersSelected && !otherReason.trim());
  const handleClose = () => {
    setSelectedReason(null);
    setOtherReason("");
    onClose();
  };
  const handleConfirm = () => {
    setSelectedReason(null);
    setOtherReason("");
    onConfirm();
  };
  if (!isOpen) return null;
  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && handleClose()}>
      {" "}
      <Modal className="max-w-[400px]">
        {" "}
        <Dialog>
          {" "}
          <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
            {" "}
            {}{" "}
            <button type="button" onClick={handleClose} className="absolute top-4 right-4 rounded-lg p-2 transition-colors hover:bg-[#fafafa]">
              {" "}
              <XClose className="size-5 text-[#535862]" />{" "}
            </button>{" "}
            {}{" "}
            <div className="flex flex-col gap-4 px-6 pt-6">
              {" "}
              {}{" "}
              <div className="flex size-12 items-center justify-center rounded-full bg-[#fee4e2] duration-300 animate-in zoom-in-50">
                {" "}
                <XClose className="size-6 text-[#d92d20]" />{" "}
              </div>{" "}
              {}{" "}
              <div className="flex flex-col gap-1">
                {" "}
                <h3 className="text-lg font-semibold text-[#181d27]"> Decline order #{orderId} </h3>{" "}
                <p className="text-sm text-[#535862]">
                  {" "}
                  Would you like to decline this order? Please be aware that declining will prevent you from viewing this order again.{" "}
                </p>{" "}
              </div>{" "}
              {}{" "}
              <Select
                label="Reason for decline"
                placeholder="Select a reason"
                isRequired
                selectedKey={selectedReason}
                onSelectionChange={(key) => setSelectedReason(key as string)}
                items={declineReasons}
              >
                {" "}
                {(item) => <Select.Item key={item.id} id={item.id} label={item.label} />}{" "}
              </Select>{" "}
              {}{" "}
              {isOthersSelected && (
                <TextArea
                  label="Other reason"
                  placeholder="Why are you declining the order..."
                  isRequired
                  value={otherReason}
                  onChange={(value) => setOtherReason(value)}
                  rows={4}
                  className="duration-200 animate-in fade-in slide-in-from-top-2"
                />
              )}{" "}
            </div>{" "}
            {}{" "}
            <div className="flex gap-3 px-6 pt-8 pb-6">
              {" "}
              <Button size="lg" color="secondary" className="flex-1" onClick={handleClose}>
                {" "}
                Cancel{" "}
              </Button>{" "}
              <Button size="lg" color="primary-destructive" className="flex-1" onClick={handleConfirm} isDisabled={isDeclineDisabled}>
                {" "}
                Decline{" "}
              </Button>{" "}
            </div>{" "}
          </div>{" "}
        </Dialog>{" "}
      </Modal>{" "}
    </ModalOverlay>
  );
}
export { DeclineOrderModal };
