"use client";

import { useState } from "react";
import { Bell02, Menu01, Settings01, XClose } from "@untitledui/icons";
import Link from "next/link";
import { Button as AriaButton, DialogTrigger, Popover } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";
import { AvatarDropdownMenu } from "./AvatarDropdownMenu";
import { navItems } from "./data";

function HeaderNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="relative w-full border-b border-[#22262f] bg-[#0c0e12]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {}
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Go to homepage">
            <RaydaLogo variant="white" />
          </Link>
        </div>

        {}
        <div className="flex items-center gap-4">
          <div className="hidden gap-1 sm:flex">
            <a
              href="#"
              aria-label="Settings"
              className="flex items-center justify-center rounded-md p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Settings01 className="size-5" />
            </a>
            <a
              href="#"
              aria-label="Notifications"
              className="relative flex items-center justify-center rounded-md p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Bell02 className="size-5" />
              <span className="absolute -top-1 right-0 flex items-center justify-center rounded-full bg-[#fda29b] px-1.5 py-0.5 text-xs font-medium text-white">
                1
              </span>
            </a>
          </div>

          {}
          <div className="hidden lg:block">
            <DialogTrigger>
              <AriaButton className={({ isFocused }) => cx("cursor-pointer rounded-full transition outline-none", isFocused && "ring-4 ring-[#e6efff]")}>
                <Avatar
                  alt="Olivia Rhye"
                  initials="OR"
                  size="md"
                  contrastBorder={false}
                  className="size-10 bg-[#22262f] text-sm font-semibold text-[#94979c]"
                />
              </AriaButton>
              <Popover
                placement="bottom right"
                offset={8}
                className={({ isEntering, isExiting }) =>
                  cx(
                    "z-50 will-change-transform",
                    isEntering && "duration-200 ease-out animate-in fade-in slide-in-from-top-1",
                    isExiting && "duration-150 ease-in animate-out fade-out slide-out-to-top-1",
                  )
                }
              >
                <AvatarDropdownMenu />
              </Popover>
            </DialogTrigger>
          </div>

          {}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="flex items-center justify-center rounded-md p-2 text-white transition hover:bg-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XClose className="size-6" /> : <Menu01 className="size-6" />}
          </button>
        </div>
      </div>

      {}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-[72px] z-50 border-b border-[#22262f] bg-[#0c0e12] lg:hidden">
          <nav className="flex flex-col px-4 pt-2 pb-4 sm:px-6">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block rounded-md px-3 py-2.5 text-sm font-semibold text-white transition duration-100 ease-linear hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="my-3 h-px bg-[#22262f]" />
            <div className="mt-3 flex items-center gap-3 rounded-md px-3 py-2.5">
              <Avatar alt="Olivia Rhye" initials="OR" size="md" contrastBorder={false} className="size-10 bg-[#22262f] text-sm font-semibold text-[#94979c]" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">Olivia Rhye</p>
                <p className="truncate text-sm text-[#98a2b3]">olivia@rayda.co</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
export { HeaderNavigation };
