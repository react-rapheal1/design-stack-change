"use client";

import { useState } from "react";
import { ArrowLeft } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { HrisConnectedView } from "./HrisConnectedView";
import { HrisPanelHeader } from "./HrisPanelHeader";
import { HrisPanelTabs } from "./HrisPanelTabs";
import { HrisProviderGrid } from "./HrisProviderGrid";
import { HrisSyncingView } from "./HrisSyncingView";
import { HRIS_PROVIDERS_LIST } from "./data";
import type { HrisView, PanelTab, Provider } from "./data";

function HrisPanel({ onClose, onSave, onViewChange }: { onClose: () => void; onSave?: () => void; onViewChange?: (view: HrisView) => void }) {
  const [activeTab, setActiveTab] = useState<PanelTab>("hris");
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
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      <div className="fixed top-0 right-0 z-50 flex h-full w-[780px] flex-col bg-white shadow-2xl">
        <HrisPanelHeader onClose={onClose} />
        <HrisPanelTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
          {activeTab === "hris" && view === "list" && (
            <HrisProviderGrid providers={filteredProviders} search={search} onSearchChange={setSearch} onConnect={handleConnect} />
          )}
          {activeTab === "hris" && view === "syncing" && <HrisSyncingView />}
          {activeTab === "hris" && view === "connected" && (
            <HrisConnectedView notifEmail={notifEmail} provider={provider} syncFreq={syncFreq} onNotifEmailChange={setNotifEmail} />
          )}
          {activeTab !== "hris" && <div className="flex items-center justify-center py-24 text-sm text-tertiary">Coming soon</div>}
        </div>
        {activeTab === "hris" && view === "syncing" && (
          <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => setView("list")}>
              Back
            </Button>
          </div>
        )}
        {activeTab === "hris" && view === "connected" && (
          <div className="flex items-center justify-between border-t border-[#eaecf0] px-6 py-4">
            <Button color="primary-destructive" onClick={onClose}>
              Disconnect
            </Button>
            <Button color="secondary" onClick={onSave}>
              Save changes
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export { HrisPanel };
