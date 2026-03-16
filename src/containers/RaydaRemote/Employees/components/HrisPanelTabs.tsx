import { Tabs } from "@/components/application/tabs/tabs";
import { PANEL_TABS } from "../data";
import type { PanelTab } from "../data";

function HrisPanelTabs({ activeTab, onTabChange }: { activeTab: PanelTab; onTabChange: (value: PanelTab) => void }) {
  return (
    <Tabs selectedKey={activeTab} onSelectionChange={(key) => onTabChange(key as PanelTab)} className="px-2">
      <Tabs.List type="underline" size="sm" items={[]}>
        {PANEL_TABS.map((tab) => (
          <Tabs.Item key={tab.key} id={tab.key}>
            {tab.label}
          </Tabs.Item>
        ))}
      </Tabs.List>
    </Tabs>
  );
}

export { HrisPanelTabs };
