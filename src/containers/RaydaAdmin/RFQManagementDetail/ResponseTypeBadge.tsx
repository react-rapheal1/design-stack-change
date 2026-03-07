/* eslint-disable */
// @ts-nocheck
import { Badge } from "@/components/base/badges/badges";
import { DeviceResponseType } from "../shared";

function ResponseTypeBadge({ type }: { type: DeviceResponseType }) {
  const config: Record<DeviceResponseType, { label: string; color: "success" | "blue" | "error" }> = {
    quoted: { label: "Quoted", color: "success" },
    alternative: { label: "Alternative", color: "blue" },
    unavailable: { label: "Unavailable", color: "error" },
  };
  const { label, color } = config[type];
  return (
    <Badge size="sm" color={color} type="pill-color">
      {label}
    </Badge>
  );
}
export { ResponseTypeBadge };
