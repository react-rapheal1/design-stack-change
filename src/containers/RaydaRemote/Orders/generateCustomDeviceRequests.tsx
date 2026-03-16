import { CustomDeviceRequest } from "./CustomDeviceRequest";
import { DeviceResponseType } from "./DeviceResponseType";
import { DeviceVendorResponse } from "./DeviceVendorResponse";
import { RFQDevice } from "./RFQDevice";
import { RequestStatus } from "./RequestStatus";
import { alternativeDevices } from "./alternativeDevices";
import { countries } from "./countries";
import { rfqDeviceTemplates } from "./rfqDeviceTemplates";

const vendorNotes = [
  "Lead time 2-3 weeks. Bulk discount available for 10+ units.",
  "Price valid for 30 days. Includes 1-year standard warranty.",
  "Ships from regional warehouse, delivery within 5 business days.",
  "Extended 3-year warranty available at additional cost.",
  "Currently running a promotion — price includes free setup.",
  "Limited stock, recommend confirming within 7 days.",
  "Includes on-site installation and configuration.",
  "Price reflects enterprise licensing. Volume pricing available.",
];

function generateCustomDeviceRequests(count: number): CustomDeviceRequest[] {
  const requests: CustomDeviceRequest[] = [];
  const statuses: RequestStatus[] = [
    "pending",
    "waiting_for_action",
    "confirmed",
    "rejected",
    "expired",
    "pending",
    "confirmed",
    "waiting_for_action",
    "pending",
    "confirmed",
  ];
  const baseId = 26700;
  const multipliers = [0.95, 0.92, 0.98, 0.9, 0.97, 0.93, 0.96, 0.91, 0.94, 0.99, 0.88, 0.89, 0.87, 0.96, 0.93];
  const responsePatterns: DeviceResponseType[][] = [
    ["quoted"],
    ["quoted", "quoted"],
    ["quoted", "alternative"],
    ["quoted", "unavailable"],
    ["alternative"],
    ["quoted", "quoted", "quoted"],
    ["quoted", "alternative", "quoted"],
    ["quoted", "quoted", "unavailable"],
  ];
  for (let i = 0; i < count; i++) {
    const numDevices = (i % 3) + 1;
    const devices: RFQDevice[] = [];
    const hasBudget = i % 3 !== 0;
    const status = statuses[i % statuses.length];
    const hasVendorResponse = status === "confirmed" || status === "waiting_for_action" || status === "expired" || status === "rejected";
    const responsePattern = responsePatterns[i % responsePatterns.length];
    for (let j = 0; j < numDevices; j++) {
      const template = rfqDeviceTemplates[(i + j * 3) % rfqDeviceTemplates.length];
      const quantity = (i % 5) + 1;
      const deviceHasBudget = hasBudget || (j === 0 && i % 4 !== 0);
      const unitPrice = deviceHasBudget ? template.basePrice + ((i * 50) % 500) : undefined;
      let vendorResponse: DeviceVendorResponse | undefined;
      if (hasVendorResponse) {
        const responseType = responsePattern[j % responsePattern.length];
        if (responseType === "quoted") {
          vendorResponse = {
            type: "quoted",
            quotedPrice: unitPrice ? Math.round(unitPrice * multipliers[(i + j) % multipliers.length]) : Math.round(template.basePrice * 0.95),
          };
        } else if (responseType === "alternative") {
          const alt = alternativeDevices[(i + j) % alternativeDevices.length];
          vendorResponse = { type: "alternative", alternative: alt };
        } else if (responseType === "unavailable") {
          vendorResponse = { type: "unavailable", unavailableReason: ["Out of stock", "Discontinued", "Not available in this region"][(i + j) % 3] };
        }
      }
      devices.push({
        name: template.name,
        quantity,
        unitPrice,
        assetType: template.assetType,
        description: `High-quality ${template.assetType.toLowerCase()} for professional use.`,
        vendorResponse,
      });
    }
    const requestBudget = devices.reduce((sum, d) => sum + (d.unitPrice || 0) * d.quantity, 0);
    let requiredBudget: number | undefined;
    if (hasVendorResponse) {
      requiredBudget = devices.reduce((sum, d) => {
        if (!d.vendorResponse) return sum;
        if (d.vendorResponse.type === "quoted" && d.vendorResponse.quotedPrice) {
          return sum + d.vendorResponse.quotedPrice * d.quantity;
        }
        if (d.vendorResponse.type === "alternative" && d.vendorResponse.alternative) {
          return sum + d.vendorResponse.alternative.price * d.quantity;
        }
        return sum;
      }, 0);
    }
    const dayOffset = i * 2;
    const createdAt = `Jan ${(dayOffset % 28) + 1}, 2025`;
    const expiresAt = `Jan ${((dayOffset + 5) % 28) + 1}, 2025`;
    requests.push({
      id: (baseId + i).toString(),
      devices,
      requestBudget,
      requiredBudget,
      country: countries[i % countries.length],
      status,
      createdAt,
      expiresAt,
      vendorNote: hasVendorResponse && i % 3 !== 0 ? vendorNotes[i % vendorNotes.length] : undefined,
    });
  }
  return requests;
}
export { generateCustomDeviceRequests };
