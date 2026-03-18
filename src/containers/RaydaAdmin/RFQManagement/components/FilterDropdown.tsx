"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toggleSelectedValue } from "@/utils/toggle-selected-value";
import type { RFQStatus, RequestFilters } from "../../shared";
import { countries, defaultFilters, formatCurrency, getStatusConfig } from "../../shared";
import { useAnchoredDropdown } from "../hooks/useAnchoredDropdown";
import { rfqStatuses } from "../rfqStatuses";
import { CountryFlag } from "./CountryFlag";

interface FilterDropdownProps {
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  filters: RequestFilters;
  isOpen: boolean;
  onApply: (f: RequestFilters) => void;
  onClose: () => void;
  resultCount: number;
}

function FilterDropdown({
  anchorRef,
  filters,
  isOpen,
  onApply,
  onClose,
  resultCount,
}: FilterDropdownProps) {
  const [localFilters, setLocalFilters] = useState<RequestFilters>(filters);
  const { dropdownRef, position } = useAnchoredDropdown({ anchorRef, isOpen, onClose });

  useEffect(() => {
    if (isOpen) setLocalFilters(filters);
  }, [filters, isOpen]);

  if (!isOpen) return null;

  const toggle = (key: keyof RequestFilters, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: toggleSelectedValue((prev[key] as string[]) ?? [], value),
    }));
  };

  return (
    <div
      ref={dropdownRef}
      style={{ top: position.top, right: position.right }}
      className="fixed z-50 max-h-[80vh] w-80 overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
    >
      <div className="flex flex-col gap-5">
        <FilterSection label="Status">
          {rfqStatuses.map((s) => {
            const config = getStatusConfig(s);
            return (
              <ToggleBadge
                key={s}
                selected={localFilters.statuses.includes(s)}
                color={config.color}
                label={config.label}
                onToggle={() => toggle("statuses", s)}
              />
            );
          })}
        </FilterSection>

        <FilterSection label="Country">
          {countries.map((c) => {
            const selected = localFilters.countries.includes(c);
            return (
              <button key={c} type="button" onClick={() => toggle("countries", c)}>
                {selected ? (
                  <Badge variant="brand" className="gap-1.5">
                    <Check className="size-3" />
                    {c}
                  </Badge>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-0.5 text-sm font-medium text-gray-700 ring-1 ring-gray-200 ring-inset">
                    <CountryFlag country={c} /> {c}
                  </span>
                )}
              </button>
            );
          })}
        </FilterSection>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-900">Budget Range</p>
          <Slider
            min={0}
            max={100000}
            step={1000}
            value={localFilters.budgetRange}
            onValueChange={(val) =>
              setLocalFilters((prev) => ({
                ...prev,
                budgetRange: val as [number, number],
              }))
            }
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>{formatCurrency(localFilters.budgetRange[0])}</span>
            <span>{formatCurrency(localFilters.budgetRange[1])}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setLocalFilters(defaultFilters);
              onApply(defaultFilters);
              onClose();
            }}
          >
            Reset
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onApply(localFilters);
              onClose();
            }}
          >
            Show {resultCount} results
          </Button>
        </div>
      </div>
    </div>
  );
}

interface FilterSectionProps {
  children: React.ReactNode;
  label: string;
}

function FilterSection({ children, label }: FilterSectionProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-900">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

interface ToggleBadgeProps {
  color: string;
  label: string;
  onToggle: () => void;
  selected: boolean;
}

function ToggleBadge({ color, label, onToggle, selected }: ToggleBadgeProps) {
  const variantMap: Record<string, "default" | "success" | "warning" | "error" | "gray" | "brand"> = {
    success: "success",
    warning: "warning",
    error: "error",
    gray: "gray",
    brand: "brand",
    blue: "brand",
    orange: "warning",
    "blue-light": "brand",
  };

  const variant = variantMap[color] || "gray";

  return (
    <button type="button" onClick={onToggle}>
      {selected ? (
        <Badge variant={variant} className="gap-1.5">
          <Check className="size-3" />
          {label}
        </Badge>
      ) : (
        <Badge variant={variant}>{label}</Badge>
      )}
    </button>
  );
}

export { FilterDropdown };
