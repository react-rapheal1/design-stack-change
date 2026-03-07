/* eslint-disable */
// @ts-nocheck
import { AlternativeDevice } from "./AlternativeDevice";
import { DeviceResponseType } from "./DeviceResponseType";

interface DeviceVendorResponse {
  type: DeviceResponseType;
  quotedPrice?: number;
  alternative?: AlternativeDevice;
  unavailableReason?: string;
}
export { DeviceVendorResponse };
