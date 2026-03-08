/* eslint-disable */
// @ts-nocheck
import { Badge } from "@/components/base/badges/badges";
import { formatTimeRemaining } from "../formatTimeRemaining";
import { getDeadlineUrgency } from "../getDeadlineUrgency";

function RFQDeadlineBadge({ createdAt, nowMs }: { createdAt: string; nowMs: number }) {
  return (
    <Badge size="sm" type="pill-color" color={getDeadlineUrgency(createdAt, nowMs)}>
      {" "}
      {formatTimeRemaining(createdAt, nowMs)}{" "}
    </Badge>
  );
}
export { RFQDeadlineBadge };
