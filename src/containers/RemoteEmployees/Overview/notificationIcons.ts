import type { ComponentType } from "react";
import { CheckCircle, Mail01, Package } from "@untitledui/icons";
import type { NotificationItem } from "@/utils/notification-store";

export const notificationIcons: Record<NotificationItem["type"], { bg: string; color: string; icon: ComponentType<{ className?: string }> }> = {
  success: { icon: CheckCircle, bg: "bg-[#dcfae6]", color: "text-[#17b26a]" },
  info: { icon: Mail01, bg: "bg-[#dbeafe]", color: "text-[#2563eb]" },
  processing: { icon: Package, bg: "bg-[#fef3c7]", color: "text-[#d97706]" },
};
