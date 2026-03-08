import { ShieldTick, X } from "@untitledui/icons";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { EmpRow } from "../EmpRow";
import { VerifyModalState } from "../VerifyModalState";

function VerifyAddressModal({
  employees,
  onClose,
  onConfirm,
  verifyModal,
}: {
  employees: EmpRow[];
  onClose: () => void;
  onConfirm: () => void;
  verifyModal: VerifyModalState;
}) {
  if (!verifyModal) return null;
  const displayEmployees =
    verifyModal.type === "bulk"
      ? employees.filter((employee) => employee.status === "verification-pending")
      : employees.filter((employee) => employee.id === verifyModal.empId);

  return (
    <ModalOverlay isOpen onOpenChange={(open) => !open && onClose()} isDismissable>
      <Modal className="sm:max-w-[480px]">
        <Dialog>
          <div className="w-full rounded-xl bg-white p-6 shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e7f0ff]">
                <ShieldTick className="size-5 text-[#0948b5]" />
              </div>
              <button
                type="button"
                onClick={onClose}
                className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-lg text-[#717680] hover:bg-[#f9fafb]"
              >
                <X className="size-5" />
              </button>
            </div>
            <p className="mt-4 text-lg font-semibold text-[#181d27]">{verifyModal.type === "bulk" ? "Verify all pending addresses" : "Verify address"}</p>
            <p className="mt-1 text-sm text-[#535862]">
              {verifyModal.type === "bulk"
                ? "You're about to verify the delivery addresses for all pending employees. This allows their orders to proceed immediately without waiting for employee confirmation."
                : "You're about to verify this employee's delivery address on their behalf. This allows the order to proceed without waiting for their confirmation."}
            </p>
            <div className={`mt-5 flex ${verifyModal.type === "bulk" ? "max-h-[260px] overflow-y-auto" : ""} flex-col gap-3`}>
              {displayEmployees.map((employee) => (
                <div key={employee.id} className="flex items-start gap-3 rounded-xl border border-[#eaecf0] p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7]">
                    <span className="text-sm font-medium text-[#475467]">{employee.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#181d27]">{employee.name}</p>
                    <p className="text-xs text-[#717680]">{employee.role}</p>
                    <p className="mt-1.5 text-sm text-[#535862]">{employee.address}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-[#d0d5dd] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#f9fafb]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="flex-1 rounded-lg bg-[#0b5de8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0948b5]"
              >
                {verifyModal.type === "bulk" ? "Verify all" : "Verify address"}
              </button>
            </div>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export { VerifyAddressModal };
