import type { CurationData, RFQ, VendorResponse } from "../../shared";

function getVendorUnitPrice(vendor: VendorResponse, index: number): number {
  const response = vendor.deviceResponses[index];
  if (!response) return 0;
  if (response.type === "quoted" && response.quotedPrice) return response.quotedPrice;
  if (response.type === "alternative" && response.alternativePrice) return response.alternativePrice;
  return 0;
}

function getAdminUnitPrice(curation: CurationData, vendor: VendorResponse, index: number): number {
  const pricing = curation.devicePricing[index];
  if (!pricing || pricing.isUnavailable) return 0;
  if (pricing.mode === "fixed") return pricing.fixedPrice;
  return Math.round(getVendorUnitPrice(vendor, index) * (1 + pricing.markupPercent / 100));
}

function computeCurationTotals(rfq: RFQ, curation: CurationData, vendor: VendorResponse) {
  let vendorTotal = 0;
  let adminTotal = 0;

  rfq.devices.forEach((device, index) => {
    if (curation.devicePricing[index]?.isUnavailable) return;
    vendorTotal += getVendorUnitPrice(vendor, index) * device.quantity;
    adminTotal += getAdminUnitPrice(curation, vendor, index) * device.quantity;
  });

  const totalMarkup = adminTotal - vendorTotal;
  const markupPercent = vendorTotal > 0 ? ((totalMarkup / vendorTotal) * 100).toFixed(1) : "0.0";

  return { vendorTotal, adminTotal, totalMarkup, markupPercent };
}

export { computeCurationTotals, getAdminUnitPrice, getVendorUnitPrice };
