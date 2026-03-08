/* eslint-disable */
// @ts-nocheck
import { Device } from "../Device";

function DeviceAvatar({ device }: { device: Device }) {
  return (
    <div className="relative size-8 shrink-0 rounded-full border-[1.5px] border-white bg-[#f5f5f5]" title={device.name}>
      {" "}
      {device.image && <img src={device.image} alt={device.name} className="absolute inset-[15%] size-[70%] object-contain" />} {}{" "}
      <div className="absolute inset-0 rounded-full border border-black/[0.08]" />{" "}
    </div>
  );
}
export { DeviceAvatar };
