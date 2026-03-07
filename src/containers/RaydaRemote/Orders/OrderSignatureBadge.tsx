/* eslint-disable */
// @ts-nocheck
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { SignatureStatus } from "./data";

function OrderSignatureBadge({ sig }: { sig: SignatureStatus }) {
  const config: Record<SignatureStatus, { label: string; style: string }> = {
    "not-required": { label: "Not required", style: "bg-[#fafafa] text-[#414651] ring-[#e9eaeb]" },
    "partial-required": { label: "Partial required", style: "bg-[#f4f3ff] text-[#5925dc] ring-[#d9d6fe]" },
    required: { label: "Signature required", style: "bg-[#e7f0ff] text-[#0948b5] ring-[#8fb9ff]" },
  };
  const tooltips: Record<SignatureStatus, string> = {
    "not-required": "No signature is needed for delivery. Items will be left at the delivery address.",
    "partial-required": "Some items in this order require a signature, others do not.",
    required: "A recipient signature is required upon delivery for all items in this order.",
  };
  const { label, style } = config[sig];
  return (
    <Tooltip title={tooltips[sig]} placement="top">
      {" "}
      <TooltipTrigger>
        {" "}
        <span className={`inline-flex cursor-default items-center rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}>
          {" "}
          {label}{" "}
        </span>{" "}
      </TooltipTrigger>{" "}
    </Tooltip>
  );
}
export { OrderSignatureBadge };
