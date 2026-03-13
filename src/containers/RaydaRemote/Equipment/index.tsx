"use client";

import { useState } from "react";
import { Plus, Upload01, ZapFast } from "@untitledui/icons";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { GuidedTooltip } from "@/components/guided-tooltip";
import { cx } from "@/utils/cx";
import { RemoteNavigation } from "../Shared/components/RemoteNavigation";
import { AddEquipmentPanel } from "./components/AddEquipmentPanel";
import { EquipmentTable } from "./components/EquipmentTable";
import { SelfReportModal } from "./components/SelfReportModal";
import { TourContextBanner } from "./components/TourContextBanner";
import { tourSteps } from "./tourSteps";

export default function EquipmentPage() {
  const searchParams = useSearchParams();
  const tour = searchParams.get("tour") ?? "";
  const open = searchParams.get("open") ?? "";
  const steps = tourSteps[tour] ?? [];
  const [tooltipStep, setTooltipStep] = useState<number | null>(steps.length > 0 ? 0 : null);
  const [panelTab, setPanelTab] = useState<"import" | "add" | null>(
    open === "csv" ? "import" : open === "manual" ? "add" : null,
  );
  const [showSelfReportModal, setShowSelfReportModal] = useState(open === "self-report");
  const currentTooltip = tooltipStep !== null ? steps[tooltipStep] : null;
  const isActionStep = currentTooltip?.actionStep === 1;

  function handleTooltipNext() {
    if (tooltipStep === null) return;
    if (steps[tooltipStep]?.actionStep === 1) {
      if (tour === "csv") setPanelTab("import");
      if (tour === "manual") setPanelTab("add");
      if (tour === "self-report") setShowSelfReportModal(true);
    }
    setTooltipStep(tooltipStep >= steps.length - 1 ? null : tooltipStep + 1);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f9fafb]">
      <RemoteNavigation activeKey="equipment" />
      <div className="flex-1 overflow-y-auto">
        <div className="py-6 page-px lg:py-8">
          <HeaderActions
            isActionStep={isActionStep}
            onOpenAdd={() => setPanelTab("add")}
            onOpenCsv={() => setPanelTab("import")}
            onOpenSelfReport={() => setShowSelfReportModal(true)}
            tour={tour}
          />
          <TourContextBanner steps={steps} tooltipStep={tooltipStep} tour={tour} />
          <EquipmentTable
            isActionStep={isActionStep}
            onOpenAdd={() => setPanelTab("add")}
            onOpenCsv={() => setPanelTab("import")}
            onOpenSelfReport={() => setShowSelfReportModal(true)}
            tour={tour}
          />
        </div>
      </div>
      {panelTab && <AddEquipmentPanel initialTab={panelTab} onClose={() => setPanelTab(null)} />}
      {showSelfReportModal && <SelfReportModal onClose={() => setShowSelfReportModal(false)} />}
      {currentTooltip && tooltipStep !== null && (
        <GuidedTooltip
          step={tooltipStep}
          total={steps.length}
          title={currentTooltip.title}
          description={currentTooltip.description}
          onNext={handleTooltipNext}
          onSkip={() => setTooltipStep(null)}
        />
      )}
    </div>
  );
}

function HeaderActions({
  isActionStep,
  onOpenAdd,
  onOpenCsv,
  onOpenSelfReport,
  tour,
}: {
  isActionStep: boolean;
  onOpenAdd: () => void;
  onOpenCsv: () => void;
  onOpenSelfReport: () => void;
  tour: string;
}) {
  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">All Equipment</h1>
          <p className="mt-1 text-sm text-tertiary">Manage all devices across your organization. Assignments, conditions, and refresh schedules.</p>
        </div>
        <div className="flex items-center gap-2">
          {(tour === "csv" || !tour) && (
            <Button
              color="secondary"
              size="sm"
              iconLeading={Upload01}
              onClick={onOpenCsv}
              className={cx(isActionStep && tour === "csv" && "ring-2 ring-brand-400 ring-offset-2")}
            >
              Import CSV
            </Button>
          )}
          {(tour === "self-report" || !tour) && (
            <Button
              color="secondary"
              size="sm"
              iconLeading={ZapFast}
              onClick={onOpenSelfReport}
              className={cx(isActionStep && tour === "self-report" && "ring-2 ring-brand-400 ring-offset-2")}
            >
              Send self-report
            </Button>
          )}
          <Button size="sm" iconLeading={Plus} onClick={onOpenAdd} className={cx(isActionStep && tour === "manual" && "ring-2 ring-brand-400 ring-offset-2")}>
            Add Device
          </Button>
        </div>
      </div>
    </>
  );
}
