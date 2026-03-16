"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { GuidedTooltip } from "@/components/guided-tooltip";
import { RemoteNavigation } from "../Shared/components/RemoteNavigation";
import { EmployeesHeader } from "./components/EmployeesHeader";
import { EmployeesTable } from "./components/EmployeesTable";
import { EmployeesTourBanner } from "./components/EmployeesTourBanner";
import { EquipmentModal } from "./components/EquipmentModal";
import { HrisPanel } from "./components/HrisPanel";
import { DUMMY_EMPLOYEES, HRIS_TOUR_STEPS } from "./data";
import type { Employee, HrisView, PanelTab } from "./data";

function panelConfig(tourParam: string | null): { initialTab: PanelTab; disabledTabs: PanelTab[] } {
  if (tourParam === "hris") return { initialTab: "hris", disabledTabs: ["import", "add"] };
  if (tourParam === "csv") return { initialTab: "import", disabledTabs: ["hris", "add"] };
  if (tourParam === "manual") return { initialTab: "add", disabledTabs: ["hris", "import"] };
  return { initialTab: "hris", disabledTabs: [] };
}

function EmployeesPage() {
  const searchParams = useSearchParams();
  const tourParam = searchParams.get("tour");
  const isTourActive = tourParam === "hris-tour";
  const [tooltipStep, setTooltipStep] = useState<number | null>(isTourActive ? 0 : null);
  const [showHrisModal, setShowHrisModal] = useState(tourParam === "csv" || tourParam === "manual" || tourParam === "hris");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const currentTooltip = tooltipStep !== null ? HRIS_TOUR_STEPS[tooltipStep] : null;

  function handlePanelViewChange(view: HrisView) {
    if (view === "syncing" && tooltipStep === 1) setTooltipStep(2);
    if (view === "connected" && tooltipStep === 2) setTooltipStep(3);
  }

  function handleTooltipNext() {
    if (tooltipStep === null) return;
    if (tooltipStep === 0) {
      setShowHrisModal(true);
      setTooltipStep(1);
      return;
    }
    if (tooltipStep === 4) {
      setTooltipStep(null);
      setShowEquipmentModal(true);
      return;
    }
    setTooltipStep(tooltipStep >= HRIS_TOUR_STEPS.length - 1 ? null : tooltipStep + 1);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f9fafb]">
      <RemoteNavigation activeKey="employees" />
      <div className="flex-1 overflow-y-auto">
        <div className="py-6 page-px lg:py-8">
          <EmployeesHeader
            currentTooltip={currentTooltip}
            tooltipStep={tooltipStep}
            onImport={() => {
              setShowHrisModal(true);
              if (isTourActive && tooltipStep === 0) setTooltipStep(1);
            }}
            onTooltipNext={handleTooltipNext}
          />
          <EmployeesTourBanner isTourActive={isTourActive} tooltipStep={tooltipStep} />
          <EmployeesTable
            employees={employees}
            isTourActive={isTourActive}
            tooltipStep={tooltipStep}
            onImport={() => {
              setShowHrisModal(true);
              if (isTourActive && tooltipStep === 0) setTooltipStep(1);
            }}
          />
        </div>
      </div>
      {showHrisModal && (
        <HrisPanel
          {...panelConfig(tourParam)}
          onClose={() => setShowHrisModal(false)}
          onViewChange={handlePanelViewChange}
          onSave={() => {
            setShowHrisModal(false);
            setEmployees(DUMMY_EMPLOYEES);
            setTooltipStep(4);
          }}
        />
      )}
      {showEquipmentModal && (
        <EquipmentModal
          onComplete={() => setShowEquipmentModal(false)}
          onSkip={() => setShowEquipmentModal(false)}
        />
      )}
      {currentTooltip && tooltipStep !== null && tooltipStep > 0 && (
        <GuidedTooltip
          step={tooltipStep}
          total={HRIS_TOUR_STEPS.length}
          title={currentTooltip.title}
          description={currentTooltip.description}
          ctaLabel={currentTooltip.ctaLabel}
          onNext={handleTooltipNext}
          className="fixed bottom-6 left-6 z-[60]"
        />
      )}
    </div>
  );
}

export default EmployeesPage;
