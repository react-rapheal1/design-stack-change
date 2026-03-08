"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronDown, Trash03, XClose } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Slider } from "@/components/base/slider/slider";
import { cx } from "@/utils/cx";
import { assetStateFilters, hardDriveFilters, osFilters, ramFilters, typeFilters } from "../data";

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col gap-4">
      <button type="button" className="flex w-full items-center justify-between px-3.5 py-2.5" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-semibold text-[#101828]">{title}</span>
        <ChevronDown className={cx("size-5 text-[#667085] transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      {isOpen && <div className="flex flex-col gap-1 px-3.5">{children}</div>}
    </div>
  );
}
function CheckboxFilterItem({ label }: { label: string }) {
  return (
    <div className="py-2">
      <Checkbox size="md" label={label} />
    </div>
  );
}
function FilterSidebarContent() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg leading-7 font-semibold text-[#101828]">Filter</h2>
          <p className="text-sm text-[#475467]">Find the right hardware for your team</p>
        </div>
        <div className="h-px w-full bg-border-secondary" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3.5 py-2.5">
          <span className="text-lg font-semibold text-[#101828]">Price</span>
        </div>
        <div className="flex flex-col gap-2.5 px-3.5">
          <div className="flex gap-6">
            <div className="flex flex-1 flex-col gap-1.5">
              <label className="text-sm font-medium text-[#344054]">From</label>
              <div className="flex items-center rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 shadow-xs">
                <span className="text-base text-[#475467]">₦</span>
                <input type="text" defaultValue="1,000.00" className="ml-2 w-full bg-transparent text-base text-[#667085] outline-none" />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <label className="text-sm font-medium text-[#344054]">To</label>
              <div className="flex items-center rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 shadow-xs">
                <span className="text-base text-[#475467]">₦</span>
                <input type="text" defaultValue="1,000,000.00" className="ml-2 w-full bg-transparent text-base text-[#667085] outline-none" />
              </div>
            </div>
          </div>
          <Slider defaultValue={[0, 75]} minValue={0} maxValue={100} />
        </div>
      </div>
      <div className="h-px w-full bg-border-secondary" />
      <FilterSection title="Type">
        {typeFilters.map((filter) => (
          <CheckboxFilterItem key={filter} label={filter} />
        ))}
      </FilterSection>
      <div className="h-px w-full bg-border-secondary" />
      <FilterSection title="Asset State">
        {assetStateFilters.map((filter) => (
          <CheckboxFilterItem key={filter} label={filter} />
        ))}
      </FilterSection>
      <div className="h-px w-full bg-border-secondary" />
      <FilterSection title="Hard Drive">
        {hardDriveFilters.map((filter) => (
          <CheckboxFilterItem key={filter} label={filter} />
        ))}
      </FilterSection>
      <div className="h-px w-full bg-border-secondary" />
      <FilterSection title="RAM">
        {ramFilters.map((filter) => (
          <CheckboxFilterItem key={filter} label={filter} />
        ))}
      </FilterSection>
      <div className="h-px w-full bg-border-secondary" />
      <FilterSection title="OS">
        {osFilters.map((filter) => (
          <CheckboxFilterItem key={filter} label={filter} />
        ))}
      </FilterSection>
      <div className="h-px w-full bg-border-secondary" />
      <div className="flex items-start gap-6 pt-4">
        <Button size="lg" className="flex-1">
          {" "}
          Apply Filter{" "}
        </Button>
        <button
          type="button"
          className="flex size-12 items-center justify-center rounded-full border border-[#d0d5dd] bg-white shadow-xs transition hover:bg-gray-50"
        >
          <Trash03 className="size-5 text-[#344054]" />
        </button>
      </div>
    </div>
  );
}
function FilterSidebar() {
  return (
    <aside className="hidden w-[280px] shrink-0 flex-col gap-2 lg:flex xl:w-[348px]">
      <FilterSidebarContent />
    </aside>
  );
}
function MobileFilterDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 flex w-full max-w-[340px] flex-col bg-[#fcfcfd]">
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-4 py-4">
          <h2 className="text-lg font-semibold text-[#101828]">Filters</h2>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-[#667085] transition hover:text-[#101828]">
            <XClose className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <FilterSidebarContent />
        </div>
      </div>
    </div>
  );
}
export { FilterSection, CheckboxFilterItem, FilterSidebarContent, FilterSidebar, MobileFilterDrawer };
