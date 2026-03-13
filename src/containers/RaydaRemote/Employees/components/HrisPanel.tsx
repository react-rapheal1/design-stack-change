"use client";

import { useState } from "react";
import { ArrowLeft } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { HRIS_PROVIDERS_LIST } from "../data";
import type { HrisView, PanelTab, Provider } from "../data";
import { AddEmployeeTab } from "./AddEmployeeTab";
import { HrisConnectedView } from "./HrisConnectedView";
import { HrisPanelHeader } from "./HrisPanelHeader";
import { HrisPanelTabs } from "./HrisPanelTabs";
import { HrisProviderGrid } from "./HrisProviderGrid";
import { HrisSyncingView } from "./HrisSyncingView";
import { ImportEmployeesTab } from "./ImportEmployeesTab";

interface HrisPanelProps {
  onClose: () => void;
  onSave?: () => void;
  onViewChange?: (view: HrisView) => void;
  initialTab?: PanelTab;
  disabledTabs?: PanelTab[];
}

function HrisPanel({ onClose, onSave, onViewChange, initialTab, disabledTabs = [] }: HrisPanelProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>(initialTab ?? "hris");
  const [view, setView] = useState<HrisView>("list");
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState<Provider | null>(null);
  const [syncFreq] = useState("Daily");
  const [notifEmail, setNotifEmail] = useState("admin@rayda.co");
  const filteredProviders = HRIS_PROVIDERS_LIST.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  function handleConnect(selectedProvider: Provider) {
    setProvider(selectedProvider);
    setView("syncing");
    onViewChange?.("syncing");
    setTimeout(() => {
      setView("connected");
      onViewChange?.("connected");
    }, 4000);
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/20" onClick={onClose}>
      <div className="absolute top-0 right-0 flex h-full w-[60%] flex-col bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <HrisPanelHeader onClose={onClose} />
        <HrisPanelTabs activeTab={activeTab} onTabChange={setActiveTab} disabledTabs={disabledTabs} />
        {activeTab === "import" && <ImportEmployeesTab onSuccess={onClose} />}
        {activeTab === "add" && <AddEmployeeTab onSuccess={onClose} />}
        {activeTab === "hris" && (
          <>
            <div className="flex-1 overflow-y-auto">
              {view === "list" && <HrisProviderGrid providers={filteredProviders} search={search} onSearchChange={setSearch} onConnect={handleConnect} />}
              {view === "syncing" && <HrisSyncingView />}
              {view === "connected" && <HrisConnectedView notifEmail={notifEmail} provider={provider} syncFreq={syncFreq} onNotifEmailChange={setNotifEmail} />}
            </div>
            {view === "syncing" && (
              <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => setView("list")}>
                  Back
                </Button>
              </div>
            )}
            {view === "connected" && (
              <div className="flex items-center justify-between border-t border-[#eaecf0] px-6 py-4">
                <Button color="primary-destructive" onClick={onClose}>
                  Disconnect
                </Button>
                <Button color="secondary" onClick={onSave}>
                  Save changes
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export { HrisPanel };
