import { useState } from "react";
import { CurationData, CurationDevicePricing, RFQ } from "../../shared";

function createInitialPricing(rfq: RFQ | null, vendorId: string): CurationDevicePricing[] {
  const vendor = rfq?.vendorResponses.find((item) => item.vendorId === vendorId);
  if (!rfq || !vendor) return [];
  if (rfq.curation?.selectedVendorId === vendorId) return rfq.curation.devicePricing;

  return rfq.devices.map((_, index) => {
    const response = vendor.deviceResponses[index];
    const vendorPrice = response.type === "quoted" ? response.quotedPrice! : response.type === "alternative" ? response.alternativePrice! : 0;
    return { mode: "markup" as const, markupPercent: 10, fixedPrice: Math.round(vendorPrice * 1.1), isUnavailable: response.type === "unavailable" };
  });
}

function createInitialNotes(rfq: RFQ | null, vendorId: string) {
  const vendor = rfq?.vendorResponses.find((item) => item.vendorId === vendorId);
  if (!rfq || !vendor) return "";
  return rfq.curation?.selectedVendorId === vendorId ? rfq.curation.notes : (vendor.vendorNote ?? "");
}

function useCurateResponse({ rfq, vendorId }: { rfq: RFQ | null; vendorId: string }) {
  const [devicePricing, setDevicePricing] = useState<CurationDevicePricing[]>(() => createInitialPricing(rfq, vendorId));
  const [hasChanges, setHasChanges] = useState(false);
  const [notes, setNotes] = useState(() => createInitialNotes(rfq, vendorId));
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const vendor = rfq?.vendorResponses.find((item) => item.vendorId === vendorId);

  const updatePricing = (index: number, updates: Partial<CurationDevicePricing>) => {
    setHasChanges(true);
    setDevicePricing((prev) => prev.map((pricing, currentIndex) => (currentIndex === index ? { ...pricing, ...updates } : pricing)));
  };

  const getVendorPrice = (index: number) => {
    const response = vendor?.deviceResponses[index];
    if (!response) return 0;
    if (response.type === "quoted" && response.quotedPrice) return response.quotedPrice;
    if (response.type === "alternative" && response.alternativePrice) return response.alternativePrice;
    return 0;
  };

  const getCustomerPrice = (index: number) => {
    const pricing = devicePricing[index];
    if (!pricing || pricing.isUnavailable) return 0;
    if (pricing.mode === "fixed") return pricing.fixedPrice;
    return Math.round(getVendorPrice(index) * (1 + pricing.markupPercent / 100));
  };

  const getEffectiveMarkup = (index: number) => {
    const vendorPrice = getVendorPrice(index);
    const pricing = devicePricing[index];
    if (!pricing || pricing.isUnavailable || vendorPrice === 0) return 0;
    return pricing.mode === "fixed" ? Math.round(((pricing.fixedPrice - vendorPrice) / vendorPrice) * 100) : pricing.markupPercent;
  };

  const vendorCostTotal =
    rfq?.devices.reduce((sum, device, index) => (devicePricing[index]?.isUnavailable ? sum : sum + getVendorPrice(index) * device.quantity), 0) ?? 0;
  const customerPriceTotal =
    rfq?.devices.reduce((sum, device, index) => (devicePricing[index]?.isUnavailable ? sum : sum + getCustomerPrice(index) * device.quantity), 0) ?? 0;
  const totalMarkup = customerPriceTotal - vendorCostTotal;

  return {
    curation: { devicePricing, notes, selectedVendorId: vendorId } as CurationData,
    customerPriceTotal,
    devicePricing,
    getCustomerPrice,
    getEffectiveMarkup,
    getVendorPrice,
    hasChanges,
    notes,
    quotedDeviceCount: devicePricing.filter((pricing) => !pricing.isUnavailable).length,
    setHasChanges,
    setNotes,
    setShowConfirmModal,
    setShowDiscardModal,
    showConfirmModal,
    showDiscardModal,
    totalMarkup,
    totalMarkupPercent: vendorCostTotal > 0 ? ((totalMarkup / vendorCostTotal) * 100).toFixed(1) : "0.0",
    updatePricing,
    vendor,
    vendorCostTotal,
  };
}

export { useCurateResponse };
