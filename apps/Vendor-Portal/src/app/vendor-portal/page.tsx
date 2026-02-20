"use client";

import React, { useEffect, useState, useRef } from "react";
import {
    ArrowDownRight,
    ArrowUpRight,
    BarChartSquare02,
    Check,
    CheckCircle,
    CheckDone01,
    ChevronDown,
    ChevronSelectorVertical,
    Edit05,
    FilterLines,
    Menu01,
    MessageChatCircle,
    PieChart03,
    Plus,
    Rows01,
    SearchLg,
    Settings01,
    ShoppingBag01,
    SwitchHorizontal01,
    Users01,
    XCircle,
    XClose,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { Tabs } from "@/components/application/tabs/tabs";
import { Input } from "@/components/base/input/input";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { Slider } from "@/components/base/slider/slider";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DeviceSpec {
    display?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    color?: string;
}

interface DeviceAddOn {
    name: string;
    price: string;
}

interface Device {
    name: string;
    image?: string;
    color?: string;
    price?: string;
    quantity?: number;
    specs?: DeviceSpec;
    addOns?: DeviceAddOn[];
}

interface OrderRequest {
    id: string;
    devices: Device[];
    service: string;
    amount: string;
    country: string;
    dueDate: string;
    sla: string;
    total: string;
    recipients: number;
    pickupDate?: string;
    storageDuration?: string;
}

interface RFQDevice {
    name: string;
    quantity: number;
    unitPrice?: number;
    assetType: string;
    description: string;
}

interface RFQ {
    id: string;
    devices: RFQDevice[];
    country: string;
    deliveryAddress: string;
    dueDate: string;
    budget?: string;
    notes?: string;
}

interface CatalogDevice {
    id: string;
    name: string;
    category: string;
    price: number;
    specs?: string;
    image?: string;
}

interface DeviceResponse {
    deviceIndex: number;
    responseType: "quote" | "alternative";
    quotePrice?: number;
    alternativeDevice?: CatalogDevice | null;
    manualDevice?: {
        name: string;
        price: number;
        specs: string;
    };
}

interface OrderFilters {
    serviceTypes: string[];
    countries: string[];
    amountRange: [number, number];
    dueDateFrom: string;
    dueDateTo: string;
}

interface RFQFilters {
    countries: string[];
    budgetRange: [number, number];
}

const defaultOrderFilters: OrderFilters = {
    serviceTypes: [],
    countries: [],
    amountRange: [0, 10000],
    dueDateFrom: "",
    dueDateTo: "",
};

const defaultRFQFilters: RFQFilters = {
    countries: [],
    budgetRange: [0, 100000],
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const sidebarNavItems = [
    { label: "Dashboard", icon: BarChartSquare02, active: true },
    { label: "Catalog", icon: Rows01 },
    { label: "Orders", icon: CheckDone01, badge: "1", hasChevron: true },
    { label: "Reporting", icon: PieChart03 },
    { label: "Team Permission", icon: Users01 },
];

const sidebarFooterItems = [
    { label: "Settings", icon: Settings01 },
    { label: "Notifications", icon: MessageChatCircle, badge: "30" },
];

const periodTabs = ["12 months", "30 days", "7 days", "24 hours"];

const metrics = [
    { label: "Revenue", value: "$1,280", change: "10%", up: true },
    { label: "Orders", value: "14", change: "12%", up: false },
    { label: "Order value", value: "$91.42", change: "2%", up: true },
];

const orderRequestTabs = ["All", "Onboarding", "Storage", "Offboarding"];

// Device images stored locally in /public/devices/
const deviceImages = {
    // Laptops
    macbook: "/devices/laptops/macbook.png",
    dell: "/devices/laptops/dell.png",
    hp: "/devices/laptops/hp.png",
    asus: "/devices/laptops/asus.png",
    lenovo: "/devices/laptops/lenovo.png",
    // Monitors
    lgMonitor: "/devices/monitors/lg.png",
    dellMonitor: "/devices/monitors/dell.png",
    samsungMonitor: "/devices/monitors/samsung.png",
    acerMonitor: "/devices/monitors/acer.png",
    benqMonitor: "/devices/monitors/benq.png",
    // Tablets
    ipad: "/devices/tablets/ipad.png",
    samsungTablet: "/devices/tablets/samsung.png",
    surface: "/devices/tablets/microsoft.png",
    // Phones
    iphone: "/devices/phones/iphone.png",
    samsungPhone: "/devices/phones/samsung.png",
    pixel: "/devices/phones/google-pixel.png",
    // Accessories - Headphones
    sonyHeadphones: "/devices/accessories/headphones/sony.png",
    jabraHeadphones: "/devices/accessories/headphones/jabra.png",
    logitechHeadphones: "/devices/accessories/headphones/logitech.png",
    // Accessories - Earbuds
    airpodsPro: "/devices/accessories/earpods/airpods-pro.png",
    airpods: "/devices/accessories/earpods/airpods.png",
    jabraEarbuds: "/devices/accessories/earpods/jabra.png",
    // Accessories - Mice
    logitechMouse: "/devices/accessories/mice/logitech-mx.png",
    dellMouse: "/devices/accessories/mice/dell.png",
    microsoftMouse: "/devices/accessories/mice/microsoft.png",
};

// Device avatar colors - fallback when images are not available
const deviceColors = {
    macbook: "#1a1a2e",
    keyboard: "#4a4a6a",
    mouse: "#6b7280",
    monitor: "#374151",
    dock: "#52525b",
    iphone: "#1e3a5f",
    airpods: "#f5f5f5",
    laptop: "#1f2937",
    headset: "#4b5563",
    webcam: "#374151",
    ipad: "#1e293b",
    pencil: "#9ca3af",
};

// Catalog devices for alternative suggestions
const catalogDevices: CatalogDevice[] = [
    { id: "cat-1", name: "MacBook Pro 14\"", category: "Laptop", price: 1999, specs: "M3 Pro, 18GB RAM, 512GB SSD", image: deviceImages.macbook },
    { id: "cat-2", name: "MacBook Pro 16\"", category: "Laptop", price: 3499, specs: "M3 Max, 36GB RAM, 1TB SSD", image: deviceImages.macbook },
    { id: "cat-3", name: "Dell XPS 15", category: "Laptop", price: 1799, specs: "Intel i7, 32GB RAM, 1TB SSD", image: deviceImages.dell },
    { id: "cat-4", name: "HP EliteBook 840", category: "Laptop", price: 1599, specs: "Intel i7, 16GB RAM, 512GB SSD", image: deviceImages.hp },
    { id: "cat-5", name: "Lenovo ThinkPad X1", category: "Laptop", price: 1649, specs: "Intel i7, 16GB RAM, 512GB SSD", image: deviceImages.lenovo },
    { id: "cat-6", name: "ASUS ProArt StudioBook", category: "Laptop", price: 2499, specs: "Intel i9, 32GB RAM, 1TB SSD", image: deviceImages.asus },
    { id: "cat-7", name: "LG 27\" UltraFine 5K", category: "Monitor", price: 1299, specs: "5K, USB-C, 27 inch", image: deviceImages.lgMonitor },
    { id: "cat-8", name: "Dell UltraSharp 32\"", category: "Monitor", price: 899, specs: "4K, USB-C Hub, 32 inch", image: deviceImages.dellMonitor },
    { id: "cat-9", name: "Samsung 34\" Curved", category: "Monitor", price: 699, specs: "WQHD, 100Hz, 34 inch", image: deviceImages.samsungMonitor },
    { id: "cat-10", name: "iPad Pro 12.9\"", category: "Tablet", price: 1099, specs: "M2, 256GB, WiFi", image: deviceImages.ipad },
    { id: "cat-11", name: "Samsung Galaxy Tab S9", category: "Tablet", price: 849, specs: "Snapdragon, 256GB, WiFi", image: deviceImages.samsungTablet },
    { id: "cat-12", name: "Microsoft Surface Pro", category: "Tablet", price: 999, specs: "Intel i5, 256GB, WiFi", image: deviceImages.surface },
    { id: "cat-13", name: "Sony WH-1000XM5", category: "Audio", price: 349, specs: "Wireless, ANC, 30hr battery", image: deviceImages.sonyHeadphones },
    { id: "cat-14", name: "Jabra Evolve2 85", category: "Audio", price: 449, specs: "Wireless, ANC, UC certified", image: deviceImages.jabraHeadphones },
    { id: "cat-15", name: "Logitech MX Master 3S", category: "Peripheral", price: 99, specs: "Wireless, 8000 DPI, USB-C", image: deviceImages.logitechMouse },
];

// ---------------------------------------------------------------------------
// Data Generators for 50 entries each
// ---------------------------------------------------------------------------

const deviceTemplates = [
    { name: "MacBook Pro 16\"", image: deviceImages.macbook, color: deviceColors.macbook, basePrice: 3500 },
    { name: "MacBook Pro 14\"", image: deviceImages.macbook, color: deviceColors.macbook, basePrice: 2500 },
    { name: "Dell XPS 15", image: deviceImages.dell, color: deviceColors.laptop, basePrice: 1800 },
    { name: "HP EliteBook 840", image: deviceImages.hp, color: deviceColors.laptop, basePrice: 1600 },
    { name: "Lenovo ThinkPad X1", image: deviceImages.lenovo, color: deviceColors.laptop, basePrice: 1700 },
    { name: "ASUS ProArt StudioBook", image: deviceImages.asus, color: deviceColors.laptop, basePrice: 2800 },
    { name: "LG 27\" UltraFine 5K", image: deviceImages.lgMonitor, color: deviceColors.monitor, basePrice: 1200 },
    { name: "Dell UltraSharp 27\"", image: deviceImages.dellMonitor, color: deviceColors.monitor, basePrice: 800 },
    { name: "Samsung 32\" 4K Monitor", image: deviceImages.samsungMonitor, color: deviceColors.monitor, basePrice: 600 },
    { name: "Sony WH-1000XM5", image: deviceImages.sonyHeadphones, color: deviceColors.headset, basePrice: 350 },
    { name: "Jabra Evolve2 85", image: deviceImages.jabraHeadphones, color: deviceColors.headset, basePrice: 450 },
    { name: "Logitech MX Master 3S", image: deviceImages.logitechMouse, color: deviceColors.mouse, basePrice: 100 },
    { name: "Microsoft Arc Mouse", image: deviceImages.microsoftMouse, color: deviceColors.mouse, basePrice: 80 },
    { name: "iPhone 15 Pro", image: deviceImages.iphone, color: deviceColors.iphone, basePrice: 1200 },
    { name: "iPad Pro 12.9\"", image: deviceImages.ipad, color: deviceColors.ipad, basePrice: 1100 },
];

const services = ["Onboarding", "Offboarding", "Storage"] as const;
const countries = ["United States", "Canada", "United Kingdom", "Germany", "France", "Australia", "Japan", "Singapore"];
const slaOptions = ["1-2 working days", "3-5 working days", "5-7 working days", "7-10 working days"];

function generateOrderRequests(count: number): OrderRequest[] {
    const orders: OrderRequest[] = [];
    const baseId = 26600;

    for (let i = 0; i < count; i++) {
        const service = services[i % 3];
        const numDevices = (i % 4) + 1; // 1-4 devices
        const devices: Device[] = [];

        for (let j = 0; j < numDevices; j++) {
            const template = deviceTemplates[(i + j) % deviceTemplates.length];
            const quantity = (j % 3) + 1;
            const price = service === "Onboarding" ? template.basePrice : (50 + (i * 17) % 350);
            devices.push({
                name: template.name,
                image: template.image,
                color: template.color,
                price: `$${price.toLocaleString()}`,
                quantity,
                specs: { display: "Standard configuration", color: "Default" },
            });
        }

        const totalAmount = devices.reduce((sum, d) => sum + parseInt((d.price ?? "0").replace(/[^0-9]/g, "")) * (d.quantity ?? 1), 0);
        const country = countries[i % countries.length];

        const order: OrderRequest = {
            id: (baseId + i).toString(),
            devices,
            service,
            amount: `$${(50 + (i * 23) % 200)}.00`,
            country,
            dueDate: `Jan ${(i % 28) + 1}, 2025`,
            sla: slaOptions[i % slaOptions.length],
            total: `$${totalAmount.toLocaleString()}`,
            recipients: (i % 5) + 1,
        };

        // Add pickup date for offboarding, storage duration for storage
        if (service === "Offboarding") {
            order.pickupDate = `Jan ${((i + 5) % 28) + 1}, 2025`;
        } else if (service === "Storage") {
            order.storageDuration = `${(i % 6) + 1} months`;
        }

        orders.push(order);
    }

    return orders;
}

const rfqDeviceTemplates = [
    { name: "MacBook Pro 14\" M3 Pro", assetType: "Laptop", basePrice: 1999 },
    { name: "Dell Precision 5680", assetType: "Laptop", basePrice: 3500 },
    { name: "Lenovo ThinkPad X1 Carbon", assetType: "Laptop", basePrice: 1649 },
    { name: "LG 27UP850-W 27\" 4K Monitor", assetType: "Monitor", basePrice: 450 },
    { name: "Dell UltraSharp U3223QE 32\"", assetType: "Monitor", basePrice: 1100 },
    { name: "Samsung 49\" Odyssey G9", assetType: "Monitor", basePrice: 1299 },
    { name: "Herman Miller Aeron Chair", assetType: "Furniture", basePrice: 1395 },
    { name: "Fully Jarvis Standing Desk", assetType: "Furniture", basePrice: 750 },
    { name: "Logitech Rally Bar", assetType: "Conference", basePrice: 2999 },
    { name: "iPhone 15 Pro Max", assetType: "Phone", basePrice: 1199 },
    { name: "Apple AirPods Pro 2", assetType: "Audio", basePrice: 249 },
    { name: "CalDigit TS4 Thunderbolt Dock", assetType: "Accessory", basePrice: 400 },
    { name: "Razer BlackWidow V4 Pro", assetType: "Peripheral", basePrice: 230 },
    { name: "Microsoft Surface Pro 9", assetType: "Tablet", basePrice: 1599 },
    { name: "BenQ ScreenBar Monitor Light", assetType: "Accessory", basePrice: 109 },
];

const addresses = [
    "20 Cooper Square, New York, NY 10003, USA",
    "1 E 2nd St, New York, NY 10003, USA",
    "100 5th Ave, New York, NY 10011, USA",
    "350 Madison Ave, New York, NY 10017, USA",
    "1 World Trade Center, New York, NY 10007, USA",
    "375 Park Ave, New York, NY 10152, USA",
    "55 Water St, New York, NY 10041, USA",
    "450 Lexington Ave, New York, NY 10017, USA",
];

function generateRFQs(count: number): RFQ[] {
    const rfqList: RFQ[] = [];
    const baseId = 26700;

    for (let i = 0; i < count; i++) {
        const numDevices = (i % 3) + 1; // 1-3 devices
        const devices: RFQDevice[] = [];
        const hasBudget = i % 3 !== 0; // 2/3 have full budget, 1/3 have partial or no budget

        for (let j = 0; j < numDevices; j++) {
            const template = rfqDeviceTemplates[(i + j * 3) % rfqDeviceTemplates.length];
            const quantity = (i % 5) + 1;
            const deviceHasBudget = hasBudget || (j === 0 && i % 4 !== 0); // Some devices have budget

            const device: RFQDevice = {
                name: template.name,
                quantity,
                assetType: template.assetType,
                description: `High-quality ${template.assetType.toLowerCase()} for professional use. Includes standard warranty and support.`,
            };

            if (deviceHasBudget) {
                device.unitPrice = template.basePrice + (i * 50) % 500;
            }

            devices.push(device);
        }

        const country = countries[i % countries.length];
        const rfq: RFQ = {
            id: (baseId + i).toString(),
            devices,
            country,
            deliveryAddress: addresses[i % addresses.length],
            dueDate: `Jan ${(i % 28) + 1}, 2025`,
        };

        if (i % 3 === 0) {
            rfq.notes = `Priority request for ${devices[0].assetType.toLowerCase()} deployment. Quick turnaround needed.`;
        }

        rfqList.push(rfq);
    }

    return rfqList;
}

const orderRequests: OrderRequest[] = generateOrderRequests(50);
const rfqs: RFQ[] = generateRFQs(50);

// Legacy specific order requests data (commented out - now using generated data)
const _legacyOrderRequests: OrderRequest[] = [
    {
        id: "26678",
        devices: [
            {
                name: "LG 27\" UltraFine 5K Monitor",
                image: deviceImages.lgMonitor,
                color: deviceColors.monitor,
                price: "$1,200",
                quantity: 1,
                specs: { display: "27-inch 5K IPS (5120 × 2880)", color: "Silver" },
            },
            {
                name: "MacBook Pro 16\"",
                image: deviceImages.macbook,
                color: deviceColors.macbook,
                price: "$4,200",
                quantity: 2,
                specs: {
                    display: "16.2-inch Liquid Retina XDR (3456 × 2234)",
                    processor: "M3 Max chip",
                    ram: "36GB unified memory",
                    storage: "1 TB SSD",
                    color: "Space gray",
                },
                addOns: [{ name: "Apple care", price: "$50" }],
            },
            {
                name: "ASUS ProArt StudioBook 16",
                image: deviceImages.asus,
                color: deviceColors.laptop,
                price: "$2,800",
                quantity: 1,
                specs: {
                    display: "16-inch OLED (3840 × 2400)",
                    processor: "Intel Core i9-13980HX",
                    ram: "32GB DDR5",
                    storage: "2 TB SSD",
                    color: "Mineral Black",
                },
            },
        ],
        service: "Onboarding",
        amount: "$150.00",
        country: "United States",
        dueDate: "Jan 9, 2025",
        sla: "3-5 working days",
        total: "$12,600",
        recipients: 3,
    },
    {
        id: "26679",
        devices: [
            {
                name: "Dell UltraSharp 27\" Monitor",
                image: deviceImages.dellMonitor,
                color: deviceColors.monitor,
                price: "$80",
                quantity: 1,
                specs: {
                    display: "27-inch 4K IPS (3840 × 2160)",
                    processor: "USB-C Hub",
                    color: "Black",
                },
            },
            {
                name: "HP EliteBook 840 G9",
                image: deviceImages.hp,
                color: deviceColors.laptop,
                price: "$120",
                quantity: 1,
                specs: {
                    display: "14-inch FHD IPS (1920 × 1080)",
                    processor: "Intel Core i7-1265U",
                    ram: "16GB DDR5",
                    storage: "512 GB SSD",
                    color: "Silver",
                },
            },
            {
                name: "Logitech MX Master 3S",
                image: deviceImages.logitechMouse,
                color: deviceColors.mouse,
                price: "$50",
                quantity: 1,
                specs: {
                    display: "8K DPI optical sensor",
                    processor: "Bluetooth / USB receiver",
                    color: "Graphite",
                },
            },
            {
                name: "Sony WH-1000XM5",
                image: deviceImages.sonyHeadphones,
                color: deviceColors.headset,
                price: "$70",
                quantity: 1,
                specs: {
                    display: "30-hour battery life",
                    processor: "Bluetooth 5.2 / 3.5mm",
                    color: "Black",
                },
            },
        ],
        service: "Offboarding",
        amount: "$150.00",
        country: "United States",
        dueDate: "Jan 16, 2025",
        sla: "5-7 working days",
        total: "$320",
        recipients: 2,
        pickupDate: "Jan 18, 2025",
    },
    {
        id: "26676",
        devices: [
            {
                name: "MacBook Pro 14\"",
                image: deviceImages.macbook,
                color: deviceColors.macbook,
                price: "$150",
                quantity: 1,
                specs: {
                    display: "14.2-inch Liquid Retina XDR (3024 × 1964)",
                    processor: "M3 Pro chip",
                    ram: "18GB unified memory",
                    storage: "512 GB SSD",
                    color: "Space Black",
                },
            },
            {
                name: "Sony WH-1000XM5",
                image: deviceImages.sonyHeadphones,
                color: deviceColors.headset,
                price: "$50",
                quantity: 1,
                specs: {
                    display: "30-hour battery life",
                    processor: "Bluetooth 5.2 / 3.5mm",
                    color: "Silver",
                },
            },
        ],
        service: "Storage",
        amount: "$150.00",
        country: "United States",
        dueDate: "Jan 16, 2025",
        sla: "1-2 working days",
        total: "$200",
        recipients: 1,
        storageDuration: "3 months",
    },
    {
        id: "26675",
        devices: [
            {
                name: "Dell XPS 15",
                image: deviceImages.dell,
                color: deviceColors.laptop,
                price: "$1,799",
                quantity: 3,
                specs: {
                    display: "15.6-inch OLED (3456 × 2160)",
                    processor: "Intel Core i7-13700H",
                    ram: "32GB DDR5",
                    storage: "1 TB SSD",
                    color: "Platinum Silver",
                },
            },
            {
                name: "Samsung 32\" 4K Monitor",
                image: deviceImages.samsungMonitor,
                color: deviceColors.monitor,
                price: "$450",
                quantity: 3,
                specs: { display: "32-inch 4K VA (3840 × 2160)", color: "Black" },
            },
        ],
        service: "Onboarding",
        amount: "$150.00",
        country: "United States",
        dueDate: "Jan 20, 2025",
        sla: "3-5 working days",
        total: "$6,747",
        recipients: 3,
    },
    {
        id: "26674",
        devices: [
            {
                name: "Lenovo ThinkPad X1",
                image: deviceImages.lenovo,
                color: deviceColors.laptop,
                price: "$1,649",
                quantity: 2,
                specs: {
                    display: "14-inch 2.8K OLED (2880 × 1800)",
                    processor: "Intel Core i7-1365U",
                    ram: "16GB LPDDR5",
                    storage: "512 GB SSD",
                    color: "Black",
                },
            },
            {
                name: "Jabra Evolve2 85",
                image: deviceImages.jabraHeadphones,
                color: deviceColors.headset,
                price: "$449",
                quantity: 2,
                specs: {
                    display: "37-hour battery life",
                    processor: "Bluetooth 5.1 / USB-C",
                    color: "Black",
                },
            },
        ],
        service: "Onboarding",
        amount: "$150.00",
        country: "United States",
        dueDate: "Jan 22, 2025",
        sla: "3-5 working days",
        total: "$4,196",
        recipients: 2,
    },
    {
        id: "26673",
        devices: [
            {
                name: "iPad Pro 12.9\"",
                image: deviceImages.ipad,
                color: deviceColors.ipad,
                price: "$1,099",
                quantity: 5,
                specs: {
                    display: "12.9-inch Liquid Retina XDR",
                    processor: "M2 chip",
                    storage: "256 GB",
                    color: "Space Gray",
                },
            },
        ],
        service: "Onboarding",
        amount: "$150.00",
        country: "United States",
        dueDate: "Jan 25, 2025",
        sla: "3-5 working days",
        total: "$5,495",
        recipients: 5,
    },
    {
        id: "26672",
        devices: [
            {
                name: "HP EliteBook 840 G9",
                image: deviceImages.hp,
                color: deviceColors.laptop,
                price: "$120",
                quantity: 1,
                specs: {
                    display: "14-inch FHD IPS",
                    processor: "Intel Core i5-1245U",
                    ram: "16GB DDR5",
                    storage: "256 GB SSD",
                    color: "Silver",
                },
            },
            {
                name: "Logitech MX Master 3S",
                image: deviceImages.logitechMouse,
                color: deviceColors.mouse,
                price: "$50",
                quantity: 1,
            },
        ],
        service: "Offboarding",
        amount: "$150.00",
        country: "United States",
        dueDate: "Jan 18, 2025",
        sla: "5-7 working days",
        total: "$170",
        recipients: 1,
        pickupDate: "Jan 20, 2025",
    },
    {
        id: "26671",
        devices: [
            {
                name: "MacBook Pro 16\"",
                image: deviceImages.macbook,
                color: deviceColors.macbook,
                price: "$3,499",
                quantity: 4,
                specs: {
                    display: "16.2-inch Liquid Retina XDR",
                    processor: "M3 Max chip",
                    ram: "36GB unified memory",
                    storage: "1 TB SSD",
                    color: "Space Black",
                },
            },
            {
                name: "LG 27\" UltraFine 5K Monitor",
                image: deviceImages.lgMonitor,
                color: deviceColors.monitor,
                price: "$1,299",
                quantity: 4,
            },
            {
                name: "AirPods Pro",
                image: deviceImages.airpodsPro,
                color: deviceColors.airpods,
                price: "$249",
                quantity: 4,
            },
        ],
        service: "Onboarding",
        amount: "$150.00",
        country: "United States",
        dueDate: "Feb 1, 2025",
        sla: "3-5 working days",
        total: "$20,188",
        recipients: 4,
    },
    {
        id: "26670",
        devices: [
            {
                name: "ASUS ProArt StudioBook 16",
                image: deviceImages.asus,
                color: deviceColors.laptop,
                price: "$200",
                quantity: 2,
                specs: {
                    display: "16-inch 4K OLED",
                    processor: "Intel Core i9-13980HX",
                    ram: "64GB DDR5",
                    storage: "2 TB SSD",
                    color: "Mineral Black",
                },
            },
        ],
        service: "Storage",
        amount: "$150.00",
        country: "United States",
        dueDate: "Jan 28, 2025",
        sla: "1-2 working days",
        total: "$400",
        recipients: 2,
        storageDuration: "6 months",
    },
    {
        id: "26669",
        devices: [
            {
                name: "Dell UltraSharp 27\" Monitor",
                image: deviceImages.dellMonitor,
                color: deviceColors.monitor,
                price: "$899",
                quantity: 6,
                specs: { display: "27-inch 4K IPS", color: "Black" },
            },
            {
                name: "Microsoft Arc Mouse",
                image: deviceImages.microsoftMouse,
                color: deviceColors.mouse,
                price: "$79",
                quantity: 6,
            },
        ],
        service: "Onboarding",
        amount: "$150.00",
        country: "United States",
        dueDate: "Feb 5, 2025",
        sla: "3-5 working days",
        total: "$5,868",
        recipients: 6,
    },
];

const _legacyRfqs: RFQ[] = [
    {
        id: "26680",
        devices: [
            {
                name: "LG 27UP850-W 27\" 4K Monitor",
                quantity: 2,
                unitPrice: 450,
                assetType: "Monitor",
                description: "27-inch 4K UHD IPS display with HDR10 support, 99% sRGB color gamut, USB-C connectivity with 96W power delivery, and VESA mount compatible. Requires height-adjustable stand.",
            },
            {
                name: "Alienware 18 Area-51 Gaming Laptop",
                quantity: 2,
                unitPrice: 4200,
                assetType: "Laptop",
                description: "High-performance gaming laptop with Intel Core i9-13980HX, 64GB DDR5 RAM, 2TB NVMe SSD, NVIDIA RTX 4090, 18\" QHD+ 165Hz display. For game development workstations.",
            },
            {
                name: "Razer BlackWidow V4 Pro Keyboard",
                quantity: 2,
                assetType: "Peripheral",
                description: "Mechanical gaming keyboard with Razer Green switches, USB-C and Bluetooth connectivity, Chroma RGB backlight, dedicated media controls, and magnetic wrist rest included.",
            },
        ],
        country: "United States",
        deliveryAddress: "20 Cooper Square, New York, NY 10003, USA",
        dueDate: "Jan 9, 2025",
        notes: "Need devices for new game development team. Priority on high-performance specs.",
    },
    {
        id: "26681",
        devices: [
            {
                name: "Dell UltraSharp U3223QE 32\" 4K Monitor",
                quantity: 1,
                unitPrice: 1100,
                assetType: "Monitor",
                description: "32-inch 4K IPS Black panel with USB-C hub (90W PD), built-in KVM switch, excellent color accuracy for design work. Preferred for creative professionals.",
            },
            {
                name: "CalDigit TS4 Thunderbolt 4 Dock",
                quantity: 1,
                unitPrice: 400,
                assetType: "Accessory",
                description: "18-port Thunderbolt 4 dock with 98W power delivery, supports dual 4K or single 8K displays, 2.5GbE ethernet, and SD card reader. For MacBook Pro setup.",
            },
        ],
        country: "United States",
        deliveryAddress: "1 E 2nd St, New York, NY 10003, USA",
        dueDate: "Jan 16, 2025",
        budget: "$2,500 - $3,000",
    },
    {
        id: "26682",
        devices: [
            {
                name: "Herman Miller Aeron Chair",
                quantity: 3,
                unitPrice: 1395,
                assetType: "Furniture",
                description: "Size B ergonomic office chair with graphite frame, PostureFit SL lumbar support, fully adjustable arms, forward tilt and tilt limiter. 12-year warranty required.",
            },
            {
                name: "Fully Jarvis Standing Desk",
                quantity: 3,
                unitPrice: 750,
                assetType: "Furniture",
                description: "72\" x 30\" electric standing desk with bamboo top and black frame. Height range 25.5\" - 51.1\" with 4 programmable memory presets. Cable management included.",
            },
            {
                name: "BenQ ScreenBar Monitor Light",
                quantity: 3,
                assetType: "Accessory",
                description: "Monitor-mounted LED light bar with auto-dimming, adjustable color temperature (2700K-6500K), USB powered, asymmetric optical design prevents screen glare.",
            },
        ],
        country: "United States",
        deliveryAddress: "33 3rd Ave, New York, NY 10003, USA",
        dueDate: "Jan 16, 2025",
        notes: "Setting up new remote workstations for engineering team.",
    },
    {
        id: "26683",
        devices: [
            {
                name: "MacBook Pro 14\" M3 Pro",
                quantity: 5,
                assetType: "Laptop",
                description: "14-inch Liquid Retina XDR display, M3 Pro chip, 18GB unified memory, 512GB SSD. For software development team expansion.",
            },
            {
                name: "Apple Magic Keyboard with Touch ID",
                quantity: 5,
                assetType: "Peripheral",
                description: "Wireless keyboard with Touch ID, numeric keypad, USB-C charging. Space Gray finish to match MacBook Pro.",
            },
        ],
        country: "United States",
        deliveryAddress: "100 5th Ave, New York, NY 10011, USA",
        dueDate: "Jan 20, 2025",
        notes: "New developer onboarding batch. Need devices by end of month.",
    },
    {
        id: "26684",
        devices: [
            {
                name: "Samsung 49\" Odyssey G9 Monitor",
                quantity: 2,
                assetType: "Monitor",
                description: "49-inch DQHD (5120x1440) curved gaming monitor, 240Hz, 1ms response time, HDR1000. For trading desk setup.",
            },
        ],
        country: "United States",
        deliveryAddress: "200 Park Ave, New York, NY 10166, USA",
        dueDate: "Jan 22, 2025",
    },
    {
        id: "26685",
        devices: [
            {
                name: "iPhone 15 Pro Max",
                quantity: 10,
                assetType: "Phone",
                description: "256GB, Natural Titanium. Corporate mobile devices for sales team with MDM enrollment required.",
            },
            {
                name: "Apple AirPods Pro 2",
                quantity: 10,
                assetType: "Audio",
                description: "Wireless earbuds with Active Noise Cancellation, USB-C charging case. For sales team mobile setup.",
            },
        ],
        country: "United States",
        deliveryAddress: "350 Madison Ave, New York, NY 10017, USA",
        dueDate: "Jan 25, 2025",
        notes: "Sales team equipment refresh. Engraving not required.",
    },
    {
        id: "26686",
        devices: [
            {
                name: "Dell Precision 5680 Workstation",
                quantity: 3,
                unitPrice: 3500,
                assetType: "Laptop",
                description: "16-inch 4K OLED, Intel Core i9-13900H, 64GB RAM, 2TB SSD, NVIDIA RTX 4000. For CAD/3D modeling work.",
            },
            {
                name: "Dell UltraSharp 32\" 6K Monitor",
                quantity: 3,
                assetType: "Monitor",
                description: "32-inch 6K IPS Black, Thunderbolt 4, 140W PD, built-in colorimeter. Reference-grade color accuracy.",
            },
        ],
        country: "United States",
        deliveryAddress: "55 Water St, New York, NY 10041, USA",
        dueDate: "Feb 1, 2025",
        notes: "Architecture team workstations. Color accuracy is critical.",
    },
    {
        id: "26687",
        devices: [
            {
                name: "Logitech Rally Bar",
                quantity: 4,
                unitPrice: 2999,
                assetType: "Conference",
                description: "All-in-one video bar for medium rooms, 4K camera, AI-powered auto-framing, integrated speakers and mics.",
            },
            {
                name: "Logitech Tap IP Controller",
                quantity: 4,
                assetType: "Conference",
                description: "10.1-inch touch controller for video conferencing, supports Teams, Zoom, Meet. PoE powered.",
            },
        ],
        country: "United States",
        deliveryAddress: "1 World Trade Center, New York, NY 10007, USA",
        dueDate: "Feb 5, 2025",
        notes: "Conference room upgrades for floors 45-48.",
    },
    {
        id: "26688",
        devices: [
            {
                name: "Lenovo ThinkPad X1 Carbon Gen 11",
                quantity: 8,
                assetType: "Laptop",
                description: "14-inch 2.8K OLED, Intel Core i7-1365U, 16GB RAM, 512GB SSD. Lightweight for frequent travelers.",
            },
        ],
        country: "United States",
        deliveryAddress: "375 Park Ave, New York, NY 10152, USA",
        dueDate: "Feb 8, 2025",
        notes: "Executive team laptop refresh. Premium support required.",
    },
    {
        id: "26689",
        devices: [
            {
                name: "Microsoft Surface Pro 9",
                quantity: 6,
                unitPrice: 1599,
                assetType: "Tablet",
                description: "13-inch PixelSense display, Intel Core i7, 16GB RAM, 256GB SSD. With Surface Pro Signature Keyboard.",
            },
            {
                name: "Microsoft Surface Pen 2",
                quantity: 6,
                unitPrice: 129,
                assetType: "Peripheral",
                description: "Rechargeable stylus with haptic feedback, 4096 pressure levels. For note-taking and design work.",
            },
            {
                name: "Microsoft Surface Dock 2",
                quantity: 6,
                assetType: "Accessory",
                description: "Dual 4K display support, 199W power supply, USB-C/A ports, audio port, Gigabit Ethernet.",
            },
        ],
        country: "United States",
        deliveryAddress: "450 Lexington Ave, New York, NY 10017, USA",
        dueDate: "Feb 10, 2025",
        notes: "Field sales team mobile workstations. Need lightweight setup.",
    },
];

const recentOrders: {
    id: string;
    devices: Device[];
    service: string;
    amount: string;
    address: string;
    dueDate: string;
    status: string;
}[] = [
    {
        id: "26678",
        devices: [
            { name: "LG 27\" UltraFine 5K", image: deviceImages.lgMonitor, color: deviceColors.monitor },
            { name: "MacBook Pro 16\"", image: deviceImages.macbook, color: deviceColors.macbook },
            { name: "ASUS ProArt StudioBook", image: deviceImages.asus, color: deviceColors.laptop },
        ],
        service: "Onboarding",
        amount: "$150.00",
        address: "20 Cooper...",
        dueDate: "Jan 9, 2025",
        status: "Pending",
    },
    {
        id: "26677",
        devices: [
            { name: "HP EliteBook 840 G9", image: deviceImages.hp, color: deviceColors.laptop },
            { name: "Dell UltraSharp 27\"", image: deviceImages.dellMonitor, color: deviceColors.monitor },
            { name: "Sony WH-1000XM5", image: deviceImages.sonyHeadphones, color: deviceColors.headset },
            { name: "Logitech MX Master 3S", image: deviceImages.logitechMouse, color: deviceColors.mouse },
        ],
        service: "Offboarding",
        amount: "$150.00",
        address: "1 E 2nd St...",
        dueDate: "Jan 4, 2025",
        status: "Pending",
    },
    {
        id: "26676",
        devices: [
            { name: "Lenovo ThinkPad X1", image: deviceImages.lenovo, color: deviceColors.laptop },
            { name: "Samsung 32\" 4K Monitor", image: deviceImages.samsungMonitor, color: deviceColors.monitor },
            { name: "Microsoft Arc Mouse", image: deviceImages.microsoftMouse, color: deviceColors.mouse },
            { name: "Jabra Evolve2 85", image: deviceImages.jabraHeadphones, color: deviceColors.headset },
        ],
        service: "RFQ",
        amount: "$130.00",
        address: "33 3rd Ave...",
        dueDate: "Jan 9, 2025",
        status: "Pending",
    },
    {
        id: "26675",
        devices: [
            { name: "Dell XPS 15", image: deviceImages.dell, color: deviceColors.laptop },
            { name: "AirPods Pro", image: deviceImages.airpodsPro, color: deviceColors.airpods },
        ],
        service: "Storage",
        amount: "$150.00",
        address: "33 3rd Ave...",
        dueDate: "Jan 9, 2025",
        status: "Pending",
    },
];

const activityFeed = [
    { type: "Order", id: "#26678", time: "2 mins ago", message: "Can you give an update regarding my order? Thank you!" },
    { type: "Request", id: "#26678", time: "2 mins ago", message: "We would appreciate it if you could let us know the current sta..." },
    { type: "Order", id: "#26678", time: "2 mins ago", message: "Could you please provide an update on the order status?" },
    { type: "Request", id: "#26678", time: "2 mins ago", message: "Can you provide an update on my order status? Thanks!" },
    { type: "Order", id: "#26678", time: "2 mins ago", message: "Checking in to see if there are any updates on this order." },
    { type: "Request", id: "#26678", time: "2 mins ago", message: "Could you please inform us about the progress of this order?" },
    { type: "Order", id: "#26678", time: "2 mins ago", message: "W would like to know the latest information on my order, please." },
];

const stateRegions = [
    { name: "Texas", color: "bg-[#2e5fe8]" },
    { name: "North Carolina", color: "bg-[#6a93f0]" },
    { name: "Florida", color: "bg-[#f5a623]" },
    { name: "Virginia", color: "bg-[#f7c66e]" },
    { name: "California", color: "bg-[#e74c3c]" },
];

const rfqChartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const rfqInitiated = [12, 18, 14, 10, 8, 15, 20, 18, 16, 12, 14, 10];
const rfqPending = [8, 12, 10, 6, 5, 10, 14, 12, 10, 8, 10, 6];

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-60 flex-col justify-between border-r border-[#e9eaeb] bg-white lg:flex">
            {/* Top */}
            <div className="flex flex-col gap-4 pt-6">
                <div className="px-5">
                    <RaydaLogo />
                </div>
                <nav className="flex flex-col px-3">
                    {sidebarNavItems.map((item) => (
                        <a
                            key={item.label}
                            href="#"
                            className={cx(
                                "flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold transition",
                                item.active
                                    ? "bg-[#fafafa] text-[#252b37]"
                                    : "text-[#414651] hover:bg-[#fafafa]",
                            )}
                        >
                            <item.icon className="size-5 shrink-0" />
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                                <span className="rounded-full border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 text-xs font-medium text-[#414651]">
                                    {item.badge}
                                </span>
                            )}
                            {item.hasChevron && <ChevronDown className="size-4 text-[#414651]" />}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Bottom */}
            <div className="flex flex-col gap-4 px-4 pb-6">
                <nav className="flex flex-col">
                    {sidebarFooterItems.map((item) => (
                        <a
                            key={item.label}
                            href="#"
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold text-[#414651] transition hover:bg-[#fafafa]"
                        >
                            <item.icon className="size-5 shrink-0" />
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                                <span className="rounded-md border border-[#e9eaeb] bg-[#fafafa] px-1.5 py-0.5 text-xs font-medium text-[#414651]">
                                    {item.badge}
                                </span>
                            )}
                        </a>
                    ))}
                </nav>

                {/* User card */}
                <div className="relative rounded-xl border border-[#e9eaeb] bg-white p-3 shadow-xs">
                    <div className="flex items-center gap-2">
                        <Avatar alt="Olivia Rhye" initials="OR" size="md" status="online" contrastBorder={false} className="size-10" />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#181d27]">Olivia Rhye</p>
                            <p className="truncate text-sm text-[#535862]">olivia@rayda.co</p>
                        </div>
                    </div>
                    <button type="button" className="absolute right-1.5 top-1.5 rounded-md p-1.5">
                        <ChevronSelectorVertical className="size-5 text-[#414651]" />
                    </button>
                </div>
            </div>
        </aside>
    );
}

