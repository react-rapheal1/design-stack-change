import { Avatar } from "@/components/base/avatar/avatar";
import { dropdownMenuItems } from "../data";

function AvatarDropdownMenu() {
  return (
    <div className="w-60 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-[#eaecf0]">
      <div className="border-b border-[#eaecf0] px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar
            alt="Olivia Rhye"
            initials="OR"
            size="md"
            status="online"
            contrastBorder={false}
            className="size-10 bg-[#22262f] text-sm font-semibold text-[#94979c]"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#344054]">Olivia Rhye</p>
            <p className="truncate text-sm text-[#475467]">olivia@rayda.co</p>
          </div>
        </div>
      </div>
      {dropdownMenuItems.map((section, sectionIdx) => (
        <div key={sectionIdx} className="border-b border-[#eaecf0] py-1">
          {section.items.map((item) => (
            <button key={item.label} className="group flex w-full cursor-pointer items-center px-1.5 py-0.5">
              <div className="flex w-full items-center justify-between rounded-md px-2.5 py-[9px] group-hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <item.icon className="size-4 text-[#667085]" />
                  <span className="text-sm font-medium text-[#344054]">{item.label}</span>
                </div>
                <span className="text-xs text-[#667085]">{item.shortcut}</span>
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
export { AvatarDropdownMenu };
