/* eslint-disable */
// @ts-nocheck
import { CatalogDevice } from "./CatalogDevice";

interface DeviceResponse {
  deviceIndex: number;
  responseType: "quote" | "alternative";
  quotePrice?: number;
  alternativeDevice?: CatalogDevice | null;
  manualDevice?: { name: string; price: number; specs: string };
}
export { DeviceResponse };
