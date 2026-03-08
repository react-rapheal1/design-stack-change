"use client";

import { Button } from "@/components/base/buttons/button";

function FilterDropdownActions({
  applyLabel,
  applyLeadingIcon,
  onApply,
  onReset,
  showReset = true,
}: {
  applyLabel: string;
  applyLeadingIcon?: React.ComponentType<{ className?: string }>;
  onApply: () => void;
  onReset?: () => void;
  showReset?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-t border-secondary pt-4">
      {showReset ? (
        <button type="button" className="text-sm font-semibold text-tertiary transition hover:text-primary" onClick={onReset}>
          Reset
        </button>
      ) : (
        <div />
      )}
      <Button size="sm" color="primary" iconLeading={applyLeadingIcon} onClick={onApply}>
        {applyLabel}
      </Button>
    </div>
  );
}

export { FilterDropdownActions };
