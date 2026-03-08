import { cx } from "@/utils/cx";
import type { TourStep } from "../tourSteps";

interface TourContextBannerProps {
  steps: TourStep[];
  tooltipStep: number | null;
  tour: string;
}

export function TourContextBanner({ steps, tooltipStep, tour }: TourContextBannerProps) {
  if (tooltipStep === null || tooltipStep >= 2 || steps.length === 0) {
    return null;
  }

  return (
    <div
      className={cx(
        "mt-6 flex items-center gap-3 rounded-xl border px-5 py-3.5",
        tour === "csv" && "border-blue-200 bg-blue-50",
        tour === "manual" && "border-purple-200 bg-purple-50",
        tour === "self-report" && "border-teal-200 bg-teal-50",
      )}
    >
      <p className={cx("text-sm", tour === "csv" && "text-blue-700", tour === "manual" && "text-purple-700", tour === "self-report" && "text-teal-700")}>
        <strong>
          Step {(tooltipStep ?? 0) + 1} of {steps.length}:
        </strong>{" "}
        {tooltipStep === 0
          ? "You're on the All Equipment page. Click Continue on the guide to proceed."
          : tour === "csv"
            ? "Click 'Import CSV' above to upload your spreadsheet."
            : tour === "manual"
              ? "Click 'Add Device' above to add your first device."
              : "Click 'Send self-report' above to email your team."}
      </p>
    </div>
  );
}
