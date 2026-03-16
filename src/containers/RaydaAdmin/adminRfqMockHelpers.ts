import { companyNames, countries, deviceTemplates, vendors } from "./adminRfqConstants";
import { buildDeviceResponses } from "./adminRfqMockDeviceResponses";
import { mockStatuses, vendorNoteOptions } from "./adminRfqMockConstants";
import { mockExchangeRates } from "./adminRfqMockRates";
import type { CurationData, RFQ, RFQDevice, RFQStatus, VendorResponse } from "./adminRfqTypes";
import { countryToCurrency, customerCurrencyForCountry } from "./RFQManagementDetail/utils/currencyMappings";

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function buildDevices(index: number, random: () => number): RFQDevice[] {
  const deviceCount = Math.floor(random() * 4) + 1;
  const budgetPattern = index % 10;

  return Array.from({ length: deviceCount }, (_, deviceIndex) => {
    const template = deviceTemplates[Math.floor(random() * deviceTemplates.length)];
    const quantity = Math.floor(random() * 5) + 1;
    const device: RFQDevice = { name: template.name, quantity, assetType: template.assetType };

    if (budgetPattern >= 6 || (budgetPattern === 5 && deviceIndex === 0)) {
      device.unitBudget = template.basePrice;
    }

    return device;
  });
}

function buildVendorResponses(devices: RFQDevice[], index: number, createdDate: Date, random: () => number, status: RFQStatus, rfqCountry: string): VendorResponse[] {
  if (status === "pending_vendors") return [];

  const manyVendors = index % 5 === 2;
  const count = manyVendors ? Math.floor(random() * 5) + 6 : Math.floor(random() * 3) + 1;
  const usedNames = new Set<string>();
  const currency = countryToCurrency[rfqCountry] ?? "USD";
  const fxRate = mockExchangeRates[currency];

  return Array.from({ length: count }, (_, vendorIndex) => {
    const vendor = vendors[vendorIndex % vendors.length];
    let vendorName = vendor.name;
    if (usedNames.has(vendorName)) vendorName = `${vendorName} (${Math.floor(vendorIndex / vendors.length) + 1})`;
    usedNames.add(vendorName);

    const deviceResponses = buildDeviceResponses(devices, random, fxRate);
    const totalPrice = deviceResponses.reduce(
      (sum, response, di) => sum + ((response.type === "quoted" ? response.quotedPrice : response.alternativePrice) ?? 0) * devices[di].quantity,
      0,
    );
    const respondedAt = new Date(createdDate.getTime() + (2 + Math.floor(random() * 22)) * 3600000 + Math.floor(random() * 60) * 60000).toISOString();

    return {
      currency,
      vendorId: `vendor-${vendorIndex + 1}-${index}`,
      vendorName,
      deviceResponses,
      totalPrice,
      respondedAt,
      vendorNote: random() < 0.65 ? vendorNoteOptions[Math.floor(random() * vendorNoteOptions.length)] : undefined,
    };
  });
}

function applyOutcomeData(rfq: RFQ, random: () => number) {
  if (!["response_sent", "fully_accepted", "partially_accepted", "customer_rejected", "expired"].includes(rfq.status) || rfq.vendorResponses.length === 0) {
    return rfq;
  }

  const selectedVendor = rfq.vendorResponses[0];
  const vendorCur = selectedVendor.currency;
  const customerCur = rfq.customerCurrency;
  const fxRate = mockExchangeRates[customerCur] / mockExchangeRates[vendorCur];

  const curation: CurationData = {
    selectedVendorId: selectedVendor.vendorId,
    vendorCurrency: vendorCur,
    customerCurrency: customerCur,
    exchangeRate: fxRate,
    devicePricing: rfq.devices.map((_, index) => {
      const response = selectedVendor.deviceResponses[index];
      const vendorPrice = response.type === "quoted" ? response.quotedPrice! : response.type === "alternative" ? response.alternativePrice! : 0;
      const converted = Math.round(vendorPrice * fxRate);
      return { mode: "markup" as const, markupPercent: 10, fixedPrice: Math.round(converted * 1.1), isUnavailable: response.type === "unavailable" };
    }),
    notes: selectedVendor.vendorNote ?? "",
  };

  rfq.curation = curation;
  rfq.sentAt = new Date(
    Math.max(...rfq.vendorResponses.map((r) => new Date(r.respondedAt).getTime())) + (1 + Math.floor(random() * 3)) * 3600000 + Math.floor(random() * 60) * 60000,
  ).toISOString();
  if (rfq.status === "fully_accepted") rfq.acceptedDevices = rfq.devices.map(() => true);
  if (rfq.status === "partially_accepted")
    rfq.acceptedDevices = rfq.devices.map((_, i) => (i === 0 ? true : i === rfq.devices.length - 1 && rfq.devices.length > 1 ? false : random() > 0.4));
  if (rfq.status === "customer_rejected")
    rfq.rejectionReason = ["Price is too high", "Found an alternative", "No longer needed", "Price is too high", "Found an alternative", "No longer needed", "Other: Management decided to defer all hardware purchases until Q3."][parseInt(rfq.id.slice(-1), 10) % 7];
  if (rfq.status === "fully_accepted") rfq.customerDecision = "fully_accepted";
  if (rfq.status === "partially_accepted") rfq.customerDecision = "partially_accepted";
  if (rfq.status === "customer_rejected") rfq.customerDecision = "rejected";

  return rfq;
}

function buildBaseRfq(index: number, random: () => number): RFQ {
  const devices = buildDevices(index, random);
  const status = mockStatuses[Math.floor(random() * mockStatuses.length)];
  const createdDate = new Date(2026, 1, Math.floor(random() * 20) + 1, Math.floor(random() * 14) + 7, Math.floor(random() * 60));
  const country = countries[Math.floor(random() * countries.length)];

  return {
    id: `RFQ-${String(26700 + index).padStart(5, "0")}`,
    company: companyNames[Math.floor(random() * companyNames.length)],
    devices,
    country,
    customerCurrency: customerCurrencyForCountry(country),
    budget: devices.reduce((sum, device) => sum + (device.unitBudget ?? 0) * device.quantity, 0),
    status,
    createdAt: createdDate.toISOString(),
    vendorResponses: buildVendorResponses(devices, index, createdDate, random, status, country),
  };
}

export { applyOutcomeData, buildBaseRfq, seededRandom };
