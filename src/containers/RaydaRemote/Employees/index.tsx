"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { GuidedTooltip } from "@/components/guided-tooltip";
import { RemoteNavigation } from "../Shared/components/RemoteNavigation";
import { EmployeesHeader } from "./components/EmployeesHeader";
import { EmployeesTable } from "./components/EmployeesTable";
import { EmployeesTourBanner } from "./components/EmployeesTourBanner";
import { HrisPanel } from "./components/HrisPanel";
import { ResolveFlagsPanel } from "./components/ResolveFlagsPanel";
import { DUMMY_EMPLOYEES, HRIS_TOUR_STEPS, RESOLVE_FLAGS_TOUR_STEPS } from "./data";
import type { Employee, HrisView } from "./data";

function EmployeesPage() {
  const searchParams = useSearchParams();
  const tourParam = searchParams.get("tour");
  const isTourActive = tourParam === "hris";
  const [tooltipStep, setTooltipStep] = useState<number | null>(isTourActive ? 0 : null);
  const [showHrisModal, setShowHrisModal] = useState(tourParam === "csv" || tourParam === "manual");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showResolvePanel, setShowResolvePanel] = useState(false);
  const [resolveTooltipStep, setResolveTooltipStep] = useState<number | null>(null);
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
      setShowResolvePanel(true);
      setResolveTooltipStep(0);
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
          initialTab={tourParam === "csv" ? "import" : tourParam === "manual" ? "add" : undefined}
          onClose={() => setShowHrisModal(false)}
          onViewChange={handlePanelViewChange}
          onSave={() => {
            setShowHrisModal(false);
            setEmployees(DUMMY_EMPLOYEES);
            setTooltipStep(4);
          }}
        />
      )}
      {showResolvePanel && (
        <ResolveFlagsPanel
          employees={employees}
          onClose={() => setShowResolvePanel(false)}
          onResolveStep={(step) => {
            if (step === 1) setResolveTooltipStep(1);
          }}
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
      {showResolvePanel && resolveTooltipStep !== null && RESOLVE_FLAGS_TOUR_STEPS[resolveTooltipStep] && (
        <GuidedTooltip
          step={resolveTooltipStep}
          total={RESOLVE_FLAGS_TOUR_STEPS.length}
          title={RESOLVE_FLAGS_TOUR_STEPS[resolveTooltipStep].title}
          description={RESOLVE_FLAGS_TOUR_STEPS[resolveTooltipStep].description}
          ctaLabel={RESOLVE_FLAGS_TOUR_STEPS[resolveTooltipStep].ctaLabel}
          onNext={() => {
            if (resolveTooltipStep >= RESOLVE_FLAGS_TOUR_STEPS.length - 1) {
              setResolveTooltipStep(null);
              setShowResolvePanel(false);
              return;
            }
            setResolveTooltipStep(resolveTooltipStep + 1);
          }}
          className="fixed bottom-6 left-6 z-[60]"
        />
      )}
    </div>
  );
}

export default EmployeesPage;
