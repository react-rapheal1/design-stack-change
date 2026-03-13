"use client";

import { useState } from "react";
import { SearchMd, Settings01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { EQUIPMENT_ROWS } from "../data";
import type { EquipmentRow } from "../data";
import { SelectReceiverPanel } from "./SelectReceiverPanel";

const STATUS = {
  unassigned: { label: "Unassigned", cls: "border-orange-200 bg-orange-50 text-orange-700" },
  active: { label: "Active", cls: "border-green-200 bg-green-50 text-green-700" },
  in_transit: { label: "In transit", cls: "border-amber-200 bg-amber-50 text-amber-700" },
};

function StatusBadge({ status, onClick }: { status: keyof typeof STATUS; onClick?: () => void }) {
  const s = STATUS[status];
  if (status === "unassigned" && onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cx("rounded-full border px-2 py-0.5 text-xs font-medium", s.cls, "cursor-pointer hover:opacity-80")}
      >
        {s.label}
      </button>
    );
  }
  return <span className={cx("rounded-full border px-2 py-0.5 text-xs font-medium", s.cls)}>{s.label}</span>;
}

function Row({ row, selected, onToggle, onAssign }: { row: EquipmentRow; selected: boolean; onToggle: () => void; onAssign: () => void }) {
  return (
    <tr className={cx("border-b border-[#eaecf0] last:border-0", selected && "bg-[#f5f8ff]")}>
      <td className="px-4 py-4">
        <input type="checkbox" checked={selected} onChange={onToggle} className="size-4 cursor-pointer rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="size-10 shrink-0 rounded-lg bg-[#f2f4f7]" />
          <div>
            <p className="text-sm font-medium text-[#101828]">{row.name}</p>
            <p className="text-xs text-[#475467]">{row.source}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <p className="font-mono text-sm text-[#101828]">{row.serial}</p>
        <p className="text-xs text-[#475467]">{row.source}</p>
      </td>
      <td className="px-4 py-4 text-sm text-[#101828]">{row.assignee || "——————"}</td>
      <td className="px-4 py-4 text-sm text-[#475467]">{row.ram}</td>
      <td className="px-4 py-4">
        <StatusBadge status={row.status} onClick={row.status === "unassigned" ? onAssign : undefined} />
      </td>
      <td className="px-4 py-4 text-right">
        <button type="button" className="px-1 text-sm text-[#475467] hover:text-[#101828]">•••</button>
      </td>
    </tr>
  );
}

interface EquipmentTableProps {
  isActionStep: boolean;
  onOpenAdd: () => void;
  onOpenCsv: () => void;
  onOpenSelfReport: () => void;
  tour: string;
}

export function EquipmentTable(_props: EquipmentTableProps) {
  const [rows, setRows] = useState(EQUIPMENT_ROWS);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [assignRows, setAssignRows] = useState<EquipmentRow[] | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedRows = rows.filter((r) => selected.has(r.id));

  function handleAssign(assignments: Record<string, string>) {
    setRows((prev) =>
      prev.map((r) => {
        const emp = assignments[r.id];
        if (emp) return { ...r, assignee: emp, status: "active" as const };
        return r;
      }),
    );
    setSelected(new Set());
  }

  return (
    <>
    <div className="mt-6 overflow-hidden rounded-xl border border-[#eaecf0] bg-white">
      <div className="flex items-center justify-between border-b border-[#eaecf0] px-5 py-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-primary">Equipment</p>
          <span className="rounded-full bg-[#f2f4f7] px-2 py-0.5 text-xs font-semibold text-tertiary">
            {rows.length} devices
          </span>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <>
              <Button color="secondary" size="sm">Delete</Button>
              <div className="relative">
                <Button size="sm" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} onClick={() => setAssignRows(selectedRows)}>
                  Assign
                </Button>
                {showTooltip && (
                  <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#101828] px-3 py-2 text-xs text-white">
                    Assign all selected items here
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#101828]" />
                  </div>
                )}
              </div>
              <Button color="secondary" size="sm">Sale</Button>
              <Button color="secondary" size="sm">Store</Button>
            </>
          )}
          <div className="flex h-9 items-center gap-2 rounded-lg border border-[#d0d5dd] px-3 text-sm text-tertiary">
            <SearchMd className="size-4 text-[#667085]" /><span>Search</span>
          </div>
          <Button color="secondary" size="sm" iconLeading={Settings01}>Filter</Button>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#eaecf0] bg-[#f9fafb]">
            <th className="px-4 py-3">
              <input type="checkbox" className="size-4 cursor-pointer rounded" onChange={(e) => setSelected(e.target.checked ? new Set(rows.map((r) => r.id)) : new Set())} />
            </th>
            {["Equipment name", "Serial number", "Assignee", "RAM/Storage", "Status", ""].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#475467]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Row key={row.id} row={row} selected={selected.has(row.id)} onToggle={() => toggle(row.id)} onAssign={() => setAssignRows([row])} />
          ))}
        </tbody>
      </table>
    </div>
    {assignRows && <SelectReceiverPanel rows={assignRows} onClose={() => setAssignRows(null)} onSubmit={handleAssign} />}
    </>
  );
}
