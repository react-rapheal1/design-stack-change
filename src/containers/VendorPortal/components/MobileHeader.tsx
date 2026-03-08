/* eslint-disable */
// @ts-nocheck
import { Menu01 } from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";

function MobileHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e9eaeb] bg-white px-4 py-3 lg:hidden">
      {" "}
      <RaydaLogo />{" "}
      <button type="button" onClick={onMenuOpen} className="rounded-lg p-2 hover:bg-[#fafafa]">
        {" "}
        <Menu01 className="size-5 text-[#414651]" />{" "}
      </button>{" "}
    </header>
  );
}
export { MobileHeader };
