import { DeviceResponseState } from "./DeviceResponseState";

type VendorResponseUpdate = (index: number, updates: Partial<DeviceResponseState>) => void;

export type { VendorResponseUpdate };
