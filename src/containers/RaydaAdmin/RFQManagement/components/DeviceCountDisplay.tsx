/* eslint-disable */
// @ts-nocheck
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";

function DeviceCountDisplay({ devices }: { devices: { name: string; quantity: number }[] }) {
  const totalQuantity = devices.reduce((sum, d) => sum + d.quantity, 0);
  const maxVisible = 3;
  const remaining = devices.length - maxVisible;
  const tooltipContent = (
    <div className="flex flex-col gap-1">
      {" "}
      {devices.slice(0, maxVisible).map((device, i) => {
        const name = device.name.length > 30 ? device.name.slice(0, 30) + "…" : device.name;
        return (
          <span key={i}>
            {name} × {device.quantity}
          </span>
        );
      })}{" "}
      {remaining > 0 && (
        <span>
          + {remaining} more device{remaining === 1 ? "" : "s"}
        </span>
      )}{" "}
    </div>
  );
  return (
    <Tooltip title={tooltipContent} placement="top" arrow>
      {" "}
      <TooltipTrigger>
        {" "}
        <span className="cursor-default text-sm text-primary">{totalQuantity}</span>{" "}
      </TooltipTrigger>{" "}
    </Tooltip>
  );
}
export { DeviceCountDisplay };
