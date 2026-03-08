/* eslint-disable */
// @ts-nocheck
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { RFQDevice } from "../RFQDevice";
import { truncateDeviceName } from "../truncateDeviceName";

function RFQDeviceCount({ devices }: { devices: RFQDevice[] }) {
  const totalQuantity = devices.reduce((sum, d) => sum + d.quantity, 0);
  const tooltipTitle = (
    <div className="flex flex-col gap-1">
      {" "}
      {devices.map((device, i) => (
        <span key={i}>
          {truncateDeviceName(device.name)} (×{device.quantity})
        </span>
      ))}{" "}
    </div>
  );
  return (
    <Tooltip title={tooltipTitle} placement="top" arrow>
      {" "}
      <TooltipTrigger>
        {" "}
        <span className="cursor-default text-sm text-fg-primary">{totalQuantity}</span>{" "}
      </TooltipTrigger>{" "}
    </Tooltip>
  );
}
export { RFQDeviceCount };
