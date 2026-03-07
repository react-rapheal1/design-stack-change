/* eslint-disable */
// @ts-nocheck
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { OrderType } from "./data";

function OrderTypeBadge({ type }: { type: OrderType }) {
  const tooltips: Record<OrderType, string> = {
    onboarding: "Equipment is being set up and delivered to a new or existing employee.",
    "off-boarding": "Equipment is being collected and returned from a departing employee.",
  };
  const label = type === "onboarding" ? "Onboarding" : "Off-boarding";
  const style = type === "onboarding" ? "border-[#079455] text-[#067647]" : "border-[#535862] text-[#414651]";
  return (
    <Tooltip title={tooltips[type]} placement="top">
      {" "}
      <TooltipTrigger>
        {" "}
        <span className={`inline-flex cursor-default items-center rounded-full border-[1.5px] px-2 py-0.5 text-xs font-medium ${style}`}> {label} </span>{" "}
      </TooltipTrigger>{" "}
    </Tooltip>
  );
}
export { OrderTypeBadge };
