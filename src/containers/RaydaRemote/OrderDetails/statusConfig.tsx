/* eslint-disable */
// @ts-nocheck
import { CheckCircle, ClipboardCheck, RefreshCw03 } from "@untitledui/icons";
import { OrderStatus } from "../Orders/data";

const statusConfig: Record<OrderStatus, { label: string; style: string; icon: React.ComponentType<{ className?: string }>; tooltip: string }> = {
  pending: {
    label: "Pending",
    style: "bg-[#f4f3ff] text-[#5925dc] ring-[#d9d6fe]",
    icon: RefreshCw03,
    tooltip: "This order has been placed and is awaiting processing.",
  },
  "verification-pending": {
    label: "Verification pending",
    style: "bg-[#fef6ee] text-[#b93815] ring-[#f9dbaf]",
    icon: ClipboardCheck,
    tooltip: "Employees need to verify their delivery information. If not verified within 24 hours, the order will proceed automatically.",
  },
  "in-progress": {
    label: "In progress",
    style: "bg-[#fffaeb] text-[#b54708] ring-[#fedf89]",
    icon: RefreshCw03,
    tooltip: "The order is currently being processed and items are being prepared.",
  },
  completed: {
    label: "Completed",
    style: "bg-[#ecfdf3] text-[#067647] ring-[#abefc6]",
    icon: CheckCircle,
    tooltip: "All items in this order have been successfully delivered.",
  },
};
export { statusConfig };
