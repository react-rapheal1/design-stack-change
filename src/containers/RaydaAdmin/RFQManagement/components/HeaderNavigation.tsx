"use client";

import { useState } from "react";
import { Menu, Settings, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cn } from "@/lib/utils";
import { navItems } from "../../shared";

interface NavItem {
  label: string;
  href: string;
  current: boolean;
}

function HeaderNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full border-b border-[#475467] bg-primary-solid">
      <div className="flex h-[72px] w-full items-center justify-between page-px">
        <div className="flex items-center gap-4">
          <a href="/" aria-label="Go to homepage">
            <RaydaLogo variant="white" />
          </a>
          <nav className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item: NavItem) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-semibold text-white transition duration-100 ease-linear",
                      item.current ? "bg-[#344054]" : "hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden gap-1 sm:flex">
            <a
              href="#"
              aria-label="Settings"
              className="flex items-center justify-center rounded-md p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Settings className="size-5" />
            </a>
          </div>

          <Avatar className="hidden size-10 bg-[#e6efff] sm:flex">
            <AvatarImage src="" alt="Jane Admin" />
            <AvatarFallback className="bg-[#e6efff] text-sm font-semibold text-[#003999]">
              JA
            </AvatarFallback>
          </Avatar>

          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="text-white hover:bg-white/10 xl:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-[72px] z-50 border-b border-[#475467] bg-primary-solid xl:hidden">
          <nav className="flex flex-col px-4 pt-2 pb-4 sm:px-6">
            <ul className="flex flex-col gap-1">
              {navItems.map((item: NavItem) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-sm font-semibold text-white transition duration-100 ease-linear",
                      item.current ? "bg-[#344054]" : "hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="my-3 h-px bg-[#475467]" />
            <div className="flex flex-col gap-1 sm:hidden">
              <a
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Settings className="size-5 text-white/70" /> Settings
              </a>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-md px-3 py-2.5">
              <Avatar className="size-10 bg-[#e6efff]">
                <AvatarImage src="" alt="Jane Admin" />
                <AvatarFallback className="bg-[#e6efff] text-sm font-semibold text-[#003999]">
                  JA
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">Jane Admin</p>
                <p className="truncate text-sm text-[#98a2b3]">jane@rayda.co</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export { HeaderNavigation };
