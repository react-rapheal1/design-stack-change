import type { RFQStatus, StatusColor } from "./adminRfqTypes";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true }).format(date);
}

function getStatusConfig(status: RFQStatus): { label: string; color: StatusColor } {
  const map: Record<RFQStatus, { label: string; color: StatusColor }> = {
    pending_vendors: { label: "Pending Vendors", color: "warning" },
    vendors_responded: { label: "Needs Review", color: "brand" },
    response_sent: { label: "Sent to Customer", color: "blue-light" },
    fully_accepted: { label: "Fully Accepted", color: "success" },
    partially_accepted: { label: "Partially Accepted", color: "purple" },
    customer_rejected: { label: "Rejected", color: "error" },
    expired: { label: "Expired", color: "gray" },
  };

  return map[status];
}

export { formatCurrency, formatDateTime, getStatusConfig };
