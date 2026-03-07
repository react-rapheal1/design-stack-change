import type { ComponentType } from "react";
import { cx } from "@/utils/cx";

function FlagAvatar({ Flag, size = 48, className }: { Flag: ComponentType<{ className?: string }>; size?: number; className?: string }) {
  return (
    <div className={cx("overflow-hidden rounded-full border-[1.5px] border-[#b0cdff]", className)} style={{ width: size, height: size }}>
      <Flag className="size-full" />
    </div>
  );
}
export { FlagAvatar };
