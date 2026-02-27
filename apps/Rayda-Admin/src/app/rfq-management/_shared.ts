// ---------------------------------------------------------------------------
// Shared Types, Mock Data, and Utilities for RFQ Management
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type RFQStatus =
    | "pending_vendors"
    | "vendors_responded"
    | "response_sent"
    | "fully_accepted"
    | "partially_accepted"
    | "customer_rejected"
    | "expired";

export type DeviceResponseType = "quoted" | "alternative" | "unavailable";

export interface VendorDeviceResponse {
    type: DeviceResponseType;
    quotedPrice?: number;
    alternativeName?: string;
    alternativePrice?: number;
    alternativeSpecs?: string;
    unavailableReason?: string;
}

export interface VendorResponse {
    vendorId: string;
    vendorName: string;
    deviceResponses: VendorDeviceResponse[];
    totalPrice: number;
    respondedAt: string;
    vendorNote?: string;
}

export interface RFQDevice {
    name: string;
    quantity: number;
    unitBudget?: number;
    assetType: string;
}

export interface CurationDevicePricing {
    mode: "markup" | "fixed";
    markupPercent: number;
    fixedPrice: number;
    isUnavailable: boolean;
}

export interface CurationData {
    selectedVendorId: string;
    devicePricing: CurationDevicePricing[];
    notes: string;
}

export interface RFQ {
    id: string;
    company: string;
    devices: RFQDevice[];
    country: string;
    budget: number;
    status: RFQStatus;
    createdAt: string;
    vendorResponses: VendorResponse[];
    curation?: CurationData;
    sentAt?: string;
    customerDecision?: "fully_accepted" | "partially_accepted" | "rejected";
    acceptedDevices?: boolean[];
    rejectionReason?: string;
}

export interface RequestFilters {
    countries: string[];
    statuses: RFQStatus[];
    budgetRange: [number, number];
}

export type FilterTab = "all" | "accepted" | RFQStatus;
export type SortField = "id" | "company" | "budget" | "country";
export type SortDirection = "asc" | "desc";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const countries = ["United States", "United Kingdom", "Nigeria", "Germany", "Canada", "South Africa", "Kenya", "India"];

export const countryCodeMap: Record<string, string> = {
    "United States": "US",
    "United Kingdom": "GB",
    Nigeria: "NG",
    Germany: "DE",
    Canada: "CA",
    "South Africa": "ZA",
    Kenya: "KE",
    India: "IN",
};

export const vendorNames = [
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

export const companyNames = [
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

export const deviceTemplates = [
    { name: 'MacBook Pro 14" M3 Pro', assetType: "Laptop", basePrice: 1999, specs: "M3 Pro, 18GB RAM, 512GB SSD" },
    { name: "Dell Precision 5680", assetType: "Laptop", basePrice: 3500, specs: "i9-13900H, 32GB RAM, 1TB SSD, RTX 3500 Ada" },
    { name: "Lenovo ThinkPad X1 Carbon", assetType: "Laptop", basePrice: 1649, specs: "i7-1365U, 16GB RAM, 512GB SSD" },
    { name: 'LG 27UP850-W 27" 4K Monitor', assetType: "Monitor", basePrice: 450, specs: "27\", 4K UHD, USB-C, HDR400" },
    { name: 'Dell UltraSharp U3223QE 32"', assetType: "Monitor", basePrice: 1100, specs: "32\", 4K UHD, USB-C Hub, IPS Black" },
    { name: "Herman Miller Aeron Chair", assetType: "Furniture", basePrice: 1395, specs: "Size B, Graphite, PostureFit SL" },
    { name: "iPhone 15 Pro Max", assetType: "Phone", basePrice: 1199, specs: "256GB, Natural Titanium, A17 Pro" },
    { name: "Apple AirPods Pro 2", assetType: "Audio", basePrice: 249, specs: "USB-C, Active Noise Cancellation, Adaptive Audio" },
    { name: "CalDigit TS4 Thunderbolt Dock", assetType: "Accessory", basePrice: 400, specs: "Thunderbolt 4, 18 Ports, 98W Charging" },
    { name: "Logitech Rally Bar", assetType: "Conference", basePrice: 2999, specs: "4K, AI-Powered Framing, Bluetooth, USB" },
];

export const defaultFilters: RequestFilters = {
    countries: [],
    statuses: [],
    budgetRange: [0, 100000],
};

export const filterTabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "vendors_responded", label: "Needs Review" },
    { id: "response_sent", label: "Sent to Customer" },
    { id: "accepted", label: "Accepted" },
    { id: "customer_rejected", label: "Rejected" },
    { id: "pending_vendors", label: "Pending Vendors" },
];

export const navItems = [
    { label: "Overview", href: "#" },
    { label: "Orders", href: "#", current: false },
    { label: "RFQs", href: "/rfq-management", current: true },
    { label: "Companies", href: "#" },
    { label: "Inventory", href: "#" },
    { label: "Country", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Off-boarding", href: "#" },
    { label: "Services", href: "#" },
];

// ---------------------------------------------------------------------------
// Utility Functions
// ---------------------------------------------------------------------------

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

export function formatDateTime(iso: string): string {
    const date = new Date(iso);
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date);
}

