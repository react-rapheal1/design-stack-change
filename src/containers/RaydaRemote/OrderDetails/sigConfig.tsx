/* eslint-disable */
// @ts-nocheck
import { SignatureStatus } from "../Orders/data";

const sigConfig: Record<SignatureStatus, { label: string; style: string; tooltip: string; pill: boolean }> = {
  "not-required": {
    label: "Not required",
    style: "bg-[#fafafa] text-[#414651] ring-[#e9eaeb]",
    tooltip: "No signature needed — items will be left at the address.",
    pill: false,
  },
  "partial-required": {
    label: "Partial required",
    style: "bg-[#f4f3ff] text-[#5925dc] ring-[#d9d6fe]",
    tooltip: "Some items require a recipient signature, others do not.",
    pill: false,
  },
  required: {
    label: "Signature required",
    style: "bg-[#e7f0ff] text-[#0948b5] ring-[#8fb9ff]",
    tooltip: "A recipient signature is required upon delivery for all items.",
    pill: false,
  },
};
export { sigConfig };
