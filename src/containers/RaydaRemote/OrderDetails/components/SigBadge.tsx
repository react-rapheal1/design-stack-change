/* eslint-disable */
// @ts-nocheck
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { SigStatus } from "../SigStatus";

function SigBadge({ sig }: { sig: SigStatus }) {
  const tooltip = sig === "required" ? "A recipient signature is required upon delivery." : "No signature needed — items will be left at the address.";
  const config: Record<SigStatus, { label: string; style: string }> = {
    "not-required": { label: "Not required", style: "bg-[#fafafa] text-[#414651] ring-[#e9eaeb]" },
    required: { label: "Signature required", style: "bg-[#e7f0ff] text-[#0948b5] ring-[#8fb9ff]" },
  };
  const { label, style } = config[sig];
  return (
    <Tooltip title={tooltip} placement="top">
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
export { SigBadge };
