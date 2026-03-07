/* eslint-disable */
// @ts-nocheck
import { Badge } from "@/components/base/badges/badges";
import { RFQStatus, getStatusConfig } from "../shared";

function StatusBadge({ status }: { status: RFQStatus }) {
  const config = getStatusConfig(status);
  return (
    <Badge size="sm" type="pill-color" color={config.color}>
      {" "}
      {config.label}{" "}
    </Badge>
  );
}
export { StatusBadge };
