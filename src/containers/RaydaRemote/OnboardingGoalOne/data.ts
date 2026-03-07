import { Link04, Upload01, UserPlus01, Wifi, ZapFast } from "@untitledui/icons";

type Answers = Record<string, string | string[]>;
const GOAL1_QUESTIONS = [
  {
    key: "trackingMethod",
    question: "How are assets currently tracked?",
    hint: "Be honest — most teams start from spreadsheets or nothing at all.",
    options: ["Spreadsheets", "Another asset management tool", "Our MDM only", "No formal tracking"],
    multiSelect: false,
  },
  {
    key: "fleetSize",
    question: "Approximately how many devices are in your fleet?",
    hint: "A rough estimate is fine — we'll help you discover the rest.",
    options: ["1–50", "51–200", "201–500", "500+"],
    multiSelect: false,
  },
  {
    key: "lostTrack",
    question: "Are there devices you've lost track of or are unsure who has them?",
    hint: "This is more common than you think.",
    options: ["Yes, quite a few", "A handful", "No, we have a good sense"],
    multiSelect: false,
  },
  {
    key: "importMethod",
    question: "How would you like to build your asset inventory?",
    hint: "Pick the method that works best for your current setup.",
    options: ["Connect HRIS (auto-import)", "Upload a CSV", "Add manually", "Install WiFi probe", "Ask employees to self-report"],
    multiSelect: false,
  },
];
const MISSION_STEPS = [
  { id: "A", title: "Import / Connect", description: "Choose your import method. We'll pull in your devices and map them to your team." },
  { id: "B", title: "AI Teammate Processes", description: "Rayda discovers devices, maps them to employees, and flags unassigned assets." },
  { id: "C", title: "Review & Confirm", description: "Review your inventory. Confirm assignments and resolve any flagged items." },
  { id: "D", title: "Mission Complete", description: "Your IT Health Score is unlocked and your inventory is live." },
];
const IMPORT_OPTIONS = [
  { key: "hris", icon: Link04, title: "Connect HRIS", description: "Auto-import from BambooHR, Workday, Rippling & more", recommended: true },
  { key: "csv", icon: Upload01, title: "Upload a CSV", description: "Map your existing spreadsheet columns", recommended: false },
  { key: "manual", icon: UserPlus01, title: "Add manually", description: "Add devices one at a time", recommended: false },
  { key: "wifi", icon: Wifi, title: "Install WiFi probe", description: "Discover devices on your network automatically", recommended: false },
  { key: "self-report", icon: ZapFast, title: "Ask employees to self-report", description: "Send a form to your team", recommended: false },
];
const MOCK_DEVICES = [
  { name: 'MacBook Pro 14"', serial: "C02X1234ABC", user: "Sarah Chen", status: "confirmed" },
  { name: "MacBook Air M2", serial: "C02Y5678DEF", user: "Marcus Johnson", status: "confirmed" },
  { name: "Dell XPS 15", serial: "DXPS9876GHI", user: "Unassigned", status: "needs-confirmation" },
  { name: 'MacBook Pro 16"', serial: "C02Z4321JKL", user: "Unknown", status: "needs-confirmation" },
  { name: "Lenovo ThinkPad", serial: "LNV1122MNO", user: "Priya Sharma", status: "confirmed" },
  { name: "HP EliteBook 840", serial: "HP8765PQR", user: "James Wu", status: "confirmed" },
];
const TOTAL_STEPS = 8;
export { GOAL1_QUESTIONS, MISSION_STEPS, IMPORT_OPTIONS, MOCK_DEVICES, TOTAL_STEPS };
export type { Answers };
