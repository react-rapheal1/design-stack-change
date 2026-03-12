import { companyNames, countries, deviceTemplates, vendorNames } from "./adminRfqConstants";
import { mockStatuses, vendorNoteOptions } from "./adminRfqMockConstants";
import type { CurationData, DeviceResponseType, RFQ, RFQDevice, RFQStatus, VendorDeviceResponse, VendorResponse } from "./adminRfqTypes";

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

function buildDeviceResponses(devices: RFQDevice[], random: () => number): VendorDeviceResponse[] {
  return devices.map((device) => {
    const template = deviceTemplates.find((item) => item.name === device.name);
    const referencePrice = device.unitBudget ?? template?.basePrice ?? 1000;
    const responseRoll = random();

    if (responseRoll < 0.7) {
      return { type: "quoted" as DeviceResponseType, quotedPrice: Math.round(referencePrice * (0.8 + random() * 0.4)) };
    }

    if (responseRoll < 0.9) {
      return {
        type: "alternative" as DeviceResponseType,
        alternativeName: device.name.replace("Pro", "Air").replace("Ultra", "Standard"),
        alternativePrice: Math.round(referencePrice * (0.6 + random() * 0.3)),
        alternativeSpecs:
          template?.specs?.replace("Pro", "").replace("i9", "i7").replace("32GB", "16GB").replace("1TB", "512GB").replace("256GB", "128GB").trim() ??
          "Standard configuration",
      };
    }

    return { type: "unavailable" as DeviceResponseType, unavailableReason: "Out of stock in region" };
  });
}

function buildVendorResponses(devices: RFQDevice[], index: number, createdDate: Date, random: () => number, status: RFQStatus): VendorResponse[] {
  if (status === "pending_vendors") return [];

  const manyVendors = index % 5 === 2;
  const count = manyVendors ? Math.floor(random() * 5) + 6 : Math.floor(random() * 3) + 1;
  const usedNames = new Set<string>();

  return Array.from({ length: count }, (_, vendorIndex) => {
    let vendorName = vendorNames[vendorIndex % vendorNames.length];
    if (usedNames.has(vendorName)) vendorName = `${vendorName} (${Math.floor(vendorIndex / vendorNames.length) + 1})`;
    usedNames.add(vendorName);

    const deviceResponses = buildDeviceResponses(devices, random);
    const totalPrice = deviceResponses.reduce(
      (sum, response, deviceIndex) =>
        sum + ((response.type === "quoted" ? response.quotedPrice : response.alternativePrice) ?? 0) * devices[deviceIndex].quantity,
      0,
    );
    const respondedAt = new Date(createdDate.getTime() + (2 + Math.floor(random() * 22)) * 3600000 + Math.floor(random() * 60) * 60000).toISOString();

    return {
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
  const curation: CurationData = {
    selectedVendorId: selectedVendor.vendorId,
    devicePricing: rfq.devices.map((_, index) => {
      const response = selectedVendor.deviceResponses[index];
      const vendorPrice = response.type === "quoted" ? response.quotedPrice! : response.type === "alternative" ? response.alternativePrice! : 0;
      return { mode: "markup" as const, markupPercent: 10, fixedPrice: Math.round(vendorPrice * 1.1), isUnavailable: response.type === "unavailable" };
    }),
    notes: selectedVendor.vendorNote ?? "",
  };

  rfq.curation = curation;
  rfq.sentAt = new Date(
    Math.max(...rfq.vendorResponses.map((response) => new Date(response.respondedAt).getTime())) +
      (1 + Math.floor(random() * 3)) * 3600000 +
      Math.floor(random() * 60) * 60000,
  ).toISOString();
  if (rfq.status === "fully_accepted") rfq.acceptedDevices = rfq.devices.map(() => true);
  if (rfq.status === "partially_accepted")
    rfq.acceptedDevices = rfq.devices.map((_, index) =>
      index === 0 ? true : index === rfq.devices.length - 1 && rfq.devices.length > 1 ? false : random() > 0.4,
    );
  if (rfq.status === "customer_rejected")
    rfq.rejectionReason = [
      "Price is too high",
      "Found an alternative",
      "No longer needed",
      "Price is too high",
      "Found an alternative",
      "No longer needed",
      "Other: Management decided to defer all hardware purchases until Q3.",
    ][parseInt(rfq.id.slice(-1), 10) % 7];
  if (rfq.status === "fully_accepted") rfq.customerDecision = "fully_accepted";
  if (rfq.status === "partially_accepted") rfq.customerDecision = "partially_accepted";
  if (rfq.status === "customer_rejected") rfq.customerDecision = "rejected";

  return rfq;
}

function buildBaseRfq(index: number, random: () => number): RFQ {
  const devices = buildDevices(index, random);
  const status = mockStatuses[Math.floor(random() * mockStatuses.length)];
  const createdDate = new Date(2026, 1, Math.floor(random() * 20) + 1, Math.floor(random() * 14) + 7, Math.floor(random() * 60));

  return {
    id: `RFQ-${String(26700 + index).padStart(5, "0")}`,
    company: companyNames[Math.floor(random() * companyNames.length)],
    devices,
    country: countries[Math.floor(random() * countries.length)],
    budget: devices.reduce((sum, device) => sum + (device.unitBudget ?? 0) * device.quantity, 0),
    status,
    createdAt: createdDate.toISOString(),
    vendorResponses: buildVendorResponses(devices, index, createdDate, random, status),
  };
}

export { applyOutcomeData, buildBaseRfq, seededRandom };
