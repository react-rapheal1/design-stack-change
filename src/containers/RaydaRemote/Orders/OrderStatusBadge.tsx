/* eslint-disable */
// @ts-nocheck
import React from "react";
import { CheckCircle, ClipboardCheck, RefreshCw03 } from "@untitledui/icons";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { OrderStatus } from "./data";

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config: Record<OrderStatus, { label: string; style: string; icon: React.ComponentType<{ className?: string }> }> = {
    pending: { label: "Pending", style: "bg-[#f4f3ff] text-[#5925dc] ring-[#d9d6fe]", icon: RefreshCw03 },
    "verification-pending": { label: "Verification pending", style: "bg-[#fef6ee] text-[#b93815] ring-[#f9dbaf]", icon: ClipboardCheck },
    "in-progress": { label: "In progress", style: "bg-[#fffaeb] text-[#b54708] ring-[#fedf89]", icon: RefreshCw03 },
    completed: { label: "Completed", style: "bg-[#ecfdf3] text-[#067647] ring-[#abefc6]", icon: CheckCircle },
  };
  const tooltips: Record<OrderStatus, string> = {
    pending: "This order has been placed and is awaiting processing.",
    "verification-pending": "Employees need to verify their delivery information. If not verified within 24 hours, the order will proceed automatically.",
    "in-progress": "The order is currently being processed and items are being prepared.",
    completed: "All items in this order have been successfully delivered.",
  };
  const { label, style, icon: Icon } = config[status];
  return (
    <Tooltip title={tooltips[status]} placement="top">
      {" "}
      <TooltipTrigger>
        {" "}
        <span className={`inline-flex cursor-default items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}>
          {" "}
          <Icon className="size-3" /> {label}{" "}
        </span>{" "}
      </TooltipTrigger>{" "}
    </Tooltip>
  );
}
export { OrderStatusBadge };
