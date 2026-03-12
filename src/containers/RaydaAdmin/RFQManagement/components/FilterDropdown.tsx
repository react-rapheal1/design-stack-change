import { useEffect, useState } from "react";
import { Check } from "@untitledui/icons";
import { FilterDropdownActions } from "@/components/application/filter-dropdown-actions";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Slider } from "@/components/base/slider/slider";
import { toggleSelectedValue } from "@/utils/toggle-selected-value";
import type { RFQStatus, RequestFilters } from "../../shared";
import { countries, defaultFilters, formatCurrency, getStatusConfig } from "../../shared";
import { useAnchoredDropdown } from "../hooks/useAnchoredDropdown";
import { rfqStatuses } from "../rfqStatuses";
import { CountryFlag } from "./CountryFlag";

function FilterDropdown({
  anchorRef,
  filters,
  isOpen,
  onApply,
  onClose,
  resultCount,
}: {
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  filters: RequestFilters;
  isOpen: boolean;
  onApply: (f: RequestFilters) => void;
  onClose: () => void;
  resultCount: number;
}) {
  const [localFilters, setLocalFilters] = useState<RequestFilters>(filters);
  const { dropdownRef, position } = useAnchoredDropdown({ anchorRef, isOpen, onClose });

  useEffect(() => {
    if (isOpen) setLocalFilters(filters);
  }, [filters, isOpen]);

  if (!isOpen) return null;

  const toggle = (key: keyof RequestFilters, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: toggleSelectedValue((prev[key] as string[]) ?? [], value) }));
  };

  return (
    <div
      ref={dropdownRef}
      style={{ top: position.top, right: position.right }}
      className="fixed z-50 max-h-[80vh] w-80 overflow-y-auto rounded-xl border border-secondary bg-primary p-4 shadow-lg"
    >
      <div className="flex flex-col gap-5">
        <FilterSection label="Status">
          {rfqStatuses.map((s) => {
            const config = getStatusConfig(s);
            return (
              <ToggleBadge key={s} selected={localFilters.statuses.includes(s)} color={config.color} label={config.label} onToggle={() => toggle("statuses", s)} />
            );
          })}
        </FilterSection>
<FilterSection label="Country">
          {countries.map((c) => {
            const selected = localFilters.countries.includes(c);
            return (
              <button key={c} type="button" onClick={() => toggle("countries", c)}>
                {selected ? (
                  <BadgeWithIcon size="md" color="brand" type="pill-color" iconLeading={Check}>
                    {c}
                  </BadgeWithIcon>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-utility-gray-50 px-2.5 py-0.5 text-sm font-medium text-utility-gray-700 ring-1 ring-utility-gray-200 ring-inset">
                    <CountryFlag country={c} /> {c}
                  </span>
                )}
              </button>
            );
          })}
        </FilterSection>
        <div>
          <p className="mb-2 text-sm font-medium text-primary">Budget Range</p>
          <Slider
            minValue={0}
            maxValue={100000}
            step={1000}
            value={localFilters.budgetRange}
            onChange={(val) => setLocalFilters((prev) => ({ ...prev, budgetRange: val as [number, number] }))}
          />
          <div className="mt-1 flex justify-between text-xs text-tertiary">
            <span>{formatCurrency(localFilters.budgetRange[0])}</span>
            <span>{formatCurrency(localFilters.budgetRange[1])}</span>
          </div>
        </div>
        <FilterDropdownActions
          applyLabel={`Show ${resultCount} results`}
          onApply={() => { onApply(localFilters); onClose(); }}
          onReset={() => { setLocalFilters(defaultFilters); onApply(defaultFilters); onClose(); }}
        />
      </div>
    </div>
  );
}

function FilterSection({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-primary">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function ToggleBadge({ color, label, onToggle, selected }: { color: string; label: string; onToggle: () => void; selected: boolean }) {
  return (
    <button type="button" onClick={onToggle}>
      {selected ? (
        <BadgeWithIcon size="md" color={color as never} type="pill-color" iconLeading={Check}>
          {label}
        </BadgeWithIcon>
      ) : (
        <Badge size="md" color={color as never} type="pill-color">
          {label}
        </Badge>
      )}
    </button>
  );
}

export { FilterDropdown };
