/* eslint-disable */
// @ts-nocheck
import { RFQDevice } from "./RFQDevice";

interface RFQ {
  id: string;
  devices: RFQDevice[];
  country: string;
  deliveryAddress: string;
  dueDate: string;
  createdAt: string;
  budget?: string;
  notes?: string;
}
export { RFQ };
