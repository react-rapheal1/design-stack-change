import { Badge } from "@/components/ui/badge";
import type { RFQStatus } from "../../shared";
import { getStatusConfig } from "../../shared";

interface StatusBadgeProps {
  status: RFQStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const config = getStatusConfig(status);
  
  // Map the color to badge variant
  const variantMap: Record<string, "default" | "success" | "warning" | "error" | "gray" | "brand"> = {
    success: "success",
    warning: "warning",
    error: "error",
    gray: "gray",
    brand: "brand",
    blue: "brand",
    orange: "warning",
    "blue-light": "brand",
  };
  
  const variant = variantMap[config.color] || "gray";
  
  return (
    <Badge variant={variant} size="sm">
      {config.label}
    </Badge>
  );
}

export { StatusBadge };
