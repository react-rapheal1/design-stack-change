/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import { DotsVertical, Edit04, Eye } from "@untitledui/icons";
import Link from "next/link";
import { orders } from "./data";

function OrderRowActions({ orderId }: { orderId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      {" "}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex size-8 items-center justify-center rounded-md text-fg-tertiary hover:bg-bg-primary_hover"
      >
        {" "}
        <DotsVertical className="size-5" />{" "}
      </button>{" "}
      {open && (
        <div className="absolute top-9 right-0 z-20 w-64 overflow-hidden rounded-lg border border-secondary bg-white shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]">
          {" "}
          <Link
            href={`/rayda-remote/orders/${orderId}`}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-secondary hover:bg-bg-primary_hover"
          >
            {" "}
            <Eye className="size-4 shrink-0 text-fg-tertiary" /> View order{" "}
          </Link>{" "}
          <button
            type="button"
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-primary hover:bg-bg-primary_hover"
          >
            {" "}
            <Edit04 className="size-4 shrink-0 text-fg-tertiary" /> Enable signature requirement{" "}
          </button>{" "}
        </div>
      )}{" "}
    </div>
  );
}
export { OrderRowActions };
