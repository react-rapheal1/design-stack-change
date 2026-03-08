/* eslint-disable */
// @ts-nocheck
import { Badge } from "@/components/base/badges/badges";
import { RFQ } from "../RFQ";

function ServiceBadge({ service }: { service: string }) {
  const colorMap: Record<string, "warning" | "success" | "brand" | "error"> = { Onboarding: "brand", Offboarding: "success", Storage: "warning", RFQ: "error" };
  return (
    <Badge size="sm" type="pill-color" color={colorMap[service] ?? "gray"}>
      {" "}
      {service}{" "}
    </Badge>
  );
}
export { ServiceBadge };
