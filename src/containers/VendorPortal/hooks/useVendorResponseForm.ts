import { useState } from "react";
import { AlternativeSource } from "../AlternativeSource";
import { DeviceResponseState } from "../DeviceResponseState";
import { RFQDevice } from "../RFQDevice";
import { ResponseType } from "../ResponseType";

const createDefaultResponses = (devices: RFQDevice[]) =>
  devices.map((device) => ({
    alternativeSource: "catalog" as AlternativeSource,
    manualDeviceName: "",
    manualDevicePrice: "",
    manualDeviceSpecs: "",
    quotePrice: device.unitPrice ? device.unitPrice.toString() : "",
    responseType: "quote" as ResponseType,
    selectedCatalogDevice: null,
    unavailableReason: "",
  }));

function useVendorResponseForm({ devices, onClose }: { devices: RFQDevice[]; onClose: () => void }) {
  const [expandedDevice, setExpandedDevice] = useState<number | null>(0);
  const [responses, setResponses] = useState<DeviceResponseState[]>(() => createDefaultResponses(devices));
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [vendorNote, setVendorNote] = useState("");

  const updateResponse = (index: number, updates: Partial<DeviceResponseState>) => {
    setResponses((prev) => prev.map((response, currentIndex) => (currentIndex === index ? { ...response, ...updates } : response)));
  };

  const calculateTotal = () =>
    devices.reduce((sum, device, index) => {
      const response = responses[index];
      if (response.responseType === "unavailable") return sum;
      if (response.responseType === "quote") return sum + (parseFloat(response.quotePrice) || 0) * device.quantity;
      if (response.alternativeSource === "catalog" && response.selectedCatalogDevice) return sum + response.selectedCatalogDevice.price * device.quantity;
      return sum + (parseFloat(response.manualDevicePrice) || 0) * device.quantity;
    }, 0);

  const isFormValid = () =>
    responses.every((response) => {
      if (response.responseType === "quote") return !!response.quotePrice && parseFloat(response.quotePrice) > 0;
      if (response.responseType === "unavailable") return true;
      if (response.alternativeSource === "catalog") return response.selectedCatalogDevice !== null;
      return (
        !!response.manualDeviceName.trim() && !!response.manualDeviceSpecs.trim() && !!response.manualDevicePrice && parseFloat(response.manualDevicePrice) > 0
      );
    });

  const handleClose = () => {
    setResponses(createDefaultResponses(devices));
    setExpandedDevice(0);
    setShowConfirmModal(false);
    setVendorNote("");
    onClose();
  };

  return {
    calculateTotal,
    expandedDevice,
    handleClose,
    isFormValid,
    responses,
    setExpandedDevice,
    setShowConfirmModal,
    setVendorNote,
    showConfirmModal,
    updateResponse,
    vendorNote,
  };
}

export { useVendorResponseForm };
