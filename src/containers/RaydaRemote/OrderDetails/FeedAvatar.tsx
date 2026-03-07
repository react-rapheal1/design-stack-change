/* eslint-disable */
// @ts-nocheck
import { ZapFast } from "@untitledui/icons";

function FeedAvatar({ initials, type }: { initials: string; type: string }) {
  if (type === "system") {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e7f0ff]">
        {" "}
        <ZapFast className="size-5 text-[#0948b5]" />{" "}
      </div>
    );
  }
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7]">
      {" "}
      <span className="text-sm font-medium text-[#475467]">{initials}</span>{" "}
    </div>
  );
}
export { FeedAvatar };
