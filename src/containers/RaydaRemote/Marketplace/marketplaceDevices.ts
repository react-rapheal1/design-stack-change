interface DeviceEntry {
  id: string;
  deviceName: string;
  assetType: string | null;
  quantity: string;
  budgetPrice: string;
  description: string;
}

function createEmptyDevice(id: string): DeviceEntry {
  return { id, deviceName: "", assetType: null, quantity: "", budgetPrice: "", description: "" };
}

function isDeviceFilled(device: DeviceEntry): boolean {
  return device.deviceName.trim() !== "" && device.assetType !== null && device.quantity.trim() !== "" && device.description.trim() !== "";
}

export { createEmptyDevice, isDeviceFilled };
export type { DeviceEntry };
