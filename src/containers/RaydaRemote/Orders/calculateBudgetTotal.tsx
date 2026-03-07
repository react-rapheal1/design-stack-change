/* eslint-disable */
// @ts-nocheck
import { CustomDeviceRequest } from "./CustomDeviceRequest";

function calculateBudgetTotal(request: CustomDeviceRequest): { total: number; isPartial: boolean } | null {
  const devicesWithPrice = request.devices.filter((device) => device.unitPrice !== undefined);
  if (devicesWithPrice.length === 0) return null;
  const total = devicesWithPrice.reduce((sum, device) => sum + device.quantity * (device.unitPrice ?? 0), 0);
  const isPartial = devicesWithPrice.length < request.devices.length;
  return { total, isPartial };
}
export { calculateBudgetTotal };
