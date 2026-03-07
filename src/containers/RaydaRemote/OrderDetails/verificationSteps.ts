/* eslint-disable */
// @ts-nocheck
import { ClipboardCheck, Mail01, ShieldTick, Truck01 } from "@untitledui/icons";
import { VerifStep } from "./VerifStep";

const verificationSteps: VerifStep[] = [
  { icon: Mail01, label: "Verification email sent", desc: "Secure link sent to employee's email", done: true },
  { icon: ClipboardCheck, label: "Delivery info confirmed", desc: "Employee verified address & phone", done: false },
  { icon: ShieldTick, label: "Documents verified", desc: "Identity & delivery docs approved", done: false },
  { icon: Truck01, label: "Ready to ship", desc: "Order dispatched to fulfilment", done: false },
];
export { verificationSteps };
