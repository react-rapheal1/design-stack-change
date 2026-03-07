/* eslint-disable */
// @ts-nocheck
import { ChevronDown, ChevronSelectorVertical } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";
import { sidebarFooterItems } from "./sidebarFooterItems";
import { sidebarNavItems } from "./sidebarNavItems";

function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 hidden h-screen w-60 flex-col justify-between border-r border-[#e9eaeb] bg-white lg:flex">
      {" "}
      {}{" "}
      <div className="flex flex-col gap-4 pt-6">
        {" "}
        <div className="px-5">
          {" "}
          <RaydaLogo />{" "}
        </div>{" "}
        <nav className="flex flex-col px-3">
          {" "}
          {sidebarNavItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={cx(
                "flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold transition",
                item.active ? "bg-[#fafafa] text-[#252b37]" : "text-[#414651] hover:bg-[#fafafa]",
              )}
            >
              {" "}
              <item.icon className="size-5 shrink-0" /> <span className="flex-1">{item.label}</span>{" "}
              {item.badge && (
                <span className="rounded-full border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 text-xs font-medium text-[#414651]"> {item.badge} </span>
              )}{" "}
              {item.hasChevron && <ChevronDown className="size-4 text-[#414651]" />}{" "}
            </a>
          ))}{" "}
        </nav>{" "}
      </div>{" "}
      {}{" "}
      <div className="flex flex-col gap-4 px-4 pb-6">
        {" "}
        <nav className="flex flex-col">
          {" "}
          {sidebarFooterItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold text-[#414651] transition hover:bg-[#fafafa]"
            >
              {" "}
              <item.icon className="size-5 shrink-0" /> <span className="flex-1">{item.label}</span>{" "}
              {item.badge && (
                <span className="rounded-md border border-[#e9eaeb] bg-[#fafafa] px-1.5 py-0.5 text-xs font-medium text-[#414651]"> {item.badge} </span>
              )}{" "}
            </a>
          ))}{" "}
        </nav>{" "}
        {}{" "}
        <div className="relative rounded-xl border border-[#e9eaeb] bg-white p-3 shadow-xs">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <Avatar alt="Olivia Rhye" initials="OR" size="md" status="online" contrastBorder={false} className="size-10" />{" "}
            <div className="min-w-0">
              {" "}
              <p className="truncate text-sm font-semibold text-[#181d27]">Olivia Rhye</p>{" "}
              <p className="truncate text-sm text-[#535862]">olivia@rayda.co</p>{" "}
            </div>{" "}
          </div>{" "}
          <button type="button" className="absolute top-1.5 right-1.5 rounded-md p-1.5">
            {" "}
            <ChevronSelectorVertical className="size-5 text-[#414651]" />{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </aside>
  );
}
export { Sidebar };
