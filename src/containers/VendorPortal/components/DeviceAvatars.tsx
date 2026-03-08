/* eslint-disable */
// @ts-nocheck
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { Device } from "../Device";
import { truncateDeviceName } from "../truncateDeviceName";
import { DeviceAvatar } from "./DeviceAvatar";

function DeviceAvatars({ devices }: { devices: Device[] }) {
  const count = devices.length;
  const shownDevices = devices.slice(0, 3);
  const extra = count - 3;
  const visibleDevices = devices.slice(0, 3);
  const remainingCount = count - 3;
  const tooltipTitle = (
    <div className="flex flex-col gap-1">
      {" "}
      {visibleDevices.map((device, i) => (
        <span key={i}>{truncateDeviceName(device.name)}</span>
      ))}{" "}
      {remainingCount > 0 && (
        <span className="text-tooltip-supporting-text">
          +{remainingCount} more device{remainingCount > 1 ? "s" : ""}
        </span>
      )}{" "}
    </div>
  );
  return (
    <Tooltip title={tooltipTitle} placement="top" arrow>
      {" "}
      <TooltipTrigger>
        {" "}
        <div className="flex items-center gap-1">
          {" "}
          <span className="text-sm text-[#181d27]">{count}</span>{" "}
          <div className="flex -space-x-1.5">
            {" "}
            {shownDevices.map((device, i) => (
              <DeviceAvatar key={i} device={device} />
            ))}{" "}
            {extra > 0 && (
              <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white bg-[#f5f5f5]">
                {" "}
                <span className="text-xs font-medium text-[#535862]">+{extra}</span>{" "}
                <div className="absolute inset-0 rounded-full border border-black/[0.08]" />{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </TooltipTrigger>{" "}
    </Tooltip>
  );
}
export { DeviceAvatars };
