import { BarChart01, CurrencyDollar, Globe01, Link04, Package, ShoppingBag01, Upload01, UserPlus01, Users01, ZapFast } from "@untitledui/icons";
import { appRoutes } from "@/lib/app-routes";
import type { IconComponent } from "./types";

export const metricCards: Array<{ label: string; value: string; icon: IconComponent }> = [
  { label: "Total employees", value: "—", icon: Users01 },
  { label: "Total inventory", value: "—", icon: Package },
  { label: "Active orders", value: "—", icon: ShoppingBag01 },
  { label: "Active catalogs", value: "—", icon: Globe01 },
  { label: "Total order value", value: "—", icon: CurrencyDollar },
];

export const quickActions: Array<{
  id: string;
  title: string;
  description: string;
  icon: IconComponent;
}> = [
  { id: "action-equip", title: "Equip your employee", description: "Give employees top-quality work tools.", icon: Users01 },
  { id: "action-offboard", title: "Off-board devices", description: "Gather all employee equipment and secure it.", icon: ZapFast },
  { id: "action-catalog", title: "Create Micro-Catalogs", description: "Create organized equipment lists for each department.", icon: BarChart01 },
  { id: "action-service", title: "Service contract for equipment", description: "Offer support for any equipment issues.", icon: Package },
];

export const modalQuestions = [
  {
    key: "trackingMethod",
    question: "How are assets currently tracked?",
    hint: "Be honest. Most teams start from spreadsheets or nothing at all.",
    options: ["Spreadsheets", "Another asset management tool", "Our MDM only", "No formal tracking"],
  },
  {
    key: "fleetSize",
    question: "Approximately how many devices are in your fleet?",
    hint: "A rough estimate is fine. We will help you discover the rest.",
    options: ["1-50", "51-200", "201-500", "500+"],
  },
  {
    key: "lostTrack",
    question: "Are there devices you have lost track of?",
    hint: "This is more common than you think.",
    options: ["Yes, quite a few", "A handful", "No, we have a good sense"],
  },
] as const;

export const importOptions: Array<{
  key: string;
  icon: IconComponent;
  title: string;
  description: string;
  recommended: boolean;
}> = [
  { key: "hris", icon: Link04, title: "Connect HRIS", description: "Auto-import from BambooHR, Workday, Rippling and more", recommended: true },
  { key: "csv", icon: Upload01, title: "Upload a CSV", description: "Map your existing spreadsheet columns", recommended: false },
  { key: "manual", icon: UserPlus01, title: "Add manually", description: "Add devices one at a time", recommended: false },
  {
    key: "self-report",
    icon: ZapFast,
    title: "Ask employees to self-report equipment",
    description: "Send a form link to your team to log their devices",
    recommended: false,
  },
];

export const employeeImportOptions: Array<{
  key: string;
  icon: IconComponent;
  title: string;
  description: string;
  recommended: boolean;
  tooltip: { title: string; body: string };
}> = [
  {
    key: "hris",
    icon: Link04,
    title: "Connect HRIS",
    description: "Auto-import from BambooHR, Workday, Rippling and more",
    recommended: true,
    tooltip: {
      title: "Sync your HR system",
      body: "Connecting your HRIS will automatically import your employee roster and keep it in sync.",
    },
  },
  {
    key: "csv",
    icon: Upload01,
    title: "Upload Employee CSV",
    description: "Import your employee list from a spreadsheet",
    recommended: false,
    tooltip: {
      title: "Download template here",
      body: "Here you can download the CSV file used to import your employee information.",
    },
  },
  {
    key: "manual",
    icon: UserPlus01,
    title: "Add employee manually",
    description: "Add employees one at a time with a simple form",
    recommended: false,
    tooltip: {
      title: "Add employees one by one",
      body: "Fill in each employee's details individually. Best for small teams or adding specific people.",
    },
  },
];

export const tourDestinations: Record<string, string> = {
  hris: `${appRoutes.raydaRemote.employees}?tour=hris`,
  csv: `${appRoutes.raydaRemote.employees}?tour=csv`,
  manual: `${appRoutes.raydaRemote.employees}?tour=manual`,
  "self-report": `${appRoutes.raydaRemote.employees}?tour=self-report`,
};
