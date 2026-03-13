"use client";

import { useState } from "react";
import { X } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { AddEquipmentTab } from "./AddEquipmentTab";
import { ImportEquipmentTab } from "./ImportEquipmentTab";

type PanelTab = "import" | "add";

const TABS: { key: PanelTab; label: string }[] = [
  { key: "import", label: "Import equipment" },
  { key: "add", label: "Add equipment" },
];

export function AddEquipmentPanel({ initialTab = "import", onClose }: { initialTab?: PanelTab; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<PanelTab>(initialTab);

  return (
    <div className="fixed inset-0 z-[200] bg-black/20" onClick={onClose}>
      <div className="absolute top-0 right-0 flex h-full w-[65%] flex-col bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-primary">Add equipment</h2>
            <p className="mt-0.5 text-sm text-tertiary">Download template to add equipment details to the platform</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary hover:bg-[#f2f4f7]">
            <X className="size-4" />
          </button>
        </div>
        <div className="flex border-b border-[#eaecf0] px-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cx(
                "mr-6 py-3 text-sm font-semibold transition-colors",
                activeTab === tab.key
                  ? "border-b-2 border-brand-600 text-brand-600"
                  : "text-tertiary hover:text-secondary",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "import" && <ImportEquipmentTab onClose={onClose} />}
        {activeTab === "add" && <AddEquipmentTab onClose={onClose} />}
      </div>
    </div>
  );
}
