import { Link04 } from "@untitledui/icons";
import { HRIS_TOUR_STEPS } from "../data";

function EmployeesTourBanner({ isTourActive, tooltipStep }: { isTourActive: boolean; tooltipStep: number | null }) {
  if (!isTourActive || tooltipStep === null || tooltipStep >= 2) {
    return null;
  }

  return (
    <div className="mt-6 flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 px-5 py-3.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100">
        <Link04 className="size-4 text-brand-600" />
      </div>
      <p className="text-sm text-brand-700">
        <strong>
          Step {tooltipStep + 1} of {HRIS_TOUR_STEPS.length}:
        </strong>{" "}
        {tooltipStep === 0
          ? "You're on the Employees page. Click 'Select Another Method' on the guide to proceed."
          : "Click the 'Import Employee' button above to connect your HRIS."}
      </p>
    </div>
  );
}

export { EmployeesTourBanner };
