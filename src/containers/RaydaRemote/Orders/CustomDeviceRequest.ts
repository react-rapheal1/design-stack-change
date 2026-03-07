/* eslint-disable */
// @ts-nocheck
import { RFQDevice } from "./RFQDevice";
import { RequestStatus } from "./RequestStatus";

interface CustomDeviceRequest {
  id: string;
  devices: RFQDevice[];
  requestBudget: number;
  requiredBudget?: number;
  country: string;
  status: RequestStatus;
  createdAt?: string;
  expiresAt?: string;
}
export { CustomDeviceRequest };
