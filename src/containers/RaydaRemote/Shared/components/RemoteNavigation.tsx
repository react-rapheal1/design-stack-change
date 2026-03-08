import { Bell01, SearchMd, Settings01 } from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";
import { remoteNavItems } from "../navItems";

export function RemoteNavigation({ activeKey }: { activeKey: string }) {
  return (
    <nav className="flex h-14 shrink-0 items-center gap-1 border-b border-[#1d2939] bg-[#101828] px-4 lg:px-6">
      <div className="mr-6 shrink-0">
        <RaydaLogo variant="white" />
      </div>
      <div className="flex flex-1 items-center gap-0.5 overflow-x-auto">
        {remoteNavItems.map((item) => (
          <a
            key={item.key}
            id={item.id}
            href={item.href}
            className={cx(
              "rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition duration-100",
              item.key === activeKey ? "bg-white/10 text-white" : "text-[#98a2b3] hover:bg-white/5 hover:text-white",
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {[SearchMd, Settings01, Bell01].map((Icon) => (
          <button
            key={Icon.name}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#98a2b3] transition duration-100 hover:bg-white/5 hover:text-white"
          >
            <Icon className="size-4" />
          </button>
        ))}
        <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">OR</div>
      </div>
    </nav>
  );
}
