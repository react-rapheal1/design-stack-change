import { Plus } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { GuidedTooltip } from "@/components/guided-tooltip";
import { HRIS_TOUR_STEPS } from "./data";

function EmployeesHeader({
  currentTooltip,
  onImport,
  onTooltipNext,
  tooltipStep,
}: {
  currentTooltip: (typeof HRIS_TOUR_STEPS)[number] | null;
  onImport: () => void;
  onTooltipNext: () => void;
  tooltipStep: number | null;
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-primary">Manage Employees</h1>
        <p className="mt-1 text-sm text-tertiary">Easily provide your employees with the necessary hardware to start their journey in your company.</p>
      </div>
      <div className="relative">
        <Button id="btn-import-employee" size="sm" iconLeading={Plus} onClick={onImport}>
          Import Employee
        </Button>
        {tooltipStep === 0 && currentTooltip && (
          <GuidedTooltip
            step={tooltipStep}
            total={HRIS_TOUR_STEPS.length}
            title={currentTooltip.title}
            description={currentTooltip.description}
            ctaLabel={currentTooltip.ctaLabel}
            onNext={onTooltipNext}
            className="absolute top-full right-0 z-50 mt-3"
          />
        )}
      </div>
    </div>
  );
}

export { EmployeesHeader };
