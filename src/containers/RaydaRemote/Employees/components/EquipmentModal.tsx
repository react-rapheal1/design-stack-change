"use client";

import { useState } from "react";
import { Upload01, UserPlus01, X, ZapFast } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

const EQUIPMENT_OPTIONS = [
  { key: "csv", icon: Upload01, title: "Upload a CSV", description: "Map your existing spreadsheet columns" },
  { key: "manual", icon: UserPlus01, title: "Add manually", description: "Add devices one at a time" },
  { key: "self-report", icon: ZapFast, title: "Ask employees to self-report equipment", description: "Send a form link to your team to log their devices" },
];

interface EquipmentModalProps {
  employeeName?: string;
  onComplete: () => void;
  onSkip: () => void;
}

export function EquipmentModal({ employeeName, onComplete, onSkip }: EquipmentModalProps) {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  return (
    <>
      <div className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
          <div className="flex items-start justify-between px-6 pt-6 pb-1">
            <div>
              {employeeName && <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{employeeName}</p>}
              <h2 className="mt-1 text-xl font-bold text-primary">How would you like to upload equipment?</h2>
              <p className="mt-1 text-sm text-tertiary">Choose the method that works best for your current setup.</p>
            </div>
            <button type="button" onClick={onSkip} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tertiary hover:bg-[#f2f4f7]">
              <X className="size-4" />
            </button>
          </div>
          <div className="flex flex-col gap-3 px-6 py-5">
            {EQUIPMENT_OPTIONS.map(({ key, icon: Icon, title, description }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className={cx(
                  "flex items-center gap-4 rounded-xl border px-4 py-3 text-left transition duration-100",
                  selected === key
                    ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
                    : "border-[#eaecf0] bg-white hover:border-brand-300 hover:bg-brand-25",
                )}
              >
                <div className={cx("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", selected === key ? "bg-brand-100" : "bg-[#f2f4f7]")}>
                  <Icon className={cx("size-[18px]", selected === key ? "text-brand-600" : "text-[#667085]")} />
                </div>
                <div>
                  <p className={cx("text-sm font-semibold", selected === key ? "text-brand-700" : "text-secondary")}>{title}</p>
                  <p className="mt-0.5 text-xs text-tertiary">{description}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-[#eaecf0] px-6 py-4">
            <button type="button" className="text-sm font-medium text-tertiary transition hover:text-secondary" onClick={onSkip}>
              Skip for now
            </button>
            <Button
              size="md"
              isDisabled={!selected}
              onClick={() => {
                onComplete();
                router.push(`/rayda-remote/equipment?open=${selected}`);
              }}
            >
              Get started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
