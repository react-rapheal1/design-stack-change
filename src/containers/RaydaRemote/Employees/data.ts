const PANEL_TABS = [
  { key: "hris" as const, label: "HRIS integration" },
  { key: "import" as const, label: "Import employees" },
  { key: "add" as const, label: "Add employee" },
];
type PanelTab = "import" | "add" | "hris";
type HrisView = "list" | "syncing" | "connected";
const HRIS_PROVIDERS_LIST = [
  { key: "bamboo", name: "BambooHR", color: "#00a651", letter: "B" },
  { key: "ultipro", name: "UltiPro", color: "#005b99", letter: "U" },
  { key: "workday", name: "Workday", color: "#f05a28", letter: "W" },
  { key: "optimum", name: "Optimum HRIS", color: "#4285f4", letter: "O" },
  { key: "namely", name: "Namely", color: "#2563eb", letter: "N" },
  { key: "zenefits", name: "Zenefits", color: "#ef4444", letter: "Z" },
  { key: "rippling", name: "Rippling", color: "#111827", letter: "R" },
  { key: "gusto", name: "Gusto", color: "#f97316", letter: "G" },
];
type Provider = (typeof HRIS_PROVIDERS_LIST)[0];
const DUMMY_EMPLOYEES = [
  {
    id: "1",
    name: "Olivia Rhye",
    initials: "OR",
    role: "Product Designer",
    dept: "Technology",
    email: "olivia@rayda.co",
    address: "1 Apple Park Way",
    country: "United States",
    flag: "No device assigned",
  },
  {
    id: "2",
    name: "Phoenix Baker",
    initials: "PB",
    role: "Sales Leader",
    dept: "Sales",
    email: "phoenix@rayda.co",
    address: "456 Oak Ave",
    country: "United Kingdom",
    flag: "No device assigned",
  },
  {
    id: "3",
    name: "Lana Steiner",
    initials: "LS",
    role: "Frontend Developer",
    dept: "Engineering",
    email: "lana@rayda.co",
    address: "789 Pine Rd",
    country: "Germany",
    flag: "No device assigned",
  },
  {
    id: "4",
    name: "Demi Wilkinson",
    initials: "DW",
    role: "Accountant",
    dept: "Finance",
    email: "demi@rayda.co",
    address: "321 Elm St",
    country: "Canada",
    flag: "No device assigned",
  },
  {
    id: "5",
    name: "Candice Wu",
    initials: "CW",
    role: "Fullstack Developer",
    dept: "Engineering",
    email: "cand@rayda.co",
    address: "654 Maple Ave",
    country: "Australia",
    flag: "No device assigned",
  },
];
type Employee = (typeof DUMMY_EMPLOYEES)[0];
const RESOLVE_FLAGS_TOUR_STEPS = [
  {
    title: "Let's resolve your device flags",
    description: "We found 3 employees with device issues. Click 'Resolve' on each one to address them.",
    ctaLabel: "Got it",
  },
  {
    title: "All flags cleared!",
    description: "Great work — all device assignment issues have been resolved. Your employees are ready to go.",
    ctaLabel: "Done",
  },
];
const HRIS_TOUR_STEPS = [
  {
    title: "Welcome to your Employees page",
    description:
      "This is where all your team members live. Once your HRIS is connected, employees and their device assignments will populate here automatically.",
    ctaLabel: "Select Another Method",
  },
  {
    title: "Select your HRIS provider",
    description: "Choose your HR platform from the list and click 'Connect'. The sync takes under 2 minutes.",
    ctaLabel: "Continue",
  },
  {
    title: "Syncing your data",
    description: "Rayda is pulling in your employee records. This usually takes a few seconds — hang tight!",
    ctaLabel: "Continue",
  },
  {
    title: "Save your settings",
    description: "Set your sync frequency and notification email, then click 'Save changes' to complete the setup.",
    ctaLabel: "Got it",
  },
  {
    title: "Employees are loaded!",
    description: "Your team is now in Rayda. We found 3 device flags that need your attention — let's resolve them.",
    ctaLabel: "Resolve flags",
  },
];
export { PANEL_TABS, HRIS_PROVIDERS_LIST, DUMMY_EMPLOYEES, RESOLVE_FLAGS_TOUR_STEPS, HRIS_TOUR_STEPS };
export type { PanelTab, HrisView, Provider, Employee };
