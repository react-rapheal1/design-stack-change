import { Package, Plus, SearchMd, Settings01, Upload01, UserPlus01, ZapFast } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

interface EquipmentTableProps {
  isActionStep: boolean;
  onOpenAdd: () => void;
  onOpenCsv: () => void;
  onOpenSelfReport: () => void;
  tour: string;
}

export function EquipmentTable({ isActionStep, onOpenAdd, onOpenCsv, onOpenSelfReport, tour }: EquipmentTableProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-[#eaecf0] bg-white">
      <div className="flex items-center justify-between border-b border-[#eaecf0] px-5 py-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-primary">Equipment</p>
          <span className="rounded-full bg-[#f2f4f7] px-2 py-0.5 text-xs font-semibold text-tertiary">0 devices</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 items-center gap-2 rounded-lg border border-[#d0d5dd] bg-white px-3 text-sm text-tertiary">
            <SearchMd className="size-4 text-[#667085]" />
            <span>Search</span>
          </div>
          <Button color="secondary" size="sm" iconLeading={Settings01}>
            Filter
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 border-b border-[#eaecf0] bg-[#f9fafb] px-5 py-3 text-xs font-semibold text-tertiary">
        <span>Device</span>
        <span>Serial number</span>
        <span>Assigned to</span>
        <span>Condition</span>
        <span>Status</span>
      </div>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f2f4f7]">
          <Package className="size-6 text-[#667085]" />
        </div>
        <p className="mt-3 text-sm font-semibold text-secondary">No devices yet</p>
        <p className="mt-1 text-sm text-tertiary">
          {tour === "csv"
            ? "Upload a CSV to bulk-import your device inventory."
            : tour === "manual"
              ? "Add devices one at a time to build your inventory."
              : tour === "self-report"
                ? "Send a self-report form so employees can log their devices."
                : "Add or import devices to start tracking your inventory."}
        </p>
        <div className="mt-4 flex gap-2">
          <EmptyActions isActionStep={isActionStep} onOpenAdd={onOpenAdd} onOpenCsv={onOpenCsv} onOpenSelfReport={onOpenSelfReport} tour={tour} />
        </div>
      </div>
    </div>
  );
}

function EmptyActions({ isActionStep, onOpenAdd, onOpenCsv, onOpenSelfReport, tour }: EquipmentTableProps) {
  if (tour === "csv")
    return (
      <Button size="sm" iconLeading={Upload01} onClick={onOpenCsv} className={cx(isActionStep && "ring-2 ring-brand-400 ring-offset-2")}>
        Import CSV
      </Button>
    );
  if (tour === "manual")
    return (
      <Button size="sm" iconLeading={UserPlus01} onClick={onOpenAdd} className={cx(isActionStep && "ring-2 ring-brand-400 ring-offset-2")}>
        Add device
      </Button>
    );
  if (tour === "self-report")
    return (
      <Button size="sm" iconLeading={ZapFast} onClick={onOpenSelfReport} className={cx(isActionStep && "ring-2 ring-brand-400 ring-offset-2")}>
        Send self-report
      </Button>
    );
  return (
    <>
      <Button size="sm" iconLeading={Upload01} onClick={onOpenCsv}>
        Import CSV
      </Button>
      <Button color="secondary" size="sm" iconLeading={Plus} onClick={onOpenAdd}>
        Add device
      </Button>
    </>
  );
}
