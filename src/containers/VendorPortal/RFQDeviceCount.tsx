/* eslint-disable */
// @ts-nocheck
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { RFQDevice } from "./RFQDevice";
import { truncateDeviceName } from "./truncateDeviceName";

function RFQDeviceCount({ devices }: { devices: RFQDevice[] }) {
  const totalQuantity = devices.reduce((sum, d) => sum + d.quantity, 0);
  const maxVisible = 3;
  const remaining = devices.length - maxVisible;
  const tooltipTitle = (
    <div className="flex flex-col gap-1">
      {" "}
      {devices.slice(0, maxVisible).map((device, i) => (
        <span key={i}>
          {truncateDeviceName(device.name)} × {device.quantity}
        </span>
      ))}{" "}
      {remaining > 0 && (
        <span>
          + {remaining} more device{remaining === 1 ? "" : "s"}
        </span>
      )}{" "}
    </div>
  );
  return (
    <Tooltip title={tooltipTitle} placement="top" arrow>
      {" "}
      <TooltipTrigger>
        {" "}
        <span className="cursor-default text-sm text-[#181d27]">{totalQuantity}</span>{" "}
      </TooltipTrigger>{" "}
    </Tooltip>
  );
}
export { RFQDeviceCount };
