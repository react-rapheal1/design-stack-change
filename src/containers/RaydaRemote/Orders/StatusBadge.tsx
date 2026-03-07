/* eslint-disable */
// @ts-nocheck
import { Badge } from "@/components/base/badges/badges";
import { RequestStatus } from "./RequestStatus";

function StatusBadge({ status }: { status: RequestStatus }) {
  const config: Record<RequestStatus, { label: string; color: "warning" | "brand" | "success" | "error" | "gray" }> = {
    pending: { label: "Pending", color: "warning" },
    waiting_for_action: { label: "Waiting For Action", color: "brand" },
    confirmed: { label: "Confirmed", color: "success" },
    rejected: { label: "Rejected", color: "error" },
    expired: { label: "Expired", color: "gray" },
  };
  const { label, color } = config[status];
  return (
    <Badge size="sm" type="pill-color" color={color}>
      {" "}
      {label}{" "}
    </Badge>
  );
}
export { StatusBadge };
