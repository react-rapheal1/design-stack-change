/* eslint-disable */
// @ts-nocheck
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Select } from "@/components/base/select/select";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { periodTabs } from "./periodTabs";

function PeriodTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const isMd = useBreakpoint("md");
  if (!isMd) {
    return (
      <Select
        size="sm"
        selectedKey={activeTab}
        onSelectionChange={(key) => onTabChange(key as string)}
        items={periodTabs.map((tab) => ({ id: tab, label: tab }))}
      >
        {" "}
        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}{" "}
      </Select>
    );
  }
  return (
    <ButtonGroup size="sm">
      {" "}
      {periodTabs.map((tab) => (
        <ButtonGroupItem key={tab} isSelected={activeTab === tab} onClick={() => onTabChange(tab)}>
          {" "}
          {tab}{" "}
        </ButtonGroupItem>
      ))}{" "}
    </ButtonGroup>
  );
}
export { PeriodTabs };