// ---------------------------------------------------------------------------
// Mobile Header
// ---------------------------------------------------------------------------

function MobileHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
    return (
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e9eaeb] bg-white px-4 py-3 lg:hidden">
            <RaydaLogo />
            <button
                type="button"
                onClick={onMenuOpen}
                className="rounded-lg p-2 hover:bg-[#fafafa]"
            >
                <Menu01 className="size-5 text-[#414651]" />
            </button>
        </header>
    );
}

// ---------------------------------------------------------------------------
// Mobile Sidebar Drawer
// ---------------------------------------------------------------------------

function MobileSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = ""; };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={onClose} />
            <aside className="fixed inset-y-0 left-0 z-50 flex w-60 flex-col justify-between border-r border-[#e9eaeb] bg-white shadow-xl lg:hidden animate-in slide-in-from-left duration-300">
                {/* Top */}
                <div className="flex flex-col gap-4 pt-6">
                    <div className="flex items-center justify-between px-5">
                        <RaydaLogo />
                        <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-[#fafafa]">
                            <XClose className="size-5 text-[#414651]" />
                        </button>
                    </div>
                    <nav className="flex flex-col px-3">
                        {sidebarNavItems.map((item) => (
                            <a
                                key={item.label}
                                href="#"
                                className={cx(
                                    "flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold transition",
                                    item.active
                                        ? "bg-[#fafafa] text-[#252b37]"
                                        : "text-[#414651] hover:bg-[#fafafa]",
                                )}
                            >
                                <item.icon className="size-5 shrink-0" />
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                    <span className="rounded-full border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 text-xs font-medium text-[#414651]">
                                        {item.badge}
                                    </span>
                                )}
                                {item.hasChevron && <ChevronDown className="size-4 text-[#414651]" />}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Bottom */}
                <div className="flex flex-col gap-4 px-4 pb-6">
                    <nav className="flex flex-col">
                        {sidebarFooterItems.map((item) => (
                            <a
                                key={item.label}
                                href="#"
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold text-[#414651] transition hover:bg-[#fafafa]"
                            >
                                <item.icon className="size-5 shrink-0" />
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                    <span className="rounded-md border border-[#e9eaeb] bg-[#fafafa] px-1.5 py-0.5 text-xs font-medium text-[#414651]">
                                        {item.badge}
                                    </span>
                                )}
                            </a>
                        ))}
                    </nav>

                    {/* User card */}
                    <div className="relative rounded-xl border border-[#e9eaeb] bg-white p-3 shadow-xs">
                        <div className="flex items-center gap-2">
                            <Avatar alt="Olivia Rhye" initials="OR" size="md" status="online" contrastBorder={false} className="size-10" />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#181d27]">Olivia Rhye</p>
                                <p className="truncate text-sm text-[#535862]">olivia@rayda.co</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

