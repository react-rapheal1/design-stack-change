"use client";

import { Badge } from "@/components/base/badges/badges";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Avatar } from "@/components/base/avatar/avatar";
import { cx } from "@/utils/cx";
import type { EquipmentRow } from "../data";

const STATUS_COLOR = {
  unassigned: "warning",
  active: "success",
  in_transit: "warning",
} as const;

function StatusBadge({ status, onClick }: { status: keyof typeof STATUS_COLOR; onClick?: () => void }) {
  const label = status === "in_transit" ? "In transit" : status === "active" ? "Active" : "Unassigned";
  if (status === "unassigned" && onClick) {
    return (
      <button type="button" onClick={onClick} className="cursor-pointer hover:opacity-80">
        <Badge size="sm" color={STATUS_COLOR[status]}>{label}</Badge>
      </button>
    );
  }
  return <Badge size="sm" color={STATUS_COLOR[status]}>{label}</Badge>;
}

export function EquipmentTableRow({
  row,
  selected,
  onToggle,
  onAssign,
}: {
  row: EquipmentRow;
  selected: boolean;
  onToggle: () => void;
  onAssign: () => void;
}) {
  return (
    <tr className={cx("border-b border-[#eaecf0] last:border-0", selected && "bg-[#f5f8ff]")}>
      <td className="px-4 py-4">
        <Checkbox size="sm" isSelected={selected} onChange={onToggle} />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar size="md" />
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
        <Dropdown.Root>
          <Dropdown.DotsButton />
          <Dropdown.Popover>
            <Dropdown.Menu>
              <Dropdown.Item label="Edit" />
              <Dropdown.Item label="Delete" />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.Root>
      </td>
    </tr>
  );
}
