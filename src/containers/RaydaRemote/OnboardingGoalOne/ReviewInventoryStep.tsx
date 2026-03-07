import { useState } from "react";
import { Check, CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { MOCK_DEVICES } from "./data";

function ReviewInventoryStep() {
  const [confirmed, setConfirmed] = useState<Set<number>>(new Set());
  const needsAction = MOCK_DEVICES.filter((device) => device.status === "needs-confirmation");
  const confirmedDevices = MOCK_DEVICES.filter((device) => device.status === "confirmed");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-primary">Review your inventory</h2>
        <p className="mt-2 text-base text-tertiary">
          We found <strong>{MOCK_DEVICES.length} devices</strong>. Review the ones that need your attention.
        </p>
      </div>
      {needsAction.length > 0 && <NeedsConfirmationPanel confirmed={confirmed} onConfirm={setConfirmed} />}
      <ConfirmedDevicesPanel devices={confirmedDevices} />
    </div>
  );
}

function NeedsConfirmationPanel({ confirmed, onConfirm }: { confirmed: Set<number>; onConfirm: React.Dispatch<React.SetStateAction<Set<number>>> }) {
  const needsAction = MOCK_DEVICES.filter((device) => device.status === "needs-confirmation");

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="mb-3 text-sm font-semibold text-amber-800">{needsAction.length} devices need confirmation</p>
      <div className="flex flex-col gap-2">
        {needsAction.map((device, index) => (
          <div key={device.serial} className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5">
            <div>
              <p className="text-sm font-medium text-primary">{device.name}</p>
              <p className="text-xs text-tertiary">{device.serial}</p>
            </div>
            {confirmed.has(index) ? (
              <div className="flex items-center gap-1.5 text-brand-600">
                <CheckCircle className="size-4" />
                <span className="text-xs font-semibold">Confirmed</span>
              </div>
            ) : (
              <Button size="sm" color="secondary" onClick={() => onConfirm((prev) => new Set([...prev, index]))}>
                Confirm
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfirmedDevicesPanel({ devices }: { devices: typeof MOCK_DEVICES }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#eaecf0]">
      <div className="border-b border-[#eaecf0] bg-[#f9fafb] px-4 py-2.5">
        <p className="text-xs font-semibold text-tertiary">{devices.length} confirmed devices</p>
      </div>
      <div className="divide-y divide-[#eaecf0]">
        {devices.map((device) => (
          <div key={device.serial} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium text-primary">{device.name}</p>
              <p className="text-xs text-tertiary">
                {device.user} · {device.serial}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5">
              <Check className="size-3 text-green-600" />
              <span className="text-[11px] font-medium text-green-700">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ReviewInventoryStep };
