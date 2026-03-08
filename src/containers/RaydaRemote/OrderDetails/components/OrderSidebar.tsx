/* eslint-disable */
// @ts-nocheck
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { countryMeta, orders } from "../../Orders/data";
import { employees } from "../employees";
import { sigConfig } from "../sigConfig";
import { statusConfig } from "../statusConfig";

function OrderSidebar({ order }: { order: (typeof orders)[number] }) {
  const { flag: Flag, name: countryName } = countryMeta[order.country];
  const sts = statusConfig[order.status];
  const StatusIcon = sts.icon;
  const sig = sigConfig[order.signature];
  return (
    <div className="w-64 shrink-0 rounded-xl border border-[#eaecf0] bg-white p-6 shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]">
      {" "}
      <div className="flex flex-col gap-5">
        {" "}
        {[
          { label: "Order date", value: order.date },
          { label: "Ordered by", value: order.orderedBy },
          { label: "Payment method", value: order.payment },
          { label: "Items count", value: `${order.employeeCount} items` },
          { label: "Total amount", value: order.total },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1">
            {" "}
            <p className="text-sm font-medium text-[#535862]">{label}</p> <p className="text-lg font-medium text-[#414651]">{value}</p>{" "}
          </div>
        ))}{" "}
        {}{" "}
        <div className="flex flex-col gap-1">
          {" "}
          <p className="text-sm font-medium text-[#535862]">Status</p>{" "}
          <Tooltip title={sts.tooltip} placement="right">
            {" "}
            <TooltipTrigger>
              {" "}
              <span className={`inline-flex cursor-default items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${sts.style}`}>
                {" "}
                <StatusIcon className="size-3" /> {sts.label}{" "}
              </span>{" "}
            </TooltipTrigger>{" "}
          </Tooltip>{" "}
        </div>{" "}
        {}{" "}
        <div className="flex flex-col gap-1">
          {" "}
          <p className="text-sm font-medium text-[#535862]">Type</p>{" "}
          <Tooltip
            title={
              order.type === "onboarding" ? "Equipment is being set up and delivered to employees." : "Equipment is being collected from a departing employee."
            }
            placement="right"
          >
            {" "}
            <TooltipTrigger>
              {" "}
              <span
                className={`inline-flex cursor-default items-center rounded-full border-[1.5px] px-2 py-0.5 text-xs font-medium ${order.type === "onboarding" ? "border-[#079455] text-[#067647]" : "border-[#535862] text-[#414651]"}`}
              >
                {" "}
                {order.type === "onboarding" ? "Onboarding" : "Off-boarding"}{" "}
              </span>{" "}
            </TooltipTrigger>{" "}
          </Tooltip>{" "}
        </div>{" "}
        {}{" "}
        <div className="flex flex-col gap-1">
          {" "}
          <p className="text-sm font-medium text-[#535862]">Signature</p>{" "}
          <Tooltip title={sig.tooltip} placement="right">
            {" "}
            <TooltipTrigger>
              {" "}
              <span className={`inline-flex cursor-default items-center rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${sig.style}`}>
                {" "}
                {sig.label}{" "}
              </span>{" "}
            </TooltipTrigger>{" "}
          </Tooltip>{" "}
        </div>{" "}
        {}{" "}
        <div className="flex flex-col gap-1">
          {" "}
          <p className="text-sm font-medium text-[#535862]">Country</p>{" "}
          <div className="flex items-center gap-2">
            {" "}
            <Flag className="size-6 shrink-0" /> <p className="text-lg font-medium text-[#414651]">{countryName}</p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export { OrderSidebar };
