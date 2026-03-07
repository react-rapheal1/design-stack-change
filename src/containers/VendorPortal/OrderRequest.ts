/* eslint-disable */
// @ts-nocheck
import { Device } from "./Device";

interface OrderRequest {
  id: string;
  devices: Device[];
  service: string;
  amount: string;
  country: string;
  dueDate: string;
  sla: string;
  total: string;
  recipients: number;
  pickupDate?: string;
  storageDuration?: string;
}
export { OrderRequest };
