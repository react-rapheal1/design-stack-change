import { OrderSortKey } from "./OrderSortKey";

const orderTableColumns: { key: OrderSortKey; label: string; help?: string }[] = [
  { key: "id", label: "Order ID" },
  { key: "date", label: "Order date" },
  { key: "status", label: "Order status", help: "The current processing status of this order." },
  { key: "total", label: "Total amount" },
  { key: "employeeCount", label: "Employees", help: "Number of employees included in this order." },
  { key: "type", label: "Type", help: "Whether this order is for onboarding new employees or off-boarding departing ones." },
  { key: "signature", label: "Signature", help: "Whether a recipient signature is required at the time of delivery." },
  { key: "country", label: "Country" },
];

export { orderTableColumns };
