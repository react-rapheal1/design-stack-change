/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import { ArrowDown, ChevronSelectorVertical, HelpCircle } from "@untitledui/icons";
import Link from "next/link";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { OrderRowActions } from "./OrderRowActions";
import { OrderSignatureBadge } from "./OrderSignatureBadge";
import { OrderSortKey } from "./OrderSortKey";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderTypeBadge } from "./OrderTypeBadge";
import { countryMeta, orders } from "./data";

function OrdersTable() {
  const [sortKey, setSortKey] = useState<OrderSortKey>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  function handleOrderSort(key: OrderSortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }
  const sortedOrders = [...orders].sort((a, b) => {
    let aVal: string | number = "";
    let bVal: string | number = "";
    switch (sortKey) {
      case "total":
        aVal = parseFloat(a.total.replace(/[$,]/g, ""));
        bVal = parseFloat(b.total.replace(/[$,]/g, ""));
        break;
      case "employeeCount":
        aVal = a.employeeCount;
        bVal = b.employeeCount;
        break;
      case "date":
        aVal = new Date(a.date).getTime();
        bVal = new Date(b.date).getTime();
        break;
      case "country":
        aVal = countryMeta[a.country].name;
        bVal = countryMeta[b.country].name;
        break;
      default:
        aVal = a[sortKey as keyof typeof a] as string;
        bVal = b[sortKey as keyof typeof b] as string;
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortDir === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
  });
  const colHeaders: { key: OrderSortKey; label: string; help?: string }[] = [
    { key: "id", label: "Order ID" },
    { key: "date", label: "Order date" },
    { key: "status", label: "Order status", help: "The current processing status of this order." },
    { key: "total", label: "Total amount" },
    { key: "employeeCount", label: "Employees", help: "Number of employees included in this order." },
    { key: "type", label: "Type", help: "Whether this order is for onboarding new employees or off-boarding departing ones." },
    { key: "signature", label: "Signature", help: "Whether a recipient signature is required at the time of delivery." },
    { key: "country", label: "Country" },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-secondary bg-white shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]">
      {" "}
      <table className="w-full border-collapse">
        {" "}
        <thead>
          {" "}
          <tr className="border-b border-secondary bg-bg-secondary">
            {" "}
            {colHeaders.map(({ key, label, help }) => (
              <th key={key} className="px-6 py-3 text-left text-xs font-semibold text-tertiary">
                {" "}
                <div className="inline-flex items-center gap-1">
                  {" "}
                  <button type="button" onClick={() => handleOrderSort(key)} className="inline-flex items-center gap-1 whitespace-nowrap hover:text-secondary">
                    {" "}
                    {label}{" "}
                    {sortKey === key ? (
                      <ArrowDown className={`size-3 stroke-[3px] text-tertiary ${sortDir === "asc" ? "rotate-180" : ""}`} />
                    ) : (
                      <ChevronSelectorVertical size={12} strokeWidth={3} className="text-tertiary" />
                    )}{" "}
                  </button>{" "}
                  {help && (
                    <Tooltip title={help} placement="top">
                      {" "}
                      <TooltipTrigger>
                        {" "}
                        <HelpCircle className="size-3.5 cursor-default text-fg-quaternary" />{" "}
                      </TooltipTrigger>{" "}
                    </Tooltip>
                  )}{" "}
                </div>{" "}
              </th>
            ))}{" "}
            <th className="w-12 px-6 py-3" />{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          {sortedOrders.map((order) => {
            const { flag: Flag, name } = countryMeta[order.country];
            return (
              <tr key={order.id} className="border-b border-secondary last:border-0 hover:bg-bg-primary_hover">
                {" "}
                <td className="px-6 py-4">
                  {" "}
                  <Link
                    href={`/rayda-remote/orders/${order.id}`}
                    className="text-sm font-medium whitespace-nowrap text-primary hover:text-brand-secondary hover:underline"
                  >
                    {" "}
                    {order.id}{" "}
                  </Link>{" "}
                </td>{" "}
                <td className="px-6 py-4 text-sm whitespace-nowrap text-tertiary">{order.date}</td>{" "}
                <td className="px-6 py-4">
                  <OrderStatusBadge status={order.status} />
                </td>{" "}
                <td className="px-6 py-4 text-sm text-tertiary">{order.total}</td> <td className="px-6 py-4 text-sm text-tertiary">{order.employeeCount}</td>{" "}
                <td className="px-6 py-4">
                  <OrderTypeBadge type={order.type} />
                </td>{" "}
                <td className="px-6 py-4">
                  <OrderSignatureBadge sig={order.signature} />
                </td>{" "}
                <td className="max-w-[140px] px-6 py-4">
                  {" "}
                  <div className="flex items-center gap-2">
                    {" "}
                    <Flag className="size-6 shrink-0" /> <span className="truncate text-sm text-tertiary">{name}</span>{" "}
                  </div>{" "}
                </td>{" "}
                <td className="px-6 py-4">
                  <OrderRowActions orderId={order.id} />
                </td>{" "}
              </tr>
            );
          })}{" "}
        </tbody>{" "}
      </table>{" "}
      {}{" "}
      <div className="flex items-center justify-between border-t border-secondary px-6 py-3">
        {" "}
        <span className="text-sm text-tertiary">Page 1 of 10</span>{" "}
        <div className="flex gap-2">
          {" "}
          <button
            type="button"
            className="rounded-lg border border-primary bg-white px-3 py-2 text-sm font-semibold text-secondary shadow-xs hover:bg-bg-primary_hover"
          >
            Previous
          </button>{" "}
          <button
            type="button"
            className="rounded-lg border border-primary bg-white px-3 py-2 text-sm font-semibold text-secondary shadow-xs hover:bg-bg-primary_hover"
          >
            Next
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export { OrdersTable };
