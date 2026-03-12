import type { FilterTab, RequestFilters } from "./adminRfqTypes";

const countries = ["United States", "United Kingdom", "Nigeria", "Germany", "Canada", "South Africa", "Kenya", "India"];

const countryCodeMap: Record<string, string> = {
  "United States": "US",
  "United Kingdom": "GB",
  Nigeria: "NG",
  Germany: "DE",
  Canada: "CA",
  "South Africa": "ZA",
  Kenya: "KE",
  India: "IN",
};

const vendorNames = [
  "TechSupply Co",
  "GlobalDevices Ltd",
  "PrimeHardware Inc",
  "DevicePro Solutions",
  "IT Warehouse",
  "ByteSource Ltd",
  "CoreTech Partners",
  "EquipNet Africa",
  "SilverPeak Devices",
  "VendorHub Inc",
];

const companyNames = [
  "Acme Corp",
  "Sterling & Burke",
  "Nexus Digital",
  "Greenfield Industries",
  "Orbit Technologies",
  "Cascade Logistics",
  "Pinnacle Media",
  "Atlas Engineering",
  "Redwood Analytics",
  "Meridian Health",
];

const deviceTemplates = [
  { name: 'MacBook Pro 14" M3 Pro', assetType: "Laptop", basePrice: 1999, specs: "M3 Pro, 18GB RAM, 512GB SSD" },
  { name: "Dell Precision 5680", assetType: "Laptop", basePrice: 3500, specs: "i9-13900H, 32GB RAM, 1TB SSD, RTX 3500 Ada" },
  { name: "Lenovo ThinkPad X1 Carbon", assetType: "Laptop", basePrice: 1649, specs: "i7-1365U, 16GB RAM, 512GB SSD" },
  { name: 'LG 27UP850-W 27" 4K Monitor', assetType: "Monitor", basePrice: 450, specs: '27", 4K UHD, USB-C, HDR400' },
  { name: 'Dell UltraSharp U3223QE 32"', assetType: "Monitor", basePrice: 1100, specs: '32", 4K UHD, USB-C Hub, IPS Black' },
  { name: "Herman Miller Aeron Chair", assetType: "Furniture", basePrice: 1395, specs: "Size B, Graphite, PostureFit SL" },
  { name: "iPhone 15 Pro Max", assetType: "Phone", basePrice: 1199, specs: "256GB, Natural Titanium, A17 Pro" },
  { name: "Apple AirPods Pro 2", assetType: "Audio", basePrice: 249, specs: "USB-C, Active Noise Cancellation, Adaptive Audio" },
  { name: "CalDigit TS4 Thunderbolt Dock", assetType: "Accessory", basePrice: 400, specs: "Thunderbolt 4, 18 Ports, 98W Charging" },
  { name: "Logitech Rally Bar", assetType: "Conference", basePrice: 2999, specs: "4K, AI-Powered Framing, Bluetooth, USB" },
];

const defaultFilters: RequestFilters = { countries: [], statuses: [], vendors: [], budgetRange: [0, 100000] };

const filterTabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "vendors_responded", label: "Needs Review" },
  { id: "response_sent", label: "Sent to Customer" },
  { id: "accepted", label: "Accepted" },
  { id: "customer_rejected", label: "Rejected" },
  { id: "pending_vendors", label: "Pending Vendors" },
  { id: "expired", label: "Expired" },
];

const navItems = [
  { label: "Overview", href: "#" },
  { label: "Orders", href: "#", current: false },
  { label: "RFQs", href: "/rayda-admin/rfq-management", current: true },
  { label: "Companies", href: "#" },
  { label: "Inventory", href: "#" },
  { label: "Country", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Off-boarding", href: "#" },
  { label: "Services", href: "#" },
];

export { companyNames, countries, countryCodeMap, defaultFilters, deviceTemplates, filterTabs, navItems, vendorNames };
