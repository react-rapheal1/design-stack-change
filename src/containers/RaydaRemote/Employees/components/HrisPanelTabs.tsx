import { cx } from "@/utils/cx";
import { PANEL_TABS } from "../data";
import type { PanelTab } from "../data";

function HrisPanelTabs({
  activeTab,
  onTabChange,
  disabledTabs = [],
}: {
  activeTab: PanelTab;
  onTabChange: (value: PanelTab) => void;
  disabledTabs?: PanelTab[];
}) {
  return (
    <div className="flex border-b border-[#eaecf0] px-2">
      {PANEL_TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        const isDisabled = disabledTabs.includes(tab.key);
        return (
          <button
            key={tab.key}
            type="button"
            disabled={isDisabled}
            onClick={() => !isDisabled && onTabChange(tab.key)}
            className={cx(
              "-mb-px border-b-2 px-4 py-3 text-sm font-medium transition duration-100",
              isActive && "border-brand-600 text-brand-700",
              !isActive && !isDisabled && "border-transparent text-tertiary hover:text-secondary",
              isDisabled && "cursor-not-allowed border-transparent text-tertiary opacity-35",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export { HrisPanelTabs };
