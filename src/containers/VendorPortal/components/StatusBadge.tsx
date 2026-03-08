/* eslint-disable */
// @ts-nocheck
import { Badge } from "@/components/base/badges/badges";

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge size="sm" type="pill-color" color="warning">
      {" "}
      {status}{" "}
    </Badge>
  );
}
export { StatusBadge };
