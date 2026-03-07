"use client";

import { useCallback, useState } from "react";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { CustomRequestForm } from "./CustomRequestForm";
import { CustomRequestSuccess } from "./CustomRequestSuccess";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { createEmptyDevice, isDeviceFilled } from "./data";
import type { DeviceEntry } from "./data";

function CustomDeviceRequestModal({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (isOpen: boolean) => void }) {
  const [devices, setDevices] = useState<DeviceEntry[]>([createEmptyDevice("1")]);
  const [nextId, setNextId] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [skipDeleteConfirm, setSkipDeleteConfirm] = useState(false);

  const isFormValid = devices.every(isDeviceFilled);
  const totalBudget = devices.reduce((sum, device) => sum + (parseInt(device.budgetPrice, 10) || 0) * (parseInt(device.quantity, 10) || 0), 0);

  const handleAddDevice = useCallback(() => {
    setDevices((prev) => [...prev, createEmptyDevice(String(nextId))]);
    setNextId((prev) => prev + 1);
  }, [nextId]);

  const handleUpdateDevice = useCallback((id: string, updated: DeviceEntry) => {
    setDevices((prev) => prev.map((device) => (device.id === id ? updated : device)));
  }, []);

  const handleRequestDelete = useCallback(
    (id: string) => {
      if (skipDeleteConfirm) {
        setDevices((prev) => prev.filter((device) => device.id !== id));
        return;
      }
      setDeleteTargetId(id);
    },
    [skipDeleteConfirm],
  );

  function handleClose() {
    onOpenChange(false);
    setDevices([createEmptyDevice("1")]);
    setNextId(2);
    setSubmitted(false);
  }

  return (
    <>
      <ModalOverlay
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <Modal className="max-w-[560px]">
          <Dialog>
            {({ close }) =>
              submitted ? (
                <CustomRequestSuccess onClose={handleClose} />
              ) : (
                <CustomRequestForm
                  devices={devices}
                  isFormValid={isFormValid}
                  totalBudget={totalBudget}
                  onAddDevice={handleAddDevice}
                  onClose={close}
                  onDeleteDevice={handleRequestDelete}
                  onSubmit={() => setSubmitted(true)}
                  onUpdateDevice={handleUpdateDevice}
                />
              )
            }
          </Dialog>
        </Modal>
      </ModalOverlay>
      <DeleteConfirmDialog
        isOpen={deleteTargetId !== null}
        onConfirm={() => {
          if (!deleteTargetId) return;
          setDevices((prev) => prev.filter((device) => device.id !== deleteTargetId));
          setDeleteTargetId(null);
        }}
        onCancel={() => setDeleteTargetId(null)}
        skipConfirm={skipDeleteConfirm}
        onSkipConfirmChange={setSkipDeleteConfirm}
      />
    </>
  );
}

export { CustomDeviceRequestModal };
