import { Bell02, Settings01 } from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";
import { remoteNavItems } from "../navItems";

export function RemoteNavigation({ activeKey }: { activeKey: string }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#22262f] bg-[#0c0e12]">
      <div className="flex h-[72px] w-full items-center justify-between page-px">
        <div className="flex items-center gap-6">
          <a href="/" aria-label="Go to homepage">
            <RaydaLogo variant="white" />
          </a>
          <nav>
            <ul className="flex items-center gap-0.5">
              {remoteNavItems.map((item) => (
                <li key={item.key}>
                  <a
                    id={item.id}
                    href={item.href}
                    className={cx(
                      "rounded-md px-3 py-2 text-sm font-semibold transition duration-100 ease-linear",
                      item.key === activeKey
                        ? "bg-[#22262f] text-[#ececed]"
                        : "text-[#cecfd2] hover:bg-white/5",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5"
          >
            <Bell02 className="size-5" />
          </button>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5"
          >
            <Settings01 className="size-5" />
          </button>
          <div className="relative ml-1 size-10 shrink-0 cursor-pointer rounded-full bg-[#22262f]">
            <span className="absolute inset-0 rounded-full border border-white/[0.12]" />
            <p className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#94979c]">
              OR
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
