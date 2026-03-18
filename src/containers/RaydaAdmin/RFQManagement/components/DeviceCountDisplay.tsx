"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Device {
  name: string;
  quantity: number;
}

interface DeviceCountDisplayProps {
  devices: Device[];
}

function DeviceCountDisplay({ devices }: DeviceCountDisplayProps) {
  const totalQuantity = devices.reduce((sum, d) => sum + d.quantity, 0);
  const maxVisible = 3;
  const remaining = devices.length - maxVisible;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-default text-sm text-primary">
            {totalQuantity}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="flex flex-col gap-1">
            {devices.slice(0, maxVisible).map((device, i) => {
              const name =
                device.name.length > 30
                  ? device.name.slice(0, 30) + "..."
                  : device.name;
              return (
                <span key={i}>
                  {name} x {device.quantity}
                </span>
              );
            })}
            {remaining > 0 && (
              <span>
                + {remaining} more device{remaining === 1 ? "" : "s"}
              </span>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { DeviceCountDisplay };
