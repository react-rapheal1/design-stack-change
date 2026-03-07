/* eslint-disable */
// @ts-nocheck
import { MOCK_NOW_MS } from "./MOCK_NOW_MS";
import { RFQ } from "./RFQ";
import { RFQDevice } from "./RFQDevice";
import { addresses } from "./addresses";
import { countries } from "./countries";
import { rfqDeviceTemplates } from "./rfqDeviceTemplates";
import { seededRandom } from "./seededRandom";

function generateRFQs(): RFQ[] {
  const rand = seededRandom(42);
  const rfqList: RFQ[] = [];
  for (let i = 0; i < 45; i++) {
    const deviceCount = Math.floor(rand() * 4) + 1;
    const devices: RFQDevice[] = [];
    const budgetPattern = i % 10;
    const noBudget = budgetPattern < 5;
    const partialBudget = budgetPattern === 5;
    for (let j = 0; j < deviceCount; j++) {
      const template = rfqDeviceTemplates[Math.floor(rand() * rfqDeviceTemplates.length)];
      const quantity = Math.floor(rand() * 5) + 1;
      const device: RFQDevice = {
        name: template.name,
        quantity,
        assetType: template.assetType,
        description: `${template.assetType} for professional use. Standard warranty and regional support included.`,
      };
      if (noBudget) {
      } else if (partialBudget) {
        if (j === 0) {
          device.unitPrice = template.basePrice;
        }
      } else {
        device.unitPrice = template.basePrice;
      }
      devices.push(device);
    }
    const country = countries[Math.floor(rand() * countries.length)];
    const day = Math.floor(rand() * 20) + 1;
    const dueDateDay = Math.floor(rand() * 28) + 1;
    const deadlineMod = i % 9;
    let hoursAgo: number;
    if (deadlineMod === 0) {
      hoursAgo = 25 + rand() * 23;
    } else if (deadlineMod === 1) {
      hoursAgo = 23.1 + rand() * 0.7;
    } else if (deadlineMod === 2) {
      hoursAgo = 18 + rand() * 5;
    } else {
      hoursAgo = rand() * 17;
    }
    const createdAtMs = MOCK_NOW_MS - Math.floor(hoursAgo * 60 * 60 * 1000);
    const rfq: RFQ = {
      id: `RFQ-${String(26700 + i).padStart(5, "0")}`,
      devices,
      country,
      deliveryAddress: addresses[i % addresses.length],
      dueDate: `Mar ${dueDateDay}, 2026`,
      createdAt: new Date(createdAtMs).toISOString(),
    };
    if (i % 4 === 0) {
      rfq.notes = `Priority request — need ${devices[0].assetType.toLowerCase()} deployment within 2 weeks.`;
    } else if (noBudget && i % 3 === 0) {
      rfq.notes = "No budget specified. Please quote your best price for bulk order.";
    }
    rfqList.push(rfq);
  }
  return rfqList;
}
export { generateRFQs };