export type StatusColor = "warning" | "brand" | "success" | "error" | "gray" | "blue" | "blue-light" | "purple";

export function getStatusConfig(status: RFQStatus): { label: string; color: StatusColor } {
    const map: Record<RFQStatus, { label: string; color: StatusColor }> = {
        pending_vendors: { label: "Pending Vendors", color: "warning" },
        vendors_responded: { label: "Needs Review", color: "brand" },
        response_sent: { label: "Sent to Customer", color: "blue-light" },
        fully_accepted: { label: "Fully Accepted", color: "success" },
        partially_accepted: { label: "Partially Accepted", color: "purple" },
        customer_rejected: { label: "Rejected", color: "error" },
        expired: { label: "Expired", color: "gray" },
    };
    return map[status];
}

// ---------------------------------------------------------------------------
// Mock Data Generator
// ---------------------------------------------------------------------------

function seededRandom(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

export function generateMockRFQs(): RFQ[] {
    const rand = seededRandom(42);
    const statuses: RFQStatus[] = [
        "pending_vendors",
        "pending_vendors",
        "vendors_responded",
        "vendors_responded",
        "vendors_responded",
        "vendors_responded",
        "response_sent",
        "response_sent",
        "response_sent",
        "fully_accepted",
        "fully_accepted",
        "fully_accepted",
        "partially_accepted",
        "partially_accepted",
        "customer_rejected",
        "customer_rejected",
        "customer_rejected",
        "expired",
    ];

    return Array.from({ length: 72 }, (_, i) => {
        const deviceCount = Math.floor(rand() * 4) + 1;

        // Budget scenario: ~50% no budget, ~10% partial, ~40% full
        // Use deterministic pattern to guarantee distribution
        const budgetPattern = i % 10; // 0-4: no budget, 5: partial, 6-9: full
        const noBudget = budgetPattern < 5;
        const partialBudget = budgetPattern === 5;

        const devices: RFQDevice[] = Array.from({ length: deviceCount }, (_, j) => {
            const template = deviceTemplates[Math.floor(rand() * deviceTemplates.length)];
            const quantity = Math.floor(rand() * 5) + 1;

            const device: RFQDevice = {
                name: template.name,
                quantity,
                assetType: template.assetType,
            };

            if (noBudget) {
                // No budget at all
            } else if (partialBudget) {
                // Only first device has budget
                if (j === 0) device.unitBudget = template.basePrice;
            } else {
                device.unitBudget = template.basePrice;
            }

            return device;
        });

        const budget = devices.reduce((sum, d) => sum + (d.unitBudget ?? 0) * d.quantity, 0);
        const country = countries[Math.floor(rand() * countries.length)];
        const status = statuses[Math.floor(rand() * statuses.length)];

        // Generate a creation date: spread across Feb 1-20, with a random time of day
        const createdDay = Math.floor(rand() * 20) + 1;
        const createdHour = Math.floor(rand() * 14) + 7; // 7am-9pm
        const createdMinute = Math.floor(rand() * 60);
        const createdDate = new Date(2026, 1, createdDay, createdHour, createdMinute);

        // Generate vendor responses for non-pending statuses
        const vendorResponses: VendorResponse[] = [];
        if (status !== "pending_vendors") {
            // Every 5th RFQ gets many vendor responses (6-10), rest get 1-3
            const manyVendors = i % 5 === 2;
            const numVendors = manyVendors
                ? Math.floor(rand() * 5) + 6 // 6-10 vendors
                : Math.floor(rand() * 3) + 1; // 1-3 vendors
            const usedVendorNames = new Set<string>();
            for (let v = 0; v < numVendors; v++) {
                // Ensure unique vendor names
                let vendorName = vendorNames[v % vendorNames.length];
                if (usedVendorNames.has(vendorName)) {
                    vendorName = `${vendorName} (${Math.floor(v / vendorNames.length) + 1})`;
                }
                usedVendorNames.add(vendorName);
                const deviceResponses: VendorDeviceResponse[] = devices.map((device) => {
                    // Use customer budget if available, otherwise look up market price from template
                    const refPrice = device.unitBudget ?? (deviceTemplates.find((t) => t.name === device.name)?.basePrice ?? 1000);
                    const responseRoll = rand();
                    if (responseRoll < 0.7) {
                        const priceVariation = 0.8 + rand() * 0.4;
                        return {
                            type: "quoted" as DeviceResponseType,
                            quotedPrice: Math.round(refPrice * priceVariation),
                        };
                    } else if (responseRoll < 0.9) {
                        const altName = device.name.replace("Pro", "Air").replace("Ultra", "Standard");
                        const originalTemplate = deviceTemplates.find((t) => t.name === device.name);
                        const altSpecs = originalTemplate?.specs
                            ? originalTemplate.specs.replace("Pro", "").replace("i9", "i7").replace("32GB", "16GB").replace("1TB", "512GB").replace("256GB", "128GB").trim()
                            : "Standard configuration";
                        return {
                            type: "alternative" as DeviceResponseType,
                            alternativeName: altName,
                            alternativePrice: Math.round(refPrice * (0.6 + rand() * 0.3)),
                            alternativeSpecs: altSpecs,
                        };
                    } else {
                        return {
                            type: "unavailable" as DeviceResponseType,
                            unavailableReason: "Out of stock in region",
                        };
                    }
                });

                const totalPrice = deviceResponses.reduce((sum, dr, idx) => {
                    if (dr.type === "quoted" && dr.quotedPrice) return sum + dr.quotedPrice * devices[idx].quantity;
                    if (dr.type === "alternative" && dr.alternativePrice) return sum + dr.alternativePrice * devices[idx].quantity;
                    return sum;
                }, 0);

                // Respond 2-24 hours after creation
                const responseHoursLater = 2 + Math.floor(rand() * 22);
                const responseMinutes = Math.floor(rand() * 60);
                const respondedDate = new Date(createdDate.getTime() + responseHoursLater * 3600000 + responseMinutes * 60000);

                // ~65% of vendor responses include a note
                const vendorNoteOptions = [
                    "Lead time 2-3 weeks. Bulk discount available for 10+ units.",
                    "Price valid for 30 days. Includes 1-year standard warranty.",
                    "Ships from regional warehouse, delivery within 5 business days.",
                    "Extended 3-year warranty available at additional cost.",
                    "Currently running a promotion — price includes free setup.",
                    "Limited stock, recommend confirming within 7 days.",
                    "Includes on-site installation and configuration.",
                    "Price reflects enterprise licensing. Volume pricing available.",
                ];
                const noteRoll = rand();
                const vendorNote = noteRoll < 0.65 ? vendorNoteOptions[Math.floor(rand() * vendorNoteOptions.length)] : undefined;

                vendorResponses.push({
                    vendorId: `vendor-${v + 1}-${i}`,
                    vendorName,
                    deviceResponses,
                    totalPrice,
                    respondedAt: respondedDate.toISOString(),
                    vendorNote,
                });
            }
        }

        const company = companyNames[Math.floor(rand() * companyNames.length)];

        const rfq: RFQ = {
            id: `RFQ-${String(26700 + i).padStart(5, "0")}`,
            company,
            devices,
            country,
            budget,
            status,
            createdAt: createdDate.toISOString(),
            vendorResponses,
        };

        // Add curation data for response_sent + accepted/rejected
        if (status === "response_sent" || status === "fully_accepted" || status === "partially_accepted" || status === "customer_rejected") {
            if (vendorResponses.length > 0) {
                const selectedVendor = vendorResponses[0];
                rfq.curation = {
                    selectedVendorId: selectedVendor.vendorId,
                    devicePricing: devices.map((_, idx) => {
                        const dr = selectedVendor.deviceResponses[idx];
                        const vendorPrice = dr.type === "quoted" ? dr.quotedPrice! : dr.type === "alternative" ? dr.alternativePrice! : 0;
                        return {
                            mode: "markup" as const,
                            markupPercent: 10,
                            fixedPrice: Math.round(vendorPrice * 1.1),
                            isUnavailable: dr.type === "unavailable",
                        };
                    }),
                    notes: selectedVendor.vendorNote ?? "",
                };
                // Sent 1-3 hours after the last vendor responded
                const lastResponseTime = Math.max(...vendorResponses.map((vr) => new Date(vr.respondedAt).getTime()));
                const sentHoursLater = 1 + Math.floor(rand() * 3);
                const sentMinutes = Math.floor(rand() * 60);
                const sentDate = new Date(lastResponseTime + sentHoursLater * 3600000 + sentMinutes * 60000);
                rfq.sentAt = sentDate.toISOString();
            }
        }

        if (status === "fully_accepted") {
            rfq.customerDecision = "fully_accepted";
            rfq.acceptedDevices = devices.map(() => true);
        }
        if (status === "partially_accepted") {
            rfq.customerDecision = "partially_accepted";
            // At least one accepted, at least one declined
            rfq.acceptedDevices = devices.map((_, idx) => {
                if (idx === 0) return true; // ensure at least one accepted
                if (idx === devices.length - 1 && devices.length > 1) return false; // ensure at least one declined
                return rand() > 0.4;
            });
        }
        if (status === "customer_rejected") {
            rfq.customerDecision = "rejected";
            const rejectionReasons = [
                "Price is too high",
                "Found an alternative",
                "No longer needed",
                "Price is too high",
                "Found an alternative",
                "No longer needed",
                "Other: Management decided to defer all hardware purchases until Q3.",
            ];
            rfq.rejectionReason = rejectionReasons[i % rejectionReasons.length];
        }

        return rfq;
    });
}

export const mockRFQs = generateMockRFQs();
