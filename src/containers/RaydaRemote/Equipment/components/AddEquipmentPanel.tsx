"use client";

import { useState } from "react";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Tabs } from "@/components/application/tabs/tabs";
import { AddEquipmentTab } from "./AddEquipmentTab";
import { ImportEquipmentTab } from "./ImportEquipmentTab";

type PanelTab = "import" | "add";

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
          <CloseButton size="sm" onPress={onClose} />
        </div>
        <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as PanelTab)} className="px-6">
          <Tabs.List type="underline" size="sm" items={[]}>
            <Tabs.Item key="import" id="import">Import equipment</Tabs.Item>
            <Tabs.Item key="add" id="add">Add equipment</Tabs.Item>
          </Tabs.List>
        </Tabs>
        {activeTab === "import" && <ImportEquipmentTab onClose={onClose} />}
        {activeTab === "add" && <AddEquipmentTab onClose={onClose} />}
      </div>
    </div>
  );
}
