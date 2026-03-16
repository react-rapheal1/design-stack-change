"use client";

import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Avatar } from "@/components/base/avatar/avatar";
import { EMPLOYEES_LIST } from "../data";
import type { EquipmentRow } from "../data";

const selectCls =
  "w-full rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 text-sm text-primary focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none";

export function SelectReceiverPanel({
  rows,
  onClose,
  onSubmit,
}: {
  rows: EquipmentRow[];
  onClose: () => void;
  onSubmit: (assignments: Record<string, string>) => void;
}) {
  const [assignments, setAssignments] = useState<Record<string, string>>(
    Object.fromEntries(rows.map((r) => [r.id, r.assignee || ""])),
  );

  return (
    <div className="fixed inset-0 z-[300] bg-black/20" onClick={onClose}>
      <div
        className="absolute top-0 right-0 flex h-full w-[380px] flex-col bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-primary">Select a receiver</h2>
            <p className="mt-0.5 text-sm text-tertiary">
              Please select employee to Reassign equipment to
            </p>
          </div>
          <CloseButton size="sm" onPress={onClose} />
        </div>
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-2">
          {rows.map((row) => (
            <div key={row.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Avatar size="md" />
                <p className="text-sm font-medium text-[#101828]">{row.name}</p>
              </div>
              <select
                className={selectCls}
                value={assignments[row.id]}
                onChange={(e) =>
                  setAssignments((prev) => ({ ...prev, [row.id]: e.target.value }))
                }
              >
                <option value="">Select employee</option>
                {EMPLOYEES_LIST.map((emp) => (
                  <option key={emp}>{emp}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => { onSubmit(assignments); onClose(); }}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
