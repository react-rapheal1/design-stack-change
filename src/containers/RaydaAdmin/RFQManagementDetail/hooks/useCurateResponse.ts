"use client";

import { useState } from "react";

import type { CurationData, CurationDevicePricing, CurrencyCode, CustomerCurrencyCode, RFQ } from "../../shared";
import { useExchangeRates } from "./useExchangeRates";

function createInitialPricing(rfq: RFQ | null, vendorId: string, fxRate: number): CurationDevicePricing[] {
  const vendor = rfq?.vendorResponses.find((item) => item.vendorId === vendorId);
  if (!rfq || !vendor) return [];
  if (rfq.curation?.selectedVendorId === vendorId) return rfq.curation.devicePricing;

  return rfq.devices.map((_, index) => {
    const response = vendor.deviceResponses[index];
    const vendorPrice = response.type === "quoted" ? response.quotedPrice! : response.type === "alternative" ? response.alternativePrice! : 0;
    const converted = Math.round(vendorPrice * fxRate);
    return { mode: "markup" as const, markupPercent: 10, fixedPrice: Math.round(converted * 1.1), isUnavailable: response.type === "unavailable" };
  });
}

function createInitialNotes(rfq: RFQ | null, vendorId: string) {
  const vendor = rfq?.vendorResponses.find((item) => item.vendorId === vendorId);
  if (!rfq || !vendor) return "";
  return rfq.curation?.selectedVendorId === vendorId ? rfq.curation.notes : (vendor.vendorNote ?? "");
}

function useCurateResponse({ rfq, vendorId }: { rfq: RFQ | null; vendorId: string }) {
  const vendor = rfq?.vendorResponses.find((item) => item.vendorId === vendorId);
  const vendorCurrency: CurrencyCode = vendor?.currency ?? "USD";
  const customerCurrency: CustomerCurrencyCode = rfq?.customerCurrency ?? "USD";
  const { loading: ratesLoading, rates } = useExchangeRates(vendorCurrency);

  const fxRate = rates && vendorCurrency !== customerCurrency ? (rates[customerCurrency] ?? 1) : 1;

  const [devicePricing, setDevicePricing] = useState<CurationDevicePricing[]>(() => createInitialPricing(rfq, vendorId, fxRate));
  const [hasChanges, setHasChanges] = useState(false);
  const [notes, setNotes] = useState(() => createInitialNotes(rfq, vendorId));
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const updatePricing = (index: number, updates: Partial<CurationDevicePricing>) => {
    setHasChanges(true);
    setDevicePricing((prev) => prev.map((p, i) => (i === index ? { ...p, ...updates } : p)));
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
    const converted = Math.round(getVendorPrice(index) * fxRate);
    return Math.round(converted * (1 + pricing.markupPercent / 100));
  };

  const getEffectiveMarkup = (index: number) => {
    const vendorPrice = getVendorPrice(index);
    const pricing = devicePricing[index];
    if (!pricing || pricing.isUnavailable || vendorPrice === 0) return 0;
    if (pricing.mode === "fixed") {
      const converted = Math.round(vendorPrice * fxRate);
      return converted > 0 ? Math.round(((pricing.fixedPrice - converted) / converted) * 100) : 0;
    }
    return pricing.markupPercent;
  };

  const vendorCostTotal = rfq?.devices.reduce((s, d, i) => (devicePricing[i]?.isUnavailable ? s : s + getVendorPrice(i) * d.quantity), 0) ?? 0;
  const customerPriceTotal = rfq?.devices.reduce((s, d, i) => (devicePricing[i]?.isUnavailable ? s : s + getCustomerPrice(i) * d.quantity), 0) ?? 0;
  const customerBudgetTotal = rfq?.devices.reduce((s, d, i) => (devicePricing[i]?.isUnavailable ? s : s + (d.unitBudget ?? 0) * d.quantity), 0) ?? 0;
  const vendorCostConverted = Math.round(vendorCostTotal * fxRate);
  const totalMarkup = customerPriceTotal - vendorCostConverted;

  const curation: CurationData = {
    devicePricing,
    notes,
    selectedVendorId: vendorId,
    vendorCurrency,
    customerCurrency,
    exchangeRate: fxRate,
  };

  return {
    curation,
    customerBudgetTotal,
    customerCurrency,
    customerPriceTotal,
    devicePricing,
    exchangeRate: fxRate,
    getCustomerPrice,
    getEffectiveMarkup,
    getVendorPrice,
    hasChanges,
    notes,
    quotedDeviceCount: devicePricing.filter((p) => !p.isUnavailable).length,
    ratesLoading,
    setHasChanges,
    setNotes,
    setShowConfirmModal,
    setShowDiscardModal,
    showConfirmModal,
    showDiscardModal,
    totalMarkup,
    totalMarkupPercent: vendorCostConverted > 0 ? ((totalMarkup / vendorCostConverted) * 100).toFixed(1) : "0.0",
    updatePricing,
    vendor,
    vendorCostConverted,
    vendorCostTotal,
    vendorCurrency,
  };
}

export { useCurateResponse };
