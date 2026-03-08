import { cx } from "@/utils/cx";
import { PANEL_TABS } from "../data";
import type { PanelTab } from "../data";

function HrisPanelTabs({ activeTab, onTabChange }: { activeTab: PanelTab; onTabChange: (value: PanelTab) => void }) {
  return (
    <div className="flex border-b border-[#eaecf0] px-2">
      {PANEL_TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={cx(
            "-mb-px border-b-2 px-4 py-3 text-sm font-medium transition duration-100",
            activeTab === tab.key ? "border-brand-600 text-brand-700" : "border-transparent text-tertiary hover:text-secondary",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export { HrisPanelTabs };
