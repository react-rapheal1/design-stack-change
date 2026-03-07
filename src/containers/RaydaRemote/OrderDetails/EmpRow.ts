/* eslint-disable */
// @ts-nocheck
import { EmpStatus } from "./EmpStatus";
import { SigStatus } from "./SigStatus";

interface EmpRow {
  id: string;
  initials: string;
  name: string;
  email: string;
  role: string;
  address: string;
  amount: string;
  status: EmpStatus;
  signature: SigStatus;
  adminAddressVerified: boolean;
}
export { EmpRow };
