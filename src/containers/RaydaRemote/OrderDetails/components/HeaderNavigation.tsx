/* eslint-disable */
// @ts-nocheck
import { Bell02, Settings01 } from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";

function HeaderNavigation() {
  const navItems = ["Overview", "Orders", "Marketplace", "Catalogs", "Storage", "Employees", "All equipment"];
  return (
    <header className="sticky top-0 z-40 flex w-full shrink-0 flex-col items-center border-b border-[#22262f] bg-[#0c0e12]">
      {" "}
      <div className="flex h-[72px] w-full max-w-[1280px] items-center justify-between px-8">
        {" "}
        <div className="flex items-center gap-6">
          {" "}
          <RaydaLogo variant="white" />{" "}
          <nav className="flex items-center gap-0.5">
            {" "}
            {navItems.map((item) => (
              <span
                key={item}
                className={`cursor-pointer rounded-md px-3 py-2 text-sm font-semibold ${item === "Orders" ? "bg-[#22262f] text-[#ececed]" : "text-[#cecfd2] hover:bg-white/5"}`}
              >
                {" "}
                {item}{" "}
              </span>
            ))}{" "}
          </nav>{" "}
        </div>{" "}
        <div className="flex items-center gap-1">
          {" "}
          <button type="button" className="flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5">
            <Bell02 className="size-5" />
          </button>{" "}
          <button type="button" className="flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5">
            <Settings01 className="size-5" />
          </button>{" "}
          <div className="relative size-10 shrink-0 cursor-pointer rounded-full bg-[#22262f]">
            {" "}
            <span className="absolute inset-0 rounded-full border border-white/[0.12]" />{" "}
            <p className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#94979c]">OR</p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </header>
  );
}
export { HeaderNavigation };
