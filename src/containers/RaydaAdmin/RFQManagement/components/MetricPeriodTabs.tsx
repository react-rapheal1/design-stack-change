"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { periodTabs } from "../periodTabs";

interface MetricPeriodTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function MetricPeriodTabs({ activeTab, onTabChange }: MetricPeriodTabsProps) {
  const isMd = useBreakpoint("md");

  if (!isMd) {
    return (
      <Select value={activeTab} onValueChange={onTabChange}>
        <SelectTrigger className="h-9 w-[160px]">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          {periodTabs.map((tab) => (
            <SelectItem key={tab} value={tab}>
              {tab}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <ToggleGroup
      type="single"
      value={activeTab}
      onValueChange={(value) => {
        if (value) onTabChange(value);
      }}
      size="sm"
    >
      {periodTabs.map((tab) => (
        <ToggleGroupItem key={tab} value={tab}>
          {tab}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export { MetricPeriodTabs };
