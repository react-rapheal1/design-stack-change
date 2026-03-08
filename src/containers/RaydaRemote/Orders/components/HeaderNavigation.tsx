/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import { Bell02, Menu01, Settings01, XClose } from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";
import { navItems } from "../navItems";

function HeaderNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="relative sticky top-0 z-40 w-full border-b border-[#22262f] bg-[#0c0e12]">
      {" "}
      <div className="flex h-[72px] w-full items-center justify-between page-px">
        {" "}
        {}{" "}
        <div className="flex items-center gap-6">
          {" "}
          <a href="/" aria-label="Go to homepage">
            {" "}
            <RaydaLogo variant="white" />{" "}
          </a>{" "}
          <nav className="hidden lg:block">
            {" "}
            <ul className="flex items-center gap-0.5">
              {" "}
              {navItems.map((item) => (
                <li key={item.label}>
                  {" "}
                  <a
                    href={item.href}
                    className={cx(
                      "rounded-md px-3 py-2 text-sm font-semibold transition duration-100 ease-linear",
                      item.current ? "bg-[#22262f] text-[#ececed]" : "text-[#cecfd2] hover:bg-white/5",
                    )}
                  >
                    {" "}
                    {item.label}{" "}
                  </a>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
          </nav>{" "}
        </div>{" "}
        {}{" "}
        <div className="flex items-center gap-1">
          {" "}
          <div className="hidden gap-1 sm:flex">
            {" "}
            <button type="button" className="flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5">
              {" "}
              <Bell02 className="size-5" />{" "}
            </button>{" "}
            <button type="button" className="flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5">
              {" "}
              <Settings01 className="size-5" />{" "}
            </button>{" "}
          </div>{" "}
          {}{" "}
          <div className="hidden lg:block">
            {" "}
            <div className="relative size-10 shrink-0 cursor-pointer rounded-full bg-[#22262f]">
              {" "}
              <span className="absolute inset-0 rounded-full border border-white/[0.12]" />{" "}
              <p className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#94979c]">OR</p>{" "}
            </div>{" "}
          </div>{" "}
          {}{" "}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="flex items-center justify-center rounded-md p-2 text-white transition hover:bg-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {" "}
            {mobileMenuOpen ? <XClose className="size-6" /> : <Menu01 className="size-6" />}{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      {}{" "}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-[72px] z-50 border-b border-[#22262f] bg-[#0c0e12] lg:hidden">
          {" "}
          <nav className="flex flex-col px-4 pt-2 pb-4 sm:px-6">
            {" "}
            <ul className="flex flex-col gap-1">
              {" "}
              {navItems.map((item) => (
                <li key={item.label}>
                  {" "}
                  <a
                    href={item.href}
                    className={cx(
                      "block rounded-md px-3 py-2.5 text-sm font-semibold transition duration-100 ease-linear",
                      item.current ? "bg-[#22262f] text-[#ececed]" : "text-[#cecfd2] hover:bg-white/5",
                    )}
                  >
                    {" "}
                    {item.label}{" "}
                  </a>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
            {} <div className="my-3 h-px bg-[#22262f]" /> {}{" "}
            <div className="flex flex-col gap-1 sm:hidden">
              {" "}
              <a href="#" className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-[#cecfd2] transition hover:bg-white/5">
                {" "}
                <Bell02 className="size-5 text-[#94979c]" /> Notifications{" "}
              </a>{" "}
              <a href="#" className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-[#cecfd2] transition hover:bg-white/5">
                {" "}
                <Settings01 className="size-5 text-[#94979c]" /> Settings{" "}
              </a>{" "}
            </div>{" "}
            {}{" "}
            <div className="mt-3 flex items-center gap-3 rounded-md px-3 py-2.5">
              {" "}
              <div className="relative size-10 shrink-0 rounded-full bg-[#22262f]">
                {" "}
                <span className="absolute inset-0 rounded-full border border-white/[0.12]" />{" "}
                <p className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#94979c]">OR</p>{" "}
              </div>{" "}
              <div className="min-w-0">
                {" "}
                <p className="truncate text-sm font-semibold text-white">Olivia Rhye</p> <p className="truncate text-sm text-[#94979c]">olivia@rayda.co</p>{" "}
              </div>{" "}
            </div>{" "}
          </nav>{" "}
        </div>
      )}{" "}
    </header>
  );
}
export { HeaderNavigation };
