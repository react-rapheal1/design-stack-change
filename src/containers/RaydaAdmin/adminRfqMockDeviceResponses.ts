import { deviceTemplates } from "./adminRfqConstants";
import type { DeviceResponseType, RFQDevice, VendorDeviceResponse } from "./adminRfqTypes";

function buildDeviceResponses(devices: RFQDevice[], random: () => number, fxRate: number): VendorDeviceResponse[] {
  return devices.map((device) => {
    const template = deviceTemplates.find((item) => item.name === device.name);
    const baseUsd = device.unitBudget ?? template?.basePrice ?? 1000;
    const referencePrice = Math.round(baseUsd * fxRate * (0.8 + random() * 0.4));
    const responseRoll = random();

    if (responseRoll < 0.7) {
      return { type: "quoted" as DeviceResponseType, quotedPrice: referencePrice };
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

export { buildDeviceResponses };
