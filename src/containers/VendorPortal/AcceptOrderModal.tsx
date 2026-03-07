/* eslint-disable */
// @ts-nocheck
import { CheckCircle, XClose } from "@untitledui/icons";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";

function AcceptOrderModal({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) {
  if (!isOpen) return null;
  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      {" "}
      <Modal className="max-w-[400px]">
        {" "}
        <Dialog>
          {" "}
          <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
            {" "}
            {}{" "}
            <button type="button" onClick={onClose} className="absolute top-4 right-4 rounded-lg p-2 transition-colors hover:bg-[#fafafa]">
              {" "}
              <XClose className="size-5 text-[#535862]" />{" "}
            </button>{" "}
            {}{" "}
            <div className="flex flex-col gap-4 px-6 pt-6">
              {" "}
              {}{" "}
              <div className="flex size-12 items-center justify-center rounded-full bg-[#dcfae6] duration-300 animate-in zoom-in-50">
                {" "}
                <CheckCircle className="size-6 text-[#17b26a]" />{" "}
              </div>{" "}
              {}{" "}
              <div className="flex flex-col gap-1">
                {" "}
                <h3 className="text-lg font-semibold text-[#181d27]"> Are you sure you want to accept this order? </h3>{" "}
                <p className="text-sm text-[#535862]">
                  {" "}
                  Accepting this order means you are able to fulfil the items in the order according to the specification and add-on-request within your
                  pre-defined SLA.{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            {}{" "}
            <div className="flex gap-3 px-6 pt-8 pb-6">
              {" "}
              <Button size="lg" color="secondary" className="flex-1" onClick={onClose}>
                {" "}
                Cancel{" "}
              </Button>{" "}
              <Button size="lg" color="primary" className="flex-1" onClick={onConfirm}>
                {" "}
                Confirm{" "}
              </Button>{" "}
            </div>{" "}
          </div>{" "}
        </Dialog>{" "}
      </Modal>{" "}
    </ModalOverlay>
  );
}
export { AcceptOrderModal };
