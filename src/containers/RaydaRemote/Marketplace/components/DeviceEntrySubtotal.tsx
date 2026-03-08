import { cx } from "@/utils/cx";
import type { DeviceEntry } from "../data";

function DeviceEntrySubtotal({ className, device, emptyLabel }: { className?: string; device: DeviceEntry; emptyLabel?: string }) {
  const quantity = parseInt(device.quantity, 10);
  const budget = parseInt(device.budgetPrice, 10);

  return (
    <div className={cx("flex items-center justify-between", className)}>
      <span className="text-[#475467]">Subtotal</span>
      {device.budgetPrice && device.quantity ? (
        <span className="text-[#475467]">
          {budget.toLocaleString()} × {device.quantity} = <span className="font-semibold text-[#101828]">{(budget * quantity).toLocaleString()}</span>
        </span>
      ) : (
        <span className="text-[#475467] italic">{emptyLabel ?? "No budget added"}</span>
      )}
    </div>
  );
}

export { DeviceEntrySubtotal };
