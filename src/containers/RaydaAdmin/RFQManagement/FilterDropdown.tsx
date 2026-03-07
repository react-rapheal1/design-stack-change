/* eslint-disable */
// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Check } from "@untitledui/icons";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Slider } from "@/components/base/slider/slider";
import { RFQStatus, RequestFilters, countries, defaultFilters, formatCurrency, getStatusConfig } from "../shared";
import { CountryFlag } from "./CountryFlag";

function FilterDropdown({
  isOpen,
  onClose,
  filters,
  onApply,
  resultCount,
  anchorRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: RequestFilters;
  onApply: (f: RequestFilters) => void;
  resultCount: number;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const [localFilters, setLocalFilters] = useState<RequestFilters>(filters);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });
  const updatePosition = useCallback(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    }
  }, [anchorRef]);
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
      updatePosition();
    }
  }, [isOpen, filters, updatePosition]);
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, updatePosition]);
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose, anchorRef]);
  if (!isOpen) return null;
  const allStatuses: RFQStatus[] = [
    "pending_vendors",
    "vendors_responded",
    "response_sent",
    "fully_accepted",
    "partially_accepted",
    "customer_rejected",
    "expired",
  ];
  const toggleStatus = (s: RFQStatus) => {
    setLocalFilters((prev) => ({ ...prev, statuses: prev.statuses.includes(s) ? prev.statuses.filter((x) => x !== s) : [...prev.statuses, s] }));
  };
  const toggleCountry = (c: string) => {
    setLocalFilters((prev) => ({ ...prev, countries: prev.countries.includes(c) ? prev.countries.filter((x) => x !== c) : [...prev.countries, c] }));
  };
  return (
    <div
      ref={dropdownRef}
      style={{ top: position.top, right: position.right }}
      className="fixed z-50 w-80 rounded-xl border border-secondary bg-primary p-4 shadow-lg"
    >
      {" "}
      <div className="flex flex-col gap-5">
        {" "}
        {}{" "}
        <div>
          {" "}
          <p className="mb-2 text-sm font-medium text-primary">Status</p>{" "}
          <div className="flex flex-wrap gap-2">
            {" "}
            {allStatuses.map((s) => {
              const config = getStatusConfig(s);
              const isSelected = localFilters.statuses.includes(s);
              return (
                <button key={s} type="button" onClick={() => toggleStatus(s)}>
                  {" "}
                  {isSelected ? (
                    <BadgeWithIcon size="md" color={config.color} type="pill-color" iconLeading={Check}>
                      {" "}
                      {config.label}{" "}
                    </BadgeWithIcon>
                  ) : (
                    <Badge size="md" color={config.color} type="pill-color">
                      {" "}
                      {config.label}{" "}
                    </Badge>
                  )}{" "}
                </button>
              );
            })}{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div>
          {" "}
          <p className="mb-2 text-sm font-medium text-primary">Country</p>{" "}
          <div className="flex flex-wrap gap-2">
            {" "}
            {countries.map((c) => {
              const isSelected = localFilters.countries.includes(c);
              return (
                <button key={c} type="button" onClick={() => toggleCountry(c)}>
                  {" "}
                  {isSelected ? (
                    <BadgeWithIcon size="md" color="brand" type="pill-color" iconLeading={Check}>
                      {" "}
                      {c}{" "}
                    </BadgeWithIcon>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-utility-gray-50 px-2.5 py-0.5 text-sm font-medium text-utility-gray-700 ring-1 ring-utility-gray-200 ring-inset">
                      {" "}
                      <CountryFlag country={c} /> {c}{" "}
                    </span>
                  )}{" "}
                </button>
              );
            })}{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div>
          {" "}
          <p className="mb-2 text-sm font-medium text-primary">Budget Range</p>{" "}
          <Slider
            minValue={0}
            maxValue={100000}
            step={1000}
            value={localFilters.budgetRange}
            onChange={(val) => setLocalFilters((prev) => ({ ...prev, budgetRange: val as [number, number] }))}
          />{" "}
          <div className="mt-1 flex justify-between text-xs text-tertiary">
            {" "}
            <span>{formatCurrency(localFilters.budgetRange[0])}</span> <span>{formatCurrency(localFilters.budgetRange[1])}</span>{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="flex items-center justify-between border-t border-secondary pt-4">
          {" "}
          <button
            type="button"
            className="text-sm font-semibold text-tertiary transition hover:text-primary"
            onClick={() => {
              setLocalFilters(defaultFilters);
              onApply(defaultFilters);
              onClose();
            }}
          >
            {" "}
            Reset{" "}
          </button>{" "}
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              onApply(localFilters);
              onClose();
            }}
          >
            {" "}
            Show {resultCount} results{" "}
          </Button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export { FilterDropdown };
