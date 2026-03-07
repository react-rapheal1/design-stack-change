/* eslint-disable */
// @ts-nocheck
import { DeviceVendorResponse } from "./DeviceVendorResponse";

interface RFQDevice {
  name: string;
  quantity: number;
  unitPrice?: number;
  assetType: string;
  description?: string;
  vendorResponse?: DeviceVendorResponse;
}
export { RFQDevice };
