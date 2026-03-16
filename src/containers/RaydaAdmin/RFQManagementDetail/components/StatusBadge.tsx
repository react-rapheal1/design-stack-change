import { Badge } from "@/components/base/badges/badges";
import type { RFQStatus } from "../../shared";
import { getStatusConfig } from "../../shared";

function StatusBadge({ status }: { status: RFQStatus }) {
  const config = getStatusConfig(status);
  return (
    <Badge size="sm" type="pill-color" color={config.color as never}>
      {config.label}
    </Badge>
  );
}

export { StatusBadge };
