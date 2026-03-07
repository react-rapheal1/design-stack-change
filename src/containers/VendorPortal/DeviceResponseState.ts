/* eslint-disable */
// @ts-nocheck
import { AlternativeSource } from "./AlternativeSource";
import { CatalogDevice } from "./CatalogDevice";
import { ResponseType } from "./ResponseType";

interface DeviceResponseState {
  responseType: ResponseType;
  quotePrice: string;
  alternativeSource: AlternativeSource;
  selectedCatalogDevice: CatalogDevice | null;
  manualDeviceName: string;
  manualDevicePrice: string;
  manualDeviceSpecs: string;
  unavailableReason: string;
}
export { DeviceResponseState };
