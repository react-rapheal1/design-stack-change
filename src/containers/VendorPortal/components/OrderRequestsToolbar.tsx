import { FilterLines, SearchLg } from "@untitledui/icons";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import type { OrderFilters } from "../OrderFilters";
import { orderRequestTabs } from "../orderRequestTabs";
import { OrderFilterDropdown } from "./OrderFilterDropdown";

function OrderRequestsToolbar({
  activeFilterCount,
  activeTab,
  filters,
  onApplyFilters,
  onSearchChange,
  onTabChange,
  searchQuery,
  setCurrentPage,
  setShowFilterModal,
  showFilterModal,
  totalCount,
}: {
  activeFilterCount: number;
  activeTab: string;
  filters: OrderFilters;
  onApplyFilters: (filters: OrderFilters) => void;
  onSearchChange: (value: string) => void;
  onTabChange: (value: string) => void;
  searchQuery: string;
  setCurrentPage: (page: number) => void;
  setShowFilterModal: (open: boolean) => void;
  showFilterModal: boolean;
  totalCount: number;
}) {
  const isMd = useBreakpoint("md");

  return (
    <div className="flex flex-col gap-3 border-b border-[#e9eaeb] px-4 py-3 md:flex-row md:flex-wrap md:items-center md:justify-between md:px-6">
      {isMd ? (
        <ButtonGroup size="sm">
          {orderRequestTabs.map((tab) => (
            <ButtonGroupItem key={tab} isSelected={activeTab === tab} onClick={() => onTabChange(tab)}>
              {tab}
            </ButtonGroupItem>
          ))}
        </ButtonGroup>
      ) : (
        <Select
          size="sm"
          selectedKey={activeTab}
          onSelectionChange={(key) => onTabChange(key as string)}
          items={orderRequestTabs.map((tab) => ({ id: tab, label: tab }))}
        >
          {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
        </Select>
      )}
      <div className="flex items-center gap-2">
        <div className="flex-1 md:w-56 md:flex-none">
          <Input size="sm" icon={SearchLg} placeholder="Search..." value={searchQuery} onChange={(value) => onSearchChange(value)} />
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFilterModal(!showFilterModal)}
            className={cx(
              "flex h-10 items-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition-colors",
              showFilterModal ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]" : "border-[#e9eaeb] bg-white text-[#414651] hover:bg-[#fafafa]",
            )}
          >
            <FilterLines className="size-5" /> Filter
            {activeFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-[#0948b5] text-xs font-medium text-white">{activeFilterCount}</span>
            )}
          </button>
          <OrderFilterDropdown
            isOpen={showFilterModal}
            onClose={() => setShowFilterModal(false)}
            filters={filters}
            onApply={(nextFilters) => {
              onApplyFilters(nextFilters);
              setCurrentPage(1);
            }}
            resultCount={totalCount}
          />
        </div>
      </div>
    </div>
  );
}

export { OrderRequestsToolbar };
