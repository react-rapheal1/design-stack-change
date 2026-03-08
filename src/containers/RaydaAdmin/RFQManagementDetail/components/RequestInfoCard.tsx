import { cx } from "@/utils/cx";
import { RFQ, formatDateTime } from "../../shared";
import { StatusBadge } from "./StatusBadge";

function RequestInfoCard({ rfq }: { rfq: RFQ }) {
  const decisionColor =
    rfq.customerDecision === "fully_accepted"
      ? "text-success-primary"
      : rfq.customerDecision === "partially_accepted"
        ? "text-[#6941c6]"
        : "text-error-primary";
  const decisionLabel =
    rfq.customerDecision === "fully_accepted" ? "Fully Accepted" : rfq.customerDecision === "partially_accepted" ? "Partially Accepted" : "Rejected";

  return (
    <div className="rounded-xl border border-secondary bg-primary shadow-xs">
      <div className="border-b border-secondary px-5 py-3.5">
        <span className="text-sm font-semibold text-secondary">Request Info</span>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-tertiary">RFQ ID</span>
          <span className="text-sm font-medium text-primary">{rfq.id}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-tertiary">Status</span>
          <StatusBadge status={rfq.status} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-tertiary">Submitted</span>
          <span className="text-sm font-medium text-primary">{formatDateTime(rfq.createdAt)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-tertiary">Vendor Quotes</span>
          <span className="text-sm font-medium text-primary">
            {rfq.vendorResponses.length ? `${rfq.vendorResponses.length} vendor${rfq.vendorResponses.length !== 1 ? "s" : ""}` : "—"}
          </span>
        </div>
        {rfq.sentAt && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-tertiary">Sent</span>
            <span className="text-sm font-medium text-primary">{formatDateTime(rfq.sentAt)}</span>
          </div>
        )}
        {rfq.customerDecision && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-tertiary">Decision</span>
            <span className={cx("text-sm font-medium", decisionColor)}>{decisionLabel}</span>
          </div>
        )}
        {rfq.rejectionReason && (
          <div className="flex flex-col gap-1 border-t border-secondary pt-3">
            <span className="text-xs font-medium tracking-wide text-tertiary uppercase">Rejection Reason</span>
            <span className="text-sm text-error-primary">{rfq.rejectionReason}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export { RequestInfoCard };
