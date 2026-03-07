/* eslint-disable */
// @ts-nocheck
import { DeviceAddOn } from "./DeviceAddOn";
import { DeviceSpec } from "./DeviceSpec";

interface Device {
  name: string;
  image?: string;
  color?: string;
  price?: string;
  quantity?: number;
  specs?: DeviceSpec;
  addOns?: DeviceAddOn[];
}
export { Device };
