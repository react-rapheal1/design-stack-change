/* eslint-disable */
// @ts-nocheck
import { CheckCircle, ClipboardCheck, RefreshCw03 } from "@untitledui/icons";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { EmpStatus } from "./EmpStatus";

function EmpStatusBadge({ status }: { status: EmpStatus }) {
  const map: Record<EmpStatus, { label: string; style: string; icon: React.ComponentType<{ className?: string }> }> = {
    "verification-pending": { label: "Verification pending", style: "bg-[#fef6ee] text-[#b93815] ring-[#f9dbaf]", icon: ClipboardCheck },
    "in-progress": { label: "In progress", style: "bg-[#fffaeb] text-[#b54708] ring-[#fedf89]", icon: RefreshCw03 },
    completed: { label: "Completed", style: "bg-[#ecfdf3] text-[#067647] ring-[#abefc6]", icon: CheckCircle },
  };
  const { label, style, icon: Icon } = map[status];
  const tooltip =
    status === "verification-pending"
      ? "Delivery details unconfirmed. Order proceeds automatically after 24 hours."
      : status === "in-progress"
        ? "Delivery is in progress for this employee."
        : "All items have been delivered to this employee.";
  return (
    <Tooltip title={tooltip} placement="top">
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
export { EmpStatusBadge };
