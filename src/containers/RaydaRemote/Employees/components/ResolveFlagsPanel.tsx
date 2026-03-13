"use client";

import { useState } from "react";
import { X } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import type { Employee } from "../data";
import { EquipmentModal } from "./EquipmentModal";

function ResolveFlagsPanel({ employees, onClose, onResolveStep }: { employees: Employee[]; onClose: () => void; onResolveStep?: (step: number) => void }) {
  const flagged = employees.filter((e) => e.flag);
  const [resolved, setResolved] = useState<Set<string>>(new Set());
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const resolvingEmployee = flagged.find((e) => e.id === resolvingId) ?? null;

  function handleResolve(id: string) {
    const next = new Set(resolved).add(id);
    setResolved(next);
    if (next.size === flagged.length) {
      onResolveStep?.(1);
    }
  }
  const allResolved = resolved.size === flagged.length;
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      <div className="fixed top-0 right-0 z-50 flex h-full w-[720px] flex-col bg-white shadow-2xl">
        {}
        <div className="flex items-start justify-between px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-primary">Resolve flags</h2>
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">{flagged.length - resolved.size} remaining</span>
            </div>
            <p className="mt-0.5 text-sm text-tertiary">Address device assignment issues for your employees</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary transition duration-100 hover:bg-[#f2f4f7]">
            <X className="size-4" />
          </button>
        </div>

        {}
        <div className="mx-6 mb-1 h-1.5 overflow-hidden rounded-full bg-[#f2f4f7]">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-500"
            style={{ width: `${flagged.length > 0 ? (resolved.size / flagged.length) * 100 : 0}%` }}
          />
        </div>
        <p className="mb-4 px-6 text-xs text-tertiary">
          {resolved.size} of {flagged.length} resolved
        </p>

        <div className="flex-1 overflow-y-auto px-6">
          {allResolved ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <span className="text-lg">✓</span>
                </div>
              </div>
              <p className="mt-4 text-base font-bold text-primary">All flags resolved!</p>
              <p className="mt-1 text-sm text-tertiary">Every device assignment is in order. Your team is ready to go.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {flagged.map((emp) => {
                const isResolved = resolved.has(emp.id);
                return (
                  <div
                    key={emp.id}
                    className={cx(
                      "flex items-center gap-4 rounded-xl border p-4 transition duration-100",
                      isResolved ? "border-green-200 bg-green-50" : "border-[#eaecf0] bg-white",
                    )}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7] text-xs font-semibold text-secondary">
                      {emp.initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-primary">{emp.name}</p>
                      <p className="text-xs text-tertiary">{emp.dept}</p>
                    </div>
                    <span
                      className={cx("rounded-full px-2.5 py-1 text-xs font-medium", isResolved ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600")}
                    >
                      {isResolved ? "Resolved" : emp.flag}
                    </span>
                    {!isResolved && (
                      <Button size="sm" color="secondary" onClick={() => setResolvingId(emp.id)}>
                        Resolve
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {}
        <div className="flex items-center justify-end border-t border-[#eaecf0] px-6 py-4">
          <Button onClick={onClose} color={allResolved ? "primary" : "secondary"}>
            {allResolved ? "Done" : "Close"}
          </Button>
        </div>
      </div>
      {resolvingEmployee && (
        <EquipmentModal
          employeeName={resolvingEmployee.name}
          onSkip={() => setResolvingId(null)}
          onComplete={() => {
            handleResolve(resolvingEmployee.id);
            setResolvingId(null);
          }}
        />
      )}
    </>
  );
}
export { ResolveFlagsPanel };
