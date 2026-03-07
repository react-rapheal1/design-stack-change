/* eslint-disable */
// @ts-nocheck
import { Device } from "./Device";
import { OrderRequest } from "./OrderRequest";
import { countries } from "./countries";
import { deviceTemplates } from "./deviceTemplates";
import { services } from "./services";
import { slaOptions } from "./slaOptions";

function generateOrderRequests(count: number): OrderRequest[] {
  const orders: OrderRequest[] = [];
  const baseId = 26600;
  for (let i = 0; i < count; i++) {
    const service = services[i % 3];
    const numDevices = (i % 4) + 1;
    const devices: Device[] = [];
    for (let j = 0; j < numDevices; j++) {
      const template = deviceTemplates[(i + j) % deviceTemplates.length];
      const quantity = (j % 3) + 1;
      const price = service === "Onboarding" ? template.basePrice : 50 + ((i * 17) % 350);
      devices.push({
        name: template.name,
        image: template.image,
        color: template.color,
        price: `$${price.toLocaleString()}`,
        quantity,
        specs: { display: "Standard configuration", color: "Default" },
      });
    }
    const totalAmount = devices.reduce((sum, d) => sum + parseInt((d.price ?? "0").replace(/[^0-9]/g, "")) * (d.quantity ?? 1), 0);
    const country = countries[i % countries.length];
    const order: OrderRequest = {
      id: (baseId + i).toString(),
      devices,
      service,
      amount: `$${50 + ((i * 23) % 200)}.00`,
      country,
      dueDate: `Jan ${(i % 28) + 1}, 2025`,
      sla: slaOptions[i % slaOptions.length],
      total: `$${totalAmount.toLocaleString()}`,
      recipients: (i % 5) + 1,
    };
    if (service === "Offboarding") {
      order.pickupDate = `Jan ${((i + 5) % 28) + 1}, 2025`;
    } else if (service === "Storage") {
      order.storageDuration = `${(i % 6) + 1} months`;
    }
    orders.push(order);
  }
  return orders;
}
export { generateOrderRequests };