// ---------------------------------------------------------------------------
// Metric Card
// ---------------------------------------------------------------------------

function MetricCard({ label, value, change, up }: { label: string; value: string; change: string; up: boolean }) {
    return (
        <div className="flex flex-col gap-2 rounded-xl border border-[#e9eaeb] bg-white p-5 shadow-xs">
            <p className="text-sm font-medium text-[#535862]">{label}</p>
            <div className="flex items-end gap-4">
                <p className="flex-1 text-3xl font-semibold text-[#181d27]">{value}</p>
                <span className="flex items-center gap-1 rounded-md border border-[#d5d7da] bg-white px-2 py-0.5 text-sm font-medium text-[#414651] shadow-xs">
                    {up ? (
                        <ArrowUpRight className="size-3 text-[#414651]" />
                    ) : (
                        <ArrowDownRight className="size-3 text-[#414651]" />
                    )}
                    {change}
                </span>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Service Badge
// ---------------------------------------------------------------------------

function ServiceBadge({ service }: { service: string }) {
    const colorMap: Record<string, "warning" | "success" | "brand" | "error"> = {
        Onboarding: "brand",
        Offboarding: "success",
        Storage: "warning",
        RFQ: "error",
    };
    return (
        <Badge size="sm" type="pill-color" color={colorMap[service] ?? "gray"}>
            {service}
        </Badge>
    );
}

// ---------------------------------------------------------------------------
// Status Badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: string }) {
    return (
        <Badge size="sm" type="pill-color" color="warning">
            {status}
        </Badge>
    );
}

// ---------------------------------------------------------------------------
// Device Avatars with Tooltip
// ---------------------------------------------------------------------------

function truncateDeviceName(name: string, maxLength = 32): string {
    if (name.length <= maxLength) return name;
    return `${name.slice(0, maxLength)}...`;
}

function DeviceAvatar({ device }: { device: Device }) {
    // Device avatars have a light gray background with the device image centered inside
    return (
        <div
            className="relative size-8 shrink-0 rounded-full border-[1.5px] border-white bg-[#f5f5f5]"
            title={device.name}
        >
            {device.image && (
                <img
                    src={device.image}
                    alt={device.name}
                    className="absolute inset-[15%] size-[70%] object-contain"
                />
            )}
            {/* Contrast border */}
            <div className="absolute inset-0 rounded-full border border-black/[0.08]" />
        </div>
    );
}

function DeviceAvatars({ devices }: { devices: Device[] }) {
    const count = devices.length;
    const shownDevices = devices.slice(0, 3);
    const extra = count - 3;

    // Build tooltip content
    const visibleDevices = devices.slice(0, 3);
    const remainingCount = count - 3;

    const tooltipTitle = (
        <div className="flex flex-col gap-1">
            {visibleDevices.map((device, i) => (
                <span key={i}>{truncateDeviceName(device.name)}</span>
            ))}
            {remainingCount > 0 && (
                <span className="text-tooltip-supporting-text">+{remainingCount} more device{remainingCount > 1 ? "s" : ""}</span>
            )}
        </div>
    );

    return (
        <Tooltip title={tooltipTitle} placement="top" arrow>
            <TooltipTrigger>
                <div className="flex items-center gap-1">
                    <span className="text-sm text-[#181d27]">{count}</span>
                    <div className="flex -space-x-1.5">
                        {shownDevices.map((device, i) => (
                            <DeviceAvatar key={i} device={device} />
                        ))}
                        {extra > 0 && (
                            <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white bg-[#f5f5f5]">
                                <span className="text-xs font-medium text-[#535862]">+{extra}</span>
                                <div className="absolute inset-0 rounded-full border border-black/[0.08]" />
                            </div>
                        )}
                    </div>
                </div>
            </TooltipTrigger>
        </Tooltip>
    );
}

// ---------------------------------------------------------------------------
// US Flag Icon (using Untitled UI flags)
// ---------------------------------------------------------------------------

const countryCodeMap: Record<string, string> = {
    "United States": "US",
    "Canada": "CA",
    "United Kingdom": "GB",
    "Germany": "DE",
    "France": "FR",
    "Australia": "AU",
    "Japan": "JP",
    "Singapore": "SG",
};

function CountryFlag({ country }: { country: string }) {
    const code = countryCodeMap[country] || "US";
    return (
        <img
            src={`https://www.untitledui.com/images/flags/${code}.svg`}
            alt={`${country} flag`}
            className="size-5 shrink-0 rounded-full"
        />
    );
}

// ---------------------------------------------------------------------------
// Success Toast Notification
// ---------------------------------------------------------------------------

function SuccessToast({
    isVisible,
    onDismiss,
    onViewOrder,
}: {
    isVisible: boolean;
    onDismiss: () => void;
    onViewOrder?: () => void;
}) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onDismiss]);

    return (
        <div
            className={cx(
                "fixed inset-x-4 top-4 z-[60] md:inset-x-auto md:right-6 md:top-6 md:w-[400px] transition-all duration-300 ease-out",
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 pointer-events-none opacity-0",
            )}
        >
            <div className="relative overflow-hidden rounded-xl border border-[#d5d7da] bg-white p-4 shadow-lg">
                {/* Close button */}
                <button
                    type="button"
                    onClick={onDismiss}
                    className="absolute right-2 top-2 rounded-lg p-2 hover:bg-[#fafafa]"
                >
                    <XClose className="size-5 text-[#535862]" />
                </button>

                <div className="flex gap-4 pr-8">
                    {/* Success icon with rings */}
                    <div className="relative size-5 shrink-0">
                        <div className="absolute -inset-[20%] rounded-full border-2 border-[#079455] opacity-30 animate-in zoom-in-50 duration-500" />
                        <div className="absolute -inset-[45%] rounded-full border-2 border-[#079455] opacity-10 animate-in zoom-in-0 duration-700" />
                        <CheckCircle className="relative size-5 text-[#079455] animate-in zoom-in-50 duration-300" />
                    </div>

                    <div className="flex flex-1 flex-col gap-3 pt-0.5">
                        {/* Text */}
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-[#181d27]">
                                Incoming order accepted
                            </p>
                            <p className="text-sm text-[#414651]">
                                You have accepted a new order.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onDismiss}
                                className="text-sm font-semibold text-[#535862] hover:text-[#414651]"
                            >
                                Dismiss
                            </button>
                            {onViewOrder && (
                                <button
                                    type="button"
                                    onClick={onViewOrder}
                                    className="text-sm font-semibold text-[#0948b5] hover:text-[#073d8a]"
                                >
                                    View order
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Error Toast Notification (for declined orders)
// ---------------------------------------------------------------------------

function ErrorToast({
    isVisible,
    onDismiss,
}: {
    isVisible: boolean;
    onDismiss: () => void;
}) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onDismiss]);

    return (
        <div
            className={cx(
                "fixed inset-x-4 top-4 z-[60] md:inset-x-auto md:right-6 md:top-6 md:w-[400px] transition-all duration-300 ease-out",
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 pointer-events-none opacity-0",
            )}
        >
            <div className="relative overflow-hidden rounded-xl border border-[#d5d7da] bg-white p-4 shadow-lg">
                {/* Close button */}
                <button
                    type="button"
                    onClick={onDismiss}
                    className="absolute right-2 top-2 rounded-lg p-2 hover:bg-[#fafafa]"
                >
                    <XClose className="size-5 text-[#535862]" />
                </button>

                <div className="flex gap-4 pr-8">
                    {/* Error icon with rings */}
                    <div className="relative size-5 shrink-0">
                        <div className="absolute -inset-[20%] rounded-full border-2 border-[#d92d20] opacity-30 animate-in zoom-in-50 duration-500" />
                        <div className="absolute -inset-[45%] rounded-full border-2 border-[#d92d20] opacity-10 animate-in zoom-in-0 duration-700" />
                        <XCircle className="relative size-5 text-[#d92d20] animate-in zoom-in-50 duration-300" />
                    </div>

                    <div className="flex flex-1 flex-col gap-3 pt-0.5">
                        {/* Text */}
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-[#181d27]">
                                Incoming order declined
                            </p>
                            <p className="text-sm text-[#414651]">
                                You declined an incoming order.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onDismiss}
                                className="text-sm font-semibold text-[#535862] hover:text-[#414651]"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// RFQ Error Toast
// ---------------------------------------------------------------------------

function RFQErrorToast({
    isVisible,
    onDismiss,
}: {
    isVisible: boolean;
    onDismiss: () => void;
}) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onDismiss]);

    return (
        <div
            className={cx(
                "fixed inset-x-4 top-4 z-[60] md:inset-x-auto md:right-6 md:top-6 md:w-[400px] transition-all duration-300 ease-out",
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 pointer-events-none opacity-0",
            )}
        >
            <div className="relative overflow-hidden rounded-xl border border-[#d5d7da] bg-white p-4 shadow-lg">
                {/* Close button */}
                <button
                    type="button"
                    onClick={onDismiss}
                    className="absolute right-2 top-2 rounded-lg p-2 hover:bg-[#fafafa]"
                >
                    <XClose className="size-5 text-[#535862]" />
                </button>

                <div className="flex gap-4 pr-8">
                    {/* Error icon with rings */}
                    <div className="relative size-5 shrink-0">
                        <div className="absolute -inset-[20%] rounded-full border-2 border-[#d92d20] opacity-30 animate-in zoom-in-50 duration-500" />
                        <div className="absolute -inset-[45%] rounded-full border-2 border-[#d92d20] opacity-10 animate-in zoom-in-0 duration-700" />
                        <XCircle className="relative size-5 text-[#d92d20] animate-in zoom-in-50 duration-300" />
                    </div>

                    <div className="flex flex-1 flex-col gap-3 pt-0.5">
                        {/* Text */}
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-[#181d27]">
                                Incoming RFQ declined
                            </p>
                            <p className="text-sm text-[#414651]">
                                You declined an incoming RFQ.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onDismiss}
                                className="text-sm font-semibold text-[#535862] hover:text-[#414651]"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// RFQ Accept Toast
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// RFQ Respond Toast
// ---------------------------------------------------------------------------

function RFQRespondToast({
    isVisible,
    onDismiss,
}: {
    isVisible: boolean;
    onDismiss: () => void;
}) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onDismiss]);

    return (
        <div
            className={cx(
                "fixed inset-x-4 top-4 z-[60] md:inset-x-auto md:right-6 md:top-6 md:w-[400px] transition-all duration-300 ease-out",
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 pointer-events-none opacity-0",
            )}
        >
            <div className="relative overflow-hidden rounded-xl border border-[#d5d7da] bg-white p-4 shadow-lg">
                {/* Close button */}
                <button
                    type="button"
                    onClick={onDismiss}
                    className="absolute right-2 top-2 rounded-lg p-2 hover:bg-[#fafafa]"
                >
                    <XClose className="size-5 text-[#535862]" />
                </button>

                <div className="flex gap-4 pr-8">
                    {/* Success icon with rings */}
                    <div className="relative size-5 shrink-0">
                        <div className="absolute -inset-[20%] rounded-full border-2 border-[#0b4a6f] opacity-30 animate-in zoom-in-50 duration-500" />
                        <div className="absolute -inset-[45%] rounded-full border-2 border-[#0b4a6f] opacity-10 animate-in zoom-in-0 duration-700" />
                        <CheckCircle className="relative size-5 text-[#0b4a6f] animate-in zoom-in-50 duration-300" />
                    </div>

                    <div className="flex flex-1 flex-col gap-3 pt-0.5">
                        {/* Text */}
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-[#181d27]">
                                RFQ response submitted
                            </p>
                            <p className="text-sm text-[#414651]">
                                Your budget response has been sent to the client for review.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onDismiss}
                                className="text-sm font-semibold text-[#535862] hover:text-[#414651]"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Accept Order Modal
// ---------------------------------------------------------------------------

function AcceptOrderModal({
    isOpen,
    onClose,
    onConfirm,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    if (!isOpen) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal className="max-w-[400px]">
                <Dialog>
                    <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-4 top-4 rounded-lg p-2 transition-colors hover:bg-[#fafafa]"
                        >
                            <XClose className="size-5 text-[#535862]" />
                        </button>

                        {/* Content */}
                        <div className="flex flex-col gap-4 px-6 pt-6">
                            {/* Icon */}
                            <div className="flex size-12 items-center justify-center rounded-full bg-[#dcfae6] animate-in zoom-in-50 duration-300">
                                <CheckCircle className="size-6 text-[#17b26a]" />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-semibold text-[#181d27]">
                                    Are you sure you want to accept this order?
                                </h3>
                                <p className="text-sm text-[#535862]">
                                    Accepting this order means you are able to fulfil the items in the order according to the specification and add-on-request within your pre-defined SLA.
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 px-6 pb-6 pt-8">
                            <Button size="lg" color="secondary" className="flex-1" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button size="lg" color="primary" className="flex-1" onClick={onConfirm}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

// ---------------------------------------------------------------------------
// Decline Order Modal
// ---------------------------------------------------------------------------

const declineReasons = [
    { id: "stock_not_available", label: "Stock not available" },
    { id: "impossible_timeline", label: "Impossible timeline" },
    { id: "pricing_issue", label: "Pricing issue" },
    { id: "others", label: "Others" },
];

function DeclineOrderModal({
    isOpen,
    onClose,
    onConfirm,
    orderId,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    orderId: string;
}) {
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [otherReason, setOtherReason] = useState("");

    const isOthersSelected = selectedReason === "others";
    const isDeclineDisabled = !selectedReason || (isOthersSelected && !otherReason.trim());

    const handleClose = () => {
        setSelectedReason(null);
        setOtherReason("");
        onClose();
    };

    const handleConfirm = () => {
        setSelectedReason(null);
        setOtherReason("");
        onConfirm();
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <Modal className="max-w-[400px]">
                <Dialog>
                    <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute right-4 top-4 rounded-lg p-2 transition-colors hover:bg-[#fafafa]"
                        >
                            <XClose className="size-5 text-[#535862]" />
                        </button>

                        {/* Content */}
                        <div className="flex flex-col gap-4 px-6 pt-6">
                            {/* Icon */}
                            <div className="flex size-12 items-center justify-center rounded-full bg-[#fee4e2] animate-in zoom-in-50 duration-300">
                                <XClose className="size-6 text-[#d92d20]" />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-semibold text-[#181d27]">
                                    Decline order #{orderId}
                                </h3>
                                <p className="text-sm text-[#535862]">
                                    Would you like to decline this order? Please be aware that declining will prevent you from viewing this order again.
                                </p>
                            </div>

                            {/* Reason for decline dropdown */}
                            <Select
                                label="Reason for decline"
                                placeholder="Select a reason"
                                isRequired
                                selectedKey={selectedReason}
                                onSelectionChange={(key) => setSelectedReason(key as string)}
                                items={declineReasons}
                            >
                                {(item) => <Select.Item key={item.id} id={item.id} label={item.label} />}
                            </Select>

                            {/* Other reason textarea - only shown when Others is selected */}
                            {isOthersSelected && (
                                <TextArea
                                    label="Other reason"
                                    placeholder="Why are you declining the order..."
                                    isRequired
                                    value={otherReason}
                                    onChange={(value) => setOtherReason(value)}
                                    rows={4}
                                    className="animate-in fade-in slide-in-from-top-2 duration-200"
                                />
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 px-6 pb-6 pt-8">
                            <Button size="lg" color="secondary" className="flex-1" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                size="lg"
                                color="primary-destructive"
                                className="flex-1"
                                onClick={handleConfirm}
                                isDisabled={isDeclineDisabled}
                            >
                                Decline
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

// ---------------------------------------------------------------------------
// Accept RFQ Modal
// ---------------------------------------------------------------------------

function AcceptRFQModal({
    isOpen,
    onClose,
    onConfirm,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    if (!isOpen) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal className="max-w-[400px]">
                <Dialog>
                    <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-4 top-4 rounded-lg p-2 transition-colors hover:bg-[#fafafa]"
                        >
                            <XClose className="size-5 text-[#535862]" />
                        </button>

                        {/* Content */}
                        <div className="flex flex-col gap-4 px-6 pt-6">
                            {/* Icon */}
                            <div className="flex size-12 items-center justify-center rounded-full bg-[#dcfae6] animate-in zoom-in-50 duration-300">
                                <CheckCircle className="size-6 text-[#17b26a]" />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-semibold text-[#181d27]">
                                    Accept RFQ budget?
                                </h3>
                                <p className="text-sm text-[#535862]">
                                    By accepting this RFQ, you confirm that you can fulfill the request at the proposed budget. The client will be notified of your acceptance.
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 px-6 pb-6 pt-8">
                            <Button size="lg" color="secondary" className="flex-1" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button size="lg" color="primary" className="flex-1" onClick={onConfirm}>
                                Accept Budget
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

// ---------------------------------------------------------------------------
// Respond to Budget Modal
// ---------------------------------------------------------------------------

type ResponseType = "quote" | "alternative" | "unavailable";
type AlternativeSource = "catalog" | "manual";

interface DeviceResponseState {
    responseType: ResponseType;
    quotePrice: string;
    alternativeSource: AlternativeSource;
    selectedCatalogDevice: CatalogDevice | null;
    manualDeviceName: string;
    manualDevicePrice: string;
    manualDeviceSpecs: string;
    unavailableReason: string;
}

function RespondToBudgetModal({
    isOpen,
    onClose,
    onSubmit,
    devices,
    rfqId,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    devices: RFQDevice[];
    rfqId: string;
}) {
    const [responses, setResponses] = useState<DeviceResponseState[]>(() =>
        devices.map((device) => ({
            responseType: "quote" as ResponseType,
            quotePrice: device.unitPrice ? device.unitPrice.toString() : "",
            alternativeSource: "catalog" as AlternativeSource,
            selectedCatalogDevice: null,
            manualDeviceName: "",
            manualDevicePrice: "",
            manualDeviceSpecs: "",
            unavailableReason: "",
        }))
    );

    const [expandedDevice, setExpandedDevice] = useState<number | null>(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const updateResponse = (index: number, updates: Partial<DeviceResponseState>) => {
        setResponses((prev) =>
            prev.map((r, i) => (i === index ? { ...r, ...updates } : r))
        );
    };

    const handleClose = () => {
        // Reset state
        setResponses(
            devices.map((device) => ({
                responseType: "quote" as ResponseType,
                quotePrice: device.unitPrice ? device.unitPrice.toString() : "",
                alternativeSource: "catalog" as AlternativeSource,
                selectedCatalogDevice: null,
                manualDeviceName: "",
                manualDevicePrice: "",
                manualDeviceSpecs: "",
                unavailableReason: "",
            }))
        );
        setExpandedDevice(0);
        onClose();
    };

    const calculateTotal = () => {
        return devices.reduce((total, device, index) => {
            const response = responses[index];
            // Skip unavailable devices in total calculation
            if (response.responseType === "unavailable") {
                return total;
            }
            if (response.responseType === "quote") {
                const price = parseFloat(response.quotePrice) || 0;
                return total + price * device.quantity;
            } else if (response.responseType === "alternative") {
                if (response.alternativeSource === "catalog" && response.selectedCatalogDevice) {
                    return total + response.selectedCatalogDevice.price * device.quantity;
                } else if (response.alternativeSource === "manual") {
                    const price = parseFloat(response.manualDevicePrice) || 0;
                    return total + price * device.quantity;
                }
            }
            return total;
        }, 0);
    };

    const isFormValid = () => {
        return responses.every((response) => {
            if (response.responseType === "quote") {
                return response.quotePrice && parseFloat(response.quotePrice) > 0;
            }
            if (response.responseType === "alternative") {
                if (response.alternativeSource === "catalog") {
                    return response.selectedCatalogDevice !== null;
                } else {
                    return (
                        response.manualDeviceName.trim() &&
                        response.manualDevicePrice &&
                        parseFloat(response.manualDevicePrice) > 0 &&
                        response.manualDeviceSpecs.trim()
                    );
                }
            }
            if (response.responseType === "unavailable") {
                // Unavailable is always valid (reason is optional)
                return true;
            }
            return false;
        });
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <Modal className="w-full max-w-[640px] mx-3 sm:mx-auto">
                <Dialog>
                    <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute right-3 top-3 z-10 rounded-lg p-1.5 transition-colors hover:bg-[#fafafa] sm:right-6 sm:top-6 sm:p-2"
                        >
                            <XClose className="size-5 text-[#535862]" />
                        </button>

                        {/* Header */}
                        <div className="border-b border-[#e9eaeb] px-3 pt-3 pb-3 sm:px-6 sm:pt-6 sm:pb-5">
                            <div className="flex items-start gap-3 pr-8 sm:gap-4 sm:pr-10">
                                <FeaturedIcon
                                    icon={Edit05}
                                    size="lg"
                                    color="gray"
                                    theme="modern"
                                    className="animate-in zoom-in-50 duration-300 hidden sm:flex"
                                />
                                <FeaturedIcon
                                    icon={Edit05}
                                    size="md"
                                    color="gray"
                                    theme="modern"
                                    className="animate-in zoom-in-50 duration-300 sm:hidden"
                                />
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-base font-semibold text-[#181d27] sm:text-lg">
                                        Respond to RFQ #{rfqId}
                                    </h3>
                                    <p className="text-sm text-[#535862]">
                                        Review each device and provide your pricing response.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content - Scrollable */}
                        <div className="max-h-[50vh] overflow-y-auto px-3 py-3 sm:max-h-[400px] sm:px-6 sm:py-6">
                            <div className="flex flex-col gap-4">
                                {devices.map((device, index) => {
                                    const response = responses[index];
                                    const isExpanded = expandedDevice === index;

                                    return (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-[#e9eaeb] bg-white overflow-hidden"
                                        >
                                            {/* Device Header */}
                                            <button
                                                type="button"
                                                onClick={() => setExpandedDevice(isExpanded ? null : index)}
                                                className="flex w-full items-center justify-between p-3 text-left hover:bg-[#fafafa] transition-colors sm:p-4"
                                            >
                                                <div className="flex flex-col gap-1 min-w-0 flex-1 pr-3">
                                                    <span className="text-sm font-semibold text-[#181d27] truncate">
                                                        {device.name}
                                                    </span>
                                                    <span className="text-xs text-[#535862]">
                                                        Qty: {device.quantity}{device.unitPrice !== undefined && ` • Budget: ${formatCurrency(device.unitPrice)}/unit`}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={cx(
                                                        "rounded-full px-2.5 py-1 text-xs font-medium",
                                                        response.responseType === "quote" && "bg-[#dcfae6] text-[#067647]",
                                                        response.responseType === "alternative" && "bg-[#eff8ff] text-[#0948b5]",
                                                        response.responseType === "unavailable" && "bg-[#fef3f2] text-[#b42318]",
                                                    )}>
                                                        {response.responseType === "quote" && "Quote"}
                                                        {response.responseType === "alternative" && "Alternative"}
                                                        {response.responseType === "unavailable" && "Unable to Fulfill"}
                                                    </span>
                                                    <ChevronDown
                                                        className={cx(
                                                            "size-5 text-[#535862] transition-transform duration-200 shrink-0",
                                                            isExpanded && "rotate-180"
                                                        )}
                                                    />
                                                </div>
                                            </button>

                                            {/* Expanded Content */}
                                            {isExpanded && (
                                                <div className="border-t border-[#e9eaeb] p-3 animate-in fade-in slide-in-from-top-2 duration-200 sm:p-4">
                                                    {/* Response Type Selection */}
                                                    <div className="flex flex-col gap-4">
                                                        <Tabs
                                                            selectedKey={response.responseType}
                                                            onSelectionChange={(key) => updateResponse(index, { responseType: key as ResponseType })}
                                                            className="w-full"
                                                        >
                                                            <Tabs.List
                                                                type="button-minimal"
                                                                size="sm"
                                                                fullWidth
                                                                items={[]}
                                                            >
                                                                <Tabs.Item key="quote" id="quote">
                                                                    <Edit05 className="size-4 shrink-0" />
                                                                    <span>Quote</span>
                                                                </Tabs.Item>
                                                                <Tabs.Item key="alternative" id="alternative">
                                                                    <SwitchHorizontal01 className="size-4 shrink-0" />
                                                                    <span className="hidden sm:inline">Alternative</span>
                                                                    <span className="sm:hidden">Alt</span>
                                                                </Tabs.Item>
                                                                <Tabs.Item key="unavailable" id="unavailable">
                                                                    <XCircle className="size-4 shrink-0" />
                                                                    <span className="hidden sm:inline">Unable to Fulfill</span>
                                                                    <span className="sm:hidden">N/A</span>
                                                                </Tabs.Item>
                                                            </Tabs.List>
                                                        </Tabs>

                                                        {/* Quote Price Input */}
                                                        {response.responseType === "quote" && (
                                                            <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                                                <Input
                                                                    label="Your price per unit"
                                                                    placeholder="0.00"
                                                                    value={response.quotePrice}
                                                                    onChange={(value) => updateResponse(index, { quotePrice: value })}
                                                                    type="number"
                                                                />
                                                                {response.quotePrice && (
                                                                    <p className="mt-1.5 text-xs text-[#535862]">
                                                                        Subtotal: {formatCurrency(parseFloat(response.quotePrice) * device.quantity)}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Alternative Device Section */}
                                                        {response.responseType === "alternative" && (
                                                            <div className="mt-2 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                                                {/* Source Selection */}
                                                                <RadioGroup
                                                                    value={response.alternativeSource}
                                                                    onChange={(value) => updateResponse(index, { alternativeSource: value as AlternativeSource })}
                                                                    className="flex-row gap-6"
                                                                    aria-label="Alternative source"
                                                                >
                                                                    <RadioButton value="catalog" label="From Catalog" />
                                                                    <RadioButton value="manual" label="Manual Entry" />
                                                                </RadioGroup>

                                                                {/* Catalog Selection */}
                                                                {response.alternativeSource === "catalog" && (
                                                                    <div className="animate-in fade-in duration-200">
                                                                        <Select
                                                                            label="Select from catalog"
                                                                            placeholder="Choose a device"
                                                                            size="sm"
                                                                            selectedKey={response.selectedCatalogDevice?.id || null}
                                                                            onSelectionChange={(key) => {
                                                                                const catalogDevice = catalogDevices.find((d) => d.id === key);
                                                                                updateResponse(index, { selectedCatalogDevice: catalogDevice || null });
                                                                            }}
                                                                            items={catalogDevices.map((d) => ({
                                                                                id: d.id,
                                                                                label: d.name,
                                                                                supportingText: formatCurrency(d.price),
                                                                                avatarUrl: d.image,
                                                                            }))}
                                                                        >
                                                                            {(item) => (
                                                                                <Select.Item
                                                                                    key={item.id}
                                                                                    id={item.id}
                                                                                    label={item.label}
                                                                                    supportingText={item.supportingText}
                                                                                    avatarUrl={item.avatarUrl}
                                                                                />
                                                                            )}
                                                                        </Select>
                                                                        {response.selectedCatalogDevice && (
                                                                            <div className="mt-2 rounded-lg bg-[#fafafa] p-2">
                                                                                <p className="text-xs text-[#535862]">
                                                                                    {response.selectedCatalogDevice.specs}
                                                                                </p>
                                                                                <p className="mt-1 text-xs font-medium text-[#181d27]">
                                                                                    Subtotal: {formatCurrency(response.selectedCatalogDevice.price * device.quantity)}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* Manual Entry */}
                                                                {response.alternativeSource === "manual" && (
                                                                    <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                                                                        <Input
                                                                            label="Device name"
                                                                            placeholder="e.g., Dell XPS 15"
                                                                            value={response.manualDeviceName}
                                                                            onChange={(value) => updateResponse(index, { manualDeviceName: value })}
                                                                            isRequired
                                                                        />
                                                                        <Input
                                                                            label="Price per unit"
                                                                            placeholder="0.00"
                                                                            value={response.manualDevicePrice}
                                                                            onChange={(value) => updateResponse(index, { manualDevicePrice: value })}
                                                                            type="number"
                                                                            isRequired
                                                                        />
                                                                        <TextArea
                                                                            label="Description"
                                                                            placeholder="e.g., Intel i7, 32GB RAM, 1TB SSD"
                                                                            value={response.manualDeviceSpecs}
                                                                            onChange={(value) => updateResponse(index, { manualDeviceSpecs: value })}
                                                                            rows={2}
                                                                            isRequired
                                                                        />
                                                                        {response.manualDevicePrice && (
                                                                            <p className="text-xs text-[#535862]">
                                                                                Subtotal: {formatCurrency(parseFloat(response.manualDevicePrice) * device.quantity)}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Unable to Fulfill Section */}
                                                        {response.responseType === "unavailable" && (
                                                            <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                                                <div className="rounded-lg border border-[#fecdca] bg-[#fef3f2] p-3">
                                                                    <div className="flex gap-2">
                                                                        <XCircle className="size-4 shrink-0 text-[#d92d20]" />
                                                                        <p className="text-sm font-medium text-[#b42318]">
                                                                            This device will be marked as unavailable
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-3">
                                                                    <TextArea
                                                                        label="Reason (optional)"
                                                                        placeholder="e.g., Out of stock, Discontinued, Not available in this region..."
                                                                        value={response.unavailableReason}
                                                                        onChange={(value) => updateResponse(index, { unavailableReason: value })}
                                                                        rows={2}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-[#e9eaeb] px-3 py-3 sm:px-6 sm:py-6">
                            <div className="mb-4 flex items-center justify-between rounded-lg bg-[#eff8ff] px-4 py-3 sm:mb-5">
                                <span className="text-sm font-medium text-[#0b4a6f]">Your quoted total</span>
                                <span className="text-lg font-semibold text-[#0b4a6f]">{formatCurrency(calculateTotal())}</span>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button size="lg" color="secondary" className="flex-1" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button
                                    size="lg"
                                    color="primary"
                                    className="flex-1"
                                    onClick={() => setShowConfirmModal(true)}
                                    isDisabled={!isFormValid()}
                                >
                                    Submit Response
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <ModalOverlay isOpen={showConfirmModal} onOpenChange={(open) => !open && setShowConfirmModal(false)}>
                    <Modal className="max-w-[400px]">
                        <Dialog>
                            <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
                                {/* Close button */}
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmModal(false)}
                                    className="absolute right-4 top-4 rounded-lg p-2 transition-colors hover:bg-[#fafafa]"
                                >
                                    <XClose className="size-5 text-[#535862]" />
                                </button>

                                {/* Content */}
                                <div className="flex flex-col gap-4 px-6 pt-6">
                                    {/* Icon */}
                                    <FeaturedIcon
                                        icon={CheckCircle}
                                        size="lg"
                                        color="success"
                                        theme="light"
                                        className="animate-in zoom-in-50 duration-300"
                                    />

                                    {/* Text */}
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-lg font-semibold text-[#181d27]">
                                            Submit your response?
                                        </h3>
                                        <p className="text-sm text-[#535862]">
                                            {(() => {
                                                const unavailableCount = responses.filter(r => r.responseType === "unavailable").length;
                                                const totalDevices = devices.length;
                                                if (unavailableCount === totalDevices) {
                                                    return "You're marking all devices as unable to fulfill. The customer will be notified of your response.";
                                                } else if (unavailableCount > 0) {
                                                    return `You're submitting a quote of ${formatCurrency(calculateTotal())} for ${totalDevices - unavailableCount} device${totalDevices - unavailableCount > 1 ? "s" : ""}, with ${unavailableCount} marked as unable to fulfill. The customer will be notified.`;
                                                }
                                                return `You're about to submit a quote of ${formatCurrency(calculateTotal())} for this RFQ. The client will be notified and can review your response.`;
                                            })()}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 px-6 pb-6 pt-8">
                                    <Button size="lg" color="secondary" className="flex-1" onClick={() => setShowConfirmModal(false)}>
                                        Go back
                                    </Button>
                                    <Button
                                        size="lg"
                                        color="primary"
                                        className="flex-1"
                                        onClick={() => {
                                            setShowConfirmModal(false);
                                            onSubmit();
                                            handleClose();
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            )}
        </ModalOverlay>
    );
}

// ---------------------------------------------------------------------------
// Decline RFQ Modal
// ---------------------------------------------------------------------------

function DeclineRFQModal({
    isOpen,
    onClose,
    onConfirm,
    rfqId,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    rfqId: string;
}) {
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [otherReason, setOtherReason] = useState("");

    const isOthersSelected = selectedReason === "others";
    const isDeclineDisabled = !selectedReason || (isOthersSelected && !otherReason.trim());

    const handleClose = () => {
        setSelectedReason(null);
        setOtherReason("");
        onClose();
    };

    const handleConfirm = () => {
        setSelectedReason(null);
        setOtherReason("");
        onConfirm();
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <Modal className="max-w-[400px]">
                <Dialog>
                    <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute right-4 top-4 rounded-lg p-2 transition-colors hover:bg-[#fafafa]"
                        >
                            <XClose className="size-5 text-[#535862]" />
                        </button>

                        {/* Content */}
                        <div className="flex flex-col gap-4 px-6 pt-6">
                            {/* Icon */}
                            <div className="flex size-12 items-center justify-center rounded-full bg-[#fee4e2] animate-in zoom-in-50 duration-300">
                                <XClose className="size-6 text-[#d92d20]" />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-semibold text-[#181d27]">
                                    Decline RFQ #{rfqId}
                                </h3>
                                <p className="text-sm text-[#535862]">
                                    Would you like to decline this RFQ? Please be aware that declining will prevent you from viewing this RFQ again.
                                </p>
                            </div>

                            {/* Reason for decline dropdown */}
                            <Select
                                label="Reason for decline"
                                placeholder="Select a reason"
                                isRequired
                                selectedKey={selectedReason}
                                onSelectionChange={(key) => setSelectedReason(key as string)}
                                items={declineReasons}
                            >
                                {(item) => <Select.Item key={item.id} id={item.id} label={item.label} />}
                            </Select>

                            {/* Other reason textarea - only shown when Others is selected */}
                            {isOthersSelected && (
                                <TextArea
                                    label="Other reason"
                                    placeholder="Why are you declining the RFQ..."
                                    isRequired
                                    value={otherReason}
                                    onChange={(value) => setOtherReason(value)}
                                    rows={4}
                                    className="animate-in fade-in slide-in-from-top-2 duration-200"
                                />
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 px-6 pb-6 pt-8">
                            <Button size="lg" color="secondary" className="flex-1" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                size="lg"
                                color="primary-destructive"
                                className="flex-1"
                                onClick={handleConfirm}
                                isDisabled={isDeclineDisabled}
                            >
                                Decline
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

// ---------------------------------------------------------------------------
// Order Details Sidebar
// ---------------------------------------------------------------------------

function OrderDetailsSidebar({
    order,
    isOpen,
    onClose,
    onAccept,
    onDecline,
}: {
    order: OrderRequest | null;
    isOpen: boolean;
    onClose: () => void;
    onAccept: (orderId: string) => void;
    onDecline: (orderId: string) => void;
}) {
    const [expandedDevice, setExpandedDevice] = useState<number | null>(null);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showDeclineModal, setShowDeclineModal] = useState(false);

    // Keep last valid order for exit animation
    const lastOrderRef = useRef<OrderRequest | null>(null);
    if (order) lastOrderRef.current = order;
    const displayOrder = order ?? lastOrderRef.current;

    const toggleDevice = (index: number) => {
        setExpandedDevice(expandedDevice === index ? null : index);
    };

    if (!displayOrder) return null;

    const totalQuantity = displayOrder.devices.reduce((sum, d) => sum + (d.quantity || 1), 0);

    return (
        <>
            <SlideoutMenu isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
                <SlideoutMenu.Header onClose={onClose}>
                    <div className="flex items-start gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
                            <ShoppingBag01 className="size-5 text-fg-quaternary" />
                        </div>
                        <div className="flex flex-1 flex-col gap-1.5">
                            <h2 className="text-xl font-semibold text-primary">
                                Incoming Order #{displayOrder.id}
                            </h2>
                            <ServiceBadge service={displayOrder.service} />
                        </div>
                    </div>
                </SlideoutMenu.Header>

                <SlideoutMenu.Content>
                    <div className="flex flex-col gap-4">
                        {/* Devices Card */}
                        <div className="rounded-xl border border-[#e9eaeb] bg-white">
                            {/* Devices Header */}
                            <div className="flex items-center justify-between border-b border-[#e9eaeb] px-3 py-3">
                                <span className="text-sm font-semibold text-[#414651]">Device(s)</span>
                                <span className="rounded-full border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 text-xs font-medium text-[#414651]">
                                    {totalQuantity}
                                </span>
                            </div>

                            {/* Device List */}
                            <div className="flex flex-col">
                                {[...displayOrder.devices].sort((a, b) => a.name.localeCompare(b.name)).map((device, index) => (
                                    <div
                                        key={index}
                                        className={cx(
                                            "flex flex-col transition-colors duration-200",
                                            expandedDevice === index ? "bg-[#fafafa]" : "",
                                        )}
                                    >
                                        {/* Device Row */}
                                        <button
                                            type="button"
                                            onClick={() => toggleDevice(index)}
                                            className="flex w-full items-center gap-2 p-3 text-left transition-colors hover:bg-[#fafafa]"
                                        >
                                            <div className="relative size-10 shrink-0 rounded-full bg-[#f5f5f5]">
                                                {device.image && (
                                                    <img
                                                        src={device.image}
                                                        alt={device.name}
                                                        className="absolute inset-[15%] size-[70%] object-contain"
                                                    />
                                                )}
                                                <div className="absolute inset-0 rounded-full border border-black/[0.08]" />
                                                {device.quantity && (
                                                    <div className="absolute -bottom-0.5 -right-0.5 rounded-full border border-[#b4d0ff] bg-[#fafafa] px-1 py-0.5 text-[10px] font-medium text-[#414651]">
                                                        {device.quantity}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-1 flex-col">
                                                <span className="text-sm font-semibold text-[#181d27]">
                                                    {device.name}
                                                </span>
                                                <span className="text-sm text-[#535862]">
                                                    {device.price}
                                                </span>
                                            </div>
                                            <div className="rounded-md p-2">
                                                <ChevronDown
                                                    className={cx(
                                                        "size-5 text-[#535862] transition-transform duration-200",
                                                        expandedDevice === index && "rotate-180",
                                                    )}
                                                />
                                            </div>
                                        </button>

                                        {/* Expanded Device Details */}
                                        {expandedDevice === index && device.specs && (
                                            <div className="flex flex-col gap-3 pb-3 pl-[60px] pr-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div className="h-px bg-[#e9eaeb]" />

                                                {/* Device Specifications */}
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-sm font-medium text-[#717680]">
                                                        Device Specification
                                                    </span>
                                                    <div className="flex flex-col gap-2">
                                                        {device.specs.display && (
                                                            <div className="flex flex-col gap-1">
                                                                <span className="text-xs font-medium text-[#181d27]">Display</span>
                                                                <span className="text-xs text-[#535862]">{device.specs.display}</span>
                                                            </div>
                                                        )}
                                                        <div className="flex gap-6">
                                                            {device.specs.processor && (
                                                                <div className="flex flex-1 flex-col gap-1">
                                                                    <span className="text-xs font-medium text-[#181d27]">Processor</span>
                                                                    <span className="text-xs text-[#535862]">{device.specs.processor}</span>
                                                                </div>
                                                            )}
                                                            {device.specs.ram && (
                                                                <div className="flex flex-1 flex-col gap-1">
                                                                    <span className="text-xs font-medium text-[#181d27]">RAM</span>
                                                                    <span className="text-xs text-[#535862]">{device.specs.ram}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex gap-6">
                                                            {device.specs.color && (
                                                                <div className="flex flex-1 flex-col gap-1">
                                                                    <span className="text-xs font-medium text-[#181d27]">Color</span>
                                                                    <span className="text-xs text-[#535862]">{device.specs.color}</span>
                                                                </div>
                                                            )}
                                                            {device.specs.storage && (
                                                                <div className="flex flex-1 flex-col gap-1">
                                                                    <span className="text-xs font-medium text-[#181d27]">Storage</span>
                                                                    <span className="text-xs text-[#535862]">{device.specs.storage}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Add-ons */}
                                                {device.addOns && device.addOns.length > 0 && (
                                                    <>
                                                        <div className="h-px bg-[#e9eaeb]" />
                                                        <div className="flex flex-col gap-2">
                                                            <span className="text-sm font-medium text-[#717680]">Add-ons</span>
                                                            {device.addOns.map((addon, addonIndex) => (
                                                                <div key={addonIndex} className="flex flex-col gap-1">
                                                                    <span className="text-xs font-medium text-[#181d27]">{addon.name}</span>
                                                                    <span className="text-xs text-[#535862]">{addon.price}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="flex items-center justify-between border-t border-[#e9eaeb] px-3 py-3">
                                <span className="text-sm text-[#414651]">Total</span>
                                <span className="text-sm font-semibold text-[#181d27]">{displayOrder.total}</span>
                            </div>
                        </div>

                        {/* Order Details Card */}
                        <div className="flex flex-col gap-6 rounded-xl border border-[#e9eaeb] bg-white p-4">
                            {displayOrder.service !== "Offboarding" && displayOrder.service !== "Storage" && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#252b37]">Due Date</span>
                                    <span className="text-sm text-[#535862]">{displayOrder.dueDate}</span>
                                </div>
                            )}
                            {displayOrder.service !== "Offboarding" && displayOrder.service !== "Storage" && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#252b37]">SLA</span>
                                    <span className="text-sm text-[#535862]">{displayOrder.sla}</span>
                                </div>
                            )}
                            {displayOrder.service === "Offboarding" && displayOrder.pickupDate && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#252b37]">Pickup Date</span>
                                    <span className="text-sm text-[#535862]">{displayOrder.pickupDate}</span>
                                </div>
                            )}
                            {displayOrder.service === "Storage" && displayOrder.storageDuration && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#252b37]">Storage Duration</span>
                                    <span className="text-sm text-[#535862]">{displayOrder.storageDuration}</span>
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold text-[#252b37]">Country</span>
                                <div className="flex items-center gap-1.5">
                                    <CountryFlag country={displayOrder.country} />
                                    <span className="text-sm text-[#535862]">{displayOrder.country}</span>
                                </div>
                            </div>
                            {displayOrder.service !== "Offboarding" && displayOrder.service !== "Storage" && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#252b37]">No. of Recipients</span>
                                    <span className="text-sm text-[#535862]">{displayOrder.recipients}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </SlideoutMenu.Content>

                <SlideoutMenu.Footer>
                    <div className="flex gap-3">
                        <Button
                            size="lg"
                            color="secondary"
                            className="flex-1"
                            iconLeading={XClose}
                            onClick={() => setShowDeclineModal(true)}
                        >
                            Decline order
                        </Button>
                        <Button
                            size="lg"
                            color="primary"
                            className="flex-1"
                            iconLeading={Check}
                            onClick={() => setShowAcceptModal(true)}
                        >
                            Accept order
                        </Button>
                    </div>
                </SlideoutMenu.Footer>
            </SlideoutMenu>

            {/* Accept Order Confirmation Modal */}
            <AcceptOrderModal
                isOpen={showAcceptModal}
                onClose={() => setShowAcceptModal(false)}
                onConfirm={() => {
                    setShowAcceptModal(false);
                    onAccept(displayOrder.id);
                    onClose();
                }}
            />

            {/* Decline Order Modal */}
            <DeclineOrderModal
                isOpen={showDeclineModal}
                onClose={() => setShowDeclineModal(false)}
                onConfirm={() => {
                    setShowDeclineModal(false);
                    onDecline(displayOrder.id);
                    onClose();
                }}
                orderId={displayOrder.id}
            />
        </>
    );
}

// ---------------------------------------------------------------------------
// Filter Dropdown for Order Requests
// ---------------------------------------------------------------------------

function OrderFilterDropdown({
    isOpen,
    onClose,
    filters,
    onApply,
    resultCount,
}: {
    isOpen: boolean;
    onClose: () => void;
    filters: OrderFilters;
    onApply: (filters: OrderFilters) => void;
    resultCount: number;
}) {
    const isMd = useBreakpoint("md");
    const [localFilters, setLocalFilters] = useState<OrderFilters>(filters);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setLocalFilters(filters);
        }
    }, [isOpen, filters]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    const handleReset = () => {
        setLocalFilters(defaultOrderFilters);
    };

    const handleApply = () => {
        onApply(localFilters);
        onClose();
    };

    const toggleServiceType = (service: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            serviceTypes: prev.serviceTypes.includes(service)
                ? prev.serviceTypes.filter((s) => s !== service)
                : [...prev.serviceTypes, service],
        }));
    };

    const toggleCountry = (country: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            countries: prev.countries.includes(country)
                ? prev.countries.filter((c) => c !== country)
                : [...prev.countries, country],
        }));
    };

    const hasActiveFilters =
        localFilters.serviceTypes.length > 0 ||
        localFilters.countries.length > 0 ||
        localFilters.amountRange[0] > 0 ||
        localFilters.amountRange[1] < 10000 ||
        localFilters.dueDateFrom !== "" ||
        localFilters.dueDateTo !== "";

    if (!isOpen) return null;

    return (
        <>
            {!isMd && (
                <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
            )}
            <div
                ref={dropdownRef}
                className={cx(
                    "z-50 overflow-hidden rounded-xl border border-[#e9eaeb] bg-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200",
                    isMd
                        ? "absolute right-0 top-full mt-2 w-[380px]"
                        : "fixed inset-x-4 bottom-4 max-h-[80vh]"
                )}
            >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e9eaeb] px-5 py-3">
                <h3 className="text-base font-semibold text-[#181d27]">Filter Orders</h3>
                <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm font-semibold text-[#0948b5] hover:text-[#073d8a]"
                >
                    Reset
                </button>
            </div>

            {/* Content */}
            <div className="flex max-h-[400px] flex-col gap-5 overflow-y-auto px-5 py-4">
                {/* Service Type */}
                <div className="flex flex-col gap-2.5">
                    <span className="text-sm font-semibold text-[#181d27]">Service Type</span>
                    <div className="flex flex-wrap gap-2">
                        {["Onboarding", "Offboarding", "Storage"].map((service) => (
                            <button
                                key={service}
                                type="button"
                                onClick={() => toggleServiceType(service)}
                                className={cx(
                                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                                    localFilters.serviceTypes.includes(service)
                                        ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                                        : "border-[#e9eaeb] bg-white text-[#535862] hover:bg-[#fafafa]"
                                )}
                            >
                                {localFilters.serviceTypes.includes(service) && (
                                    <Check className="size-3.5" />
                                )}
                                {service}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Country */}
                <div className="flex flex-col gap-2.5">
                    <span className="text-sm font-semibold text-[#181d27]">Country</span>
                    <div className="flex flex-wrap gap-2">
                        {countries.map((country) => (
                            <button
                                key={country}
                                type="button"
                                onClick={() => toggleCountry(country)}
                                className={cx(
                                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                                    localFilters.countries.includes(country)
                                        ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                                        : "border-[#e9eaeb] bg-white text-[#535862] hover:bg-[#fafafa]"
                                )}
                            >
                                {localFilters.countries.includes(country) && (
                                    <Check className="size-3.5" />
                                )}
                                <CountryFlag country={country} />
                                {country}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Amount Range */}
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#181d27]">Amount Range</span>
                        <span className="text-sm text-[#535862]">USD</span>
                    </div>
                    <Slider
                        value={localFilters.amountRange}
                        onChange={(value) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                amountRange: value as [number, number],
                            }))
                        }
                        minValue={0}
                        maxValue={10000}
                        step={100}
                    />
                    <div className="flex items-center justify-between text-sm text-[#535862]">
                        <span>${localFilters.amountRange[0].toLocaleString()}</span>
                        <span>${localFilters.amountRange[1].toLocaleString()}</span>
                    </div>
                </div>

                {/* Due Date Range */}
                <div className="flex flex-col gap-2.5">
                    <span className="text-sm font-semibold text-[#181d27]">Due Date</span>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-[#535862]">From</label>
                            <input
                                type="date"
                                value={localFilters.dueDateFrom}
                                onChange={(e) =>
                                    setLocalFilters((prev) => ({
                                        ...prev,
                                        dueDateFrom: e.target.value,
                                    }))
                                }
                                className="rounded-lg border border-[#e9eaeb] px-3 py-2 text-sm text-[#181d27] outline-none focus:border-[#0948b5] focus:ring-2 focus:ring-[#0948b5]/20"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-[#535862]">To</label>
                            <input
                                type="date"
                                value={localFilters.dueDateTo}
                                onChange={(e) =>
                                    setLocalFilters((prev) => ({
                                        ...prev,
                                        dueDateTo: e.target.value,
                                    }))
                                }
                                className="rounded-lg border border-[#e9eaeb] px-3 py-2 text-sm text-[#181d27] outline-none focus:border-[#0948b5] focus:ring-2 focus:ring-[#0948b5]/20"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#e9eaeb] px-5 py-3">
                <Button size="md" color="primary" className="w-full" iconLeading={FilterLines} onClick={handleApply}>
                    Apply Filter{hasActiveFilters ? ` (${resultCount})` : ""}
                </Button>
            </div>
        </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// Filter Dropdown for RFQs
// ---------------------------------------------------------------------------

function RFQFilterDropdown({
    isOpen,
    onClose,
    filters,
    onApply,
    resultCount,
}: {
    isOpen: boolean;
    onClose: () => void;
    filters: RFQFilters;
    onApply: (filters: RFQFilters) => void;
    resultCount: number;
}) {
    const isMd = useBreakpoint("md");
    const [localFilters, setLocalFilters] = useState<RFQFilters>(filters);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setLocalFilters(filters);
        }
    }, [isOpen, filters]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    const handleReset = () => {
        setLocalFilters(defaultRFQFilters);
    };

    const handleApply = () => {
        onApply(localFilters);
        onClose();
    };

    const toggleCountry = (country: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            countries: prev.countries.includes(country)
                ? prev.countries.filter((c) => c !== country)
                : [...prev.countries, country],
        }));
    };

    const hasActiveFilters =
        localFilters.countries.length > 0 ||
        localFilters.budgetRange[0] > 0 ||
        localFilters.budgetRange[1] < 100000;

    if (!isOpen) return null;

    return (
        <>
            {!isMd && (
                <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
            )}
            <div
                ref={dropdownRef}
                className={cx(
                    "z-50 overflow-hidden rounded-xl border border-[#e9eaeb] bg-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200",
                    isMd
                        ? "absolute right-0 top-full mt-2 w-[380px]"
                        : "fixed inset-x-4 bottom-4 max-h-[80vh]"
                )}
            >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e9eaeb] px-5 py-3">
                <h3 className="text-base font-semibold text-[#181d27]">Filter RFQs</h3>
                <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm font-semibold text-[#0948b5] hover:text-[#073d8a]"
                >
                    Reset
                </button>
            </div>

            {/* Content */}
            <div className="flex max-h-[400px] flex-col gap-5 overflow-y-auto px-5 py-4">
                {/* Country */}
                <div className="flex flex-col gap-2.5">
                    <span className="text-sm font-semibold text-[#181d27]">Country</span>
                    <div className="flex flex-wrap gap-2">
                        {countries.map((country) => (
                            <button
                                key={country}
                                type="button"
                                onClick={() => toggleCountry(country)}
                                className={cx(
                                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                                    localFilters.countries.includes(country)
                                        ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                                        : "border-[#e9eaeb] bg-white text-[#535862] hover:bg-[#fafafa]"
                                )}
                            >
                                {localFilters.countries.includes(country) && (
                                    <Check className="size-3.5" />
                                )}
                                <CountryFlag country={country} />
                                {country}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Budget Range */}
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#181d27]">Budget Range</span>
                        <span className="text-sm text-[#535862]">USD</span>
                    </div>
                    <Slider
                        value={localFilters.budgetRange}
                        onChange={(value) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                budgetRange: value as [number, number],
                            }))
                        }
                        minValue={0}
                        maxValue={100000}
                        step={1000}
                    />
                    <div className="flex items-center justify-between text-sm text-[#535862]">
                        <span>${localFilters.budgetRange[0].toLocaleString()}</span>
                        <span>${localFilters.budgetRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#e9eaeb] px-5 py-3">
                <Button size="md" color="primary" className="w-full" iconLeading={FilterLines} onClick={handleApply}>
                    Apply Filter{hasActiveFilters ? ` (${resultCount})` : ""}
                </Button>
            </div>
        </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// Order Requests Table
// ---------------------------------------------------------------------------

type OrderSortField = "id" | "service" | "total" | "country" | "dueDate";
type RFQSortField = "id" | "budget" | "country";
type SortDirection = "asc" | "desc";

function OrderRequestsTable({
    onViewOrder,
    excludeOrderIds = [],
}: {
    onViewOrder: (order: OrderRequest) => void;
    excludeOrderIds?: string[];
}) {
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState<OrderSortField | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState<OrderFilters>(defaultOrderFilters);
    const isMd = useBreakpoint("md");
    const itemsPerPage = 10;

    // Count active filters
    const activeFilterCount =
        filters.serviceTypes.length +
        filters.countries.length +
        (filters.amountRange[0] > 0 || filters.amountRange[1] < 10000 ? 1 : 0) +
        (filters.dueDateFrom || filters.dueDateTo ? 1 : 0);

    // Handle column header click for sorting
    const handleSort = (field: OrderSortField) => {
        if (sortField === field) {
            // Toggle direction if same field
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            // Set new field with ascending direction
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const filteredOrders = orderRequests
        .filter((order) => {
            // Filter out excluded orders
            if (excludeOrderIds.includes(order.id)) return false;
            // Filter by service type if not "All"
            if (activeTab !== "All" && order.service !== activeTab) return false;
            // Filter by search query (order ID or device names)
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesId = order.id.toLowerCase().includes(query);
                const matchesDevice = order.devices.some((device) => device.name.toLowerCase().includes(query));
                if (!matchesId && !matchesDevice) return false;
            }
            // Filter by service types from filter modal
            if (filters.serviceTypes.length > 0 && !filters.serviceTypes.includes(order.service)) return false;
            // Filter by countries from filter modal
            if (filters.countries.length > 0 && !filters.countries.includes(order.country)) return false;
            // Filter by amount range
            const orderAmount = parseFloat(order.total.replace(/[^0-9.-]+/g, ""));
            if (orderAmount < filters.amountRange[0] || orderAmount > filters.amountRange[1]) return false;
            // Filter by due date range
            if (filters.dueDateFrom || filters.dueDateTo) {
                const orderDate = new Date(order.dueDate);
                orderDate.setHours(0, 0, 0, 0);

                if (filters.dueDateFrom) {
                    const fromDate = new Date(filters.dueDateFrom + "T00:00:00");
                    if (orderDate < fromDate) return false;
                }
                if (filters.dueDateTo) {
                    const toDate = new Date(filters.dueDateTo + "T23:59:59");
                    if (orderDate > toDate) return false;
                }
            }
            return true;
        })
        .sort((a, b) => {
            if (!sortField) return 0;

            let aValue: string | number;
            let bValue: string | number;

            switch (sortField) {
                case "id":
                    aValue = a.id;
                    bValue = b.id;
                    break;
                case "service":
                    aValue = a.service;
                    bValue = b.service;
                    break;
                case "total":
                    // Parse currency string to number for proper sorting
                    aValue = parseFloat(a.total.replace(/[^0-9.-]+/g, ""));
                    bValue = parseFloat(b.total.replace(/[^0-9.-]+/g, ""));
                    break;
                case "country":
                    aValue = a.country;
                    bValue = b.country;
                    break;
                case "dueDate":
                    aValue = new Date(a.dueDate).getTime();
                    bValue = new Date(b.dueDate).getTime();
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Reset to page 1 when filters change
    const handleFilterChange = () => {
        setCurrentPage(1);
    };

    return (
        <div className="min-w-0 rounded-xl border border-[#e9eaeb] bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e9eaeb] px-4 py-4 md:px-6">
                <h3 className="text-lg font-semibold text-[#181d27]">Order requests ({filteredOrders.length})</h3>
            </div>

            {/* Tabs and Search */}
            <div className="flex flex-col gap-3 border-b border-[#e9eaeb] px-4 py-3 md:flex-row md:flex-wrap md:items-center md:justify-between md:px-6">
                {isMd ? (
                    <ButtonGroup size="sm">
                        {orderRequestTabs.map((tab) => (
                            <ButtonGroupItem
                                key={tab}
                                isSelected={activeTab === tab}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </ButtonGroupItem>
                        ))}
                    </ButtonGroup>
                ) : (
                    <Select
                        size="sm"
                        selectedKey={activeTab}
                        onSelectionChange={(key) => setActiveTab(key as string)}
                        items={orderRequestTabs.map((tab) => ({ id: tab, label: tab }))}
                    >
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select>
                )}

                <div className="flex items-center gap-2">
                    <div className="flex-1 md:w-56 md:flex-none">
                        <Input
                            size="sm"
                            icon={SearchLg}
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                        />
                    </div>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowFilterModal(!showFilterModal)}
                            className={cx(
                                "flex h-10 items-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition-colors",
                                showFilterModal
                                    ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                                    : "border-[#e9eaeb] bg-white text-[#414651] hover:bg-[#fafafa]"
                            )}
                        >
                            <FilterLines className="size-5" />
                            Filter
                            {activeFilterCount > 0 && (
                                <span className="flex size-5 items-center justify-center rounded-full bg-[#0948b5] text-xs font-medium text-white">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                        <OrderFilterDropdown
                            isOpen={showFilterModal}
                            onClose={() => setShowFilterModal(false)}
                            filters={filters}
                            onApply={(newFilters: OrderFilters) => {
                                setFilters(newFilters);
                                setCurrentPage(1);
                            }}
                            resultCount={filteredOrders.length}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left text-sm [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
                    <thead>
                        <tr className="border-b border-[#e9eaeb] text-xs font-medium text-[#535862]">
                            <th className="px-6 py-3 font-medium">
                                <button
                                    type="button"
                                    onClick={() => handleSort("id")}
                                    className={cx(
                                        "flex items-center gap-1 hover:text-[#181d27]",
                                        sortField === "id" && "text-[#181d27]"
                                    )}
                                >
                                    Order ID
                                    <ChevronSelectorVertical className={cx(
                                        "size-4",
                                        sortField === "id" ? "text-[#181d27]" : "text-[#d0d5dd]"
                                    )} />
                                </button>
                            </th>
                            <th className="px-6 py-3 font-medium">Device(s)</th>
                            <th className="px-6 py-3 font-medium">
                                <button
                                    type="button"
                                    onClick={() => handleSort("service")}
                                    className={cx(
                                        "flex items-center gap-1 hover:text-[#181d27]",
                                        sortField === "service" && "text-[#181d27]"
                                    )}
                                >
                                    Service
                                    <ChevronSelectorVertical className={cx(
                                        "size-4",
                                        sortField === "service" ? "text-[#181d27]" : "text-[#d0d5dd]"
                                    )} />
                                </button>
                            </th>
                            <th className="px-6 py-3 font-medium">
                                <button
                                    type="button"
                                    onClick={() => handleSort("total")}
                                    className={cx(
                                        "flex items-center gap-1 hover:text-[#181d27]",
                                        sortField === "total" && "text-[#181d27]"
                                    )}
                                >
                                    Amount
                                    <ChevronSelectorVertical className={cx(
                                        "size-4",
                                        sortField === "total" ? "text-[#181d27]" : "text-[#d0d5dd]"
                                    )} />
                                </button>
                            </th>
                            <th className="px-6 py-3 font-medium">
                                <button
                                    type="button"
                                    onClick={() => handleSort("country")}
                                    className={cx(
                                        "flex items-center gap-1 hover:text-[#181d27]",
                                        sortField === "country" && "text-[#181d27]"
                                    )}
                                >
                                    Country
                                    <ChevronSelectorVertical className={cx(
                                        "size-4",
                                        sortField === "country" ? "text-[#181d27]" : "text-[#d0d5dd]"
                                    )} />
                                </button>
                            </th>
                            <th className="px-6 py-3 font-medium">
                                <button
                                    type="button"
                                    onClick={() => handleSort("dueDate")}
                                    className={cx(
                                        "flex items-center gap-1 hover:text-[#181d27]",
                                        sortField === "dueDate" && "text-[#181d27]"
                                    )}
                                >
                                    Due Date
                                    <ChevronSelectorVertical className={cx(
                                        "size-4",
                                        sortField === "dueDate" ? "text-[#181d27]" : "text-[#d0d5dd]"
                                    )} />
                                </button>
                            </th>
                            <th className="px-6 py-3 font-medium" />
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <SearchLg className="size-8 text-[#d0d5dd]" />
                                        <p className="text-sm font-medium text-[#535862]">No orders found</p>
                                        <p className="text-sm text-[#535862]">
                                            Try adjusting your search or filter criteria
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginatedOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-[#e9eaeb] transition-all duration-300 ease-out last:border-b-0 animate-in fade-in slide-in-from-top-2"
                                >
                                    <td className="px-6 py-4 text-sm text-[#181d27]">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <DeviceAvatars devices={order.devices} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <ServiceBadge service={order.service} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#181d27]">{order.total}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <CountryFlag country={order.country} />
                                            <span className="text-sm text-[#535862]">{order.country}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#535862]">{order.dueDate}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => onViewOrder(order)}
                                            className="text-sm font-semibold text-[#0948b5] transition-colors hover:text-[#073d8a] hover:underline"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <PaginationCardDefault
                    page={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// RFQs Table
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// RFQ Device Count with Tooltip
// ---------------------------------------------------------------------------

function RFQDeviceCount({ devices }: { devices: RFQDevice[] }) {
    const totalQuantity = devices.reduce((sum, d) => sum + d.quantity, 0);

    const tooltipTitle = (
        <div className="flex flex-col gap-1">
            {devices.map((device, i) => (
                <span key={i}>{truncateDeviceName(device.name)} (×{device.quantity})</span>
            ))}
        </div>
    );

    return (
        <Tooltip title={tooltipTitle} placement="top" arrow>
            <TooltipTrigger>
                <span className="text-sm text-[#181d27] cursor-default">{totalQuantity}</span>
            </TooltipTrigger>
        </Tooltip>
    );
}

// ---------------------------------------------------------------------------
// RFQ Details Slideout
// ---------------------------------------------------------------------------

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function RFQDetailsSidebar({
    rfq,
    isOpen,
    onClose,
    onDecline,
    onRespond,
}: {
    rfq: RFQ | null;
    isOpen: boolean;
    onClose: () => void;
    onDecline: (rfqId: string) => void;
    onRespond: (rfqId: string) => void;
}) {
    const [expandedDevice, setExpandedDevice] = useState<number | null>(null);
    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const [showRespondModal, setShowRespondModal] = useState(false);

    // Keep last valid RFQ for exit animation
    const lastRfqRef = useRef<RFQ | null>(null);
    if (rfq) lastRfqRef.current = rfq;
    const displayRfq = rfq ?? lastRfqRef.current;

    const toggleDevice = (index: number) => {
        setExpandedDevice(expandedDevice === index ? null : index);
    };

    if (!displayRfq) return null;

    const totalQuantity = displayRfq.devices.reduce((sum, d) => sum + d.quantity, 0);
    const devicesWithPrice = displayRfq.devices.filter((d) => d.unitPrice !== undefined);
    const grandTotal = devicesWithPrice.length > 0
        ? { total: devicesWithPrice.reduce((sum, d) => sum + (d.unitPrice ?? 0) * d.quantity, 0), isPartial: devicesWithPrice.length < displayRfq.devices.length }
        : null;

    return (
        <>
            <SlideoutMenu isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
                <SlideoutMenu.Header onClose={onClose}>
                    <div className="flex items-start gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
                            <ShoppingBag01 className="size-5 text-fg-quaternary" />
                        </div>
                        <div className="flex flex-1 flex-col gap-1.5">
                            <h2 className="text-xl font-semibold text-primary">
                                RFQ #{displayRfq.id}
                            </h2>
                        </div>
                    </div>
                </SlideoutMenu.Header>

                <SlideoutMenu.Content>
                    <div className="flex flex-col gap-4">
                        {/* Devices Card */}
                        <div className="rounded-xl border border-[#e9eaeb] bg-white">
                            {/* Devices Header */}
                            <div className="flex items-center justify-between border-b border-[#e9eaeb] px-3 py-3">
                                <span className="text-sm font-semibold text-[#414651]">Device(s)</span>
                                <span className="rounded-full border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 text-xs font-medium text-[#414651]">
                                    {totalQuantity}
                                </span>
                            </div>

                            {/* Device List */}
                            <div className="flex flex-col divide-y divide-[#e9eaeb]">
                                {displayRfq.devices.map((device, index) => {
                                    const deviceTotal = device.unitPrice !== undefined ? device.unitPrice * device.quantity : null;
                                    const isExpanded = expandedDevice === index;

                                    return (
                                        <div
                                            key={index}
                                            className={cx(
                                                "flex flex-col transition-colors duration-200",
                                                isExpanded ? "bg-[#fafafa]" : "",
                                            )}
                                        >
                                            {/* Device Row - Collapsed */}
                                            <button
                                                type="button"
                                                onClick={() => toggleDevice(index)}
                                                className="flex items-center justify-between p-3 text-left w-full hover:bg-[#fafafa] transition-colors"
                                            >
                                                <div className="flex flex-col gap-1 flex-1 min-w-0 pr-2">
                                                    {/* Device Name */}
                                                    <span className="text-sm font-semibold text-[#181d27] line-clamp-1">
                                                        {device.name}
                                                    </span>
                                                    {/* Quantity & Subtotal */}
                                                    <span className="text-sm text-[#535862]">
                                                        ×{device.quantity}{deviceTotal !== null && ` | ${formatCurrency(deviceTotal)}`}
                                                    </span>
                                                </div>
                                                <ChevronDown
                                                    className={cx(
                                                        "size-5 text-[#535862] transition-transform duration-200 shrink-0",
                                                        isExpanded && "rotate-180",
                                                    )}
                                                />
                                            </button>

                                            {/* Expanded Device Details */}
                                            {isExpanded && (
                                                <div className="flex flex-col gap-4 px-3 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <div className="h-px bg-[#e9eaeb]" />

                                                    {/* Details Grid */}
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-xs font-medium text-[#717680]">Budget</span>
                                                            <span className="text-sm font-medium text-[#181d27]">
                                                                {device.unitPrice !== undefined ? formatCurrency(device.unitPrice) : "—"}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-xs font-medium text-[#717680]">Quantity</span>
                                                            <span className="text-sm font-medium text-[#181d27]">{device.quantity}</span>
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-xs font-medium text-[#717680]">Asset Type</span>
                                                            <span className="text-sm font-medium text-[#181d27]">{device.assetType}</span>
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-xs font-medium text-[#717680]">Subtotal</span>
                                                            <span className="text-sm font-semibold text-[#181d27]">
                                                                {deviceTotal !== null ? formatCurrency(deviceTotal) : "—"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <span className="text-xs font-medium text-[#717680]">Description</span>
                                                        <p className="text-sm text-[#535862] leading-relaxed">
                                                            {device.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Total Budget */}
                            {grandTotal !== null && (
                                <div className="flex items-center justify-between border-t border-[#e9eaeb] px-3 py-3 bg-[#fafafa] rounded-b-xl">
                                    <span className="text-sm font-medium text-[#414651]">
                                        Total budget{grandTotal.isPartial && " (partial)"}
                                    </span>
                                    <span className="text-sm font-semibold text-[#181d27]">
                                        {formatCurrency(grandTotal.total)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* RFQ Details Card */}
                        <div className="flex flex-col gap-6 rounded-xl border border-[#e9eaeb] bg-white p-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold text-[#252b37]">Country</span>
                                <div className="flex items-center gap-1.5">
                                    <CountryFlag country={displayRfq.country} />
                                    <span className="text-sm text-[#535862]">{displayRfq.country}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SlideoutMenu.Content>

                <SlideoutMenu.Footer>
                    <div className="flex gap-3">
                        <Button
                            size="lg"
                            color="secondary"
                            className="flex-1"
                            onClick={() => setShowDeclineModal(true)}
                        >
                            Decline RFQ
                        </Button>
                        <Button
                            size="lg"
                            color="primary"
                            className="flex-1"
                            onClick={() => setShowRespondModal(true)}
                        >
                            Respond
                        </Button>
                    </div>
                </SlideoutMenu.Footer>
            </SlideoutMenu>

            {/* Respond to Budget Modal */}
            <RespondToBudgetModal
                isOpen={showRespondModal}
                onClose={() => setShowRespondModal(false)}
                onSubmit={() => {
                    onRespond(displayRfq.id);
                    onClose();
                }}
                devices={displayRfq.devices}
                rfqId={displayRfq.id}
            />

            {/* Decline RFQ Modal */}
            <DeclineRFQModal
                isOpen={showDeclineModal}
                onClose={() => setShowDeclineModal(false)}
                onConfirm={() => {
                    setShowDeclineModal(false);
                    onDecline(displayRfq.id);
                    onClose();
                }}
                rfqId={displayRfq.id}
            />
        </>
    );
}

// ---------------------------------------------------------------------------
// RFQs Table
// ---------------------------------------------------------------------------

function RFQsTable({ onViewRFQ, excludeRFQIds = [] }: { onViewRFQ: (rfq: RFQ) => void; excludeRFQIds?: string[] }) {
    const isMd = useBreakpoint("md");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState<RFQSortField | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState<RFQFilters>(defaultRFQFilters);
    const itemsPerPage = 10;

    // Count active filters
    const activeFilterCount =
        filters.countries.length +
        (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 100000 ? 1 : 0);

    const calculateRFQTotal = (rfq: RFQ): { total: number; isPartial: boolean } | null => {
        const devicesWithPrice = rfq.devices.filter((device) => device.unitPrice !== undefined);
        if (devicesWithPrice.length === 0) return null;
        const total = devicesWithPrice.reduce((sum, device) => sum + device.quantity * (device.unitPrice ?? 0), 0);
        const isPartial = devicesWithPrice.length < rfq.devices.length;
        return { total, isPartial };
    };

    // Handle column header click for sorting
    const handleSort = (field: RFQSortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const filteredRFQs = rfqs
        .filter((rfq) => {
            // Filter out excluded RFQs
            if (excludeRFQIds.includes(rfq.id)) return false;
            // Filter by search query (RFQ ID or device names)
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesId = rfq.id.toLowerCase().includes(query);
                const matchesDevice = rfq.devices.some((device) => device.name.toLowerCase().includes(query));
                if (!matchesId && !matchesDevice) return false;
            }
            // Filter by countries from filter modal
            if (filters.countries.length > 0 && !filters.countries.includes(rfq.country)) return false;
            // Filter by budget range
            const rfqTotal = calculateRFQTotal(rfq);
            if (rfqTotal) {
                if (rfqTotal.total < filters.budgetRange[0] || rfqTotal.total > filters.budgetRange[1]) return false;
            }
            return true;
        })
        .sort((a, b) => {
            if (!sortField) return 0;

            let aValue: string | number;
            let bValue: string | number;

            switch (sortField) {
                case "id":
                    aValue = a.id;
                    bValue = b.id;
                    break;
                case "budget":
                    const aTotal = calculateRFQTotal(a);
                    const bTotal = calculateRFQTotal(b);
                    aValue = aTotal?.total ?? 0;
                    bValue = bTotal?.total ?? 0;
                    break;
                case "country":
                    aValue = a.country;
                    bValue = b.country;
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

    // Pagination
    const totalPages = Math.ceil(filteredRFQs.length / itemsPerPage);
    const paginatedRFQs = filteredRFQs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="min-w-0 rounded-xl border border-[#e9eaeb] bg-white">
            {/* Header with Search and Filter */}
            <div className="flex flex-col gap-3 border-b border-[#e9eaeb] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
                <h3 className="text-lg font-semibold text-[#181d27]">RFQs ({filteredRFQs.length})</h3>
                <div className="flex items-center gap-2">
                    <div className="flex-1 md:w-56 md:flex-none">
                        <Input
                            size="sm"
                            icon={SearchLg}
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                        />
                    </div>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowFilterModal(!showFilterModal)}
                            className={cx(
                                "flex h-10 items-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition-colors",
                                showFilterModal
                                    ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                                    : "border-[#e9eaeb] bg-white text-[#414651] hover:bg-[#fafafa]"
                            )}
                        >
                            <FilterLines className="size-5" />
                            Filter
                            {activeFilterCount > 0 && (
                                <span className="flex size-5 items-center justify-center rounded-full bg-[#0948b5] text-xs font-medium text-white">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                        <RFQFilterDropdown
                            isOpen={showFilterModal}
                            onClose={() => setShowFilterModal(false)}
                            filters={filters}
                            onApply={(newFilters: RFQFilters) => {
                                setFilters(newFilters);
                                setCurrentPage(1);
                            }}
                            resultCount={filteredRFQs.length}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
                    <thead>
                        <tr className="border-b border-[#e9eaeb] text-xs font-medium text-[#535862]">
                            <th className="px-6 py-3 font-medium">
                                <button
                                    type="button"
                                    onClick={() => handleSort("id")}
                                    className={cx(
                                        "flex items-center gap-1 hover:text-[#181d27]",
                                        sortField === "id" && "text-[#181d27]"
                                    )}
                                >
                                    Request ID
                                    <ChevronSelectorVertical className={cx(
                                        "size-4",
                                        sortField === "id" ? "text-[#181d27]" : "text-[#d0d5dd]"
                                    )} />
                                </button>
                            </th>
                            <th className="px-6 py-3 font-medium">Device(s)</th>
                            <th className="px-6 py-3 font-medium">
                                <button
                                    type="button"
                                    onClick={() => handleSort("budget")}
                                    className={cx(
                                        "flex items-center gap-1 hover:text-[#181d27]",
                                        sortField === "budget" && "text-[#181d27]"
                                    )}
                                >
                                    Budget
                                    <ChevronSelectorVertical className={cx(
                                        "size-4",
                                        sortField === "budget" ? "text-[#181d27]" : "text-[#d0d5dd]"
                                    )} />
                                </button>
                            </th>
                            <th className="px-6 py-3 font-medium">
                                <button
                                    type="button"
                                    onClick={() => handleSort("country")}
                                    className={cx(
                                        "flex items-center gap-1 hover:text-[#181d27]",
                                        sortField === "country" && "text-[#181d27]"
                                    )}
                                >
                                    Country
                                    <ChevronSelectorVertical className={cx(
                                        "size-4",
                                        sortField === "country" ? "text-[#181d27]" : "text-[#d0d5dd]"
                                    )} />
                                </button>
                            </th>
                            <th className="px-6 py-3 font-medium" />
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRFQs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <SearchLg className="size-8 text-[#d0d5dd]" />
                                        <p className="text-sm font-medium text-[#535862]">No RFQs found</p>
                                        <p className="text-sm text-[#535862]">
                                            Try adjusting your search or filter criteria
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginatedRFQs.map((rfq) => (
                                <tr
                                    key={rfq.id}
                                    className="border-b border-[#e9eaeb] transition-all duration-300 ease-out last:border-b-0 animate-in fade-in slide-in-from-top-2"
                                >
                                    <td className="px-6 py-4 text-sm text-[#181d27]">{rfq.id}</td>
                                    <td className="px-6 py-4">
                                        <RFQDeviceCount devices={rfq.devices} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#181d27]">
                                        {(() => {
                                            const result = calculateRFQTotal(rfq);
                                            if (!result) return "—";
                                            return formatCurrency(result.total);
                                        })()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <CountryFlag country={rfq.country} />
                                            <span className="text-sm text-[#535862]">{rfq.country}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => onViewRFQ(rfq)}
                                            className="text-sm font-semibold text-[#0948b5] transition-colors hover:text-[#073d8a] hover:underline"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <PaginationCardDefault
                    page={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Recent Orders Table
// ---------------------------------------------------------------------------

function RecentOrdersTable() {
    return (
        <div className="min-w-0 rounded-xl border border-[#e9eaeb] bg-white">
            <div className="flex items-center justify-between border-b border-[#e9eaeb] px-4 py-4 md:px-6">
                <h3 className="text-lg font-semibold text-[#181d27]">Recent orders</h3>
                <Button size="sm">View orders</Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
                    <thead>
                        <tr className="border-b border-[#e9eaeb] text-xs font-medium text-[#535862]">
                            <th className="px-3 py-3 font-medium">Order ID</th>
                            <th className="px-3 py-3 font-medium">Device(s)</th>
                            <th className="px-3 py-3 font-medium">Service</th>
                            <th className="px-3 py-3 font-medium">Amount</th>
                            <th className="px-3 py-3 font-medium">Delivery address</th>
                            <th className="px-3 py-3 font-medium">Due Date</th>
                            <th className="px-3 py-3 font-medium">Status</th>
                            <th className="px-3 py-3 font-medium" />
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order, i) => (
                            <tr key={i} className="border-b border-[#e9eaeb] last:border-b-0">
                                <td className="px-3 py-4 text-sm text-[#181d27]">{order.id}</td>
                                <td className="px-3 py-4">
                                    <DeviceAvatars devices={order.devices} />
                                </td>
                                <td className="px-3 py-4">
                                    <ServiceBadge service={order.service} />
                                </td>
                                <td className="px-3 py-4 text-sm text-[#181d27]">{order.amount}</td>
                                <td className="px-3 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <CountryFlag country="United States" />
                                        <span className="text-sm text-[#535862]">{order.address}</span>
                                    </div>
                                </td>
                                <td className="px-3 py-4 text-sm text-[#535862]">{order.dueDate}</td>
                                <td className="px-3 py-4">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="px-3 py-4">
                                    <a href="#" className="text-sm font-semibold text-[#0948b5] hover:underline">View</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Updates Widget (LinkedIn-style floating chat)
// ---------------------------------------------------------------------------

function UpdatesFeedContent() {
    return (
        <div className="flex flex-col">
            {activityFeed.map((item, i) => (
                <React.Fragment key={i}>
                    {i > 0 && <hr className="h-px w-full border-0 bg-border-secondary" />}
                    <div className="-mx-3 flex cursor-pointer gap-3 px-3 py-3 transition duration-100 ease-linear hover:bg-secondary">
                    <div className="flex flex-1 flex-col gap-3">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-secondary">
                                    {item.type} {item.id}
                                </span>
                                <span className="text-xs text-tertiary">{item.time}</span>
                            </div>
                            <p className="text-sm text-tertiary">
                                Note from <span className="font-medium text-brand-secondary">Rayda</span>
                            </p>
                        </div>
                        <div className="rounded-br-lg rounded-bl-lg rounded-tr-lg border border-secondary p-3 shadow-xs">
                            <p className="text-sm text-secondary">{item.message}</p>
                        </div>
                    </div>
                    <div className="mt-1 size-2 shrink-0 rounded-full bg-brand-solid" />
                </div>
                </React.Fragment>
            ))}
        </div>
    );
}

function UpdatesWidget() {
    const [isExpanded, setIsExpanded] = useState(false);
    const isMd = useBreakpoint("md");
    const unreadCount = activityFeed.length;

    // Lock body scroll on mobile when expanded
    useEffect(() => {
        if (!isMd && isExpanded) {
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = ""; };
        }
    }, [isMd, isExpanded]);

    // Mobile: FAB + popup widget
    if (!isMd) {
        return (
            <>
                {/* Backdrop */}
                {isExpanded && (
                    <div className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]" onClick={() => setIsExpanded(false)} />
                )}

                <div className="fixed bottom-5 right-4 z-50">
                {/* Expanded popup */}
                {isExpanded && (
                    <>

                        <div
                            className="absolute bottom-16 right-0 z-50 flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl bg-primary animate-in fade-in slide-in-from-bottom-4 duration-200"
                            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.1)" }}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 bg-brand-solid px-4 py-3.5">
                                <MessageChatCircle className="size-5 shrink-0 text-fg-white" aria-hidden="true" />
                                <span className="text-sm font-semibold text-white">Order Updates</span>
                                {unreadCount > 0 && (
                                    <span className="flex size-5 items-center justify-center rounded-full bg-error-solid text-xs font-semibold text-white ring-2 ring-white">
                                        {unreadCount}
                                    </span>
                                )}
                                <button type="button" onClick={() => setIsExpanded(false)} className="ml-auto rounded-md p-0.5 transition duration-100 ease-linear hover:bg-white/10">
                                    <XClose className="size-5 text-fg-white" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="max-h-[60vh] overflow-y-auto p-4">
                                <UpdatesFeedContent />
                            </div>
                        </div>
                    </>
                )}

                {/* FAB */}
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="relative flex size-14 items-center justify-center rounded-full bg-brand-solid transition duration-200 ease-linear hover:bg-brand-solid_hover active:scale-95"
                    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.12)" }}
                >
                    {isExpanded ? (
                        <ChevronDown className="size-6 text-fg-white" aria-hidden="true" />
                    ) : (
                        <MessageChatCircle className="size-6 text-fg-white" aria-hidden="true" />
                    )}

                    {/* Badge */}
                    {!isExpanded && unreadCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-error-solid text-xs font-semibold text-white ring-2 ring-white">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </div>
            </>
        );
    }

    // Desktop: LinkedIn-style bottom bar widget
    return (
        <div className="fixed bottom-0 right-4 z-50 flex flex-col sm:right-6" style={{ filter: "drop-shadow(0 -4px 24px rgba(0,0,0,0.12)) drop-shadow(0 8px 32px rgba(0,0,0,0.16))" }}>
            {/* Header bar */}
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={cx(
                    "flex w-[340px] items-center gap-3 rounded-t-lg bg-brand-solid px-4 py-3.5 transition duration-200 ease-linear hover:bg-brand-solid_hover sm:w-[380px]",
                    !isExpanded && "rounded-b-none",
                )}
            >
                <MessageChatCircle className="size-5 shrink-0 text-fg-white" aria-hidden="true" />
                <span className="text-sm font-semibold text-white">Order Updates</span>

                {unreadCount > 0 && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-error-solid text-xs font-semibold text-white ring-2 ring-white">
                        {unreadCount}
                    </span>
                )}

                <ChevronDown
                    className={cx(
                        "ml-auto size-4 text-fg-white transition duration-200 ease-linear",
                        isExpanded && "rotate-180",
                    )}
                    aria-hidden="true"
                />
            </button>

            {/* Expanded panel */}
            <div
                className={cx(
                    "grid w-[340px] bg-primary transition-[grid-template-rows] duration-300 ease-out sm:w-[380px]",
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
            >
                <div className="overflow-hidden">
                    <div className="flex max-h-[70vh] flex-col overflow-y-auto p-4">
                        <UpdatesFeedContent />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Region Section
// ---------------------------------------------------------------------------

function RegionSection() {
    const [activeTab, setActiveTab] = useState("12 months");

    return (
        <div className="min-w-0 rounded-xl border border-[#e9eaeb] bg-white">
            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-lg font-semibold text-[#181d27]">Region</h3>
                    <PeriodTabs activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Map placeholder */}
                    <div className="flex flex-1 items-center justify-center rounded-lg bg-[#f9fafb] p-4 md:p-8">
                        <div className="relative w-full max-w-[500px]">
                            {/* Simple world map placeholder */}
                            <svg viewBox="0 0 800 400" className="w-full text-[#e5e7eb]" fill="currentColor">
                                <ellipse cx="400" cy="200" rx="380" ry="180" fill="#f0f0f0" />
                                <text x="400" y="210" textAnchor="middle" className="text-sm" fill="#98a2b3">World Map</text>
                            </svg>
                            {/* Location tooltip */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#101828] px-3 py-2 text-xs text-white shadow-lg">
                                <p className="font-medium">United State of America</p>
                                <p className="text-[#98a2b3]">43</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-[#e9eaeb] lg:hidden" />
                    <div className="hidden w-px self-stretch bg-[#e9eaeb] lg:block" />

                    {/* Pie chart section */}
                    <div className="flex w-full flex-col gap-6 lg:w-[340px]">
                        <h4 className="text-lg font-semibold text-[#181d27]">State Regioned</h4>

                        {/* Pie chart placeholder */}
                        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                            <div className="relative size-40 shrink-0">
                                <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2e5fe8" strokeWidth="20" strokeDasharray="75 251.2" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#6a93f0" strokeWidth="20" strokeDasharray="50 251.2" strokeDashoffset="-75" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f5a623" strokeWidth="20" strokeDasharray="45 251.2" strokeDashoffset="-125" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f7c66e" strokeWidth="20" strokeDasharray="40 251.2" strokeDashoffset="-170" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e74c3c" strokeWidth="20" strokeDasharray="41.2 251.2" strokeDashoffset="-210" />
                                </svg>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-col gap-2">
                                {stateRegions.map((region) => (
                                    <div key={region.name} className="flex items-center gap-2">
                                        <div className={cx("size-2.5 rounded-full", region.color)} />
                                        <span className="text-sm text-[#535862]">{region.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// RFQ Chart Section
// ---------------------------------------------------------------------------

function RFQChartSection() {
    const [activeTab, setActiveTab] = useState("12 months");
    const maxVal = Math.max(...rfqInitiated);

    return (
        <div className="min-w-0 rounded-xl border border-[#e9eaeb] bg-white">
            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-[#181d27]">Request For Quote</h3>
                            <p className="text-sm text-[#535862]">These are requests that don&apos;t come from the catalog provided</p>
                        </div>
                        <PeriodTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>
                    <div className="h-px bg-[#e9eaeb]" />
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="size-2.5 rounded-full bg-[#2e5fe8]" />
                        <span className="text-sm text-[#535862]">RFQ Initiated</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="size-2.5 rounded-full bg-[#a3bffa]" />
                        <span className="text-sm text-[#535862]">RFQ Pending</span>
                    </div>
                </div>

                {/* Chart */}
                <div className="overflow-x-auto">
                <div className="flex min-w-[500px] items-end gap-1">
                    {/* Y-axis */}
                    <div className="flex flex-col justify-between pr-2 text-xs text-[#98a2b3]" style={{ height: 200 }}>
                        {[25, 20, 15, 10, 5, 0].map((val) => (
                            <span key={val}>{val}</span>
                        ))}
                    </div>

                    {/* Bars */}
                    <div className="flex flex-1 items-end justify-between gap-1">
                        {rfqChartMonths.map((month, i) => (
                            <div key={month} className="flex flex-1 flex-col items-center gap-1">
                                <div className="flex w-full items-end justify-center gap-0.5" style={{ height: 200 }}>
                                    <div
                                        className="w-full max-w-[16px] rounded-t bg-[#a3bffa]"
                                        style={{ height: `${(rfqPending[i] / maxVal) * 100}%` }}
                                    />
                                    <div
                                        className="w-full max-w-[16px] rounded-t bg-[#2e5fe8]"
                                        style={{ height: `${(rfqInitiated[i] / maxVal) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-[#98a2b3]">{month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-center text-xs text-[#98a2b3]">Month</p>
            </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Period Tabs
// ---------------------------------------------------------------------------

function PeriodTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
    const isMd = useBreakpoint("md");

    if (!isMd) {
        return (
            <Select
                size="sm"
                selectedKey={activeTab}
                onSelectionChange={(key) => onTabChange(key as string)}
                items={periodTabs.map((tab) => ({ id: tab, label: tab }))}
            >
                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
            </Select>
        );
    }

    return (
        <ButtonGroup size="sm">
            {periodTabs.map((tab) => (
                <ButtonGroupItem
                    key={tab}
                    isSelected={activeTab === tab}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </ButtonGroupItem>
            ))}
        </ButtonGroup>
    );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function VendorPortalPage() {
    const [headerActiveTab, setHeaderActiveTab] = useState("12 months");
    const [selectedOrder, setSelectedOrder] = useState<OrderRequest | null>(null);
    const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
    const [acceptedOrderIds, setAcceptedOrderIds] = useState<string[]>([]);
    const [declinedOrderIds, setDeclinedOrderIds] = useState<string[]>([]);
    const [declinedRFQIds, setDeclinedRFQIds] = useState<string[]>([]);
    const [respondedRFQIds, setRespondedRFQIds] = useState<string[]>([]);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [showRFQErrorToast, setShowRFQErrorToast] = useState(false);
    const [showRFQRespondToast, setShowRFQRespondToast] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleAcceptOrder = (orderId: string) => {
        setAcceptedOrderIds((prev) => [...prev, orderId]);
        setShowSuccessToast(true);
    };

    const handleDeclineOrder = (orderId: string) => {
        setDeclinedOrderIds((prev) => [...prev, orderId]);
        setShowErrorToast(true);
    };

    const handleDeclineRFQ = (rfqId: string) => {
        setDeclinedRFQIds((prev) => [...prev, rfqId]);
        setShowRFQErrorToast(true);
    };

    const handleRespondRFQ = (rfqId: string) => {
        setRespondedRFQIds((prev) => [...prev, rfqId]);
        setShowRFQRespondToast(true);
    };

    const handleViewOrder = () => {
        setShowSuccessToast(false);
        // Navigate to orders page or open order details
        // For now, just dismiss the toast
    };

    return (
        <div className="flex min-h-screen overflow-x-hidden bg-white">
            <Sidebar />
            <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

            <div className="flex min-w-0 flex-1 flex-col lg:ml-60">
                <MobileHeader onMenuOpen={() => setIsMobileSidebarOpen(true)} />

                {/* Dashboard content */}
                <div className="flex min-w-0 flex-1">
                    {/* Main content area */}
                    <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-8">
                        {/* Dashboard header */}
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                                <h1 className="text-2xl font-semibold text-[#181d27]">Dashboard</h1>
                                <PeriodTabs activeTab={headerActiveTab} onTabChange={setHeaderActiveTab} />
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
                                {metrics.map((metric) => (
                                    <MetricCard key={metric.label} {...metric} />
                                ))}
                            </div>
                        </div>

                        {/* Tables */}
                        <div className="mt-6 flex min-w-0 flex-col gap-6 md:mt-8 md:gap-8">
                            <OrderRequestsTable onViewOrder={setSelectedOrder} excludeOrderIds={[...acceptedOrderIds, ...declinedOrderIds]} />
                            <RFQsTable onViewRFQ={setSelectedRFQ} excludeRFQIds={[...declinedRFQIds, ...respondedRFQIds]} />
                            <RecentOrdersTable />
                        </div>

                        {/* Region */}
                        <div className="mt-6 md:mt-8">
                            <RegionSection />
                        </div>

                        {/* RFQ Chart */}
                        <div className="mt-6 pb-8 md:mt-8 md:pb-12">
                            <RFQChartSection />
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Details Sidebar */}
            <OrderDetailsSidebar
                order={selectedOrder}
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onAccept={handleAcceptOrder}
                onDecline={handleDeclineOrder}
            />

            {/* RFQ Details Sidebar */}
            <RFQDetailsSidebar
                rfq={selectedRFQ}
                isOpen={!!selectedRFQ}
                onClose={() => setSelectedRFQ(null)}
                onDecline={handleDeclineRFQ}
                onRespond={handleRespondRFQ}
            />

            {/* Success Toast */}
            <SuccessToast
                isVisible={showSuccessToast}
                onDismiss={() => setShowSuccessToast(false)}
                onViewOrder={handleViewOrder}
            />

            {/* Error Toast for Declined Orders */}
            <ErrorToast
                isVisible={showErrorToast}
                onDismiss={() => setShowErrorToast(false)}
            />

            {/* Error Toast for Declined RFQs */}
            <RFQErrorToast
                isVisible={showRFQErrorToast}
                onDismiss={() => setShowRFQErrorToast(false)}
            />

            {/* Success Toast for Responded RFQs */}
            <RFQRespondToast
                isVisible={showRFQRespondToast}
                onDismiss={() => setShowRFQRespondToast(false)}
            />

            {/* Floating updates widget */}
            <UpdatesWidget />
        </div>
    );
}
