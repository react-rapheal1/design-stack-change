import type { CurationData, CurrencyCode, CustomerCurrencyCode, RFQ, VendorResponse } from "../../shared";

/** Returns the vendor unit price in vendor currency for a given device index. */
function getVendorUnitPrice(vendor: VendorResponse, index: number): number {
  const response = vendor.deviceResponses[index];
  if (!response) return 0;
  if (response.type === "quoted" && response.quotedPrice) return response.quotedPrice;
  if (response.type === "alternative" && response.alternativePrice) return response.alternativePrice;
  return 0;
}

/** Returns the admin unit price in customer currency for a given device index. */
function getAdminUnitPrice(curation: CurationData, vendor: VendorResponse, index: number): number {
  const pricing = curation.devicePricing[index];
  if (!pricing || pricing.isUnavailable) return 0;
  if (pricing.mode === "fixed") return pricing.fixedPrice;
  const vendorPrice = getVendorUnitPrice(vendor, index);
  const converted = Math.round(vendorPrice * curation.exchangeRate);
  return Math.round(converted * (1 + pricing.markupPercent / 100));
}

interface CurationTotals {
  adminTotal: number;
  customerCurrency: CustomerCurrencyCode;
  markupPercent: string;
  totalMarkup: number;
  vendorCurrency: CurrencyCode;
  vendorTotal: number;
  vendorTotalConverted: number;
}

function computeCurationTotals(rfq: RFQ, curation: CurationData, vendor: VendorResponse): CurationTotals {
  let vendorTotal = 0;
  let adminTotal = 0;

  rfq.devices.forEach((device, index) => {
    if (curation.devicePricing[index]?.isUnavailable) return;
    vendorTotal += getVendorUnitPrice(vendor, index) * device.quantity;
    adminTotal += getAdminUnitPrice(curation, vendor, index) * device.quantity;
  });

  const vendorTotalConverted = Math.round(vendorTotal * curation.exchangeRate);
  const totalMarkup = adminTotal - vendorTotalConverted;
  const markupPercent = vendorTotalConverted > 0 ? ((totalMarkup / vendorTotalConverted) * 100).toFixed(1) : "0.0";

  return {
    vendorTotal,
    vendorTotalConverted,
    adminTotal,
    totalMarkup,
    markupPercent,
    vendorCurrency: curation.vendorCurrency,
    customerCurrency: curation.customerCurrency,
  };
}

export type { CurationTotals };
export { computeCurationTotals, getAdminUnitPrice, getVendorUnitPrice };
