/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import { ArrowDown, ChevronSelectorVertical, HelpCircle } from "@untitledui/icons";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { OrderSortKey } from "../OrderSortKey";
import { countryMeta, orders } from "../data";
import { orderTableColumns } from "../orderTableColumns";
import { OrderTableRow } from "./OrderTableRow";

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
  return (
    <div className="overflow-hidden rounded-xl border border-secondary bg-white shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]">
      {" "}
      <table className="w-full border-collapse">
        {" "}
        <thead>
          {" "}
          <tr className="border-b border-secondary bg-bg-secondary">
            {" "}
            {orderTableColumns.map(({ key, label, help }) => (
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
          {sortedOrders.map((order) => (
            <OrderTableRow key={order.id} order={order} />
          ))}{" "}
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
