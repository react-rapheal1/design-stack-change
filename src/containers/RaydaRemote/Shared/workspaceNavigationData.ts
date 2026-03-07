import { Container, HelpCircle, HomeLine, LayersTwo01, LogOut01, MessageSmileCircle, Settings01, User01, UserPlus01, Users01, Zap } from "@untitledui/icons";

const workspaceNavItems = [
  { label: "Overview", href: "#" },
  { label: "Orders", href: "#" },
  { label: "Marketplace", href: "#", current: true },
  { label: "Storage", href: "#" },
  { label: "Catalogs", href: "#" },
  { label: "Employees", href: "#" },
  { label: "All Equipments", href: "#" },
];

const workspaceDropdownMenuItems = [
  {
    items: [
      { label: "View profile", icon: User01, shortcut: "⌘K→P" },
      { label: "Settings", icon: Settings01, shortcut: "⌘S" },
      { label: "Keyboard shortcuts", icon: Zap, shortcut: "?" },
    ],
  },
  {
    items: [
      { label: "Company profile", icon: HomeLine, shortcut: "⌘K→C" },
      { label: "Team", icon: Users01, shortcut: "⌘K→T" },
      { label: "Invite colleagues", icon: UserPlus01, shortcut: "⌘I" },
    ],
  },
  {
    items: [
      { label: "Changelog", icon: LayersTwo01, shortcut: "⌘K→C" },
      { label: "Slack Community", icon: MessageSmileCircle, shortcut: "⌘K→S" },
      { label: "Support", icon: HelpCircle, shortcut: "⌘/" },
      { label: "API", icon: Container, shortcut: "⌘A" },
    ],
  },
  { items: [{ label: "Log out", icon: LogOut01, shortcut: "⌥⇧Q" }] },
];

export { workspaceDropdownMenuItems, workspaceNavItems };
